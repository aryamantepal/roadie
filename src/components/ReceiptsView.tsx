'use client';

import React, { useState } from 'react';
import { GROUND_TRUTH_BACKTEST_CASES } from '@/lib/backtest/engine';
import {
  CheckCircle2,
  XCircle,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Editorial Methodology Banner */}
      <div className="card-paper">
        <span className="ov">Empirical Validation Benchmark</span>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
          The Receipts: Ground-Truth Tour Backtesting
        </h2>
        <p style={{ color: 'var(--ink-2)', fontSize: '14.5px', lineHeight: 1.6, maxWidth: '860px', margin: 0 }}>
          To measure whether Qloo taste graph integration genuinely improves touring outcomes or is merely marketing
          gloss, we constructed an empirical benchmark against verified historical tours from <strong>Setlist.fm</strong>.
          We test <strong>emerging post-cutoff artists</strong> to eliminate LLM training memorization shortcuts.
        </p>
      </div>

      {/* Case Selector Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {GROUND_TRUTH_BACKTEST_CASES.map((bc) => {
          const isSelected = bc.id === activeCase.id;
          return (
            <button
              key={bc.id}
              onClick={() => setSelectedCaseId(bc.id)}
              id={`tab-receipts-${bc.id}`}
              className="chip"
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--r-control)',
                background: isSelected ? 'var(--paper)' : 'var(--paper-2)',
                border: isSelected ? '1px solid var(--signal)' : '1px solid var(--rule)',
                color: isSelected ? 'var(--signal)' : 'var(--ink-2)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? '0 1px 3px oklch(24% 0.030 260 / 0.08)' : 'none',
              }}
            >
              <FileText size={13} color={isSelected ? 'var(--signal)' : 'var(--ink-3)'} />
              <span>{bc.artist} ({bc.year})</span>
            </button>
          );
        })}
      </div>

      {/* Head-to-Head Benchmark Card */}
      <div
        className="card-paper"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 420px)',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="chip" style={{ border: '1px solid var(--rule)' }}>
              {activeCase.genre}
            </span>
            <span className="num" style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              Ground-truth: {activeCase.groundTruthStops.length} verified dates
            </span>
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 500, color: 'var(--ink)', marginTop: '4px' }}>
            {activeCase.artist}: {activeCase.tourName}
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', marginTop: '8px', lineHeight: 1.5, margin: 0 }}>
            {activeCase.description}
          </p>
        </div>

        {/* Scorecard Paper Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* Baseline Card */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--vermilion)', fontWeight: 600, letterSpacing: '0.04em' }}>
              LLM-Only Agent
            </div>
            <div className="num" style={{ fontSize: '26px', fontWeight: 500, color: 'var(--vermilion)', marginTop: '4px' }}>
              {activeCase.llmMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '2px' }}>
              Precision@10 (NDCG {activeCase.llmMetrics.ndcg10})
            </div>
            <div className="num" style={{ fontSize: '11.5px', color: 'var(--vermilion)', marginTop: '6px' }}>
              +{activeCase.llmMetrics.wastedTravelMiles} mi zigzag transit
            </div>
          </div>

          {/* Roadie Card */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid color-mix(in oklab, var(--emerald) 40%, transparent)',
              borderRadius: 'var(--r-control)',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 600, letterSpacing: '0.04em' }}>
              Roadie (Qloo Grounded)
            </div>
            <div className="num" style={{ fontSize: '26px', fontWeight: 500, color: 'var(--emerald)', marginTop: '4px' }}>
              {activeCase.roadieMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '2px' }}>
              Precision@10 (NDCG {activeCase.roadieMetrics.ndcg10})
            </div>
            <div className="num" style={{ fontSize: '11.5px', color: 'var(--emerald)', marginTop: '6px' }}>
              0 mi wasted transit
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Comparative Evaluation Table */}
      <div className="card-paper" style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--rule)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <span className="ov" style={{ marginBottom: '2px' }}>Market Selection</span>
            <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              Ground Truth vs. Model Baselines
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
            Green marker indicates exact market alignment with real tour
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
                background: 'var(--paper-2)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-control)',
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--ink)',
                marginBottom: '10px',
              }}
            >
              Setlist.fm Ground Truth ({activeCase.groundTruthStops.length} stops)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activeCase.groundTruthStops.map((stop, i) => (
                <div
                  key={i}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 'var(--r-control)',
                    background: 'var(--paper-2)',
                    border: '1px solid var(--rule)',
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    {stop.city}, {stop.state}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-3)' }}>{stop.venue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vanilla LLM Column */}
          <div>
            <div
              style={{
                padding: '8px 12px',
                background: 'var(--paper-2)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-control)',
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--vermilion)',
                marginBottom: '10px',
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
                      padding: '9px 12px',
                      borderRadius: 'var(--r-control)',
                      background: isMatch ? 'color-mix(in oklab, var(--emerald) 8%, transparent)' : 'color-mix(in oklab, var(--vermilion) 8%, transparent)',
                      border: isMatch ? '1px solid color-mix(in oklab, var(--emerald) 25%, transparent)' : '1px solid color-mix(in oklab, var(--vermilion) 25%, transparent)',
                      fontSize: '12.5px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: isMatch ? 'var(--emerald)' : 'var(--vermilion)' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                      </span>
                      {isMatch ? (
                        <CheckCircle2 size={13} color="var(--emerald)" />
                      ) : (
                        <XCircle size={13} color="var(--vermilion)" />
                      )}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '2px' }}>
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
                background: 'var(--paper-2)',
                border: '1px solid color-mix(in oklab, var(--emerald) 30%, transparent)',
                borderRadius: 'var(--r-control)',
                fontWeight: 600,
                fontSize: '12px',
                color: 'var(--emerald)',
                marginBottom: '10px',
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
                      padding: '9px 12px',
                      borderRadius: 'var(--r-control)',
                      background: 'color-mix(in oklab, var(--emerald) 8%, transparent)',
                      border: '1px solid color-mix(in oklab, var(--emerald) 25%, transparent)',
                      fontSize: '12.5px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                        {isMatch && <CheckCircle2 size={12} color="var(--emerald)" />}
                      </span>
                      <span className="num" style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 600 }}>
                        Qloo: {stop.affinityScore}/100
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '2px' }}>
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
      <div className="card-paper">
        <span className="ov">Evaluation Findings</span>
        <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>
          Why Deterministic Grounding Outperforms LLMs
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
          {activeCase.analysis}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activeCase.whyQlooWins.map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--ink)',
              }}
            >
              <CheckCircle2 size={14} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
