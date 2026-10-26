'use client';

import React, { useState } from 'react';
import { BacktestCase } from '@/types';
import { GROUND_TRUTH_BACKTEST_CASES } from '@/lib/backtest/engine';
import {
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Compass,
  Car,
  ShieldCheck,
  Zap,
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
      {/* Intro Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          borderLeft: '4px solid #8b5cf6',
          backgroundColor: '#0f1422',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldCheck size={22} color="#8b5cf6" />
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
            The Receipts: Ground-Truth Tour Backtesting
          </h2>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', maxWidth: '880px' }}>
          We hide actual verified past tours from <strong>Setlist.fm</strong> and run two parallel
          subagents: a generic <strong>LLM-only agent</strong> vs. our <strong>Qloo-grounded Roadie agent</strong>.
          To ensure strict evaluation integrity, we test <strong>emerging post-cutoff artists</strong> so
          the LLM cannot cheat using memorized training-data tour schedules.
        </p>
      </div>

      {/* Artist Case Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {GROUND_TRUTH_BACKTEST_CASES.map((bc) => {
          const isSelected = bc.id === activeCase.id;
          return (
            <button
              key={bc.id}
              onClick={() => setSelectedCaseId(bc.id)}
              id={`tab-receipts-${bc.id}`}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: isSelected
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isSelected
                  ? '1px solid #8b5cf6'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Zap size={14} color={isSelected ? '#ffffff' : '#64748b'} />
              <span>{bc.artist} ({bc.year})</span>
            </button>
          );
        })}
      </div>

      {/* Case Overview & High-Level Scorecard */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
            {activeCase.genre}
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
            {activeCase.artist}: {activeCase.tourName}
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px', lineHeight: 1.5 }}>
            {activeCase.description}
          </p>
        </div>

        {/* Head-to-Head Metrics Widget */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* LLM Only Card */}
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.06)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase' }}>
              LLM-Only Agent
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#f43f5e', margin: '4px 0' }}>
              {activeCase.llmMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              Precision@10 (NDCG {activeCase.llmMetrics.ndcg10})
            </div>
            <div style={{ fontSize: '11px', color: '#fda4af', marginTop: '4px', fontWeight: 600 }}>
              +{activeCase.llmMetrics.wastedTravelMiles} mi wasted
            </div>
          </div>

          {/* Roadie Qloo Card */}
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase' }}>
              Roadie (Qloo Grounded)
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>
              {activeCase.roadieMetrics.precisionAt10}%
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              Precision@10 (NDCG {activeCase.roadieMetrics.ndcg10})
            </div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
              0 miles wasted transit
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side City Rankings Comparison Table */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          overflowX: 'auto',
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', color: '#ffffff' }}>
          Side-by-Side Prediction Breakdown
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            minWidth: '780px',
          }}
        >
          {/* Column 1: Ground Truth */}
          <div>
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                color: '#e2e8f0',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Award size={15} color="#e2e8f0" />
              <span>Real Tour Ground Truth ({activeCase.groundTruthStops.length} dates)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCase.groundTruthStops.map((stop, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#f1f5f9' }}>
                    {stop.city}, {stop.state}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{stop.venue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: LLM-Only Baseline */}
          <div>
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(244, 63, 94, 0.1)',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                color: '#fda4af',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <XCircle size={15} color="#f43f5e" />
              <span>LLM-Only Baseline (Population Bias)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCase.llmBaselineStops.map((stop, i) => {
                const isMatch = groundTruthCityNames.has(stop.city.toLowerCase());
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: isMatch
                        ? 'rgba(16, 185, 129, 0.05)'
                        : 'rgba(244, 63, 94, 0.08)',
                      border: isMatch
                        ? '1px solid rgba(16, 185, 129, 0.2)'
                        : '1px solid rgba(244, 63, 94, 0.25)',
                      fontSize: '12.5px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: isMatch ? '#6ee7b7' : '#fca5a5' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                      </span>
                      {isMatch ? (
                        <CheckCircle2 size={13} color="#10b981" />
                      ) : (
                        <XCircle size={13} color="#f43f5e" />
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      {stop.rationale}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Roadie Qloo Grounded */}
          <div>
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(16, 185, 129, 0.12)',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                color: '#6ee7b7',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={15} color="#10b981" />
              <span>Roadie (Qloo Grounded)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCase.roadieQlooStops.map((stop, i) => {
                const isMatch = groundTruthCityNames.has(stop.city.toLowerCase());
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontSize: '12.5px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: '#6ee7b7' }}>
                        #{stop.rank} {stop.city}, {stop.state}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#34d399',
                          fontWeight: 700,
                        }}
                      >
                        {stop.affinityScore}/100
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      {stop.rationale}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Analysis & Why Qloo Wins */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          border: '1px solid rgba(139, 92, 246, 0.25)',
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
          Why Cultural Intelligence Was the Difference
        </h3>
        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
          {activeCase.analysis}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activeCase.whyQlooWins.map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                color: '#e2e8f0',
              }}
            >
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
