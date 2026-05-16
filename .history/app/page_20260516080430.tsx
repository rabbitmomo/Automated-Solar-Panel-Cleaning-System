'use client';

import { useState, useEffect, useRef } from 'react';
import SimulatorControls from '@/components/SimulatorControls';

type FeatureStep = 1 | 2 | 3 | 4 | 5;

type PanelState = {
  flowAngle: number;
  coverage: number;
  efficiency: number;
  threshold: number;
  sensorConfidence: number;
  dustLevel: number;
  weatherNoise: number;
  agentDose: number;
  waterRate: number;
  coatingRate: number;
  maintenanceSaving: number;
  lifespanIndex: number;
};

const INITIAL_PANEL: PanelState = {
  flowAngle: 45,
  coverage: 90,
  efficiency: 91,
  threshold: 75,
  sensorConfidence: 97,
  dustLevel: 12,
  weatherNoise: 8,
  agentDose: 10,
  waterRate: 14,
  coatingRate: 2,
  maintenanceSaving: 40,
  lifespanIndex: 92,
};

const featureCards = [
  {
    title: 'Curved-Flow Distribution',
    description: 'Even fluid spread with low pressure across 0-90 degree panel angles.',
    keyMetric: 'coverage',
    detail: 'Coverage target',
  },
  {
    title: 'Automated Control System',
    description: 'AI processing triggers cleaning only when performance drops below threshold.',
    keyMetric: 'efficiency',
    detail: 'Trigger threshold',
  },
  {
    title: 'Multi-Agent Integration',
    description: 'Supports water, cleaning agent, and protective coating in one cycle.',
    keyMetric: 'agentDose',
    detail: 'Agent blend',
  },
  {
    title: 'Sensor Network',
    description: 'Photodiodes and photoresistors separate dust from weather-related drops.',
    keyMetric: 'sensorConfidence',
    detail: 'Detection confidence',
  },
  {
    title: 'Low Maintenance & Lifespan',
    description: 'Reduced servicing overhead with long operating life and lower cost.',
    keyMetric: 'maintenanceSaving',
    detail: 'Estimated savings',
  },
];

export default function Home() {
  const [panel, setPanel] = useState<PanelState>(INITIAL_PANEL);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStatus, setDemoStatus] = useState('Ready');
  const [activeStep, setActiveStep] = useState<FeatureStep>(1);
  const demoTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearDemoTimers = () => {
    demoTimersRef.current.forEach(clearTimeout);
    demoTimersRef.current = [];
  };

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
    setDemoStatus('Step 1 of 5: Curved-flow distribution');
    setActiveStep(1);
    setPanel(prev => ({
      ...prev,
      flowAngle: 20,
      coverage: 94,
      waterRate: 13,
    }));

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 2 of 5: Automated control system');
        setActiveStep(2);
        setPanel(prev => ({
          ...prev,
          efficiency: 68,
          threshold: 75,
          dustLevel: 28,
        }));
      }, 1800),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 3 of 5: Multi-agent integration');
        setActiveStep(3);
        setPanel(prev => ({
          ...prev,
          agentDose: 16,
          waterRate: 18,
          coatingRate: 4,
        }));
      }, 3600),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 4 of 5: Sensor network validation');
        setActiveStep(4);
        setPanel(prev => ({
          ...prev,
          sensorConfidence: 99,
          dustLevel: 9,
          weatherNoise: 4,
        }));
      }, 5200),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Step 5 of 5: Low maintenance and longer lifespan');
        setActiveStep(5);
        setPanel(prev => ({
          ...prev,
          efficiency: 93,
          maintenanceSaving: 40,
          lifespanIndex: 96,
          flowAngle: 65,
        }));
      }, 6800),
    );

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Complete');
        setIsDemoRunning(false);
      }, 8200),
    );
  };

  const handleResetDemoFlow = () => {
    clearDemoTimers();
    setIsDemoRunning(false);
    setDemoStatus('Ready');
    setActiveStep(1);
    setPanel(INITIAL_PANEL);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Smart Fluid Distribution Panel
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Curved-flow cleaning system for panel angles from 0-90 degrees.
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live story board</p>
              <h2 className="text-lg font-semibold text-slate-900">Five features in one demo flow</h2>
            </div>
            <p className="text-sm text-slate-600">Active step: {activeStep} of 5</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {featureCards.map((feature, index) => {
              const isActive = activeStep === (index + 1);
              const metricValue = panel[feature.keyMetric as keyof PanelState];

              return (
                <div
                  key={feature.title}
                  className={`rounded-xl border p-4 transition ${
                    isActive ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{feature.detail}</p>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <p className="text-2xl font-semibold text-slate-900">
                      {typeof metricValue === 'number' ? metricValue : metricValue}
                      {feature.keyMetric === 'flowAngle' ? '°' : feature.keyMetric === 'maintenanceSaving' ? '%' : feature.keyMetric === 'agentDose' ? ' mL/L' : feature.keyMetric === 'sensorConfidence' || feature.keyMetric === 'coverage' || feature.keyMetric === 'efficiency' || feature.keyMetric === 'lifespanIndex' ? '%' : ''}
                    </p>
                    <p className="text-xs text-slate-500">
                      {feature.keyMetric === 'flowAngle' && 'Curved flow tuning'}
                      {feature.keyMetric === 'coverage' && 'Even distribution'}
                      {feature.keyMetric === 'efficiency' && 'AI trigger monitoring'}
                      {feature.keyMetric === 'agentDose' && 'Water + agent mix'}
                      {feature.keyMetric === 'sensorConfidence' && 'Dust vs weather separation'}
                      {feature.keyMetric === 'maintenanceSaving' && 'Compared with manual cleaning'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Distribution Overview</h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Flow coverage</span>
                  <span>{panel.coverage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-700" style={{ width: `${panel.coverage}%` }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Efficiency threshold</span>
                  <span>{panel.threshold}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: `${panel.efficiency}%` }} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Agent dose</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.agentDose} mL/L</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Coating rate</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.coatingRate} mL/L</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Sensor confidence</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.sensorConfidence}%</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Panel angle range</span>
                  <span>0° - 90°</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span>0°</span>
                  <div className="relative h-10 flex-1 overflow-hidden rounded-full border border-slate-200 bg-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-blue-100 to-slate-200 opacity-90" />
                    <div
                      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-blue-700"
                      style={{ transform: `translateY(-50%) rotate(${Math.min(90, panel.flowAngle)}deg)` }}
                    />
                  </div>
                  <span>90°</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Curved-flow geometry keeps the fluid low-pressure and evenly spread across the panel surface.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Demo Snapshot</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Current status</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{demoStatus}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Dust accumulation</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.dustLevel}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Weather noise separation</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.weatherNoise}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Maintenance reduction</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Up to {panel.maintenanceSaving}% lower cost</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Lifespan index</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.lifespanIndex}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-4 text-center text-xs text-slate-500 sm:text-sm">
          <p>Frontend-only demo | One button flow | Modern monitoring dashboard</p>
        </div>
      </div>
    </main>
  );
}
