'use client';

interface Props {
  onRunDemo: () => void;
  onResetDemo: () => void;
  isRunning: boolean;
  demoStatus: string;
}

export default function SimulatorControls({ onRunDemo, onResetDemo, isRunning, demoStatus }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Demo Flow Controls</h2>
      
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={onRunDemo}
          disabled={isRunning}
          className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 active:bg-blue-900"
        >
          {isRunning ? 'Running Demo...' : 'Run Demo Flow'}
        </button>

        <button
          onClick={onResetDemo}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:bg-slate-200"
        >
          Reset Demo
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-600">
        Status: {demoStatus}
      </p>
    </div>
  );
}
