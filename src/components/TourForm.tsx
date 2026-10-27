'use client';

import React, { useState } from 'react';
import { ArtistInput, CapacityTier, TourRegion } from '@/types';
import { ArrowRight } from 'lucide-react';

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
      className="card-paper"
      id="roadie-tour-planner-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        background: 'var(--paper)',
      }}
    >
      {/* Header with quiet eyebrow */}
      <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '14px' }}>
        <span className="ov">Tour Configuration</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)' }}>
            Routing Parameters &amp; Corridor
          </h2>
          <span className="chip live">2-Opt TSP Solver</span>
        </div>
      </div>

      {/* Artist Search Field */}
      <div>
        <label
          htmlFor="artist-name-input"
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--ink-2)',
            marginBottom: '6px',
          }}
        >
          Artist / Band Profile
        </label>
        <input
          id="artist-name-input"
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="e.g. Geese, The Last Dinner Party, Mk.gee, Wednesday"
          required
          className="input-paper"
          style={{ width: '100%' }}
        />

        {/* Quick Benchmarks */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--ink-3)' }}>Presets:</span>
          <button
            type="button"
            id="preset-geese"
            onClick={() => applyPreset('Geese', 'US-East', 'club')}
            className="chip"
            style={{ cursor: 'pointer', border: '1px solid var(--rule)' }}
          >
            Geese (Club)
          </button>
          <button
            type="button"
            id="preset-tldp"
            onClick={() => applyPreset('The Last Dinner Party', 'US-East', 'ballroom')}
            className="chip"
            style={{ cursor: 'pointer', border: '1px solid var(--rule)' }}
          >
            The Last Dinner Party (Ballroom)
          </button>
          <button
            type="button"
            id="preset-mkgee"
            onClick={() => applyPreset('Mk.gee', 'US-West', 'ballroom')}
            className="chip"
            style={{ cursor: 'pointer', border: '1px solid var(--rule)' }}
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
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ink-2)',
              marginBottom: '6px',
            }}
          >
            Tour Launch Date
          </label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-paper num"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label
            htmlFor="end-date-input"
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ink-2)',
              marginBottom: '6px',
            }}
          >
            Tour Wrap Date
          </label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-paper num"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Corridor & Target Room Capacity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label
            htmlFor="region-select"
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ink-2)',
              marginBottom: '6px',
            }}
          >
            Transit Corridor
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value as TourRegion)}
            className="input-paper"
            style={{ width: '100%' }}
          >
            <option value="US-East">US East &amp; Midwest Corridor</option>
            <option value="US-West">US West &amp; Pacific Northwest</option>
            <option value="US-National">US National Circuit</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="capacity-tier-select"
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--ink-2)',
              marginBottom: '6px',
            }}
          >
            Target Capacity Tier
          </label>
          <select
            id="capacity-tier-select"
            value={capacityTier}
            onChange={(e) => setCapacityTier(e.target.value as CapacityTier)}
            className="input-paper"
            style={{ width: '100%' }}
          >
            <option value="club">Club (200 – 450 cap)</option>
            <option value="ballroom">Ballroom (500 – 1,200 cap)</option>
            <option value="theater">Theater (1,200 – 3,000 cap)</option>
          </select>
        </div>
      </div>

      {/* Origin City / Starting Hub */}
      <div>
        <label
          htmlFor="start-city-input"
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--ink-2)',
            marginBottom: '6px',
          }}
        >
          Starting Hub (Optional)
        </label>
        <input
          id="start-city-input"
          type="text"
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          placeholder="e.g. Brooklyn, NY (Defaults to market 1)"
          className="input-paper"
          style={{ width: '100%' }}
        />
      </div>

      {/* Submit Action: Elixir ERP .cta style */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
        id="btn-run-roadie-agent"
        style={{
          width: '100%',
          padding: '11px 18px',
          fontSize: '14px',
          opacity: isLoading ? 0.75 : 1,
          marginTop: '6px',
        }}
      >
        {isLoading ? (
          <>
            <span
              style={{
                width: '14px',
                height: '14px',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span>Solving Corridor Route &amp; Openers...</span>
          </>
        ) : (
          <>
            <span>Generate Optimized Route</span>
            <ArrowRight size={15} />
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
