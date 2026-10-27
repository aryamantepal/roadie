'use client';

import React, { useEffect, useState } from 'react';
import { ActiveTab, Header } from '@/components/Header';
import { TourForm } from '@/components/TourForm';
import { TourMap } from '@/components/TourMap';
import { StopCard } from '@/components/StopCard';
import { PromoterPitchModal } from '@/components/PromoterPitchModal';
import { AgentTraceModal } from '@/components/AgentTraceModal';
import { ReceiptsView } from '@/components/ReceiptsView';
import { ArchitectureView } from '@/components/ArchitectureView';
import { ArtistInput, TourPlan, TourStop } from '@/types';
import { FileCheck2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');
  const [tourPlan, setTourPlan] = useState<TourPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(0);
  const [pitchModalStop, setPitchModalStop] = useState<TourStop | null>(null);
  const [isTraceModalOpen, setIsTraceModalOpen] = useState<boolean>(false);

  const handlePlanTour = React.useCallback(async (input: ArtistInput) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (res.ok) {
        const data: TourPlan = await res.json();
        setTourPlan(data);
        setSelectedStopIndex(0);
      } else {
        console.error('Failed to plan tour:', await res.text());
      }
    } catch (err) {
      console.error('Error planning tour:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load: automatically plan for "Geese"
  useEffect(() => {
    let ignore = false;
    fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Geese',
        startDate: '2026-11-06',
        endDate: '2026-11-20',
        region: 'US-East',
        capacityTier: 'club',
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: TourPlan | null) => {
        if (data && !ignore) {
          setTourPlan(data);
          setSelectedStopIndex(0);
        }
      })
      .catch((err) => {
        console.error('Error loading initial plan:', err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--paper)' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 28px 80px',
          width: '100%',
          flex: 1,
        }}
      >
        {activeTab === 'planner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Editorial Lead-In */}
            <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '24px' }}>
              <span className="ov">Tour Routing &amp; Booking Intelligence</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 400, color: 'var(--ink)', maxWidth: '28ch', lineHeight: 1.15 }}>
                  Independent tour routing grounded in cultural graph density.
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', maxWidth: '42ch', lineHeight: 1.5, margin: 0 }}>
                  Computes 2-opt deterministic van circuits, checks driver fatigue thresholds, and pairs matched local support from Qloo taste graphs.
                </p>
              </div>
            </div>

            {/* Main Workbench Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(340px, 400px) 1fr',
                gap: '28px',
                alignItems: 'start',
              }}
            >
              {/* Left Column: Form & Tour Logistics Ledger */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TourForm isLoading={isLoading} onPlanTour={handlePlanTour} />

                {/* Tour Logistics Paper Ledger */}
                {tourPlan && (
                  <div
                    className="card-paper"
                    id="tour-metrics-summary-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      background: 'var(--paper)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--rule)', paddingBottom: '12px' }}>
                      <div>
                        <span className="ov" style={{ marginBottom: '2px' }}>Route Efficiency</span>
                        <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ink)' }}>
                          Tour Logistics Ledger
                        </h3>
                      </div>
                      <span className="chip emerald num">
                        {tourPlan.efficiencyScore}% Optimal Corridor
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                      }}
                    >
                      {/* Mileage & Van Drive Times */}
                      <div className="metric-tile">
                        <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>
                          TOTAL MILEAGE
                        </div>
                        <div className="num" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--ink)', marginTop: '2px' }}>
                          {tourPlan.totalDistanceMiles.toLocaleString()} mi
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--signal)', marginTop: '2px' }}>
                          ~{Math.round(tourPlan.totalDistanceMiles / 50)}h van drive time
                        </div>
                      </div>

                      {/* Show / Rest Ratio */}
                      <div className="metric-tile">
                        <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>
                          SHOW / REST DAYS
                        </div>
                        <div className="num" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--ink)', marginTop: '2px' }}>
                          {tourPlan.totalShows} Gigs • {tourPlan.totalOffDays} Rest
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--vermilion)', marginTop: '2px' }}>
                          Burnout compliant
                        </div>
                      </div>

                      {/* Qloo Subgenre Index */}
                      <div className="metric-tile" style={{ gridColumn: 'span 2' }}>
                        <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>
                          QLOO SUBGENRE AFFINITY INDEX
                        </div>
                        <div className="num" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--emerald)', marginTop: '2px' }}>
                          {tourPlan.culturalIndexAvg}x national baseline
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>
                          Normalized subgenre concentration across booked indie markets
                        </div>
                      </div>
                    </div>

                    {/* Logistics Audit Log Action */}
                    <button
                      onClick={() => setIsTraceModalOpen(true)}
                      className="btn-secondary"
                      id="btn-inspect-agent-trace"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: '12.5px',
                        padding: '9px',
                      }}
                    >
                      <FileCheck2 size={13} />
                      <span>Logistics Audit Log ({tourPlan.executionTrace.length} Solver Stages)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Cartographic Parchment Map & Physical Day-Sheets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {tourPlan && (
                  <>
                    <TourMap
                      stops={tourPlan.stops}
                      selectedStopIndex={selectedStopIndex}
                      onSelectStop={(idx) => setSelectedStopIndex(idx)}
                    />

                    {/* Day-Sheets Header */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          borderBottom: '1px solid var(--rule)',
                          paddingBottom: '12px',
                          marginBottom: '16px',
                        }}
                      >
                        <div>
                          <span className="ov" style={{ marginBottom: '2px' }}>Itinerary Schedule</span>
                          <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--ink)' }}>
                            Tour Day-Sheets &amp; Venue Routing ({tourPlan.stops.length} dates)
                          </h3>
                        </div>
                        <span style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>
                          Click stop to center on map
                        </span>
                      </div>

                      {/* Day-Sheet Stop Cards */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {tourPlan.stops.map((stop, idx) => (
                          <StopCard
                            key={stop.stopNumber}
                            stop={stop}
                            isSelected={selectedStopIndex === idx}
                            onSelect={() => setSelectedStopIndex(idx)}
                            onOpenPitchModal={(s) => setPitchModalStop(s)}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'receipts' && <ReceiptsView />}

        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Promoter Data Brief Modal */}
      <PromoterPitchModal
        stop={pitchModalStop}
        artistName={tourPlan?.artistName || 'Artist'}
        onClose={() => setPitchModalStop(null)}
      />

      {/* Logistics & Precondition Audit Modal */}
      <AgentTraceModal
        trace={tourPlan?.executionTrace || []}
        isOpen={isTraceModalOpen}
        onClose={() => setIsTraceModalOpen(false)}
      />
    </div>
  );
}
