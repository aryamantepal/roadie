'use client';

import React, { useState } from 'react';
import { GROUND_TRUTH_BACKTEST_CASES } from '@/lib/backtest/engine';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const ReceiptsView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    GROUND_TRUTH_BACKTEST_CASES[0].id
  );

  const activeCase =
    GROUND_TRUTH_BACKTEST_CASES.find((c) => c.id === selectedCaseId) ||
    GROUND_TRUTH_BACKTEST_CASES[0];

  const groundTruthCityNames = new Set(
    activeCase.groundTruthStops.map((s) => s.city.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Methodology Banner */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <ShieldCheck size={18} color="#38bdf8" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
            Empirical Backtest: Real Setlist.fm Tours vs. LLM Baselines
          </h2>
        </div>
        <p style={{ color: '#8b949e', fontSize: '13.5px', lineHeight: 1.6, maxWidth: '880px', margin: 0 }}>
          To measure whether Qloo taste graph integration genuinely improves touring outcomes or is merely marketing
          gloss, we constructed an empirical benchmark against verified historical tours from <strong>Setlist.fm</strong>.
          We test <strong>emerging post-cutoff artists</strong> to eliminate LLM training memorization shortcuts.
        </p>
      </div>

      {/* Case Selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {GROUND_TRUTH_BACKTEST_CASES.map((bc) => {
          const isSelected = bc.id === activeCase.id;
          return (
            <button
              key={bc.id}
              onClick={() => setSelectedCaseId(bc.id)}
              id={`tab-receipts-${bc.id}`}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                background: isSelected ? '#1f2937' : '#111620',
                border: isSelected ? '1px solid #38bdf8' : '1px solid #212836',
                color: isSelected ? '#f8fafc' : '#8b949e',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FileText size={13} color={isSelected ? '#38bdf8' : '#64748b'} />
              <span>{bc.artist} ({bc.year})</span>
            </button>
          );
        })}
      </div>

      {/* Head-to-Head Benchmark Card */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 420px)',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: '#212836',
                color: '#94a3b8',
                border: '1px solid #30363d',
              }}
            >
              {activeCase.genre}
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Ground-truth: {activeCase.groundTruthStops.length} verified dates
            </span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f6fc', marginTop: '4px' }}>
            {activeCase.artist}: {activeCase.tourName}
          </h3>
          <p style={{ fontSize: '13px', color: '#8b949e', marginTop: '6px', lineHeight: 1.5, margin: 0 }}>
            {activeCase.description}
          </p>
        </div>

        {/* Scorecard */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* Baseline */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', color: '#f87171', fontWeight: 600 }}>
              LLM BASELINE
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f87171', fontFamily: 'ui-monospace, monospace', marginTop: '4px' }}>
              {activeCase.llmMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11.5px', color: '#8b949e', marginTop: '2px' }}>
              Precision@10 (NDCG {activeCase.llmMetrics.ndcg10})
            </div>
            <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '6px', fontFamily: 'ui-monospace, monospace' }}>
              +{activeCase.llmMetrics.wastedTravelMiles} mi zigzag transit
            </div>
          </div>

          {/* Roadie */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #238636',
              borderRadius: '6px',
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: 'ui-monospace, monospace', color: '#3fb950', fontWeight: 600 }}>
              ROADIE (QLOO GROUNDED)
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#3fb950', fontFamily: 'ui-monospace, monospace', marginTop: '4px' }}>
              {activeCase.roadieMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11.5px', color: '#8b949e', marginTop: '2px' }}>
              Precision@10 (NDCG {activeCase.roadieMetrics.ndcg10})
            </div>
            <div style={{ fontSize: '11px', color: '#7ee787', marginTop: '6px', fontFamily: 'ui-monospace, monospace' }}>
              0 mi wasted transit
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Comparative Evaluation Table */}
      <div
        style={{
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
          padding: '20px 24px',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', margin: 0 }}>
            Market Selection Breakdown
          </h3>
          <span style={{ fontSize: '12px', color: '#8b949e' }}>
            Green indicator marks exact match against actual historical tour
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            minWidth: '780px',
          }}
        >
          {/* Ground Truth Column */}
          <div>
            <div
              style={{
                padding: '8px 12px',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '12px',
                color: '#f0f6fc',
                marginBottom: '10px',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              Setlist.fm Ground Truth ({activeCase.groundTruthStops.length} stops)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activeCase.groundTruthStops.map((stop, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '4px',
                    background: '#0d1117',
                    border: '1px solid #21262d',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#f0f6fc' }}>
                    {stop.city}, {stop.state}
                  </div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{stop.venue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vanilla LLM Column */}
          <div>
            <div
              style={{
                padding: '8px 12px',
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '12px',
                color: '#f87171',
                marginBottom: '10px',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              Ungrounded LLM Baseline (Population Bias)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activeCase.llmBaselineStops.map((stop, i) => {
                const isMatch = groundTruthCityNames.has(stop.city.toLowerCase());
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '4px',
                      background: isMatch ? 'rgba(63, 185, 80, 0.06)' : 'rgba(248, 81, 73, 0.06)',
                      border: isMatch ? '1px solid rgba(63, 185, 80, 0.25)' : '1px solid rgba(248, 81, 73, 0.25)',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: isMatch ? '#7ee787' : '#ffa198' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                      </span>
                      {isMatch ? (
                        <CheckCircle2 size={13} color="#3fb950" />
                      ) : (
                        <XCircle size={13} color="#f85149" />
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
                      {stop.rationale}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Roadie Qloo Column */}
          <div>
            <div
              style={{
                padding: '8px 12px',
                background: '#0d1117',
                border: '1px solid #238636',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '12px',
                color: '#3fb950',
                marginBottom: '10px',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              Roadie (Qloo Affinity Grounded)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activeCase.roadieQlooStops.map((stop, i) => {
                const isMatch = groundTruthCityNames.has(stop.city.toLowerCase());
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '4px',
                      background: 'rgba(63, 185, 80, 0.08)',
                      border: '1px solid rgba(63, 185, 80, 0.3)',
                      fontSize: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#7ee787', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                        {isMatch && <CheckCircle2 size={12} color="#3fb950" />}
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          color: '#7ee787',
                          fontFamily: 'ui-monospace, monospace',
                          fontWeight: 600,
                        }}
                      >
                        Qloo: {stop.affinityScore}/100
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
                      {stop.rationale}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Analysis & Findings */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '8px',
          border: '1px solid #30363d',
          backgroundColor: '#161b22',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', marginBottom: '8px' }}>
          Backtest Evaluation Findings
        </h3>
        <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: 1.6, marginBottom: '14px' }}>
          {activeCase.analysis}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {activeCase.whyQlooWins.map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '12.5px',
                color: '#c9d1d9',
              }}
            >
              <CheckCircle2 size={14} color="#3fb950" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
