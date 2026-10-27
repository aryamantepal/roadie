'use client';

import React, { useState } from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { CheckCircle2, Orbit, GitCommit } from 'lucide-react';

const ROUND_AGENT_MERMAID_CHART = `flowchart TD
    classDef agentStyle fill:#1d4ed8,stroke:#172554,stroke-width:2.5px,color:#ffffff;
    classDef toolStyle fill:#ffffff,stroke:#2563eb,stroke-width:2px,color:#1b2333;
    classDef inputStyle fill:#ffffff,stroke:#64748b,stroke-width:1.5px,color:#0f172a;
    classDef guardStyle fill:#fffbeb,stroke:#d97706,stroke-width:1.5px,color:#92400e;
    classDef outStyle fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#14532d;

    subgraph Config ["1. Input Constraints"]
        direction LR
        In1(["<b>Artist & Subgenre Profile</b><br/>e.g. Geese • Post-Punk"]):::inputStyle
        In2(["<b>Target Corridor & Dates</b><br/>e.g. US-East • Nov 6–20"]):::inputStyle
        In3(["<b>Capacity Tier</b><br/>Club: 200–450 cap"]):::inputStyle
    end

    subgraph Orbit ["2. Deterministic Agent Core & Orbital Tool Ring"]
        direction TB

        T1(["<b>01 · audience_affinity</b><br/>Qloo 250M+ Entity Taste Graph<br/><i>Subgenre market affinity scoring</i>"]):::toolStyle
        T2(["<b>02 · find_venues</b><br/>Ticketmaster &amp; Tavily Live Web<br/><i>Capacity verification &amp; contacts</i>"]):::toolStyle

        Agent((("<b>ROADIE ORCHESTRATOR</b><br/>Deterministic ReAct Loop<br/>State Machine &amp; Guardrails"))):::agentStyle

        T5(["<b>05 · draft_pitch</b><br/>Promoter Pitch Brief Engine<br/><i>Talent-buyer data synthesis</i>"]):::toolStyle
        T3(["<b>03 · local_taste</b><br/>Qloo Taste Graph &amp; Live Search<br/><i>Local opener co-affinity matching</i>"]):::toolStyle
        T4(["<b>04 · build_route</b><br/>Deterministic 2-Opt TSP Routing<br/><i>Corridor mileage &amp; rest cadence</i>"]):::toolStyle

        %% Round Orbital Cycle between tools
        T1 ==>|1. Taste Shortlist| T2
        T2 ==>|2. Room Holds| T3
        T3 ==>|3. Co-Bill Matches| T4
        T4 ==>|4. Drivable Sequence| T5
        T5 -.->|5. Next Leg Iteration| T1

        %% Central Agent Core Dispatch & Validation
        Agent <--->|Dispatch &amp; Validate| T1
        Agent <--->|Precondition Check| T2
        Agent <--->|Opener Validation| T3
        Agent <--->|Transit Constraints| T4
        Agent <--->|Pitch Compilation| T5
    end

    subgraph Guards ["3. Physical Touring Circuit Breakers"]
        direction LR
        G1(["<b>Daily Transit Cap</b><br/>Max 320 mi / 5.5h drive"]):::guardStyle
        G2(["<b>Rest Day Cadence</b><br/>1 rest day per 3 shows"]):::guardStyle
        G3(["<b>Radius Clause</b><br/>Min 45 mi market spacing"]):::guardStyle
    end

    subgraph Deliverables ["4. Verified Tour Deliverables"]
        direction LR
        O1(["<b>Master Tour Day-Sheets</b><br/>Daily schedules &amp; load-in"]):::outStyle
        O2(["<b>Cartographic Route Map</b><br/>Interactive SVG highway path"]):::outStyle
        O3(["<b>Promoter Pitch Briefs</b><br/>Qloo-backed talent inquiries"]):::outStyle
    end

    Config ==>|1. Tour Parameters| Agent
    Agent -. Enforces Physical Boundaries .-> Guards
    Agent ==>|2. Verified Plan| Deliverables
`;

const PIPELINE_MERMAID_CHART = `flowchart LR
    classDef inputStyle fill:#ffffff,stroke:#64748b,stroke-width:1.5px,color:#0f172a;
    classDef agentStyle fill:#1d4ed8,stroke:#172554,stroke-width:2.5px,color:#ffffff;
    classDef toolStyle fill:#ffffff,stroke:#2563eb,stroke-width:2px,color:#1b2333;
    classDef guardStyle fill:#fffbeb,stroke:#d97706,stroke-width:1.5px,color:#92400e;
    classDef outStyle fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#14532d;

    Input(["Inputs<br/>Artist &amp; Corridor"]):::inputStyle --> Agent((("Roadie Core<br/>Orchestrator"))):::agentStyle
    
    subgraph Pipeline ["The 5 Thin Tools Pipeline"]
        T1(["01 · audience_affinity<br/>Qloo Taste Index"]):::toolStyle
        T2(["02 · find_venues<br/>Ticketmaster &amp; Tavily"]):::toolStyle
        T3(["03 · local_taste<br/>Qloo Local Openers"]):::toolStyle
        T4(["04 · build_route<br/>2-Opt TSP Router"]):::toolStyle
        T5(["05 · draft_pitch<br/>Promoter Inquiry"]):::toolStyle

        T1 --> T2 --> T3 --> T4 --> T5
    end

    Agent ==> T1
    T5 ==> Guards(["Circuit Breakers<br/>≤320mi • 3:1 Rest"]):::guardStyle
    Guards ==> Output(["Verified Output<br/>Master Tour Sheets"]):::outStyle
`;

export const ArchitectureView: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'round' | 'pipeline'>('round');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Intro Header */}
      <div className="card-paper">
        <span className="ov">System Architecture &amp; Execution Model</span>
        <h2 style={{ fontSize: '26px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
          Roadie Agent Architecture &amp; System Design
        </h2>
        <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: 1.6, maxWidth: '840px', margin: 0 }}>
          Independent tour routing cannot rely on ungrounded language models. When prompted to route a tour, language
          models suffer from two fatal failure modes: <strong>population bias</strong> (routing indie bands to
          the 10 largest metros regardless of subcultural scene) and <strong>routing hallucination</strong> (generating
          exhausting 14-hour overnight zigzag drives).
        </p>
        <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: 1.6, maxWidth: '840px', marginTop: '10px', marginBottom: 0 }}>
          Roadie implements an autonomous agent loop that strictly delegates to <strong>5 thin, deterministic tools</strong>.
          Every tool enforces its own preconditions before execution, ensuring the agent operates within the physical
          realities of van touring.
        </p>
      </div>

      {/* Interactive Mermaid Diagram */}
      <div className="card-paper">
        <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
          <div>
            <span className="ov" style={{ marginBottom: '2px' }}>Formal Topology</span>
            <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              Agent Architecture &amp; Tool Orbit Diagram
            </h3>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--ink-3)', marginRight: '4px' }}>Topology View:</span>
            <button
              type="button"
              onClick={() => setActiveDiagram('round')}
              className={`segmented-pill ${activeDiagram === 'round' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', fontSize: '11.5px' }}
            >
              <Orbit size={12} />
              <span>Round Agent Orbit</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDiagram('pipeline')}
              className={`segmented-pill ${activeDiagram === 'pipeline' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', fontSize: '11.5px' }}
            >
              <GitCommit size={12} />
              <span>Linear Pipeline</span>
            </button>
          </div>
        </div>
        <MermaidDiagram chart={activeDiagram === 'round' ? ROUND_AGENT_MERMAID_CHART : PIPELINE_MERMAID_CHART} />
      </div>

      {/* The 5 Thin Tools Specification */}
      <div className="card-paper">
        <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '12px', marginBottom: '18px' }}>
          <span className="ov" style={{ marginBottom: '2px' }}>Pipeline Tools</span>
          <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
            The 5 Thin Tools &amp; In-Tool Precondition Enforcement
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {/* Tool 1 */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="chip live num">01</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>
                audience_affinity
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
              Queries Qloo’s 250M+ entity graph. Ranks markets by subgenre affinity ratio rather than raw population.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Artist resolved in Qloo entity index</span>
            </div>
          </div>

          {/* Tool 2 */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="chip live num">02</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>
                find_venues
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
              Filters Ticketmaster Discovery &amp; indie database, enriched by Tavily live web search to extract verified talent-buyer emails.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Capacity tier matched; Tavily talent-buyer lookup</span>
            </div>
          </div>

          {/* Tool 3 */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="chip live num">03</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>
                local_taste
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
              Pairs Qloo cross-domain openers and cultural pop-ups, verified via Tavily live web queries to confirm active performance status.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Cross-domain affinity overlap &gt; 65%; live gig status verified</span>
            </div>
          </div>

          {/* Tool 4 */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="chip live num">04</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>
                build_route
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
              Deterministic 2-Opt Traveling Salesperson optimizer. Injects mandatory rest days every 3 shows.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Leg distance ≤ 320 miles; date monotonicity</span>
            </div>
          </div>

          {/* Tool 5 */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="chip live num">05</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--ink)', fontSize: '13px' }}>
                draft_pitch
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
              Formats booking inquiry email tailored to venue promoter, citing local market index and opener synergies.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Verified venue contact &amp; market index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Touring Circuit Breakers */}
      <div className="card-paper">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', borderBottom: '1px solid var(--rule)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <span className="ov" style={{ marginBottom: '2px' }}>Operational Guards</span>
            <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              Physical Touring Constraints &amp; Circuit Breakers
            </h3>
          </div>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
          Indie bands tour in vans, not tour buses or flights. The agent loop is hard-coded with non-negotiable physical constraints:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px 16px', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 'var(--r-control)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13.5px' }}>320-Mile Daily Transit Cap</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>
              No route leg can exceed 5.5 hours of driving between load-in times.
            </div>
          </div>

          <div style={{ padding: '14px 16px', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 'var(--r-control)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13.5px' }}>3-Show Rest Day Ratio</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>
              After 3 consecutive performance nights, an off-day or transit-only day is mandatory.
            </div>
          </div>

          <div style={{ padding: '14px 16px', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 'var(--r-control)' }}>
            <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13.5px' }}>Market Cannibalization Guard</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>
              Minimum 45-mile separation between consecutive show markets to prevent audience splitting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
