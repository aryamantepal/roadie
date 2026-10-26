'use client';

import React from 'react';
import { AgentTraceStep } from '@/types';
import { Terminal, CheckCircle2, Clock, X } from 'lucide-react';

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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="agent-trace-modal-container"
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #21262d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0d1117',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', margin: 0 }}>
                Agent Tool Execution Trace
              </h3>
              <p style={{ fontSize: '11.5px', color: '#8b949e', margin: 0 }}>
                5 thin tools with internal precondition verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-trace-modal"
            style={{
              background: 'transparent',
              color: '#8b949e',
              padding: '4px',
              borderRadius: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Trace List */}
        <div
          style={{
            padding: '16px 20px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {trace.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#0d1117',
                border: '1px solid #21262d',
                borderRadius: '6px',
                padding: '12px 14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#58a6ff',
                      background: 'rgba(56, 139, 253, 0.1)',
                      border: '1px solid rgba(56, 139, 253, 0.25)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    tool:{step.tool}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#3fb950',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Preconditions Verified</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#6e7681',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  <Clock size={11} />
                  <span>{step.durationMs}ms</span>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: '#c9d1d9', lineHeight: 1.5, margin: 0 }}>
                {step.outputSummary}
              </p>

              <div
                style={{
                  marginTop: '8px',
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '11px',
                  color: '#8b949e',
                  background: '#161b22',
                  border: '1px solid #21262d',
                  padding: '6px 8px',
                  borderRadius: '4px',
                }}
              >
                input: {JSON.stringify(step.input)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
