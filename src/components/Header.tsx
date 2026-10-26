'use client';

import React, { useEffect, useState } from 'react';
import { Compass, ShieldCheck, Cpu } from 'lucide-react';

export type ActiveTab = 'planner' | 'receipts' | 'architecture';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [qlooStatus, setQlooStatus] = useState<{
    connected: boolean;
    configured: boolean;
    message: string;
  }>({
    connected: true,
    configured: false,
    message: 'Taste Graph Grounded',
  });

  useEffect(() => {
    fetch('/api/qloo/verify')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setQlooStatus({
            connected: data.connected,
            configured: data.configured,
            message: data.configured
              ? 'Qloo Live API'
              : 'Qloo Taste Graph (Grounded)',
          });
        }
      })
      .catch(() => {
        // Fallback gracefully
      });
  }, []);

  return (
    <header
      style={{
        borderBottom: '1px solid #212836',
        backgroundColor: '#0d1117',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '12px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: '#1f2937',
              border: '1px solid #374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
            }}
          >
            <Compass size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', color: '#f8fafc' }}>
                ROADIE
              </span>
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: '3px',
                  backgroundColor: '#1e293b',
                  color: '#94a3b8',
                  border: '1px solid #334155',
                }}
              >
                TOUR ROUTING AGENT
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              Grounded in Qloo cultural affinity &amp; deterministic mileage constraints
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('planner')}
            id="tab-nav-planner"
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'planner' ? 600 : 400,
              background: activeTab === 'planner' ? '#161d2b' : 'transparent',
              border: activeTab === 'planner' ? '1px solid #2d3748' : '1px solid transparent',
              color: activeTab === 'planner' ? '#f1f5f9' : '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Compass size={14} />
            <span>Tour Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('receipts')}
            id="tab-nav-receipts"
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'receipts' ? 600 : 400,
              background: activeTab === 'receipts' ? '#161d2b' : 'transparent',
              border: activeTab === 'receipts' ? '1px solid #2d3748' : '1px solid transparent',
              color: activeTab === 'receipts' ? '#f1f5f9' : '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={14} />
            <span>The Receipts (Backtest)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            id="tab-nav-architecture"
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'architecture' ? 600 : 400,
              background: activeTab === 'architecture' ? '#161d2b' : 'transparent',
              border: activeTab === 'architecture' ? '1px solid #2d3748' : '1px solid transparent',
              color: activeTab === 'architecture' ? '#f1f5f9' : '#8b949e',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cpu size={14} />
            <span>Agent Architecture</span>
          </button>
        </nav>

        {/* Live Qloo Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#161b22',
              border: '1px solid #30363d',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11.5px',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: qlooStatus.configured ? '#3fb950' : '#a371f7',
              }}
            />
            <span style={{ color: '#c9d1d9' }}>{qlooStatus.message}</span>
          </div>

          <a
            href="https://github.com/aryamantepal/roadie"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#8b949e',
              fontSize: '12.5px',
              textDecoration: 'none',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
