'use client';

import React from 'react';
import { AgentTraceStep } from '@/types';
import { Terminal, CheckCircle2, Clock, X, Cpu } from 'lucide-react';

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
        backdropFilter: 'blur(8px)',
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
          backgroundColor: '#0c1017',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="agent-trace-modal-container"
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#101522',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={20} color="#8b5cf6" />
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Roadie Agent Execution Trace
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                5 thin tools with internal precondition enforcement
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-trace-modal"
            style={{
              background: 'transparent',
              color: '#94a3b8',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Trace List */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {trace.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '14px 16px',
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
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#a78bfa',
                      background: 'rgba(139, 92, 246, 0.15)',
                      padding: '2px 8px',
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
                      color: '#10b981',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>Preconditions Passed</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <Clock size={12} />
                  <span>{step.durationMs}ms</span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                {step.outputSummary}
              </p>

              <div
                style={{
                  marginTop: '8px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#94a3b8',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '6px 10px',
                  borderRadius: '6px',
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
