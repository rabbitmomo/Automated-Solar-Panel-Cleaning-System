'use client';

import { useState, useEffect } from 'react';
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

export default function Home() {
  const [sensors, setSensors] = useState<SensorState>({
    dust: 15,
    cloud: 30,
    rain: false,
    efficiency: 92,
  });

  const [cleaningHistory, setCleaningHistory] = useState([
    { id: 1, timestamp: '2026-05-15 14:30', duration: 12, water: 2.5, efficiencyBefore: 65, efficiencyAfter: 95, reason: 'Manual' },
    { id: 2, timestamp: '2026-05-15 10:15', duration: 10, water: 2.3, efficiencyBefore: 62, efficiencyAfter: 93, reason: 'AI Trigger' },
    { id: 3, timestamp: '2026-05-14 18:45', duration: 11, water: 2.4, efficiencyBefore: 68, efficiencyAfter: 94, reason: 'AI Trigger' },
    { id: 4, timestamp: '2026-05-14 08:30', duration: 12, water: 2.5, efficiencyBefore: 60, efficiencyAfter: 92, reason: 'Manual' },
  ]);

  // Real-time sensor updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        dust: Math.max(0, Math.min(100, prev.dust + (Math.random() - 0.5) * 2)),
        cloud: Math.max(0, Math.min(100, prev.cloud + (Math.random() - 0.5) * 2)),
        efficiency: Math.max(40, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 1)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateRain = () => {
    setSensors(prev => ({
      ...prev,
      rain: true,
      cloud: Math.min(100, prev.cloud + 20),
    }));
    setTimeout(() => {
      setSensors(prev => ({ ...prev, rain: false }));
    }, 3000);
  };

  const handleSimulateDust = () => {
    setSensors(prev => ({
      ...prev,
      dust: Math.min(100, prev.dust + 25),
    }));
  };

  const handleSimulateClouds = () => {
    setSensors(prev => ({
      ...prev,
      cloud: Math.min(100, prev.cloud + 30),
    }));
  };

  const handleManualClean = () => {
    const newRecord = {
      id: cleaningHistory.length + 1,
      timestamp: new Date().toLocaleString(),
      duration: 11,
      water: 2.4,
      efficiencyBefore: Math.round(sensors.efficiency),
      efficiencyAfter: 94,
      reason: 'Manual',
    };
    setCleaningHistory(prev => [newRecord, ...prev].slice(0, 10));
    setSensors(prev => ({
      ...prev,
      dust: Math.max(0, prev.dust - 80),
      cloud: Math.max(0, prev.cloud - 40),
      efficiency: 94,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌞 Solar Panel Cleaning System
          </h1>
          <p className="text-gray-600">AI-driven cleaning with smart sensor technology (PI 2024000995, TRL 8)</p>
        </div>

        {/* Simulator Controls */}
        <div className="mb-6">
          <SimulatorControls
            onRain={handleSimulateRain}
            onDust={handleSimulateDust}
            onClouds={handleSimulateClouds}
            onClean={handleManualClean}
          />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
        <div className="mb-6">
          <CleaningHistory history={cleaningHistory} />
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Real-time data updates every 2 seconds • Zero false triggers • Patent Pending</p>
        </div>
      </div>
    </main>
  );
}
