'use client';

import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SimulatorControls from '@/components/SimulatorControls';

type FeatureStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
  predictiveAccuracy: number;
  maintenanceAlertReady: boolean;
  thermalSpotsDetected: number;
  scadaIntegration: number;
  hybridModeActive: boolean;
};

const INITIAL_PANEL: PanelState = {
  flowAngle: 18,
  coverage: 96,
  efficiency: 94,
  threshold: 78,
  sensorConfidence: 97,
  dustLevel: 9,
  weatherNoise: 6,
  agentDose: 24,
  waterRate: 12,
  coatingRate: 2,
  maintenanceSaving: 38,
  lifespanIndex: 93,
  predictiveAccuracy: 88,
  maintenanceAlertReady: false,
  thermalSpotsDetected: 0,
  scadaIntegration: 99,
  hybridModeActive: false,
};

const featureCards = [
  {
    title: 'Sensor Alignment',
    description: 'Keeps the sensor array aligned across the panel surface for stable reads.',
    keyMetric: 'coverage',
    detail: 'Coverage target',
  },
  {
    title: 'Signal Health Threshold',
    description: 'AI raises an event when signal quality drops below the alert floor.',
    keyMetric: 'efficiency',
    detail: 'Signal threshold',
  },
  {
    title: 'Sample Rate Control',
    description: 'Controls how often the panel samples each sensor channel.',
    keyMetric: 'agentDose',
    detail: 'Sampling rate',
  },
  {
    title: 'Telemetry Confidence',
    description: 'Separates real sensor drift from temporary interference spikes.',
    keyMetric: 'sensorConfidence',
    detail: 'Detection confidence',
  },
  {
    title: 'Power and Uptime',
    description: 'Tracks device power draw and keeps the gateway online longer.',
    keyMetric: 'maintenanceSaving',
    detail: 'Power saving',
  },
  {
    title: 'Predictive Drift Scoring',
    description: 'Learns drift patterns and predicts when a sensor needs recalibration.',
    keyMetric: 'predictiveAccuracy',
    detail: 'Prediction accuracy',
  },
  {
    title: 'Alert and Alarm Module',
    description: 'Predicts component failures and sends alarms before downtime starts.',
    keyMetric: 'maintenanceAlertReady',
    detail: 'Alarm state',
  },
  {
    title: 'Thermal Anomaly Detection',
    description: 'Detects hot spots from micro-cracks, overloads, or failing nodes.',
    keyMetric: 'thermalSpotsDetected',
    detail: 'Hot spots detected',
  },
  {
    title: 'IoT Gateway Integration',
    description: 'Streams sensor telemetry directly into SCADA and edge systems.',
    keyMetric: 'scadaIntegration',
    detail: 'Gateway uptime',
  },
  {
    title: 'Redundant Failover Mode',
    description: 'Keeps sensor reporting active when the primary channel drops out.',
    keyMetric: 'hybridModeActive',
    detail: 'Failover status',
  },
];

export default function Home() {
  const [panel, setPanel] = useState<PanelState>(INITIAL_PANEL);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [isCleaningCycleRunning, setIsCleaningCycleRunning] = useState(false);
  const [demoStatus, setDemoStatus] = useState('Ready');
  const [activeStep, setActiveStep] = useState<FeatureStep>(1);
  const demoTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  // Historical data states
  const [cleaningHistory, setCleaningHistory] = useState([
    { id: 1, time: '10:00 AM', sensor: 'Temp / Humidity', reading: '28.4°C / 46%', drift: '0.2%', status: 'Stable' },
    { id: 2, time: '08:00 AM', sensor: 'Vibration', reading: '12.1 Hz', drift: '0.5%', status: 'Stable' },
    { id: 3, time: '06:00 AM', sensor: 'Signal Quality', reading: '95%', drift: '0.1%', status: 'Stable' },
  ]);

  const [waterUsageHistory] = useState([
    { day: 'Mon', usage: 98 },
    { day: 'Tue', usage: 99 },
    { day: 'Wed', usage: 97 },
    { day: 'Thu', usage: 100 },
    { day: 'Fri', usage: 98 },
    { day: 'Sat', usage: 96 },
    { day: 'Sun', usage: 97 },
  ]);

  const [maintenanceAlerts] = useState([
    { id: 1, type: 'Battery sag', severity: 'Medium', date: '2 days ago', action: 'Replace backup pack' },
    { id: 2, type: 'Sensor drift', severity: 'Low', date: '5 days ago', action: 'Calibration pending' },
  ]);

  const [solarEnergyHistory] = useState([
    { day: 'Mon', generated: 412, expected: 430, health: 96 },
    { day: 'Tue', generated: 438, expected: 435, health: 99 },
    { day: 'Wed', generated: 401, expected: 428, health: 93 },
    { day: 'Thu', generated: 389, expected: 420, health: 91 },
    { day: 'Fri', generated: 446, expected: 438, health: 101 },
    { day: 'Sat', generated: 455, expected: 442, health: 103 },
    { day: 'Sun', generated: 429, expected: 440, health: 97 },
  ]);

  const [cleaningEvents, setCleaningEvents] = useState([
    { id: 1, time: '09:40 AM', trigger: 'Dust > 12%', result: 'Cycle completed', delta: '-6% dust' },
    { id: 2, time: '06:20 AM', trigger: 'Signal anomaly', result: 'Recalibrated', delta: '+4% health' },
  ]);

  const [operationStats, setOperationStats] = useState({
    totalCleanings: 124000,
    avgDuration: '48ms',
    avgWaterSaved: '96%',
    uptime: '99.4%',
    costSaved: '18',
  });

  const clearDemoTimers = () => {
    demoTimersRef.current.forEach(clearTimeout);
    demoTimersRef.current = [];
  };

  const runCleaningCycle = () => {
    if (isCleaningCycleRunning) {
      return;
    }

    setIsCleaningCycleRunning(true);
    setDemoStatus('Cleaning cycle triggered by dirty sensor detection');

    demoTimersRef.current.push(
      setTimeout(() => {
        setPanel(prev => ({
          ...prev,
          dustLevel: Math.max(2, prev.dustLevel - 7),
          coverage: Math.min(99, prev.coverage + 2),
          efficiency: Math.min(98, prev.efficiency + 3),
          sensorConfidence: Math.min(99, prev.sensorConfidence + 1),
        }));

        setCleaningEvents(prev => [
          {
            id: prev.length + 1,
            time: new Date().toLocaleTimeString(),
            trigger: 'Dirty sensor detected',
            result: 'Auto cleaning started',
            delta: 'Dust reduced',
          },
          ...prev.slice(0, 3),
        ]);

        setDemoStatus('Cleaning cycle completed');
        setIsCleaningCycleRunning(false);
      }, 1800),
    );
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
    setDemoStatus('Step 1 of 10: Sensor alignment check');
    setActiveStep(1);
    setPanel(prev => ({
      ...prev,
      flowAngle: 20,
      coverage: 98,
      waterRate: 12,
    }));

    const steps = [
      { step: 2, delay: 1200, status: 'Step 2 of 10: Signal threshold check', updates: { efficiency: 90, threshold: 78, dustLevel: 14 } },
      { step: 3, delay: 2400, status: 'Step 3 of 10: Sampling rate tuning', updates: { agentDose: 30, waterRate: 13, coatingRate: 3 } },
      { step: 4, delay: 3600, status: 'Step 4 of 10: Telemetry confidence scan', updates: { sensorConfidence: 99, dustLevel: 7, weatherNoise: 3 } },
      { step: 5, delay: 4800, status: 'Step 5 of 10: Power and uptime check', updates: { efficiency: 95, maintenanceSaving: 41, lifespanIndex: 97, flowAngle: 63 } },
      { step: 6, delay: 6000, status: 'Step 6 of 10: Predictive drift scoring', updates: { predictiveAccuracy: 91, dustLevel: 6 } },
      { step: 7, delay: 7200, status: 'Step 7 of 10: Alarm module primed', updates: { maintenanceAlertReady: true } },
      { step: 8, delay: 8400, status: 'Step 8 of 10: Thermal anomaly detection', updates: { thermalSpotsDetected: 2 } },
      { step: 9, delay: 9600, status: 'Step 9 of 10: Gateway sync complete', updates: { scadaIntegration: 100 } },
      { step: 10, delay: 10800, status: 'Step 10 of 10: Redundant failover enabled', updates: { hybridModeActive: true } },
    ];

    steps.forEach(({ step, delay, status, updates }) => {
      demoTimersRef.current.push(
        setTimeout(() => {
          setDemoStatus(status);
          setActiveStep(step as FeatureStep);
          setPanel(prev => ({ ...prev, ...updates }));
        }, delay),
      );
    });

    demoTimersRef.current.push(
      setTimeout(() => {
        setDemoStatus('Complete - Sensor telemetry flow demonstrated');
        setIsDemoRunning(false);
        setCleaningHistory(prev => [
          {
            id: prev.length + 1,
            time: new Date().toLocaleTimeString(),
            sensor: 'Panel scan',
            reading: `${panel.efficiency}% signal / ${panel.sensorConfidence}% confidence`,
            drift: `${Math.max(0, 100 - panel.predictiveAccuracy)}%`,
            status: 'Stable',
          },
          ...prev.slice(0, 2),
        ]);
        
        setOperationStats(prev => ({
          ...prev,
          totalCleanings: prev.totalCleanings + 1,
          costSaved: String(parseInt(prev.costSaved, 10) + 1),
        }));
      }, 12200),
    );
  };

  const handleResetDemoFlow = () => {
    clearDemoTimers();
    setIsDemoRunning(false);
    setDemoStatus('Ready');
    setActiveStep(1);
    setPanel(INITIAL_PANEL);
  };

  // Chart data generation
  const efficiencyTrendData = [
    { time: '0h', efficiency: 94, threshold: 78 },
    { time: '2h', efficiency: 92, threshold: 78 },
    { time: '4h', efficiency: 88, threshold: 78 },
    { time: '6h', efficiency: 84, threshold: 78 },
    { time: '8h', efficiency: panel.efficiency, threshold: 78 },
    { time: '10h', efficiency: Math.max(90, panel.efficiency + 4), threshold: 78 },
  ];

  const dustCycleData = [
    { phase: 'Baseline', dust: panel.dustLevel, coverage: panel.coverage },
    { phase: 'Calibration', dust: Math.max(2, panel.dustLevel - 4), coverage: Math.max(90, panel.coverage - 1) },
    { phase: 'Stable', dust: 4, coverage: 99 },
  ];

  const systemHealthData = [
    { name: 'Signal Health', value: panel.efficiency },
    { name: 'Battery Health', value: panel.lifespanIndex },
    { name: 'Gateway Uptime', value: panel.scadaIntegration },
  ];

  const aiHealthStatus = panel.dustLevel >= 12 || panel.sensorConfidence < 95 || panel.efficiency < panel.threshold ? 'Non-Healthy' : 'Healthy';
  const aiHealthReasons = [
    panel.dustLevel >= 12 ? `Sensor dirt is high at ${panel.dustLevel} dB, which lowers usable output.` : null,
    panel.sensorConfidence < 95 ? `Confidence dropped to ${panel.sensorConfidence}%, so readings are less reliable.` : null,
    panel.efficiency < panel.threshold ? `Signal health at ${panel.efficiency}% is under the ${panel.threshold}% threshold.` : null,
  ].filter((reason): reason is string => reason !== null);

  const solarTrendStatus = solarEnergyHistory[solarEnergyHistory.length - 1].generated >= solarEnergyHistory[solarEnergyHistory.length - 1].expected ? 'Above expected' : 'Below expected';

  const COLORS = ['#3b82f6', '#1e40af', '#1e3a8a'];

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-full space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Solar Sensor Intelligence Dashboard
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Live solar generation, sensor health history, and AI analysis in one frontend demo.
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

        {/* Charts Section - Efficiency Trend */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Sensor Signal Trend & Threshold</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={efficiencyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" name="Signal Health" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="threshold" name="Alert Threshold" stroke="#e11d48" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Dust Cleaning Cycle */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Sensor Noise & Coverage Cycle</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dustCycleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="phase" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                />
                <Legend />
                <Bar dataKey="dust" name="Noise Floor" fill="#f97316" />
                <Bar dataKey="coverage" name="Sensor Coverage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Machine learning history</p>
                <h2 className="text-lg font-semibold text-slate-900">Solar Energy Generated</h2>
              </div>
              <p className="text-sm text-slate-600">{solarTrendStatus}</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={solarEnergyHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                />
                <Legend />
                <Line type="monotone" dataKey="generated" name="Generated kWh" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
                <Line type="monotone" dataKey="expected" name="Expected kWh" stroke="#0f172a" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI health analysis</p>
                <h2 className="text-lg font-semibold text-slate-900">Healthy or Non-Healthy</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${aiHealthStatus === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {aiHealthStatus}
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">AI verdict</span>
                  <span className="text-lg font-semibold text-slate-900">{aiHealthStatus}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  The model compares solar output, sensor drift, confidence, and dust level against the normal operating band.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-600">Why</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {aiHealthReasons.length > 0 ? aiHealthReasons.map(reason => <li key={reason}>• {reason}</li>) : <li>• Output, drift, and confidence all remain within the normal range.</li>}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Generated today</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{solarEnergyHistory[solarEnergyHistory.length - 1].generated} kWh</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Expected today</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{solarEnergyHistory[solarEnergyHistory.length - 1].expected} kWh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operation Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Total Readings</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.totalCleanings}</p>
            <p className="mt-1 text-xs text-slate-500">Since deployment</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Avg Latency</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.avgDuration}</p>
            <p className="mt-1 text-xs text-slate-500">Per sensor packet</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Avg Signal</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.avgWaterSaved}</p>
            <p className="mt-1 text-xs text-slate-500">Across active channels</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Gateway Uptime</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.uptime}</p>
            <p className="mt-1 text-xs text-slate-500">Operational time</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Alerts Blocked</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">{operationStats.costSaved}</p>
            <p className="mt-1 text-xs text-slate-500">Total savings</p>
          </div>
        </div>

        {/* Historical Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Daily Gateway Uptime</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={waterUsageHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="usage" name="Gateway Uptime" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Sensor Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Time</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Sensor</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Reading</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Drift</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaningHistory.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100">
                      <td className="px-4 py-2 font-medium text-slate-900">{record.time}</td>
                      <td className="px-4 py-2 text-slate-600">{record.sensor}</td>
                      <td className="px-4 py-2 text-slate-600">{record.reading}</td>
                      <td className="px-4 py-2 font-semibold text-slate-900">{record.drift}</td>
                      <td className="px-4 py-2 text-slate-600">{record.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live telemetry board</p>
              <h2 className="text-lg font-semibold text-slate-900">Ten sensor features in one demo flow</h2>
            </div>
            <p className="text-sm text-slate-600">Active step: {activeStep} of 10</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {featureCards.map((feature, index) => {
              const isActive = activeStep === (index + 1);
              const metricValue = panel[feature.keyMetric as keyof PanelState];

              return (
                <div
                  key={feature.title}
                  className={`rounded-lg border p-3 transition ${
                    isActive ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{feature.detail}</p>
                  <h3 className="mt-1 text-xs font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{feature.description}</p>
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-slate-900">
                      {typeof metricValue === 'boolean' ? (metricValue ? 'Enabled' : 'Disabled') : metricValue}
                      {feature.keyMetric === 'flowAngle' ? '°' : feature.keyMetric === 'agentDose' ? ' Hz' : feature.keyMetric === 'waterRate' ? ' V' : feature.keyMetric === 'coatingRate' ? ' mA' : feature.keyMetric === 'dustLevel' ? ' dB' : feature.keyMetric === 'thermalSpotsDetected' ? ' events' : feature.keyMetric === 'maintenanceSaving' || feature.keyMetric === 'sensorConfidence' || feature.keyMetric === 'coverage' || feature.keyMetric === 'efficiency' || feature.keyMetric === 'lifespanIndex' || feature.keyMetric === 'predictiveAccuracy' || feature.keyMetric === 'scadaIntegration' ? '%' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Sensor Health Score</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={systemHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {systemHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Edge Gateway Control</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Sampling Rate</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.agentDose} Hz</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Supply Voltage</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.waterRate} V</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Drive Current</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.coatingRate} mA</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Alignment Angle</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.flowAngle}°</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Predictive Diagnostics</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Detection Accuracy</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.predictiveAccuracy}%</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Alarm State</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.maintenanceAlertReady ? 'Active' : 'Normal'}</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Thermal Events</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.thermalSpotsDetected} detected</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Gateway Uptime</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.scadaIntegration}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Sensor Alerts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Alert Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Severity</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-slate-900 font-medium">{alert.type}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        alert.severity === 'High' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{alert.date}</td>
                    <td className="px-4 py-3 text-slate-600">{alert.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Sensor Network Overview</h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Sensor coverage</span>
                  <span>{panel.coverage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-700" style={{ width: `${panel.coverage}%` }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Signal threshold</span>
                  <span>{panel.threshold}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: `${panel.efficiency}%` }} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Sampling rate</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.agentDose} Hz</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Drive current</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.coatingRate} mA</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">Sensor confidence</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">{panel.sensorConfidence}%</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Sensor alignment range</span>
                  <span>0° - 90°</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span>0°</span>
                  <div className="relative h-10 flex-1 overflow-hidden rounded-full border border-slate-200 bg-white">
                    <div className="absolute inset-0 bg-linear-to-r from-slate-200 via-blue-100 to-slate-200 opacity-90" />
                    <div
                      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-blue-700"
                      style={{ transform: `translateY(-50%) rotate(${Math.min(90, panel.flowAngle)}deg)` }}
                    />
                  </div>
                  <span>90°</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Curved sensor geometry keeps readings stable and evenly distributed across the panel surface.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Sensor Snapshot</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Current status</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{demoStatus}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Noise floor</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.dustLevel} dB</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Interference level</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.weatherNoise}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Power reduction</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Up to {panel.maintenanceSaving}% lower draw</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Device health</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.lifespanIndex}%</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Dirty sensor detection</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{panel.dustLevel >= 12 ? 'Cleaning required' : 'Normal'}</p>
              </div>
              <button
                onClick={runCleaningCycle}
                disabled={isCleaningCycleRunning}
                className="w-full rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isCleaningCycleRunning ? 'Cleaning cycle running...' : 'Initiate Cleaning Cycle'}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Cleaning history</p>
              <h2 className="text-lg font-semibold text-slate-900">Dirty Sensor Triggers and Recovery</h2>
            </div>
            <p className="text-sm text-slate-600">Auto-clean cycles triggered by anomalies</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Trigger</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Result</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Delta</th>
                </tr>
              </thead>
              <tbody>
                {cleaningEvents.map((event) => (
                  <tr key={event.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{event.time}</td>
                    <td className="px-4 py-3 text-slate-600">{event.trigger}</td>
                    <td className="px-4 py-3 text-slate-600">{event.result}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{event.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-4 text-center text-xs text-slate-500 sm:text-sm">
          <p>Frontend-only demo | One button flow | Solar and sensor intelligence dashboard</p>
        </div>
      </div>
    </main>
  );
}
