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
  const minLng = -125;
  const maxLng = -68;
  const minLat = 24;
  const maxLat = 50;

  const projectCoords = (lat: number, lng: number): { x: number; y: number } => {
    // Albers-like pseudo-conic projection for North American curvature
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
        backgroundColor: '#161b22',
        borderRadius: '8px',
        border: '1px solid #30363d',
        padding: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Top Map Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          borderBottom: '1px solid #21262d',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#3fb950',
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#f0f6fc', fontFamily: 'ui-monospace, monospace' }}>
            DETERMINISTIC ROUTE MAP
          </span>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', color: '#8b949e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />
            <span>Show Date</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }} />
            <span>Transit / Rest Day</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '16px', height: '2px', background: '#3b82f6' }} />
            <span>Drive Path</span>
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
          </defs>

          {/* Background Map Grid */}
          <rect width={width} height={height} fill="#0d1117" rx="6" />
          <rect width={width} height={height} fill="url(#grid)" rx="6" />

          {/* North American Outline Reference */}
          <path
            d="M 120 70 Q 280 50, 480 80 T 800 120 L 820 180 Q 780 220, 790 300 T 730 420 Q 640 430, 520 420 T 360 410 Q 240 370, 150 330 T 100 200 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Connecting Transit Route Path */}
          {pathD && (
            <>
              {/* Clean solid path line */}
              <path
                d={pathD}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Stop Pins and Markers */}
          {stops.map((stop, idx) => {
            const pt = projectCoords(stop.lat, stop.lng);
            const isSelected = selectedStopIndex === idx;
            const isOff = stop.isOffDay;
            const color = isOff ? '#fbbf24' : '#38bdf8';

            return (
              <g
                key={stop.stopNumber}
                onClick={() => onSelectStop(idx)}
                style={{ cursor: 'pointer' }}
                id={`map-pin-stop-${stop.stopNumber}`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="15"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />
                )}

                {/* Main pin circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isOff ? 5 : 8}
                  fill={isOff ? '#161b22' : color}
                  stroke={color}
                  strokeWidth={isOff ? 1.5 : 2}
                />

                {/* Stop number */}
                {!isOff && (
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    textAnchor="middle"
                    fill="#0d1117"
                    fontSize="9px"
                    fontWeight="700"
                    fontFamily="ui-monospace, monospace"
                    pointerEvents="none"
                  >
                    {stop.stopNumber}
                  </text>
                )}

                {/* City Label */}
                <text
                  x={pt.x}
                  y={pt.y - 11}
                  textAnchor="middle"
                  fill={isSelected ? '#38bdf8' : isOff ? '#8b949e' : '#f0f6fc'}
                  fontSize={isSelected ? '11.5px' : '9.5px'}
                  fontWeight={isSelected ? '700' : '500'}
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
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
