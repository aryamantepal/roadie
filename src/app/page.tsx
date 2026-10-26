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
  Car,
  Compass,
  Calendar,
  Flame,
  Award,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');
  const [tourPlan, setTourPlan] = useState<TourPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(0);
  const [pitchModalStop, setPitchModalStop] = useState<TourStop | null>(null);
  const [isTraceModalOpen, setIsTraceModalOpen] = useState<boolean>(false);

  // Initial load: automatically plan for "Geese"
  useEffect(() => {
    handlePlanTour({
      name: 'Geese',
      startDate: '2026-11-06',
      endDate: '2026-11-20',
      region: 'US-East',
      capacityTier: 'club',
    });
  }, []);

  const handlePlanTour = async (input: ArtistInput) => {
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
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '28px 24px 60px',
          width: '100%',
          flex: 1,
        }}
      >
        {activeTab === 'planner' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(340px, 420px) 1fr',
              gap: '28px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Input Form & Tour Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TourForm isLoading={isLoading} onPlanTour={handlePlanTour} />

              {/* Tour Plan Metrics Summary Card */}
              {tourPlan && (
                <div
                  className="glass-panel"
                  id="tour-metrics-summary-card"
                  style={{
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={18} color="#10b981" />
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                        Tour Route Diagnostics
                      </h3>
                    </div>
                    <span className="badge badge-emerald">
                      {tourPlan.efficiencyScore}% Efficiency
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        padding: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>TOTAL DISTANCE</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                        {tourPlan.totalDistanceMiles.toLocaleString()} mi
                      </div>
                      <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>
                        Drivable routing
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        padding: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>SHOW / REST DAYS</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                        {tourPlan.totalShows} shows • {tourPlan.totalOffDays} rest
                      </div>
                      <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '2px' }}>
                        Burnout protected
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        padding: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        gridColumn: 'span 2',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                            AVERAGE CULTURAL INDEX (QLOO TASTE GRAPH)
                          </div>
                          <div style={{ fontSize: '20px', fontWeight: 800, color: '#c4b5fd', marginTop: '2px' }}>
                            {tourPlan.culturalIndexAvg}x national baseline
                          </div>
                        </div>
                        <Flame size={28} color="#8b5cf6" />
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
                      fontSize: '13px',
                      padding: '10px',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <Terminal size={14} color="#8b5cf6" />
                    <span>Inspect Agent Execution Trace ({tourPlan.executionTrace.length} tools)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Tour Map & Stop Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                        marginBottom: '16px',
                      }}
                    >
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                        Itinerary &amp; Stop Activations ({tourPlan.stops.length} dates)
                      </h3>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                        Click stop to focus map
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
