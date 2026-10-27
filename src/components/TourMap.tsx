'use client';

import React, { useState } from 'react';
import { TourStop } from '@/types';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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
  const [zoomLevel, setZoomLevel] = useState(1);

  // SVG ViewBox dimensions
  const width = 940;
  const height = 480;

  // Geographic bounds for continental US & Southern Canada projection
  const minLng = -125;
  const maxLng = -68;
  const minLat = 24;
  const maxLat = 50;

  const projectCoords = (lat: number, lng: number): { x: number; y: number } => {
    const normX = (lng - minLng) / (maxLng - minLng);
    const normY = (maxLat - lat) / (maxLat - minLat);
    const curveOffset = Math.sin(normX * Math.PI) * 22;

    const x = normX * (width - 140) + 70;
    const y = normY * (height - 110) + 55 - curveOffset;
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

  // Interstates Cartographic Corridors
  const i95Points = [
    projectCoords(43.66, -70.25), // Portland ME
    projectCoords(42.36, -71.06), // Boston MA
    projectCoords(40.71, -74.00), // NYC
    projectCoords(39.95, -75.16), // Philly
    projectCoords(39.29, -76.61), // Baltimore
    projectCoords(38.90, -77.03), // DC
    projectCoords(37.54, -77.43), // Richmond
    projectCoords(35.77, -78.63), // Raleigh
    projectCoords(32.08, -81.09), // Savannah
  ];
  const i95Path = i95Points.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  const i80Points = [
    projectCoords(40.71, -74.00), // NYC / NJ
    projectCoords(40.44, -79.99), // Pittsburgh PA
    projectCoords(41.49, -81.69), // Cleveland OH
    projectCoords(41.87, -87.62), // Chicago IL
    projectCoords(41.25, -95.93), // Omaha NE
    projectCoords(41.13, -104.82), // Cheyenne WY
    projectCoords(40.76, -111.89), // Salt Lake City UT
    projectCoords(37.77, -122.41), // San Francisco CA
  ];
  const i80Path = i80Points.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  return (
    <div
      className="card-paper"
      style={{
        padding: '18px 20px',
        position: 'relative',
        backgroundColor: 'var(--paper)',
      }}
    >
      {/* Top Map Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '14px',
          borderBottom: '1px solid var(--rule)',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>
            Corridor Cartography
          </h4>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
            I-95 &amp; I-80 Highway Transit Corridors
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '14px', fontSize: '11.5px', color: 'var(--ink-2)', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--signal)' }} />
            <span>Show Date</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--vermilion)' }} />
            <span>Van Rest Day</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '18px', height: '2px', background: 'var(--signal)' }} />
            <span>Tour Route</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '18px', height: '1.5px', borderTop: '1.5px dashed var(--rule-2)' }} />
            <span>Highway Corridor</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '940 / 480', overflow: 'hidden', borderRadius: 'var(--r-control)', border: '1px solid var(--rule)' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 200ms var(--ease-out)',
          }}
          id="tour-route-svg-map"
        >
          <defs>
            {/* Fine coordinate grid */}
            <pattern id="carto-grid" width="70" height="70" patternUnits="userSpaceOnUse">
              <path
                d="M 70 0 L 0 0 0 70"
                fill="none"
                stroke="oklch(24% 0.030 260 / 0.06)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>

          {/* Warm vellum background */}
          <rect width={width} height={height} fill="var(--paper-2)" rx="5" />
          <rect width={width} height={height} fill="url(#carto-grid)" rx="5" />

          {/* North American Coastline / Continental Boundary Reference */}
          <path
            d="M 120 70 Q 280 45, 480 75 T 810 115 L 830 175 Q 790 220, 800 295 T 740 420 Q 645 435, 520 425 T 350 415 Q 235 375, 140 330 T 95 195 Z"
            fill="none"
            stroke="oklch(24% 0.030 260 / 0.14)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />

          {/* Latitude & Longitude Labels */}
          <text x="75" y="100" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">45° N</text>
          <text x="75" y="220" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">40° N</text>
          <text x="75" y="340" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">35° N</text>
          <text x="740" y="445" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">75° W</text>
          <text x="560" y="445" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">85° W</text>
          <text x="380" y="445" fill="var(--ink-4)" fontSize="9.5" fontFamily="var(--font-mono)">95° W</text>

          {/* Highway Corridors */}
          <g opacity="0.6">
            <path
              d={i95Path}
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <path
              d={i80Path}
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
          </g>

          {/* Connecting Tour Route Line */}
          {pathD && (
            <>
              {/* Soft route shadow */}
              <path
                d={pathD}
                fill="none"
                stroke="oklch(47% 0.170 262 / 0.15)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Crisp primary route line */}
              <path
                d={pathD}
                fill="none"
                stroke="var(--signal)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Tour Gig Pins and Rest Markers */}
          {stops.map((stop, idx) => {
            const pt = projectCoords(stop.lat, stop.lng);
            const isSelected = selectedStopIndex === idx;
            const isOff = stop.isOffDay;
            const color = isOff ? 'var(--vermilion)' : 'var(--signal)';

            return (
              <g
                key={stop.stopNumber}
                onClick={() => onSelectStop(idx)}
                style={{ cursor: 'pointer' }}
                id={`map-stop-pin-${stop.stopNumber}`}
                data-stop-id={`map-pin-stop-${stop.stopNumber}`}
              >
                {/* Selected Targeting Reticle */}
                {isSelected && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="18"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Main Pin Circle: Crisp paper core with colored rim */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isOff ? 6 : 9}
                  fill={isOff ? 'var(--paper)' : color}
                  stroke={isOff ? color : 'var(--paper)'}
                  strokeWidth="2"
                />

                {/* Stop Number Inside Pin */}
                {!isOff ? (
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    textAnchor="middle"
                    fill="var(--paper)"
                    fontSize="9.5px"
                    fontWeight="600"
                    fontFamily="var(--font-mono)"
                    pointerEvents="none"
                  >
                    {stop.stopNumber}
                  </text>
                ) : (
                  <text
                    x={pt.x}
                    y={pt.y + 3}
                    textAnchor="middle"
                    fill={color}
                    fontSize="8px"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    pointerEvents="none"
                  >
                    R
                  </text>
                )}

                {/* City Callout Pill */}
                <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                  <rect
                    x={-(stop.city.length * 3.4 + 9)}
                    y="-12"
                    width={stop.city.length * 6.8 + 18}
                    height="15"
                    rx="3"
                    fill="var(--paper)"
                    stroke={isSelected ? color : 'var(--rule)'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    fill={isSelected ? color : 'var(--ink)'}
                    fontSize="9.5px"
                    fontWeight={isSelected ? '600' : '500'}
                    fontFamily="var(--text)"
                  >
                    {isOff ? 'VAN REST' : stop.city}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Map Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            display: 'flex',
            gap: '4px',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--r-control)',
            padding: '2px',
            boxShadow: '0 1px 3px oklch(24% 0.030 260 / 0.1)',
          }}
        >
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            style={{
              background: 'transparent',
              color: 'var(--ink-2)',
              padding: '4px',
              borderRadius: 'var(--r-control)',
              display: 'flex',
            }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 1))}
            style={{
              background: 'transparent',
              color: 'var(--ink-2)',
              padding: '4px',
              borderRadius: 'var(--r-control)',
              display: 'flex',
            }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            style={{
              background: 'transparent',
              color: 'var(--ink-2)',
              padding: '4px',
              borderRadius: 'var(--r-control)',
              display: 'flex',
            }}
            title="Reset View"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
