'use client';

import React from 'react';
import { Cpu, Layers, GitBranch, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          borderLeft: '4px solid #06b6d4',
          backgroundColor: '#0c131d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Cpu size={22} color="#06b6d4" />
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
            Roadie Agent Architecture &amp; System Design
          </h2>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', maxWidth: '860px' }}>
          Roadie rejects fragile multi-step LLM hallucination chains. Instead, it pairs an autonomous
          agent loop with <strong>5 thin, deterministic tools</strong> where preconditions are
          strictly enforced inside the tools themselves.
        </p>
      </div>

      {/* The 5 Thin Tools Breakdown */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
          The 5 Thin Tools with In-Tool Precondition Enforcement
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Tool 1 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Tool 1</span>
              <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>audience_affinity</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Queries Qloo’s 250M+ entity taste graph. Ranks geographic markets by over-indexing fan affinity ratios.
            </p>
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Non-empty artist query; validates taste cluster</span>
            </div>
          </div>

          {/* Tool 2 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-cyan">Tool 2</span>
              <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>find_venues</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Ticketmaster Discovery API &amp; curated indie network matching right-sized rooms (e.g. 250-cap club vs 850-cap ballroom).
            </p>
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Valid city/state &amp; supported capacity tier</span>
            </div>
          </div>

          {/* Tool 3 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-amber">Tool 3</span>
              <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>local_taste</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Leverages Qloo cross-domain affinities (dining, retail) to discover high-affinity local openers and taste-matched pop-up spots.
            </p>
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Artist &amp; city confirmed with local entities</span>
            </div>
          </div>

          {/* Tool 4 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-emerald">Tool 4</span>
              <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>build_route</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Deterministic TSP / 2-Opt route optimizer. Enforces realistic indie band constraints: max 320 miles/day, off-days every 3 shows.
            </p>
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: ≥2 stops, valid chronological date window</span>
            </div>
          </div>

          {/* Tool 5 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-rose">Tool 5</span>
              <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>draft_pitch</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              Generates promoter-ready emails citing specific local Qloo affinity metrics, opener synergies, and ticket advance forecasts.
            </p>
            <div style={{ marginTop: '10px', fontSize: '11.5px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} />
              <span>Precondition: Venue capacity &gt; 0 and verified market index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Qloo Is Essential vs Generic LLM */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fca5a5', marginBottom: '8px' }}>
            Why Generic LLMs Fail at Tour Routing
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>✗</span>
              <span><strong>Population Bias:</strong> Defaulting to the 5 biggest metros (LA, NYC, Chicago, Houston, Phoenix) regardless of subgenre.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>✗</span>
              <span><strong>Cultural Blindness:</strong> Cannot distinguish between general population density and actual subcultural enthusiasm.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>✗</span>
              <span><strong>Routing Hallucinations:</strong> Suggesting impossible 14-hour overnight van drives between unconnected markets.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#6ee7b7', marginBottom: '8px' }}>
            The Qloo Taste Graph Unfair Advantage
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
              <span><strong>Affinity Indexing:</strong> Identifies markets that over-index 1.8x–2.3x (like Asheville or East Nashville) even with smaller populations.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
              <span><strong>Cross-Domain Grounding:</strong> Connects musical artist taste to local record stores, craft bars, and compatible local openers.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
              <span><strong>Deterministic Drivability:</strong> Combines cultural heatmaps with exact TSP mileage algorithms for van tour reality.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
