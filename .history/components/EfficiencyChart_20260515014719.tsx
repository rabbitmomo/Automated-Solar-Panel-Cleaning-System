'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  currentEfficiency: number;
}

export default function EfficiencyChart({ currentEfficiency }: Props) {
  const [chartData, setChartData] = useState([
    { time: '00:00', efficiency: 88, threshold: 75 },
    { time: '02:00', efficiency: 85, threshold: 75 },
    { time: '04:00', efficiency: 72, threshold: 75 },
    { time: '06:00', efficiency: 68, threshold: 75 },
    { time: '08:00', efficiency: 92, threshold: 75 },
    { time: '10:00', efficiency: 90, threshold: 75 },
    { time: '12:00', efficiency: 75, threshold: 75 },
    { time: '14:00', efficiency: 70, threshold: 75 },
    { time: '16:00', efficiency: 93, threshold: 75 },
    { time: '18:00', efficiency: 91, threshold: 75 },
    { time: '20:00', efficiency: 95, threshold: 75 },
    { time: '22:00', efficiency: 94, threshold: 75 },
  ]);

  useEffect(() => {
    setChartData(prev => {
      const newData = [...prev];
      newData.shift();
      newData.push({
        time: new Date().getHours().toString().padStart(2, '0') + ':00',
        efficiency: currentEfficiency,
        threshold: 75,
      });
      return newData;
    });
  }, [currentEfficiency]);

  const getZoneColor = (efficiency: number) => {
    if (efficiency >= 85) return '#10b981'; // Green
    if (efficiency >= 75) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Efficiency Trend (24h)</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[50, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => `${value.toFixed(1)}%`}
          />
          <Legend />
          <ReferenceLine 
            y={75} 
            stroke="#f59e0b" 
            strokeDasharray="5 5" 
            label={{ value: 'AI Trigger Threshold (75%)', position: 'right', fill: '#f59e0b' }}
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke={getZoneColor(currentEfficiency)} 
            dot={{ fill: getZoneColor(currentEfficiency), r: 4 }}
            strokeWidth={2}
            name="Panel Efficiency"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Color Zones Legend */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <p className="text-sm font-medium text-green-800">✓ Good (85%+)</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg text-center border border-yellow-200">
          <p className="text-sm font-medium text-yellow-800">⚠ Warning (75-85%)</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg text-center border border-red-200">
          <p className="text-sm font-medium text-red-800">🚨 Clean Needed (&lt;75%)</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Updates every 2 seconds with real-time efficiency data
      </p>
    </div>
  );
}
