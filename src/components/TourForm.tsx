'use client';

import React, { useState } from 'react';
import { ArtistInput, CapacityTier, TourRegion } from '@/types';
import { Compass } from 'lucide-react';

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
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <Compass size={16} color="#38bdf8" />
          <span>Tour Configuration</span>
        </h2>
        <span style={{ fontSize: '11.5px', fontFamily: 'ui-monospace, monospace', color: '#8b949e' }}>
          ReAct Agent Loop
        </span>
      </div>

      {/* Artist Name & Presets */}
      <div>
        <label
          htmlFor="artist-name-input"
          style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
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
            padding: '9px 12px',
            backgroundColor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '6px',
            color: '#f0f6fc',
            fontSize: '13.5px',
          }}
        />

        {/* Evaluation Presets */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: '#6e7681', alignSelf: 'center' }}>Benchmarks:</span>
          <button
            type="button"
            id="preset-geese"
            onClick={() => applyPreset('Geese', 'US-East', 'club')}
            style={{
              fontSize: '11.5px',
              padding: '3px 8px',
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: '4px',
              color: '#c9d1d9',
            }}
          >
            Geese (Club)
          </button>
          <button
            type="button"
            id="preset-tldp"
            onClick={() => applyPreset('The Last Dinner Party', 'US-East', 'ballroom')}
            style={{
              fontSize: '11.5px',
              padding: '3px 8px',
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: '4px',
              color: '#c9d1d9',
            }}
          >
            The Last Dinner Party (Ballroom)
          </button>
          <button
            type="button"
            id="preset-mkgee"
            onClick={() => applyPreset('Mk.gee', 'US-West', 'ballroom')}
            style={{
              fontSize: '11.5px',
              padding: '3px 8px',
              background: '#21262d',
              border: '1px solid #30363d',
              borderRadius: '4px',
              color: '#c9d1d9',
            }}
          >
            Mk.gee (US-West)
          </button>
        </div>
      </div>

      {/* Date Window */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            htmlFor="start-date-input"
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
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
              padding: '8px 10px',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#f0f6fc',
              fontSize: '13px',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="end-date-input"
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
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
              padding: '8px 10px',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#f0f6fc',
              fontSize: '13px',
            }}
          />
        </div>
      </div>

      {/* Region & Room Size Tier */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            htmlFor="region-select"
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
          >
            Transit Corridor
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value as TourRegion)}
            style={{
              width: '100%',
              padding: '8px 10px',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#f0f6fc',
              fontSize: '13px',
            }}
          >
            <option value="US-East">US East &amp; Midwest Corridor</option>
            <option value="US-West">US West &amp; Pacific Northwest</option>
            <option value="US-National">US National (Coast-to-Coast)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="capacity-tier-select"
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
          >
            Target Room Capacity
          </label>
          <select
            id="capacity-tier-select"
            value={capacityTier}
            onChange={(e) => setCapacityTier(e.target.value as CapacityTier)}
            style={{
              width: '100%',
              padding: '8px 10px',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#f0f6fc',
              fontSize: '13px',
            }}
          >
            <option value="club">Club (200 – 450 cap)</option>
            <option value="ballroom">Ballroom (500 – 1,200 cap)</option>
            <option value="theater">Theater (1,200 – 3,000 cap)</option>
          </select>
        </div>
      </div>

      {/* Origin City (Optional) */}
      <div>
        <label
          htmlFor="start-city-input"
          style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c9d1d9', marginBottom: '6px' }}
        >
          Tour Launch City (Optional)
        </label>
        <input
          id="start-city-input"
          type="text"
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          placeholder="e.g. Brooklyn, NY (Defaults to market 1)"
          style={{
            width: '100%',
            padding: '8px 10px',
            backgroundColor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '6px',
            color: '#f0f6fc',
            fontSize: '13px',
          }}
        />
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
          padding: '10px',
          fontSize: '13.5px',
          fontWeight: 600,
          opacity: isLoading ? 0.7 : 1,
          marginTop: '4px',
        }}
      >
        {isLoading ? (
          <>
            <span
              style={{
                width: '14px',
                height: '14px',
                border: '2px solid #ffffff',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span>Running Agent Tools (Qloo + Routing)...</span>
          </>
        ) : (
          <span>Route Tour Route &amp; Openers</span>
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
