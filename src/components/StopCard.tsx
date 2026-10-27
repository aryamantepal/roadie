'use client';

import React from 'react';
import { TourStop } from '@/types';
import {
  MapPin,
  Music2,
  Store,
  Truck,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Clock,
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
  // Off Day / Van Rest Day Card (Authentic Day-Sheet for Transit)
  if (stop.isOffDay) {
    return (
      <div
        onClick={onSelect}
        id={`stop-card-${stop.stopNumber}`}
        className={`tour-day-sheet rest-day ${isSelected ? 'selected' : ''}`}
        style={{
          borderLeft: isSelected ? '3px solid var(--vermilion)' : '3px solid color-mix(in oklab, var(--vermilion) 35%, transparent)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="chip vermilion num">
              DAY {String(stop.stopNumber).padStart(2, '0')} • REST
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
              Van Transit &amp; Band Recovery Day
            </span>
          </div>
          <span className="num" style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
            {stop.date} ({stop.dayOfWeek})
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
            fontSize: '12.5px',
            color: 'var(--ink-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Truck size={13} color="var(--vermilion)" />
            <span className="num">
              {stop.driveDistanceMiles} mi transit leg (~{stop.driveHours}h drive time)
            </span>
          </div>
          <span style={{ color: 'var(--rule-2)' }}>•</span>
          <span style={{ color: 'var(--ink-3)' }}>
            {stop.notes || 'Mandatory touring cadence: burnout prevention & van maintenance'}
          </span>
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
      className={`tour-day-sheet ${isSelected ? 'selected' : ''}`}
      style={{
        borderLeft: isSelected ? '3px solid var(--signal)' : '3px solid color-mix(in oklab, var(--signal) 35%, transparent)',
      }}
    >
      {/* Top Day-Sheet Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '10px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
            <span className="chip live num">
              DAY {String(stop.stopNumber).padStart(2, '0')} • GIG
            </span>
            <span className="num" style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              {stop.date} ({stop.dayOfWeek})
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--display)',
              fontSize: '19px',
              fontWeight: 500,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            {stop.city}, {stop.state}
          </h3>
        </div>

        {/* Qloo Cultural Affinity Badge */}
        {market && (
          <div style={{ textAlign: 'right' }}>
            <span className="chip emerald num">
              {market.affinityScore}/100 Index
            </span>
            <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>
              +{Math.round((market.indexRatio - 1) * 100)}% Qloo Subgenre Density
            </div>
          </div>
        )}
      </div>

      {/* Venue Specs & Production Schedule */}
      {venue && (
        <div
          style={{
            background: 'var(--paper-2)',
            borderRadius: 'var(--r-control)',
            padding: '10px 14px',
            marginBottom: '12px',
            border: '1px solid var(--rule)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="var(--signal)" />
              <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '13.5px' }}>
                {venue.name}
              </span>
            </div>
            <span className="chip num" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              {venue.capacity} cap room
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px', margin: 0, lineHeight: 1.45 }}>
            {venue.vibe}
          </p>

          {/* Master Tour Day Sheet Schedule Times */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid var(--rule)',
              fontSize: '11.5px',
              color: 'var(--ink-3)',
            }}
            className="num"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={11} />
              <span>Load-in: 4:30 PM</span>
            </div>
            <div>Soundcheck: 6:00 PM</div>
            <div>Doors: 8:00 PM</div>
          </div>
        </div>
      )}

      {/* Cultural Grounding: Opener & Culture Anchor */}
      {taste && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {/* Matched Opener */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
              <Music2 size={12} color="var(--signal)" />
              <span className="num" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--signal)' }}>
                Matched Opener ({taste.opener.affinityMatch}% Fit)
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--ink)' }}>
              {taste.opener.name} <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>({taste.opener.genre})</span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', marginTop: '2px', lineHeight: 1.4 }}>
              {taste.opener.rationale}
            </div>
          </div>

          {/* Culture Anchor */}
          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-control)',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
              <Store size={12} color="var(--vermilion)" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--vermilion)' }}>
                Merch &amp; Culture Anchor
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--ink)' }}>
              {taste.popUpSpot.name}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--ink-2)', marginTop: '2px', lineHeight: 1.4 }}>
              {taste.popUpSpot.culturalMatch}
            </div>
          </div>
        </div>
      )}

      {/* Conflict Warning */}
      {stop.marketConflict && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            borderRadius: 'var(--r-control)',
            marginBottom: '12px',
            fontSize: '11.5px',
            backgroundColor: stop.marketConflict.hasConflict
              ? 'color-mix(in oklab, var(--vermilion) 10%, transparent)'
              : 'color-mix(in oklab, var(--emerald) 10%, transparent)',
            border: stop.marketConflict.hasConflict
              ? '1px solid color-mix(in oklab, var(--vermilion) 30%, transparent)'
              : '1px solid color-mix(in oklab, var(--emerald) 30%, transparent)',
            color: stop.marketConflict.hasConflict ? 'var(--vermilion)' : 'var(--emerald)',
          }}
        >
          {stop.marketConflict.hasConflict ? (
            <AlertTriangle size={12} style={{ flexShrink: 0 }} />
          ) : (
            <CheckCircle2 size={12} style={{ flexShrink: 0 }} />
          )}
          <span style={{ lineHeight: 1.3 }}>
            {stop.marketConflict.conflictSummary ||
              (stop.marketConflict.hasConflict
                ? 'Festival counter-programming alert in radius.'
                : 'Market clear: No major festival counter-programming detected.')}
          </span>
        </div>
      )}

      {/* Footer: Transit Leg & Promoter Pitch */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--rule)',
          paddingTop: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--ink-3)' }}>
          <Truck size={12} />
          <span className="num">
            {stop.driveDistanceMiles === 0
              ? 'Tour Launch Origin'
              : `${stop.driveDistanceMiles} mi transit • ~${stop.driveHours}h van leg`}
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
            padding: '5px 12px',
          }}
        >
          <Mail size={12} />
          <span>Promoter Pitch</span>
        </button>
      </div>
    </div>
  );
};
