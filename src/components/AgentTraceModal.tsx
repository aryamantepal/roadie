'use client';

import React from 'react';
import { AgentTraceStep } from '@/types';
import { CheckCircle2, Clock, X } from 'lucide-react';

interface AgentTraceModalProps {
  trace: AgentTraceStep[];
  isOpen: boolean;
  onClose: () => void;
}

export const AgentTraceModal: React.FC<AgentTraceModalProps> = ({
  trace,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'oklch(24% 0.030 260 / 0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--r-card)',
          boxShadow: '0 24px 60px -24px oklch(24% 0.030 260 / 0.35)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="agent-trace-modal-container"
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            backgroundColor: 'var(--paper)',
          }}
        >
          <div>
            <span className="ov" style={{ marginBottom: '2px' }}>Solver Audit Trail</span>
            <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              Tour Logistics &amp; Pipeline Audit Log
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-3)', margin: 0, marginTop: '2px' }}>
              5 verified solver stages with physical touring circuit breakers
            </p>
          </div>

          <button
            onClick={onClose}
            id="btn-close-trace-modal"
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              color: 'var(--ink-2)',
              padding: '6px',
              borderRadius: 'var(--r-control)',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Audit Step List */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'var(--paper)',
          }}
        >
          {trace.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--paper-2)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-control)',
                padding: '14px 18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="chip live">
                    Stage {idx + 1}: {step.tool}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--emerald)',
                      fontSize: '11.5px',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Constraints Verified</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    color: 'var(--ink-3)',
                  }}
                  className="num"
                >
                  <Clock size={11} />
                  <span>{step.durationMs}ms</span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5, margin: 0 }}>
                {step.outputSummary}
              </p>

              <div
                style={{
                  marginTop: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  color: 'var(--ink-3)',
                  background: 'var(--paper)',
                  border: '1px solid var(--rule)',
                  padding: '6px 10px',
                  borderRadius: 'var(--r-control)',
                  overflowX: 'auto',
                }}
              >
                parameters: {JSON.stringify(step.input)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
