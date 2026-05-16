'use client';

interface Props {
  onRain: () => void;
  onDust: () => void;
  onClouds: () => void;
  onClean: () => void;
}

export default function SimulatorControls({ onRain, onDust, onClouds, onClean }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">System Simulator</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Rain Button */}
        <button
          onClick={onRain}
          className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 active:bg-blue-900"
        >
          Trigger Rain
        </button>

        {/* Dust Button */}
        <button
          onClick={onDust}
          className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 active:bg-blue-900"
        >
          Add Dust
        </button>

        {/* Clouds Button */}
        <button
          onClick={onClouds}
          className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 active:bg-blue-900"
        >
          Add Clouds
        </button>

        {/* Manual Clean Button */}
        <button
          onClick={onClean}
          className="rounded-lg border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 active:bg-blue-900"
        >
          Manual Clean
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-600">
        Use these controls to simulate environmental events.
      </p>
    </div>
  );
}
