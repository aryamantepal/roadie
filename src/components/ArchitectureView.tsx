'use client';

import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { Shield, CheckCircle2 } from 'lucide-react';

const AGENT_MERMAID_CHART = `flowchart TD
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
`;

export const ArchitectureView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro Header */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
          Agent Architecture: Deterministic Tooling with Cultural Grounding
        </h2>
        <p style={{ color: '#8b949e', fontSize: '13.5px', lineHeight: 1.6, maxWidth: '840px', margin: 0 }}>
          Independent tour routing cannot rely on ungrounded LLMs. When prompted to route a tour, language
          models suffer from two fatal failure modes: <strong>population bias</strong> (routing indie bands to
          the 10 largest metros regardless of subcultural scene) and <strong>routing hallucination</strong> (generating
          exhausting 14-hour overnight zigzag drives).
        </p>
        <p style={{ color: '#8b949e', fontSize: '13.5px', lineHeight: 1.6, maxWidth: '840px', marginTop: '8px', marginBottom: 0 }}>
          Roadie implements an autonomous agent loop that strictly delegates to <strong>5 thin, deterministic tools</strong>.
          Every tool enforces its own preconditions before execution, ensuring the agent operates within the physical
          realities of van touring.
        </p>
      </div>

      {/* Interactive Mermaid Diagram */}
      <div>
        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            System Architecture Diagram
          </h3>
          <span style={{ fontSize: '12px', color: '#8b949e' }}>
            Interactive Mermaid rendering • Click &apos;Raw Definition&apos; to inspect source
          </span>
        </div>
        <MermaidDiagram chart={AGENT_MERMAID_CHART} />
      </div>

      {/* The 5 Thin Tools Specification */}
      <div
        style={{
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', marginBottom: '16px' }}>
          The 5 Thin Tools &amp; In-Tool Precondition Enforcement
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Tool 1 */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#58a6ff',
                  backgroundColor: 'rgba(56, 139, 253, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                01
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>
                audience_affinity
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
              Queries Qloo’s 250M+ entity graph. Ranks markets by subgenre affinity ratio rather than raw population.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Artist resolved in Qloo entity index</span>
            </div>
          </div>

          {/* Tool 2 */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#58a6ff',
                  backgroundColor: 'rgba(56, 139, 253, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                02
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>
                find_venues
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
              Filters Ticketmaster Discovery &amp; indie database, enriched by Tavily live web search to extract verified talent-buyer emails.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Capacity tier matched; Tavily talent-buyer lookup</span>
            </div>
          </div>

          {/* Tool 3 */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#58a6ff',
                  backgroundColor: 'rgba(56, 139, 253, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                03
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>
                local_taste
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
              Pairs Qloo cross-domain openers and cultural pop-ups, verified via Tavily live web queries to confirm active 2026 performance status.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Cross-domain affinity overlap &gt; 65%; live gig status verified</span>
            </div>
          </div>

          {/* Tool 4 */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#58a6ff',
                  backgroundColor: 'rgba(56, 139, 253, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                04
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>
                build_route
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
              Deterministic 2-Opt Traveling Salesperson optimizer. Injects mandatory rest days every 3 shows.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Leg distance ≤ 320 miles; date monotonicity</span>
            </div>
          </div>

          {/* Tool 5 */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#58a6ff',
                  backgroundColor: 'rgba(56, 139, 253, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                05
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>
                draft_pitch
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#8b949e', lineHeight: 1.5, margin: 0 }}>
              Formats booking inquiry email tailored to venue promoter, citing local market index and opener synergies.
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Verified venue contact &amp; market index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Touring Circuit Breakers & Pragmatic Constraints */}
      <div
        style={{
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Shield size={18} color="#58a6ff" />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
            Physical Constraints &amp; Circuit Breakers
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.6, marginBottom: '16px' }}>
          Indie bands tour in vans, not tour buses or flights. The agent loop is hard-coded with non-negotiable physical constraints:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '12px 14px', background: '#0d1117', border: '1px solid #21262d', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>320-Mile Daily Transit Cap</div>
            <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
              No route leg can exceed 5.5 hours of driving between load-in times.
            </div>
          </div>

          <div style={{ padding: '12px 14px', background: '#0d1117', border: '1px solid #21262d', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>3-Show Rest Day Ratio</div>
            <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
              After 3 consecutive performance nights, an off-day or transit-only day is mandatory.
            </div>
          </div>

          <div style={{ padding: '12px 14px', background: '#0d1117', border: '1px solid #21262d', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, color: '#f0f6fc', fontSize: '13px' }}>Market Cannibalization Guard</div>
            <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
              Minimum 45-mile separation between consecutive show markets to prevent audience splitting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
