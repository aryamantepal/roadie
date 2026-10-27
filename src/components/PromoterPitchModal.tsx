'use client';

import React, { useState } from 'react';
import { TourStop } from '@/types';
import { Copy, Check, X, Building2, TrendingUp, Sparkles } from 'lucide-react';

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
  const taste = stop.localTaste;

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
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--paper)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--r-card)',
          boxShadow: '0 24px 60px -24px oklch(24% 0.030 260 / 0.35)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="promoter-pitch-modal-container"
      >
        {/* Modal Header */}
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
            <span className="ov" style={{ marginBottom: '2px' }}>Talent Buyer Brief</span>
            <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>
              Promoter Pitch Email
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-3)', margin: 0, marginTop: '2px' }}>
              {artistName} • {stop.city}, {stop.state} • {venue?.name || 'Local Venue'}
            </p>
          </div>

          <button
            onClick={onClose}
            id="btn-close-pitch-modal"
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

        {/* Intelligence Briefing Strip */}
        <div
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--paper-2)',
            borderBottom: '1px solid var(--rule)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink-2)' }}>
            <Building2 size={13} color="var(--ink-3)" />
            <span className="num">Target: {venue?.capacity} Cap Room</span>
          </div>
          {market && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald)' }}>
              <TrendingUp size={13} />
              <span className="num">Qloo Affinity: {market.affinityScore}/100 (+{Math.round((market.indexRatio - 1) * 100)}% density)</span>
            </div>
          )}
          {taste && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--signal)' }}>
              <Sparkles size={12} />
              <span>Opener: {taste.opener.name}</span>
            </div>
          )}
        </div>

        {/* Email Document Body */}
        <div
          style={{
            padding: '22px 24px',
            overflowY: 'auto',
            flex: 1,
            backgroundColor: 'var(--paper)',
          }}
        >
          <pre
            style={{
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
              fontSize: '12.5px',
              lineHeight: 1.65,
              color: 'var(--ink)',
              background: 'var(--paper-2)',
              padding: '18px 20px',
              borderRadius: 'var(--r-control)',
              border: '1px solid var(--rule)',
              margin: 0,
            }}
          >
            {stop.pitchEmail}
          </pre>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--paper-2)',
          }}
        >
          <span style={{ fontSize: '11.5px', color: 'var(--ink-3)' }}>
            Grounded in local Qloo subgenre taste graph analytics &amp; opener synergies
          </span>

          <button
            onClick={handleCopy}
            className="btn-primary"
            id="btn-copy-pitch-email"
            style={{
              fontSize: '13px',
              padding: '8px 16px',
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
