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
import {
  Activity,
  Terminal,
} from 'lucide-react';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#090d13' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '24px 24px 60px',
          width: '100%',
          flex: 1,
        }}
      >
        {activeTab === 'planner' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(340px, 400px) 1fr',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Input Form & Tour Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TourForm isLoading={isLoading} onPlanTour={handlePlanTour} />

              {/* Tour Plan Metrics Summary Card */}
              {tourPlan && (
                <div
                  className="glass-panel"
                  id="tour-metrics-summary-card"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    backgroundColor: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} color="#38bdf8" />
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#f0f6fc', margin: 0 }}>
                        Route Optimization Metrics
                      </h3>
                    </div>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#34d399',
                        background: 'rgba(52, 211, 153, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(52, 211, 153, 0.25)',
                      }}
                    >
                      {tourPlan.efficiencyScore}% Efficiency
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        background: '#0d1117',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        border: '1px solid #212836',
                      }}
                    >
                      <div style={{ fontSize: '10.5px', fontFamily: 'ui-monospace, monospace', color: '#8b949e' }}>
                        TOTAL DISTANCE
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#f0f6fc', marginTop: '2px' }}>
                        {tourPlan.totalDistanceMiles.toLocaleString()} mi
                      </div>
                      <div style={{ fontSize: '11px', color: '#38bdf8', marginTop: '2px' }}>
                        Drivable corridor
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#0d1117',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        border: '1px solid #212836',
                      }}
                    >
                      <div style={{ fontSize: '10.5px', fontFamily: 'ui-monospace, monospace', color: '#8b949e' }}>
                        SHOW / REST DAYS
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#f0f6fc', marginTop: '2px' }}>
                        {tourPlan.totalShows} shows • {tourPlan.totalOffDays} rest
                      </div>
                      <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '2px' }}>
                        Burnout protected
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#0d1117',
                        borderRadius: '6px',
                        padding: '10px 12px',
                        border: '1px solid #212836',
                        gridColumn: 'span 2',
                      }}
                    >
                      <div style={{ fontSize: '10.5px', fontFamily: 'ui-monospace, monospace', color: '#8b949e' }}>
                        AVERAGE CULTURAL AFFINITY (QLOO TASTE GRAPH)
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#34d399', marginTop: '2px' }}>
                        {tourPlan.culturalIndexAvg}x national baseline
                      </div>
                      <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '2px' }}>
                        Normalized subgenre audience density across booked markets
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsTraceModalOpen(true)}
                    className="btn-secondary"
                    id="btn-inspect-agent-trace"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: '12.5px',
                      padding: '8px',
                    }}
                  >
                    <Terminal size={13} color="#38bdf8" />
                    <span>Inspect Agent Execution Trace ({tourPlan.executionTrace.length} tools)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Tour Map & Stop Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {tourPlan && (
                <>
                  <TourMap
                    stops={tourPlan.stops}
                    selectedStopIndex={selectedStopIndex}
                    onSelectStop={(idx) => setSelectedStopIndex(idx)}
                  />

                  {/* Stop Cards List */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f0f6fc', margin: 0 }}>
                        Itinerary &amp; Venue Routing ({tourPlan.stops.length} dates)
                      </h3>
                      <span style={{ fontSize: '12px', color: '#8b949e' }}>
                        Click stop to highlight on map
                      </span>
                    </div>

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
        )}

        {activeTab === 'receipts' && <ReceiptsView />}

        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Promoter Pitch Modal */}
      <PromoterPitchModal
        stop={pitchModalStop}
        artistName={tourPlan?.artistName || 'Artist'}
        onClose={() => setPitchModalStop(null)}
      />

      {/* Agent Trace Modal */}
      <AgentTraceModal
        trace={tourPlan?.executionTrace || []}
        isOpen={isTraceModalOpen}
        onClose={() => setIsTraceModalOpen(false)}
      />
    </div>
  );
}
