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
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Sensor Accuracy Comparison</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={accuracyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="condition" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[90, 101]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => `${value}%`}
          />
          <Legend />
          <Bar dataKey="photodiode" fill="#ec4899" name="Photodiode" radius={[8, 8, 0, 0]} />
          <Bar dataKey="photoresistor" fill="#f97316" name="Photoresistor" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Accuracy Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-3 bg-pink-50 rounded-lg text-center border border-pink-200">
          <p className="text-xs text-pink-600 font-medium">Photodiode Avg</p>
          <p className="text-2xl font-bold text-pink-900">{avgPhotodiode}%</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg text-center border border-orange-200">
          <p className="text-xs text-orange-600 font-medium">Photoresistor Avg</p>
          <p className="text-2xl font-bold text-orange-900">{avgPhotoresistor}%</p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
        <p className="text-sm font-bold text-purple-800">✓ Dual Sensor Technology</p>
        <p className="text-xs text-purple-700">98.4% accuracy across 1000+ readings • No false triggers</p>
      </div>
    </div>
  );
}
