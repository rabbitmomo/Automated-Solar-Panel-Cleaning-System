'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const accuracyData = [
  { condition: 'Dust', photodiode: 98, photoresistor: 96 },
  { condition: 'Clouds', photodiode: 99, photoresistor: 97 },
  { condition: 'Rain', photodiode: 100, photoresistor: 99 },
  { condition: 'Mixed', photodiode: 97, photoresistor: 95 },
  { condition: 'Snow', photodiode: 98, photoresistor: 96 },
];

export default function SensorAccuracyChart() {
  const avgPhotodiode = (accuracyData.reduce((sum, d) => sum + d.photodiode, 0) / accuracyData.length).toFixed(1);
  const avgPhotoresistor = (accuracyData.reduce((sum, d) => sum + d.photoresistor, 0) / accuracyData.length).toFixed(1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Sensor Accuracy Comparison</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={accuracyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="condition" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[90, 101]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => `${value}%`}
          />
          <Legend />
          <Bar dataKey="photodiode" fill="#1d4ed8" name="Photodiode" radius={[8, 8, 0, 0]} />
          <Bar dataKey="photoresistor" fill="#94a3b8" name="Photoresistor" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Accuracy Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Photodiode Avg</p>
          <p className="text-2xl font-semibold text-slate-900">{avgPhotodiode}%</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Photoresistor Avg</p>
          <p className="text-2xl font-semibold text-slate-900">{avgPhotoresistor}%</p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
        <p className="text-sm font-semibold text-slate-800">Dual Sensor Technology</p>
        <p className="text-xs text-slate-600">98.4% accuracy across 1000+ readings | No false triggers</p>
      </div>
    </div>
  );
}
