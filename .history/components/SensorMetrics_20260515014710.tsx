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
  const getDustColor = (dust: number) => {
    if (dust < 20) return 'text-green-600';
    if (dust < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCloudColor = (cloud: number) => {
    if (cloud < 30) return 'text-green-600';
    if (cloud < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
      <h2 className="text-xl font-bold text-gray-900 mb-6">📡 Real-Time Sensor Readings</h2>
      
      <div className="space-y-4">
        {/* Dust Level */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 font-medium">Dust Level</p>
            <p className="text-2xl font-bold text-gray-900">{sensors.dust.toFixed(1)}%</p>
          </div>
          <div className={`text-4xl font-bold ${getDustColor(sensors.dust)}`}>
            {sensors.dust < 20 ? '✓' : sensors.dust < 50 ? '⚠' : '🚨'}
          </div>
        </div>

        {/* Cloud Coverage */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 font-medium">Cloud Coverage</p>
            <p className="text-2xl font-bold text-gray-900">{sensors.cloud.toFixed(1)}%</p>
          </div>
          <div className={`text-4xl font-bold ${getCloudColor(sensors.cloud)}`}>
            {sensors.cloud < 30 ? '☀️' : sensors.cloud < 70 ? '⛅' : '☁️'}
          </div>
        </div>

        {/* Rain Detection */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 font-medium">Rain Detection</p>
            <p className="text-2xl font-bold text-gray-900">
              {sensors.rain ? 'DETECTED' : 'Clear'}
            </p>
          </div>
          <div className="text-4xl">
            {sensors.rain ? '🌧️' : '✓'}
          </div>
        </div>

        {/* Current Efficiency */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
          <div>
            <p className="text-sm text-blue-600 font-medium">Current Efficiency</p>
            <p className="text-2xl font-bold text-blue-900">{sensors.efficiency.toFixed(1)}%</p>
          </div>
          <div className="text-4xl font-bold text-blue-600">⚡</div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-sm font-medium text-green-800">
          ✓ No False Triggers Detected • All Sensors Operational
        </p>
      </div>
    </div>
  );
}
