'use client';

import { useState, useEffect } from 'react';

export type GameType = 'tetris' | 'snake' | 'pong' | 'breakout' | 'asteroids';

interface ArcadeMenuProps {
  onSelectGame: (game: GameType) => void;
}

interface GameOption {
  id: GameType;
  name: string;
  description: string;
  controls: string;
}

const games: GameOption[] = [
  {
    id: 'tetris',
    name: 'TETRIS',
    description: 'Stack blocks and clear lines',
    controls: 'Arrows: Move/Rotate | Space: Drop',
  },
  {
    id: 'snake',
    name: 'SNAKE',
    description: 'Eat food and grow longer',
    controls: 'Arrows: Move',
  },
  {
    id: 'pong',
    name: 'PONG',
    description: 'Classic paddle ball game',
    controls: 'Mouse/Arrows: Move paddle',
  },
  {
    id: 'breakout',
    name: 'BREAKOUT',
    description: 'Break all the bricks',
    controls: 'Mouse/Arrows: Move paddle',
  },
  {
    id: 'asteroids',
    name: 'ASTEROIDS',
    description: 'Destroy asteroids in space',
    controls: 'Arrows: Rotate/Thrust | Space: Shoot',
  },
];

export default function ArcadeMenu({ onSelectGame }: ArcadeMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blinkVisible, setBlinkVisible] = useState(true);

  // Blinking "INSERT COIN" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : games.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < games.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectGame(games[selectedIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelectGame]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-4 font-mono text-green-400">
      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-wider md:text-5xl">
          RETRO ARCADE
        </h1>
        <div className="h-1 w-full bg-green-400" />
        <div
          className={`mt-4 text-lg transition-opacity ${blinkVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          ★ INSERT COIN ★
        </div>
      </div>

      {/* Game List */}
      <div className="w-full max-w-2xl space-y-2">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`w-full border-2 p-4 text-left transition-all ${
              selectedIndex === index
                ? 'border-green-400 bg-green-400/20 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                : 'border-green-400/30 bg-black hover:border-green-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              {selectedIndex === index && (
                <span className="text-2xl animate-pulse">▶</span>
              )}
              <div className="flex-1">
                <div className="mb-1 text-xl font-bold">{game.name}</div>
                <div className="text-sm text-green-400/70">{game.description}</div>
                <div className="mt-1 text-xs text-green-400/50">{game.controls}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-green-400/60">
        <div>Use ↑↓ arrows to select • Press ENTER or SPACE to start</div>
        <div className="mt-2">ESC to return to menu</div>
      </div>
    </div>
  );
}
