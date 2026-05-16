'use client';

interface CleaningRecord {
  id: number;
  timestamp: string;
  duration: number;
  water: number;
  efficiencyBefore: number;
  efficiencyAfter: number;
  reason: string;
}

interface Props {
  history: CleaningRecord[];
}

export default function CleaningHistory({ history }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🧹 Cleaning History (Last 10 Cycles)</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration (min)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Water Used (L)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Efficiency Before</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Efficiency After</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Trigger Reason</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, idx) => (
              <tr key={record.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4 text-gray-900 font-medium">{record.timestamp}</td>
                <td className="py-3 px-4 text-gray-700">{record.duration}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                    {record.water}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-red-600">{record.efficiencyBefore}%</span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-green-600">{record.efficiencyAfter}%</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    record.reason === 'Manual' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {record.reason === 'Manual' ? '👆' : '🤖'} {record.reason}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
          <p className="text-xs text-blue-600 font-medium">Total Water Used</p>
          <p className="text-xl font-bold text-blue-900">{(history.reduce((sum, r) => sum + r.water, 0)).toFixed(1)} L</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <p className="text-xs text-green-600 font-medium">Avg Efficiency Gain</p>
          <p className="text-xl font-bold text-green-900">
            {(history.reduce((sum, r) => sum + (r.efficiencyAfter - r.efficiencyBefore), 0) / history.length).toFixed(1)}%
          </p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
          <p className="text-xs text-purple-600 font-medium">AI Triggers</p>
          <p className="text-xl font-bold text-purple-900">{history.filter(r => r.reason === 'AI Trigger').length}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg text-center border border-red-200">
          <p className="text-xs text-red-600 font-medium">False Triggers</p>
          <p className="text-xl font-bold text-red-900">0 (0%)</p>
        </div>
      </div>
    </div>
  );
}
