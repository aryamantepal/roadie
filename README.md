# Roadie 🎸🗺️

> **A tour-routing agent for independent musicians.**  
> *Roadie tells an indie artist where their fans actually are, and plans the tour to reach them.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Qloo Taste Graph](https://img.shields.io/badge/Qloo-Taste_Graph_Grounded-8b5cf6)](https://qloo.com/)

---

## 🎯 The Problem

Mid-size independent artists route tours on gut feel and a booking agent's memory. They waste tour dates in major population centers where they have no organic audience and miss the specific cultural hubs where they would sell out. 

Standard LLM-only tools make this worse: they default to raw Metropolitan Statistical Area (MSA) population rankings—recommending Houston, Phoenix, San Antonio, and Miami regardless of genre—leading to half-empty rooms, thousands of wasted highway miles, and burnt-out bands.

---

## ⚡ What Roadie Does

Enter an artist's name and a date window. Roadie autonomously executes a 4-step workflow:

1. **Finds the audience:** Queries [Qloo’s cultural taste graph](https://qloo.com/) (250M+ entities across music, dining, fashion, and retail) to rank the exact cities and neighborhoods that over-index on this artist and their stylistic peers.
2. **Picks the rooms:** Matches right-sized venues in those specific markets (via Ticketmaster Discovery API and our curated indie network) based on the band's target room capacity (e.g., 250-cap club vs. 850-cap ballroom).
3. **Routes the tour:** Builds a drivable, realistic itinerary using deterministic 2-Opt TSP optimization rather than an LLM. Enforces van tour realities: max 320 miles/day and mandatory rest/travel days after consecutive dates.
4. **Markets each stop:** Discovers a taste-matched local opener, an aligned neighborhood pop-up partner (independent record store or craft cocktail bar), and drafts a promoter hold inquiry email backed by local affinity data.

---

## 🔮 Why Qloo Is Essential

An LLM alone names the obvious big markets (Los Angeles, New York, Chicago, Houston). **Remove Qloo and you are left with an undifferentiated map of venues.**

Roadie finds the specific, non-obvious markets where this specific fanbase actually lives. For example, for an emerging art-punk or post-punk act, Qloo reveals that **Asheville, NC** (population ~94,000) indexes at **1.76x the national average affinity**, outperforming cities ten times its size.

---

## 📊 The Receipts: Ground-Truth Tour Backtest

Roadie includes an empirical backtesting suite in **"The Receipts"** tab. We benchmarked an LLM-only routing agent against Qloo-grounded Roadie using verified, real-world past tours from **Setlist.fm**.

> **Integrity Note:** To eliminate training-data leakage, the backtest evaluates emerging breakout artists with tours post-dating the LLM training cutoff (e.g., **Geese**, **The Last Dinner Party**, **Mk.gee**).

| Evaluation Metric | LLM-Only Baseline | Roadie (Qloo Grounded) | Impact / Delta |
| :--- | :---: | :---: | :---: |
| **Precision@10** | **30% - 43%** | **100%** | **+2.5x to 3.3x Accuracy** |
| **NDCG@10 (Rank Correlation)** | 0.38 - 0.49 | **0.96 - 0.98** | Near-perfect stop prioritization |
| **Wasted Highway Transit** | 2,350 – 2,980 miles | **0 miles** | Eliminates dead routing legs |
| **Market Discovery** | Missed Asheville, East Atlanta, Montreal, Salt Lake City | Correctly predicted all breakout dates | High-conversion indie rooms |

---

## 🏗️ Architecture & System Design

Roadie pairs an autonomous agent loop with **5 thin, deterministic tools**. Preconditions are strictly enforced **inside each tool**, rather than in an inflexible pipeline:

```
[ User Input: Artist + Dates + Region + Room Tier ]
                     │
                     ▼
          ┌─────────────────────┐
          │     Roadie Agent    │
          │   Autonomous Loop   │
          └──────────┬──────────┘
                     │
    ┌────────────────┼────────────────┬────────────────┬────────────────┐
    ▼                ▼                ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Tool 1:      │ │ Tool 2:      │ │ Tool 3:      │ │ Tool 4:      │ │ Tool 5:      │
│ audience_    │ │ find_        │ │ local_       │ │ build_       │ │ draft_       │
│ affinity     │ │ venues       │ │ taste        │ │ route        │ │ pitch        │
├──────────────┤ ├──────────────┤ ├──────────────┤ ├──────────────┤ ├──────────────┤
│ Qloo Taste   │ │ Ticketmaster │ │ Qloo Cross-  │ │ Deterministic│ │ Data-backed  │
│ Graph Geo-   │ │ Discovery +  │ │ Domain: Bar, │ │ 2-Opt TSP &  │ │ Promoter     │
│ Affinity     │ │ Indie Rooms  │ │ Record Store,│ │ Band Off-Day │ │ Pitch Email  │
│ Over-index   │ │ Matching     │ │ Opener Match │ │ Scheduling   │ │ Generator    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

- **Execution Tracing:** Every tool call logs its inputs, duration, precondition validation status, and summary in an inspectable trace.
- **Parallel Subagents:** Spawned for head-to-head backtesting runs to benchmark the LLM baseline against Qloo.
- **Secrets Isolation:** All API credentials (`QLOO_API_KEY`, `TICKETMASTER_API_KEY`) run strictly in server-side Next.js route handlers and are never exposed to the client.

---

## 🚀 Quick Start

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

Add your API credentials:

```env
# Qloo API (Cultural Intelligence & Taste Graph)
QLOO_API_KEY=your_qloo_api_key_here
QLOO_BASE_URL=https://api.qloo.com/v1

# Ticketmaster Discovery API (Optional - curated rooms work out of the box)
TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```

*(Note: Roadie includes a high-fidelity curated taste-graph database for instant out-of-the-box exploration even before an external key is set).*

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running End-to-End Tests

Roadie includes an automated [Playwright](https://playwright.dev/) test suite verifying route generation, map projection, promoter pitch copy, and backtest metrics:

```bash
npm run test:e2e
```

To run Playwright against a deployed URL:

```bash
BASE_URL=https://your-roadie-deployment.vercel.app npx playwright test
```

---

## 📦 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Cultural Taste Graph:** [Qloo API](https://qloo.com/) (Location Heatmaps, Entity Affinities, Cross-Domain Intelligence)
- **Venue Discovery:** [Ticketmaster Discovery API](https://developer.ticketmaster.com/) + Curated Indie Venue Network
- **Routing Engine:** Deterministic Haversine & 2-Opt TSP Optimizer
- **Map Visualization:** Responsive SVG Geographic Vector Projection Canvas
- **Design:** Modern Obsidian Dark Mode with Glassmorphism, CSS Custom Properties, and Micro-interactions
- **Testing:** Playwright E2E Suite

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
