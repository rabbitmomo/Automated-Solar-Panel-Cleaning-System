'use client';

interface Props {
  currentEfficiency: number;
}

export default function ThresholdGauge({ currentEfficiency }: Props) {
  const threshold = 75;
  const isAboveThreshold = currentEfficiency >= threshold;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">AI Trigger Threshold</h2>
      
      {/* Gauge Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-slate-100">
          {/* Background circle */}
          <svg className="absolute w-40 h-40" viewBox="0 0 120 120">
            {/* Lower threshold zone */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
              strokeDasharray={`${(75 * Math.PI * 110) / 100} ${Math.PI * 110}`}
            />
            {/* Upper threshold zone */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#bfdbfe"
              strokeWidth="12"
              strokeDasharray={`${(25 * Math.PI * 110) / 100} ${Math.PI * 110}`}
              strokeDashoffset={`${-(75 * Math.PI * 110) / 100}`}
            />
          </svg>

          {/* Center content */}
          <div className="text-center z-10">
            <p className="text-4xl font-semibold text-blue-700">{currentEfficiency.toFixed(0)}</p>
            <p className="text-sm text-slate-600">%</p>
          </div>
        </div>
      </div>

      {/* Threshold Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
          <span className="text-sm font-medium text-slate-600">Current Efficiency</span>
          <span className="font-semibold text-blue-700">{currentEfficiency.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
          <span className="text-sm font-medium text-slate-600">AI Trigger Threshold</span>
          <span className="font-semibold text-slate-900">{threshold}%</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
          <span className="text-sm font-medium text-slate-600">Status</span>
          <span className={`font-semibold ${isAboveThreshold ? 'text-blue-700' : 'text-slate-900'}`}>
            {isAboveThreshold ? 'Above Threshold' : 'Cleaning Needed'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
        <p className="text-xs font-medium text-slate-600">
          Automatic trigger activates when efficiency drops below {threshold}%
        </p>
      </div>
    </div>
  );
}
