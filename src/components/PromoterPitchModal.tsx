'use client';

import React, { useState } from 'react';
import { TourStop } from '@/types';
import { Mail, Copy, Check, X, Sparkles, Building2, TrendingUp } from 'lucide-react';

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
      setTimeout(() => setCopied(false), 2500);
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
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f141f',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.2)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="promoter-pitch-modal-container"
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1), transparent)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c4b5fd',
              }}
            >
              <Mail size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Promoter Pitch Email
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                {stop.city}, {stop.state} • {venue?.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-pitch-modal"
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

        {/* Intelligence highlights bar */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4b5fd' }}>
            <Building2 size={14} />
            <span>Target: {venue?.capacity} Cap Room</span>
          </div>
          {market && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}>
              <TrendingUp size={14} />
              <span>Qloo Affinity: {market.affinityScore}/100 (+{Math.round((market.indexRatio - 1) * 100)}%)</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#67e8f9' }}>
            <Sparkles size={14} />
            <span>Co-bill & Pop-up Aligned</span>
          </div>
        </div>

        {/* Email body container */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <pre
            style={{
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              fontSize: '13.5px',
              lineHeight: '1.65',
              color: '#e2e8f0',
              background: '#090d14',
              padding: '18px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {stop.pitchEmail}
          </pre>
        </div>

        {/* Footer with copy button */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0c1018',
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Backed by Qloo Taste Graph cultural metrics
          </span>

          <button
            onClick={handleCopy}
            className="btn-primary"
            id="btn-copy-pitch-email"
            style={{
              fontSize: '13px',
              padding: '8px 18px',
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Pitch Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
