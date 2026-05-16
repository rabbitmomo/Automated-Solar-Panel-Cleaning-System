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
    { time: '0h', efficiency: 91, threshold: 75 },
    { time: '2h', efficiency: 88, threshold: 75 },
    { time: '4h', efficiency: 82, threshold: 75 },
    { time: '6h', efficiency: 72, threshold: 75 },
    { time: '8h', efficiency: panel.efficiency, threshold: 75 },
    { time: '10h', efficiency: Math.max(85, panel.efficiency + 5), threshold: 75 },
  ];

  const dustCycleData = [
    { phase: 'Initial', dust: panel.dustLevel, coverage: panel.coverage },
    { phase: 'Cleaning', dust: Math.max(2, panel.dustLevel - 10), coverage: Math.max(85, panel.coverage - 5) },
    { phase: 'Post-Clean', dust: 5, coverage: 96 },
  ];

  const systemHealthData = [
    { name: 'Efficiency', value: panel.efficiency },
    { name: 'Lifespan', value: panel.lifespanIndex },
    { name: 'Sensor', value: panel.sensorConfidence },
  ];

  const COLORS = ['#3b82f6', '#1e40af', '#1e3a8a'];

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-full space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Smart Fluid Distribution Panel
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Curved-flow cleaning system with AI monitoring and predictive maintenance.
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
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Efficiency Trend & Threshold</h2>
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
                <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="threshold" stroke="#e11d48" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Dust Cleaning Cycle */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Dust & Coverage Cycle</h2>
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
                <Bar dataKey="dust" fill="#f97316" />
                <Bar dataKey="coverage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operation Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Total Cleanings</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.totalCleanings}</p>
            <p className="mt-1 text-xs text-slate-500">Since deployment</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Avg Duration</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.avgDuration}</p>
            <p className="mt-1 text-xs text-slate-500">Per cleaning cycle</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Water Saved</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.avgWaterSaved}</p>
            <p className="mt-1 text-xs text-slate-500">vs manual cleaning</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">System Uptime</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{operationStats.uptime}</p>
            <p className="mt-1 text-xs text-slate-500">Operational time</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-500">Cost Saved</p>
            <p className="mt-2 text-3xl font-bold text-blue-700">{operationStats.costSaved}</p>
            <p className="mt-1 text-xs text-slate-500">Total savings</p>
          </div>
        </div>

        {/* Historical Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Weekly Water Usage</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={waterUsageHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}
                  labelStyle={{ color: '#1e293b' }}
                  formatter={(value) => `${value}L`}
                />
                <Bar dataKey="usage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Cleaning Operations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Time</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Duration</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Water</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaningHistory.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100">
                      <td className="px-4 py-2 text-slate-900 font-medium">{record.time}</td>
                      <td className="px-4 py-2 text-slate-600">{record.duration}</td>
                      <td className="px-4 py-2 text-slate-600">{record.water}</td>
                      <td className="px-4 py-2 text-slate-900 font-semibold">{record.efficiency}</td>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live story board</p>
              <h2 className="text-lg font-semibold text-slate-900">Ten advanced features in one demo flow</h2>
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
                      {typeof metricValue === 'boolean' ? (metricValue ? '✓' : '−') : metricValue}
                      {feature.keyMetric === 'flowAngle' ? '°' : feature.keyMetric === 'maintenanceSaving' ? '%' : feature.keyMetric === 'agentDose' ? ' mL/L' : feature.keyMetric === 'sensorConfidence' || feature.keyMetric === 'coverage' || feature.keyMetric === 'efficiency' || feature.keyMetric === 'lifespanIndex' || feature.keyMetric === 'predictiveAccuracy' || feature.keyMetric === 'scadaIntegration' ? '%' : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">System Health Score</h2>
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
            <h2 className="text-lg font-semibold text-slate-900">AI Agent Control</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Water Flow Rate</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.waterRate} L/h</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Agent Dose Ratio</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.agentDose} mL/L</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Coating Application</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.coatingRate} mL/L</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Flow Angle</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.flowAngle}°</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Predictive Analytics</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Scheduling Accuracy</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.predictiveAccuracy}%</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Maintenance Alert</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.maintenanceAlertReady ? '🔴 Active' : '🟢 Normal'}</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Thermal Faults</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.thermalSpotsDetected} detected</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">SCADA Uptime</span>
                  <span className="text-lg font-semibold text-slate-900">{panel.scadaIntegration}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Predictive Maintenance Alerts</h2>
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
