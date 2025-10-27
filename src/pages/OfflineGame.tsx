/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Bot, Play } from 'lucide-react';

const OfflineGame = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numBots, setNumBots] = useState(3);

  const startGame = () => {
    // TODO: Initialize offline game logic
    console.log('Starting offline game:', { difficulty, numBots });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Offline Mode</h1>
        <p className="text-gray-600">Practice against AI bots</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Bots
            </label>
            <select
              value={numBots}
              onChange={(e) => setNumBots(Number(e.target.value))}
              className="input-field"
            >
              <option value={1}>1 Bot</option>
              <option value={2}>2 Bots</option>
              <option value={3}>3 Bots</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`py-3 rounded-lg font-medium transition ${
                    difficulty === level
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
          >
            <Play className="w-6 h-6" />
            <span>Start Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineGame;