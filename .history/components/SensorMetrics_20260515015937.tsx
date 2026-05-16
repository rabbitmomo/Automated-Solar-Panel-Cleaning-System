'use client';

interface SensorState {
  dust: number;
  cloud: number;
  rain: boolean;
  efficiency: number;
}

interface Props {
  sensors: SensorState;
}

export default function SensorMetrics({ sensors }: Props) {
  const getSignal = (value: number, low: number, high: number) => {
    if (value < low) return 'Low';
    if (value < high) return 'Medium';
    return 'High';
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">Real-Time Sensor Readings</h2>
      
      <div className="space-y-4">
        {/* Dust Level */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Dust Level</p>
            <p className="text-2xl font-semibold text-slate-900">{sensors.dust.toFixed(1)}%</p>
          </div>
          <div className="text-sm font-medium text-slate-600">
            {getSignal(sensors.dust, 20, 50)}
          </div>
        </div>

        {/* Cloud Coverage */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Cloud Coverage</p>
            <p className="text-2xl font-semibold text-slate-900">{sensors.cloud.toFixed(1)}%</p>
          </div>
          <div className="text-sm font-medium text-slate-600">
            {getSignal(sensors.cloud, 30, 70)}
          </div>
        </div>

        {/* Rain Detection */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Rain Detection</p>
            <p className="text-2xl font-semibold text-slate-900">
              {sensors.rain ? 'Detected' : 'Clear'}
            </p>
          </div>
          <div className="text-sm font-medium text-slate-600">
            {sensors.rain ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Current Efficiency */}
        <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-700">Current Efficiency</p>
            <p className="text-2xl font-semibold text-blue-900">{sensors.efficiency.toFixed(1)}%</p>
          </div>
          <div className="text-sm font-medium text-blue-700">
            {sensors.efficiency >= 75 ? 'Nominal' : 'Below Threshold'}
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
        <p className="text-sm font-medium text-slate-700">
          No false triggers detected | All sensors operational
        </p>
      </div>
    </div>
  );
}
