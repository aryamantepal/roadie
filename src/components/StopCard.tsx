'use client';

import React from 'react';
import { TourStop } from '@/types';
import {
  MapPin,
  Music,
  ShoppingBag,
  Car,
  Mail,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface StopCardProps {
  stop: TourStop;
  isSelected: boolean;
  onSelect: () => void;
  onOpenPitchModal: (stop: TourStop) => void;
}

export const StopCard: React.FC<StopCardProps> = ({
  stop,
  isSelected,
  onSelect,
  onOpenPitchModal,
}) => {
  if (stop.isOffDay) {
    return (
      <div
        onClick={onSelect}
        id={`stop-card-${stop.stopNumber}`}
        style={{
          background: isSelected ? '#1c1f26' : '#111620',
          border: isSelected ? '1px solid #d97706' : '1px solid #212836',
          borderRadius: '6px',
          padding: '12px 16px',
          marginBottom: '10px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: 'rgba(217, 119, 6, 0.15)',
                color: '#fbbf24',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
              }}
            >
              DAY {stop.stopNumber}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f6fc' }}>
              Travel &amp; Van Rest Day
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#8b949e', fontFamily: 'ui-monospace, monospace' }}>
            {stop.date} ({stop.dayOfWeek})
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '6px',
            fontSize: '12px',
            color: '#8b949e',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Car size={13} color="#d97706" />
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>
              {stop.driveDistanceMiles} mi transit (~{stop.driveHours}h drive)
            </span>
          </div>
          <span style={{ color: '#30363d' }}>•</span>
          <span>{stop.notes || 'Mandatory rest cadence (burnout prevention)'}</span>
        </div>
      </div>
    );
  }

  const market = stop.affinityMarket;
  const venue = stop.venue;
  const taste = stop.localTaste;

  return (
    <div
      onClick={onSelect}
      id={`stop-card-${stop.stopNumber}`}
      style={{
        background: isSelected ? '#161d2b' : '#111620',
        border: isSelected ? '1px solid #38bdf8' : '1px solid #212836',
        borderRadius: '6px',
        padding: '16px 18px',
        marginBottom: '12px',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none',
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: '#1f2937',
                color: '#38bdf8',
                border: '1px solid #374151',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
              }}
            >
              STOP {stop.stopNumber}
            </span>
            <span style={{ fontSize: '12px', color: '#8b949e', fontFamily: 'ui-monospace, monospace' }}>
              {stop.date} ({stop.dayOfWeek})
            </span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
            {stop.city}, {stop.state}
          </h3>
        </div>

        {/* Qloo Affinity Tag */}
        {market && (
          <div
            style={{
              textAlign: 'right',
              background: '#0d1117',
              border: '1px solid #212836',
              borderRadius: '6px',
              padding: '4px 10px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#34d399', fontFamily: 'ui-monospace, monospace' }}>
              {market.affinityScore}/100
            </div>
            <div style={{ fontSize: '10.5px', color: '#8b949e' }}>
              +{Math.round((market.indexRatio - 1) * 100)}% Qloo Index
            </div>
          </div>
        )}
      </div>

      {/* Venue Information */}
      {venue && (
        <div
          style={{
            background: '#0d1117',
            borderRadius: '6px',
            padding: '10px 12px',
            marginBottom: '12px',
            border: '1px solid #212836',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#38bdf8" />
              <span style={{ fontWeight: 600, color: '#f0f6fc', fontSize: '13.5px' }}>
                {venue.name}
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
                color: '#cbd5e1',
                background: '#161b22',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid #30363d',
              }}
            >
              {venue.capacity} cap
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px', margin: 0, lineHeight: 1.4 }}>
            {venue.vibe}
          </p>
        </div>
      )}

      {/* Cultural Grounding: Opener & Pop-Up Spot */}
      {taste && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '10px',
            marginBottom: '12px',
          }}
        >
          {/* Opener recommendation */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #212836',
              borderRadius: '6px',
              padding: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <Music size={12} color="#38bdf8" />
              <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#7dd3fc', textTransform: 'uppercase', fontFamily: 'ui-monospace, monospace' }}>
                Matched Opener ({taste.opener.affinityMatch}% fit)
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#f0f6fc' }}>
              {taste.opener.name} <span style={{ color: '#8b949e', fontWeight: 400 }}>({taste.opener.genre})</span>
            </div>
            <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
              {taste.opener.rationale}
            </div>
          </div>

          {/* Taste-matched Pop-up Spot */}
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #212836',
              borderRadius: '6px',
              padding: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <ShoppingBag size={12} color="#fbbf24" />
              <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#fde68a', textTransform: 'uppercase', fontFamily: 'ui-monospace, monospace' }}>
                Culture Anchor
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#f0f6fc' }}>
              {taste.popUpSpot.name}
            </div>
            <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
              {taste.popUpSpot.culturalMatch}
            </div>
          </div>
        </div>
      )}

      {/* Market Event Conflict Check */}
      {stop.marketConflict && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 10px',
            borderRadius: '5px',
            marginBottom: '12px',
            fontSize: '11px',
            backgroundColor: stop.marketConflict.hasConflict ? '#2b1b17' : '#0e1d17',
            border: stop.marketConflict.hasConflict ? '1px solid #78350f' : '1px solid #14532d',
            color: stop.marketConflict.hasConflict ? '#fde68a' : '#86efac',
          }}
        >
          {stop.marketConflict.hasConflict ? (
            <AlertTriangle size={13} color="#f59e0b" style={{ flexShrink: 0 }} />
          ) : (
            <CheckCircle2 size={13} color="#22c55e" style={{ flexShrink: 0 }} />
          )}
          <span style={{ lineHeight: 1.3 }}>
            {stop.marketConflict.conflictSummary ||
              (stop.marketConflict.hasConflict
                ? 'Potential festival counter-programming detected.'
                : 'Market clear: No major festival conflicts.')}
          </span>
        </div>
      )}

      {/* Footer Row: Driving & Pitch Email Action */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #212836',
          paddingTop: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#8b949e' }}>
          <Car size={13} color="#64748b" />
          <span style={{ fontFamily: 'ui-monospace, monospace' }}>
            {stop.driveDistanceMiles === 0
              ? 'Tour Origin'
              : `${stop.driveDistanceMiles} mi • ~${stop.driveHours}h drive`}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPitchModal(stop);
          }}
          className="btn-secondary"
          id={`btn-open-pitch-${stop.stopNumber}`}
          style={{
            fontSize: '12px',
            padding: '4px 10px',
          }}
        >
          <Mail size={12} />
          <span>Promoter Pitch</span>
        </button>
      </div>
    </div>
  );
};
