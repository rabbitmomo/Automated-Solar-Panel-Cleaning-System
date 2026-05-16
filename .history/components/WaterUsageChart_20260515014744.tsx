'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const waterData = [
  { day: 'Mon', usage: 7.2, falseTriggered: 0 },
  { day: 'Tue', usage: 6.8, falseTriggered: 0 },
  { day: 'Wed', usage: 8.1, falseTriggered: 0 },
  { day: 'Thu', usage: 7.5, falseTriggered: 0 },
  { day: 'Fri', usage: 9.2, falseTriggered: 0 },
  { day: 'Sat', usage: 6.9, falseTriggered: 0 },
  { day: 'Sun', usage: 5.4, falseTriggered: 0 },
];

export default function WaterUsageChart() {
  const totalWaterUsed = waterData.reduce((sum, d) => sum + d.usage, 0);
  const avgDailyUsage = (totalWaterUsed / waterData.length).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500">
      <h2 className="text-xl font-bold text-gray-900 mb-4">💧 Water Usage (7 Days)</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={waterData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => `${value}L`}
          />
          <Legend />
          <Bar dataKey="usage" fill="#06b6d4" name="Water Used (L)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-3 bg-cyan-50 rounded-lg text-center border border-cyan-200">
          <p className="text-xs text-cyan-600 font-medium">Total Weekly Usage</p>
          <p className="text-2xl font-bold text-cyan-900">{totalWaterUsed.toFixed(1)} L</p>
        </div>
        <div className="p-3 bg-cyan-50 rounded-lg text-center border border-cyan-200">
          <p className="text-xs text-cyan-600 font-medium">Average Daily</p>
          <p className="text-2xl font-bold text-cyan-900">{avgDailyUsage} L</p>
        </div>
      </div>

      {/* Zero False Triggers Badge */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg text-center border border-green-200">
        <p className="text-sm font-bold text-green-800">✓ ZERO False Triggers</p>
        <p className="text-xs text-green-700">No water wasted on false detections</p>
      </div>
    </div>
  );
}
