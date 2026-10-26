# Roadie

> Tour routing agent for independent musicians, combining Qloo cultural taste graphs with deterministic vehicle routing.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Qloo Taste Graph](https://img.shields.io/badge/Qloo-Taste_Graph_Grounded-8b5cf6)](https://qloo.com/)

---

## The Problem

Independent bands route tours on gut feel and fragmented promoter relationships. They frequently waste dates in major population centers where they have no organic audience while missing smaller cultural hubs where they would sell out.

Generic language models make this worse due to **population bias**: prompted to route an indie tour, they default to the largest Metropolitan Statistical Areas (Los Angeles, New York, Chicago, Houston, Phoenix) regardless of subcultural scene, while hallucinating exhausting 14-hour overnight zigzag drives.

---

## System Overview

Given an artist name, date window, and target room capacity, Roadie executes an autonomous agent loop:

1. **Audience Affinity:** Queries Qloo's taste graph (250M+ entities across music, dining, and retail) to rank geographic markets by subcultural affinity ratio rather than raw population.
2. **Venue Matching:** Filters right-sized rooms (via Ticketmaster Discovery API and verified indie venue network) matching the target capacity bracket (e.g. 250-cap club vs 850-cap ballroom).
3. **Deterministic Routing:** Solves a constrained 2-Opt Traveling Salesperson Problem (TSP) with hard touring limits: max 320 miles/day and mandatory rest days every 3 shows.
4. **Cultural Activation:** Recommends a high-affinity local opener and a taste-matched neighborhood anchor (independent record store or craft bar), and drafts a promoter inquiry email backed by local affinity data.

---

## Agent Architecture

Roadie avoids fragile unconstrained multi-step LLM chains. The agent orchestrates **5 thin, deterministic tools**, with preconditions strictly enforced inside each tool before execution:

```mermaid
flowchart TD
    classDef inputStyle fill:#161b22,stroke:#30363d,stroke-width:1px,color:#f0f6fc;
    classDef agentStyle fill:#162438,stroke:#38bdf8,stroke-width:2px,color:#f0f6fc;
    classDef toolStyle fill:#161b22,stroke:#38bdf8,stroke-width:1px,color:#f0f6fc;
    classDef guardStyle fill:#211d13,stroke:#d97706,stroke-width:1px,color:#fde68a;
    classDef outStyle fill:#122319,stroke:#238636,stroke-width:1px,color:#7ee787;

    subgraph Step1 ["1. Input Parameters & Constraints"]
        direction LR
        A["Artist & Genre Profile<br/>(e.g. Geese • Post-Punk)"]:::inputStyle
        B["Date Window & Target Corridor<br/>(e.g. US-East, Nov 6–20)"]:::inputStyle
        C["Room Size Tier<br/>(Club: 200–450 cap)"]:::inputStyle
    end

    subgraph Step2 ["2. ReAct Agent Core"]
        Orch["Tour Routing Orchestrator<br/>State Machine & Precondition Validator"]:::agentStyle
    end

    subgraph Step3 ["3. Deterministic Tool Pipeline (In-Tool Preconditions)"]
        direction LR
        T1["Tool 1: audience_affinity<br/><b>Qloo API:</b> 250M+ Entity Taste Graph<br/>Ranks markets by affinity ratio"]:::toolStyle
        T2["Tool 2: find_venues<br/><b>Ticketmaster & Tavily Live Web:</b><br/>Filters rooms & extracts booking emails"]:::toolStyle
        T3["Tool 3: local_taste<br/><b>Qloo Graph & Tavily Verification:</b><br/>Pairs active openers & culture pop-ups"]:::toolStyle
        T4["Tool 4: build_route<br/><b>Deterministic TSP (2-Opt Algorithm):</b><br/>Calculates drivable mileage & rest cadence"]:::toolStyle
        T5["Tool 5: draft_pitch<br/><b>Promoter Pitch Engine:</b><br/>Embeds talent-buyer emails & affinity data"]:::toolStyle
        
        T1 --> T2 --> T3 --> T4 --> T5
    end

    subgraph Step4 ["4. Physical Touring Circuit Breakers"]
        direction LR
        G1["Daily Transit Limit<br/>Max 320 miles/day (5.5h drive)"]:::guardStyle
        G2["Band Health & Rest Cadence<br/>Mandatory off-day every 3 shows"]:::guardStyle
        G3["Market Cannibalization Guard<br/>Min 45 mi radius between stops"]:::guardStyle
    end

    subgraph Step5 ["5. Verified Tour Execution Artifacts"]
        direction LR
        O1["Day-by-Day Van Itinerary<br/>Route sequence & venue times"]:::outStyle
        O2["Geographic Drive-Time Map<br/>Interactive SVG corridor path"]:::outStyle
        O3["Data-Backed Promoter Pitch Emails<br/>Citing Qloo index & opener synergies"]:::outStyle
    end

    Step1 --> Step2
    Step2 --> Step3
    Step3 --> Step4
    Step4 --> Step5
```

- **Execution Tracing:** Every tool invocation records duration, input parameters, precondition validation status, and structured outputs in an inspectable trace.
- **Circuit Breakers:** Non-negotiable physical constraints (max 320 miles/day, mandatory rest days) cannot be overridden by LLM reasoning.
- **Credential Isolation:** API keys run strictly in server-side Next.js route handlers and are never exposed to the client.

---

## The Receipts: Empirical Tour Backtest

Roadie includes an empirical backtesting suite in **"The Receipts"** tab. We benchmarked an ungrounded LLM against Qloo-grounded Roadie using verified past tours from **Setlist.fm**.

To prevent training-data leakage, the backtest evaluates emerging breakout artists with breakout tours post-dating standard LLM cutoff dates (e.g., **Geese**, **The Last Dinner Party**, **Mk.gee**).

| Evaluation Metric | Ungrounded LLM Baseline | Roadie (Qloo Grounded) | Delta |
| :--- | :---: | :---: | :---: |
| **Precision@10** | **30% - 43%** | **80% - 100%** | **+2.3x to 3.3x Accuracy** |
| **NDCG@10 (Rank Correlation)** | 0.38 - 0.49 | **0.96 - 0.98** | High rank agreement with real booking |
| **Wasted Highway Transit** | 2,350 – 2,980 miles | **0 miles** | Eliminates impossible zig-zag legs |
| **Market Discovery** | Defaulted to Houston, Phoenix, Dallas | Correctly identified Asheville, Burlington, Columbus | Found real indie scenes |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/aryamantepal/roadie.git
cd roadie
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your credentials:

```env
# Qloo API (Cultural Intelligence & Taste Graph)
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://api.qloo.com/v1

# Ticketmaster Discovery API (Optional - curated rooms available out of the box)
TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```

*(Note: Roadie includes a high-fidelity curated taste-graph database for instant out-of-the-box exploration even before an external key is set).*

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running End-to-End Tests

Roadie includes an automated [Playwright](https://playwright.dev/) test suite verifying route generation, map projection, promoter pitch generation, and backtest metrics:

```bash
npm run test:e2e
```

To run Playwright against a deployed URL:

```bash
BASE_URL=https://roadie-seven-mu.vercel.app npx playwright test
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Cultural Intelligence:** Qloo API (Location Heatmaps, Cross-Domain Affinity)
- **Live Web Intelligence:** Tavily Search API (Talent Buyer Contact Extraction & Opener Verification)
- **Venue Discovery:** Ticketmaster Discovery API + Curated Indie Network
- **Routing Engine:** Deterministic Haversine & 2-Opt TSP Optimizer
- **Diagrams:** Mermaid.js client-side interactive rendering
- **Testing:** Playwright E2E Suite

---

## License

MIT
