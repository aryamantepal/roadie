'use client';

import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, ShieldCheck, Cpu, Radio } from 'lucide-react';

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
    message: 'Taste Graph Ready',
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
              ? 'Qloo Live API Connected'
              : 'Qloo Taste Graph Grounded (Active)',
          });
        }
      })
      .catch(() => {
        // Safe default
      });
  }, []);

  return (
    <header
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(11, 15, 23, 0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '16px 28px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
            }}
          >
            <Compass size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                ROADIE
              </h1>
              <span className="badge badge-purple" style={{ fontSize: '10.5px' }}>
                TOUR AGENT
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Cultural Intelligence &amp; Deterministic Tour Routing for Indie Musicians
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('planner')}
            id="tab-nav-planner"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: activeTab === 'planner' ? 700 : 500,
              background: activeTab === 'planner' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              border: activeTab === 'planner' ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
              color: activeTab === 'planner' ? '#c4b5fd' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Compass size={15} />
            <span>Tour Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('receipts')}
            id="tab-nav-receipts"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: activeTab === 'receipts' ? 700 : 500,
              background: activeTab === 'receipts' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: activeTab === 'receipts' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
              color: activeTab === 'receipts' ? '#6ee7b7' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={15} />
            <span>The Receipts (Backtest)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            id="tab-nav-architecture"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: activeTab === 'architecture' ? 700 : 500,
              background: activeTab === 'architecture' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              border: activeTab === 'architecture' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
              color: activeTab === 'architecture' ? '#67e8f9' : '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cpu size={15} />
            <span>Agent Architecture</span>
          </button>
        </nav>

        {/* Live Qloo Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: qlooStatus.configured ? '#10b981' : '#a855f7',
                boxShadow: `0 0 8px ${qlooStatus.configured ? '#10b981' : '#a855f7'}`,
              }}
            />
            <span style={{ color: '#cbd5e1' }}>{qlooStatus.message}</span>
          </div>

          <a
            href="https://github.com/aryamantepal/roadie"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              fontSize: '12px',
            }}
          >
            <svg
              width="16"
              height="16"
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
