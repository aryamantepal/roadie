'use client';

import React, { useEffect, useState } from 'react';
import { Compass, ShieldCheck, Layers, ExternalLink } from 'lucide-react';

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
    message: 'Qloo Taste Graph: Active',
  });

  const [tavilyStatus, setTavilyStatus] = useState<{
    configured: boolean;
    message: string;
  }>({
    configured: false,
    message: 'Tavily Web Index',
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
              ? 'Qloo Live API: Active'
              : 'Qloo Taste Graph: Active',
          });
        }
      })
      .catch(() => {});

    fetch('/api/tavily/verify')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTavilyStatus({
            configured: data.configured,
            message: data.configured ? 'Tavily Intelligence: Connected' : 'Tavily Index: Local',
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header
      style={{
        borderBottom: '1px solid var(--rule)',
        backgroundColor: 'color-mix(in oklab, var(--paper) 92%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '14px 28px',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Brand: Fraunces serif wordmark & sparse editorial descriptor */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
          <h1
            style={{
              fontFamily: 'var(--display)',
              fontSize: '22px',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              margin: 0,
              lineHeight: 1,
            }}
          >
            ROADIE
          </h1>
          <span
            style={{
              fontSize: '13px',
              color: 'var(--ink-3)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            Tour intelligence &amp; routing instrument
          </span>
        </div>

        {/* Quiet segmented tabs: paper controls with subtle lift */}
        <nav
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: 'var(--paper-2)',
            padding: '3px',
            borderRadius: 'var(--r-control)',
            border: '1px solid var(--rule)',
          }}
        >
          <button
            onClick={() => setActiveTab('planner')}
            id="tab-nav-planner"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--r-control)',
              fontSize: '13px',
              fontWeight: activeTab === 'planner' ? 600 : 500,
              backgroundColor: activeTab === 'planner' ? 'var(--paper)' : 'transparent',
              color: activeTab === 'planner' ? 'var(--signal)' : 'var(--ink-2)',
              boxShadow: activeTab === 'planner' ? '0 1px 3px oklch(24% 0.030 260 / 0.08)' : 'none',
              border: activeTab === 'planner' ? '1px solid var(--rule)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 180ms var(--ease-out)',
            }}
          >
            <Compass size={13} />
            <span>Tour Routing</span>
          </button>

          <button
            onClick={() => setActiveTab('receipts')}
            id="tab-nav-receipts"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--r-control)',
              fontSize: '13px',
              fontWeight: activeTab === 'receipts' ? 600 : 500,
              backgroundColor: activeTab === 'receipts' ? 'var(--paper)' : 'transparent',
              color: activeTab === 'receipts' ? 'var(--signal)' : 'var(--ink-2)',
              boxShadow: activeTab === 'receipts' ? '0 1px 3px oklch(24% 0.030 260 / 0.08)' : 'none',
              border: activeTab === 'receipts' ? '1px solid var(--rule)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 180ms var(--ease-out)',
            }}
          >
            <ShieldCheck size={13} />
            <span>Data Verification</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            id="tab-nav-architecture"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--r-control)',
              fontSize: '13px',
              fontWeight: activeTab === 'architecture' ? 600 : 500,
              backgroundColor: activeTab === 'architecture' ? 'var(--paper)' : 'transparent',
              color: activeTab === 'architecture' ? 'var(--signal)' : 'var(--ink-2)',
              boxShadow: activeTab === 'architecture' ? '0 1px 3px oklch(24% 0.030 260 / 0.08)' : 'none',
              border: activeTab === 'architecture' ? '1px solid var(--rule)' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 180ms var(--ease-out)',
            }}
          >
            <Layers size={13} />
            <span>System Design</span>
          </button>
        </nav>

        {/* Quiet service status badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              padding: '4px 10px',
              borderRadius: 'var(--r-control)',
              fontSize: '11.5px',
              color: 'var(--ink-2)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--emerald)',
              }}
            />
            <span>{qlooStatus.message}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              padding: '4px 10px',
              borderRadius: 'var(--r-control)',
              fontSize: '11.5px',
              color: 'var(--ink-2)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: tavilyStatus.configured ? 'var(--signal)' : 'var(--ink-4)',
              }}
            />
            <span>{tavilyStatus.message}</span>
          </div>

          <a
            href="https://github.com/aryamantepal/roadie"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--ink-3)',
              fontSize: '12px',
              padding: '5px 8px',
              borderRadius: 'var(--r-control)',
              transition: 'color 180ms var(--ease-out)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-3)')}
          >
            <span>GitHub</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </header>
  );
};
