'use client';

import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { Shield, CheckCircle2 } from 'lucide-react';

const AGENT_MERMAID_CHART = `flowchart TD
    subgraph Inputs["1. Tour Request & Bounds"]
        In1["Artist & Genre Profile"]
        In2["Date Window & Target Corridor"]
        In3["Capacity Tier (e.g. 250-cap club)"]
    end

    subgraph Core["2. ReAct Agent Loop"]
        Orch["Agent Orchestrator (Typed State Machine)"]
    end

    subgraph Tools["3. Deterministic Tools (Preconditions In-Tool)"]
        T1["audience_affinity<br/><b>Qloo API:</b> 250M+ Entity Taste Graph<br/><i>Ranks markets by affinity ratio</i>"]
        T2["find_venues<br/><b>Ticketmaster & Curated Indie Venues:</b><br/><i>Filters verified room sizes</i>"]
        T3["local_taste<br/><b>Qloo Cross-Domain Affinities:</b><br/><i>Pairs local openers & cultural spots</i>"]
        T4["build_route<br/><b>Deterministic TSP (2-Opt Algorithm):</b><br/><i>Calculates drivable mileage & rest days</i>"]
        T5["draft_pitch<br/><b>Promoter Pitch Engine:</b><br/><i>Cites local Qloo metrics & synergies</i>"]
    end

    subgraph Validation["4. Touring Circuit Breakers"]
        V1["Max Daily Drive: 320 miles"]
        V2["Rest Cadence: Max 3 consecutive shows"]
        V3["Market Radius: Min 45 mi between stops"]
    end

    subgraph Artifacts["5. Tour Execution Artifacts"]
        Out1["Day-by-Day Route Itinerary"]
        Out2["Geographic Drive-Time Map"]
        Out3["Promoter Pitch Packets with Qloo Data"]
    end

    Inputs --> Orch
    Orch -->|Step 1: Rank Markets| T1
    T1 -.->|Affinity Scores| Orch
    Orch -->|Step 2: Match Venues| T2
    T2 -.->|Verified Rooms| Orch
    Orch -->|Step 3: Cultural Context| T3
    T3 -.->|Openers & Pop-ups| Orch
    Orch -->|Step 4: Optimize Sequence| T4
    T4 --> Validation
    Validation -->|Verified Routing| Orch
    Orch -->|Step 5: Generate Pitches| T5
    T5 -.->|Pitch Emails| Out3
    Orch --> Out1
    Orch --> Out2
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
              Filters Ticketmaster Discovery &amp; verified indie database for realistic room sizes (e.g. 200–450 cap clubs).
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Capacity bracket matches band tier</span>
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
              Discovers compatible local openers and taste-matched cultural anchors (record stores, coffee shops).
            </p>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#3fb950', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Cross-domain affinity overlap &gt; 65%</span>
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
