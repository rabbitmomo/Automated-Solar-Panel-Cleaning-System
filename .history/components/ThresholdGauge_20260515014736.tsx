'use client';

interface Props {
  currentEfficiency: number;
}

export default function ThresholdGauge({ currentEfficiency }: Props) {
  const threshold = 75;
  const percentage = (currentEfficiency / 100) * 100;
  const isAboveThreshold = currentEfficiency >= threshold;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
      <h2 className="text-xl font-bold text-gray-900 mb-6">⚙️ AI Trigger Threshold</h2>
      
      {/* Gauge Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {/* Background circle */}
          <svg className="absolute w-40 h-40" viewBox="0 0 120 120">
            {/* Lower threshold zone (red) */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#fee2e2"
              strokeWidth="12"
              strokeDasharray={`${(75 * Math.PI * 110) / 100} ${Math.PI * 110}`}
            />
            {/* Upper good zone (green) */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#dcfce7"
              strokeWidth="12"
              strokeDasharray={`${(25 * Math.PI * 110) / 100} ${Math.PI * 110}`}
              strokeDashoffset={`${-(75 * Math.PI * 110) / 100}`}
            />
          </svg>

          {/* Center content */}
          <div className="text-center z-10">
            <p className="text-4xl font-bold text-indigo-600">{currentEfficiency.toFixed(0)}</p>
            <p className="text-sm text-gray-600">%</p>
          </div>
        </div>
      </div>

      {/* Threshold Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Current Efficiency</span>
          <span className="font-bold text-indigo-600">{currentEfficiency.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <span className="text-sm font-medium text-yellow-800">AI Trigger Threshold</span>
          <span className="font-bold text-yellow-700">{threshold}%</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-700">Status</span>
          <span className={`font-bold ${isAboveThreshold ? 'text-green-600' : 'text-red-600'}`}>
            {isAboveThreshold ? '✓ Above Threshold' : '⚠️ Cleaning Needed'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-3 bg-indigo-50 rounded-lg text-center border border-indigo-200">
        <p className="text-xs font-medium text-indigo-800">
          Automatic trigger activates when efficiency drops below {threshold}%
        </p>
      </div>
    </div>
  );
}
