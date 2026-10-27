'use client';

import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { CheckCircle2 } from 'lucide-react';

const AGENT_MERMAID_CHART = `flowchart TD
    classDef inputStyle fill:#f4f0e6,stroke:#1b2333,stroke-width:1px,color:#1b2333;
    classDef agentStyle fill:#1d4ed8,stroke:#1d4ed8,stroke-width:1px,color:#ffffff;
    classDef toolStyle fill:#fbfaf7,stroke:#1d4ed8,stroke-width:1px,color:#1b2333;
    classDef guardStyle fill:#fff7ed,stroke:#ea580c,stroke-width:1px,color:#9a3412;
    classDef outStyle fill:#f0fdf4,stroke:#16a34a,stroke-width:1px,color:#14532d;

    subgraph Step1 ["1. Input Parameters & Constraints"]
        direction LR
        A["Artist & Genre Profile<br/>(e.g. Geese • Post-Punk)"]:::inputStyle
        B["Date Window & Target Corridor<br/>(e.g. US-East, Nov 6–20)"]:::inputStyle
        C["Room Size Tier<br/>(Club: 200–450 cap)"]:::inputStyle
    end

    subgraph Step2 ["2. Deterministic Agent Core"]
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
`;

export const ArchitectureView: React.FC = () => {
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
        <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--rule)', paddingBottom: '10px' }}>
          <div>
            <span className="ov" style={{ marginBottom: '2px' }}>Formal Topology</span>
            <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              System Architecture Diagram
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
            Interactive Mermaid rendering • Click &apos;Raw Definition&apos; to inspect source
          </span>
        </div>
        <MermaidDiagram chart={AGENT_MERMAID_CHART} />
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
