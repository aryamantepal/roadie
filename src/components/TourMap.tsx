'use client';

import React from 'react';
import { TourStop } from '@/types';

interface TourMapProps {
  stops: TourStop[];
  selectedStopIndex: number | null;
  onSelectStop: (index: number) => void;
}

export const TourMap: React.FC<TourMapProps> = ({
  stops,
  selectedStopIndex,
  onSelectStop,
}) => {
  // SVG ViewBox dimensions
  const width = 900;
  const height = 480;

  // Geographic bounds for continental US & Southern Canada projection
  // Longitude: -125 (West) to -68 (East)
  // Latitude: 24 (South) to 50 (North)
  const minLng = -125;
  const maxLng = -68;
  const minLat = 24;
  const maxLat = 50;

  const projectCoords = (lat: number, lng: number): { x: number; y: number } => {
    // Albers-like pseudo-conic projection for realistic North American curvature
    const normX = (lng - minLng) / (maxLng - minLng);
    const normY = (maxLat - lat) / (maxLat - minLat);

    // Add slight curve for latitude
    const curveOffset = Math.sin(normX * Math.PI) * 22;

    const x = normX * (width - 120) + 60;
    const y = normY * (height - 100) + 50 - curveOffset;
    return { x, y };
  };

  // Generate SVG path for route line
  const routePoints = stops.map((stop) => projectCoords(stop.lat, stop.lng));
  const pathD =
    routePoints.length > 1
      ? routePoints.reduce((acc, pt, idx) => {
          return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
        }, '')
      : '';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0c111a',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Top Map Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.04em' }}>
            DETERMINISTIC TOUR ROUTE
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} />
            <span>Show Date</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <span>Travel / Off-Day</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '20px', height: '2px', background: '#06b6d4' }} />
            <span>Drivable Path</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '900 / 480' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', display: 'block' }}
          id="tour-route-svg-map"
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Outline Guides for major regions */}
          <path
            d="M 120 180 Q 250 140 450 130 T 780 140 Q 820 280 720 380 Q 550 420 320 400 Z"
            fill="rgba(14, 22, 36, 0.45)"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1.5"
          />

          {/* Connecting Tour Route Line */}
          {pathD && (
            <>
              {/* Glowing under-line */}
              <path
                d={pathD}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                strokeOpacity="0.25"
                filter="url(#glow)"
              />
              {/* Crisp main line */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
            </>
          )}

          {/* Tour Stop Markers */}
          {stops.map((stop, index) => {
            const pt = projectCoords(stop.lat, stop.lng);
            const isSelected = selectedStopIndex === index;
            const isOff = stop.isOffDay;
            const color = isOff ? '#f59e0b' : '#8b5cf6';

            return (
              <g
                key={stop.stopNumber}
                id={`map-stop-pin-${stop.stopNumber}`}
                onClick={() => onSelectStop(index)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer selection ring */}
                {isSelected && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="16"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeOpacity="0.8"
                    className="animate-pulse-glow"
                  />
                )}

                {/* Main pin circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isOff ? 6 : 9}
                  fill={isOff ? '#1e293b' : color}
                  stroke={color}
                  strokeWidth={isOff ? 2 : 2.5}
                  filter={isSelected ? 'url(#glow)' : undefined}
                />

                {/* Inner dot or stop number */}
                {!isOff && (
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9px"
                    fontWeight="700"
                    fontFamily="Outfit, sans-serif"
                    pointerEvents="none"
                  >
                    {stop.stopNumber}
                  </text>
                )}

                {/* City Label */}
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill={isSelected ? '#38bdf8' : isOff ? '#94a3b8' : '#e2e8f0'}
                  fontSize={isSelected ? '12px' : '10px'}
                  fontWeight={isSelected ? '700' : '600'}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)' }}
                >
                  {isOff ? 'REST / DRIVE' : stop.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
