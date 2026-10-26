'use client';

import React, { useState } from 'react';
import { ArtistInput, CapacityTier, TourRegion } from '@/types';
import { Compass, Calendar, MapPin, Sparkles, Building2, Layers } from 'lucide-react';

interface TourFormProps {
  isLoading: boolean;
  onPlanTour: (input: ArtistInput) => void;
}

export const TourForm: React.FC<TourFormProps> = ({ isLoading, onPlanTour }) => {
  const [artistName, setArtistName] = useState('Geese');
  const [startDate, setStartDate] = useState('2026-11-06');
  const [endDate, setEndDate] = useState('2026-11-20');
  const [region, setRegion] = useState<TourRegion>('US-East');
  const [capacityTier, setCapacityTier] = useState<CapacityTier>('club');
  const [startCity, setStartCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistName.trim()) return;

    onPlanTour({
      name: artistName.trim(),
      startDate,
      endDate,
      region,
      capacityTier,
      startCity: startCity.trim() || undefined,
    });
  };

  const applyPreset = (name: string, reg: TourRegion, tier: CapacityTier) => {
    setArtistName(name);
    setRegion(reg);
    setCapacityTier(tier);
    onPlanTour({
      name,
      startDate,
      endDate,
      region: reg,
      capacityTier: tier,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel"
      id="roadie-tour-planner-form"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} color="#8b5cf6" />
          <span>Tour Parameters</span>
        </h2>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          Deterministic agent loop
        </span>
      </div>

      {/* Artist Name & Presets */}
      <div>
        <label
          htmlFor="artist-name-input"
          style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}
        >
          Artist / Band Name
        </label>
        <input
          id="artist-name-input"
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="e.g. Geese, The Last Dinner Party, Mk.gee, Wednesday"
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            backgroundColor: '#0c1017',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            color: '#ffffff',
            fontSize: '14px',
          }}
        />

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: '#64748b', alignSelf: 'center' }}>Presets:</span>
          <button
            type="button"
            id="preset-geese"
            onClick={() => applyPreset('Geese', 'US-East', 'club')}
            style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '6px',
              color: '#c4b5fd',
            }}
          >
            Geese (Post-Punk)
          </button>
          <button
            type="button"
            id="preset-tldp"
            onClick={() => applyPreset('The Last Dinner Party', 'US-East', 'ballroom')}
            style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '6px',
              color: '#67e8f9',
            }}
          >
            The Last Dinner Party (Art-Pop)
          </button>
          <button
            type="button"
            id="preset-mkgee"
            onClick={() => applyPreset('Mk.gee', 'US-West', 'ballroom')}
            style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '6px',
              color: '#fcd34d',
            }}
          >
            Mk.gee (Neo-Soul)
          </button>
        </div>
      </div>

      {/* Date Window */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label
            htmlFor="start-date-input"
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}
          >
            Tour Start Date
          </label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#0c1017',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="end-date-input"
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}
          >
            Tour End Date
          </label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#0c1017',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          />
        </div>
      </div>

      {/* Region & Room Size Tier */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label
            htmlFor="region-select"
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}
          >
            Routing Corridor
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value as TourRegion)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#0c1017',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          >
            <option value="US-East">US East Coast &amp; Midwest</option>
            <option value="US-West">US West Coast &amp; Mountain</option>
            <option value="US-National">US National Tour (All Regions)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="capacity-tier-select"
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}
          >
            Venue Target Capacity
          </label>
          <select
            id="capacity-tier-select"
            value={capacityTier}
            onChange={(e) => setCapacityTier(e.target.value as CapacityTier)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#0c1017',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
            }}
          >
            <option value="club">Club (200 – 450 cap)</option>
            <option value="ballroom">Ballroom (500 – 1,200 cap)</option>
            <option value="theater">Theater (1,200 – 3,000 cap)</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
        id="btn-run-roadie-agent"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '14px',
          fontSize: '15px',
          fontWeight: 700,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? (
          <>
            <span
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span>Executing 5 Agent Tools...</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>Plan Culturally Grounded Tour</span>
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
};
