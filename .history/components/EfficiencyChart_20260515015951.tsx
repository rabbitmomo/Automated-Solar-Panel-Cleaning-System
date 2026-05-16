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

  const lineColor = '#1d4ed8';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Efficiency Trend (24h)</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[50, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Legend />
          <ReferenceLine 
            y={75} 
            stroke="#64748b" 
            strokeDasharray="5 5" 
            label={{ value: 'AI Trigger Threshold (75%)', position: 'right', fill: '#64748b' }}
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke={lineColor}
            dot={{ fill: lineColor, r: 3 }}
            strokeWidth={2.5}
            name="Panel Efficiency"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Zone Legend */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-sm font-medium text-slate-700">Good (85%+)</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-sm font-medium text-slate-700">Warning (75-85%)</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-sm font-medium text-slate-700">Clean Needed (&lt;75%)</p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Updates every 2 seconds with real-time efficiency data
      </p>
    </div>
  );
}
