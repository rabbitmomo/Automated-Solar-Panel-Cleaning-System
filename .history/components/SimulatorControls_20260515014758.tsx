'use client';

interface Props {
  onRain: () => void;
  onDust: () => void;
  onClouds: () => void;
  onClean: () => void;
}

export default function SimulatorControls({ onRain, onDust, onClouds, onClean }: Props) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4">🎮 System Simulator</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Rain Button */}
        <button
          onClick={onRain}
          className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
        >
          🌧️ Trigger Rain
        </button>

        {/* Dust Button */}
        <button
          onClick={onDust}
          className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
        >
          🌪️ Add Dust
        </button>

        {/* Clouds Button */}
        <button
          onClick={onClouds}
          className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
        >
          ☁️ Add Clouds
        </button>

        {/* Manual Clean Button */}
        <button
          onClick={onClean}
          className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
        >
          🧹 Manual Clean
        </button>
      </div>

      <p className="text-sm text-indigo-100 mt-4 text-center">
        💡 Click buttons to simulate environmental conditions and watch the system respond
      </p>
    </div>
  );
}
