'use client';

import { useState, useEffect, useRef } from 'react';
import SensorMetrics from '@/components/SensorMetrics';
import EfficiencyChart from '@/components/EfficiencyChart';
import CleaningHistory from '@/components/CleaningHistory';
import ThresholdGauge from '@/components/ThresholdGauge';
import WaterUsageChart from '@/components/WaterUsageChart';
import SensorAccuracyChart from '@/components/SensorAccuracyChart';
import SimulatorControls from '@/components/SimulatorControls';

export interface SensorState {
  dust: number;
  cloud: number;
  rain: boolean;
  efficiency: number;
}

const INITIAL_SENSORS: SensorState = {
  dust: 15,
  cloud: 30,
  rain: false,
  efficiency: 92,
};

const INITIAL_HISTORY = [
  { id: 1, timestamp: '2026-05-15 14:30', duration: 12, water: 2.5, efficiencyBefore: 65, efficiencyAfter: 95, reason: 'Manual' },
  { id: 2, timestamp: '2026-05-15 10:15', duration: 10, water: 2.3, efficiencyBefore: 62, efficiencyAfter: 93, reason: 'AI Trigger' },
  { id: 3, timestamp: '2026-05-14 18:45', duration: 11, water: 2.4, efficiencyBefore: 68, efficiencyAfter: 94, reason: 'AI Trigger' },
  { id: 4, timestamp: '2026-05-14 08:30', duration: 12, water: 2.5, efficiencyBefore: 60, efficiencyAfter: 92, reason: 'Manual' },
];

export default function Home() {
  const [sensors, setSensors] = useState<SensorState>(INITIAL_SENSORS);
  const [cleaningHistory, setCleaningHistory] = useState(INITIAL_HISTORY);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStatus, setDemoStatus] = useState('Ready');
  const demoTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearDemoTimers = () => {
    demoTimersRef.current.forEach(clearTimeout);
    demoTimersRef.current = [];
  };

  // Real-time sensor updates every 2 seconds
  useEffect(() => {
    if (isDemoRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        dust: Math.max(0, Math.min(100, prev.dust + (Math.random() - 0.5) * 2)),
        cloud: Math.max(0, Math.min(100, prev.cloud + (Math.random() - 0.5) * 2)),
        efficiency: Math.max(40, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isDemoRunning]);

  useEffect(() => {
    return () => {
      clearDemoTimers();
    };
  }, []);

  const handleRunDemoFlow = () => {
    if (isDemoRunning) {
      return;
    }

    clearDemoTimers();
    setIsDemoRunning(true);
    setDemoStatus('Step 1: Dust accumulation');
    setSensors(prev => ({
      ...prev,
      dust: 58,
      cloud: 45,
      rain: false,
    }));

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 2: Efficiency drops below threshold');
        setSensors(prev => ({
          ...prev,
          dust: 70,
          cloud: 52,
          efficiency: 68,
          rain: false,
        }));
      }, 2200),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 3: AI trigger cleans and recovers');
        setCleaningHistory(prev => [
          {
            id: prev.length + 1,
            timestamp: new Date().toLocaleString(),
            duration: 11,
            water: 2.4,
            efficiencyBefore: 68,
            efficiencyAfter: 94,
            reason: 'AI Trigger',
          },
          ...prev,
        ].slice(0, 10));

        setSensors(prev => ({
          ...prev,
          dust: 18,
          cloud: 28,
          efficiency: 94,
          rain: false,
        }));
      }, 4600),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Complete');
        setIsDemoRunning(false);
      }, 6200),
    );
  };

  const handleResetDemoFlow = () => {
    clearDemoTimers();
    setIsDemoRunning(false);
    setDemoStatus('Ready');
    setSensors(INITIAL_SENSORS);
    setCleaningHistory(INITIAL_HISTORY);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Solar Panel Monitoring Panel
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            AI-driven cleaning with smart sensor technology (PI 2024000995, TRL 8)
          </p>
        </div>

        {/* Simulator Controls */}
        <div>
          <SimulatorControls
            onRunDemo={handleRunDemoFlow}
            onResetDemo={handleResetDemoFlow}
            isRunning={isDemoRunning}
            demoStatus={demoStatus}
          />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Left: Sensor Metrics */}
          <div>
            <SensorMetrics sensors={sensors} />
          </div>

          {/* Top Right: Efficiency Chart */}
          <div>
            <EfficiencyChart currentEfficiency={sensors.efficiency} />
          </div>
        </div>

        {/* Bottom: Cleaning History */}
        <div>
          <CleaningHistory history={cleaningHistory} />
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Threshold Gauge */}
          <div>
            <ThresholdGauge currentEfficiency={sensors.efficiency} />
          </div>

          {/* Water Usage */}
          <div>
            <WaterUsageChart />
          </div>

          {/* Sensor Accuracy */}
          <div>
            <SensorAccuracyChart />
          </div>
        </div>

        {/* Footer */}
        <div className="pb-4 text-center text-xs text-slate-500 sm:text-sm">
          <p>Real-time data updates every 2 seconds | Zero false triggers | Patent pending</p>
        </div>
      </div>
    </main>
  );
}
