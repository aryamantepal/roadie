'use client';

import React from 'react';
import { TourStop } from '@/types';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Music,
  ShoppingBag,
  Car,
  Mail,
  Flame,
  Coffee,
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
          background: isSelected
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(18, 24, 36, 0.95))'
            : 'rgba(18, 24, 36, 0.6)',
          border: isSelected
            ? '1px solid rgba(245, 158, 11, 0.4)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fcd34d',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              DAY {stop.stopNumber}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
              Travel & Rest Day
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{stop.date} ({stop.dayOfWeek})</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px',
            fontSize: '13px',
            color: '#cbd5e1',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Car size={14} color="#f59e0b" />
            <span>{stop.driveDistanceMiles} miles transit ({stop.driveHours} hrs driving)</span>
          </div>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ color: '#94a3b8' }}>{stop.notes || 'Recovery & van maintenance'}</span>
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
        background: isSelected
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(18, 24, 36, 0.98))'
          : 'rgba(18, 24, 36, 0.75)',
        border: isSelected
          ? '1px solid rgba(139, 92, 246, 0.5)'
          : '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '16px',
        cursor: 'pointer',
        boxShadow: isSelected
          ? '0 6px 24px rgba(139, 92, 246, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: '#8b5cf6',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              STOP #{stop.stopNumber}
            </span>
            <span style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {stop.date} ({stop.dayOfWeek})
            </span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
            {stop.city}, {stop.state}
          </h3>
        </div>

        {/* Qloo Affinity Tag */}
        {market && (
          <div
            style={{
              textAlign: 'right',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '6px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end' }}>
              <Flame size={14} color="#10b981" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#34d399' }}>
                {market.affinityScore}/100
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#a7f3d0' }}>
              {Math.round((market.indexRatio - 1) * 100)}% above avg index
            </span>
          </div>
        )}
      </div>

      {/* Venue Information */}
      {venue && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '14px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} color="#8b5cf6" />
              <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '14px' }}>
                {venue.name}
              </span>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#c4b5fd',
                background: 'rgba(139, 92, 246, 0.15)',
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >
              {venue.capacity} cap
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', lineHeight: 1.4 }}>
            {venue.vibe}
          </p>
        </div>
      )}

      {/* Cultural Grounding: Opener & Pop-Up Spot */}
      {taste && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          {/* Opener recommendation */}
          <div
            style={{
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '8px',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Music size={13} color="#06b6d4" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#67e8f9', textTransform: 'uppercase' }}>
                Local Opener Match ({taste.opener.affinityMatch}% overlap)
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#f1f5f9' }}>
              {taste.opener.name} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({taste.opener.genre})</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              {taste.opener.rationale}
            </div>
          </div>

          {/* Taste-matched Pop-up Spot */}
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              padding: '10px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <ShoppingBag size={13} color="#f59e0b" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fcd34d', textTransform: 'uppercase' }}>
                Culture Pop-Up Partner
              </span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#f1f5f9' }}>
              {taste.popUpSpot.name}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              {taste.popUpSpot.culturalMatch}
            </div>
          </div>
        </div>
      )}

      {/* Footer Row: Driving & Pitch Email Action */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
          <Car size={14} color="#64748b" />
          <span>
            {stop.driveDistanceMiles === 0
              ? 'Tour Launch Point'
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
            padding: '6px 14px',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#c4b5fd',
          }}
        >
          <Mail size={13} />
          <span>Promoter Pitch</span>
        </button>
      </div>
    </div>
  );
};
