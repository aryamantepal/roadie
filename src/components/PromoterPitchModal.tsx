'use client';

import React, { useState } from 'react';
import { TourStop } from '@/types';
import { Mail, Copy, Check, X, Building2, TrendingUp } from 'lucide-react';

interface PromoterPitchModalProps {
  stop: TourStop | null;
  artistName: string;
  onClose: () => void;
}

export const PromoterPitchModal: React.FC<PromoterPitchModalProps> = ({
  stop,
  artistName,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!stop) return null;

  const handleCopy = () => {
    if (stop.pitchEmail) {
      navigator.clipboard.writeText(stop.pitchEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const market = stop.affinityMarket;
  const venue = stop.venue;

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
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="promoter-pitch-modal-container"
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #21262d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0d1117',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', margin: 0 }}>
                Promoter Pitch Email
              </h3>
              <p style={{ fontSize: '12px', color: '#8b949e', margin: 0 }}>
                {artistName} • {stop.city}, {stop.state} • {venue?.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-pitch-modal"
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

        {/* Intelligence highlights bar */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#161d2b',
            borderBottom: '1px solid #212836',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c9d1d9' }}>
            <Building2 size={13} color="#8b949e" />
            <span>Target: {venue?.capacity} Cap Room</span>
          </div>
          {market && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontFamily: 'ui-monospace, monospace' }}>
              <TrendingUp size={13} />
              <span>Qloo Affinity: {market.affinityScore}/100 (+{Math.round((market.indexRatio - 1) * 100)}%)</span>
            </div>
          )}
        </div>

        {/* Email body container */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <pre
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              whiteSpace: 'pre-wrap',
              fontSize: '12.5px',
              lineHeight: 1.6,
              color: '#f0f6fc',
              background: '#0d1117',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #212836',
              margin: 0,
            }}
          >
            {stop.pitchEmail}
          </pre>
        </div>

        {/* Footer with copy button */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #21262d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0d1117',
          }}
        >
          <span style={{ fontSize: '11.5px', color: '#6e7681' }}>
            Cites local Qloo affinity metrics, opener synergies, and ticket estimates
          </span>

          <button
            onClick={handleCopy}
            className="btn-primary"
            id="btn-copy-pitch-email"
            style={{
              fontSize: '12.5px',
              padding: '6px 14px',
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Pitch Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
