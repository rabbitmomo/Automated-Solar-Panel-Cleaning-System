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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Cleaning History (Last 10 Cycles)</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Timestamp</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Duration (min)</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Water Used (L)</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Efficiency Before</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Efficiency After</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Trigger Reason</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, idx) => (
              <tr key={record.id} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                <td className="px-4 py-3 font-medium text-slate-900">{record.timestamp}</td>
                <td className="px-4 py-3 text-slate-700">{record.duration}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                    {record.water}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-700">{record.efficiencyBefore}%</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-blue-700">{record.efficiencyAfter}%</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    record.reason === 'Manual' 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {record.reason}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Total Water Used</p>
          <p className="text-xl font-semibold text-slate-900">{(history.reduce((sum, r) => sum + r.water, 0)).toFixed(1)} L</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Avg Efficiency Gain</p>
          <p className="text-xl font-semibold text-slate-900">
            {(history.reduce((sum, r) => sum + (r.efficiencyAfter - r.efficiencyBefore), 0) / history.length).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">AI Triggers</p>
          <p className="text-xl font-semibold text-slate-900">{history.filter(r => r.reason === 'AI Trigger').length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">False Triggers</p>
          <p className="text-xl font-semibold text-slate-900">0 (0%)</p>
        </div>
      </div>
    </div>
  );
}
