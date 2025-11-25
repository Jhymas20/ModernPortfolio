'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface SnakeGameProps {
  onExit: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const INITIAL_SPEED = 150;

export default function SnakeGame({ onExit }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  }, [generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused((prev) => !prev);
        return;
      }

      if (gameOver) {
        if (e.key === 'Enter' || e.key === ' ') {
          resetGame();
        }
        return;
      }

      const newDirection = (() => {
        switch (e.key) {
          case 'ArrowUp':
            return directionRef.current !== 'DOWN' ? 'UP' : directionRef.current;
          case 'ArrowDown':
            return directionRef.current !== 'UP' ? 'DOWN' : directionRef.current;
          case 'ArrowLeft':
            return directionRef.current !== 'RIGHT' ? 'LEFT' : directionRef.current;
          case 'ArrowRight':
            return directionRef.current !== 'LEFT' ? 'RIGHT' : directionRef.current;
          default:
            return directionRef.current;
        }
      })();

      if (newDirection !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, onExit, resetGame]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };

        // Move head
        switch (directionRef.current) {
          case 'UP':
            newHead.y -= 1;
            break;
          case 'DOWN':
            newHead.y += 1;
            break;
          case 'LEFT':
            newHead.x -= 1;
            break;
          case 'RIGHT':
            newHead.x += 1;
            break;
        }

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood(newSnake));
          setScore((prev) => prev + 10);
          // Increase speed every 5 food items
          if ((score + 10) % 50 === 0) {
            setSpeed((prev) => Math.max(50, prev - 10));
          }
          return newSnake;
        }

        // Remove tail if no food eaten
        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, speed, food, score, generateFood]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-4 font-mono">
      {/* Header */}
      <div className="mb-4 flex w-full max-w-md items-center justify-between text-green-400">
        <div className="text-lg">SCORE: {score}</div>
        <div className="text-lg">SNAKE</div>
        <div className="text-lg">SPEED: {Math.floor((INITIAL_SPEED - speed) / 10) + 1}</div>
      </div>

      {/* Game Board */}
      <div
        className="relative border-4 border-green-400 bg-black shadow-[0_0_30px_rgba(74,222,128,0.3)]"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${index === 0 ? 'bg-green-300' : 'bg-green-400'}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              boxShadow: '0 0 5px rgba(74, 222, 128, 0.8)',
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute animate-pulse bg-red-500"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-3xl font-bold text-green-400">GAME OVER</div>
            <div className="mt-4 text-xl text-green-400">SCORE: {score}</div>
            <div className="mt-6 text-sm text-green-400/70">
              Press ENTER or SPACE to restart
            </div>
            <div className="mt-2 text-sm text-green-400/70">Press ESC for menu</div>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-3xl font-bold text-green-400">PAUSED</div>
            <div className="mt-4 text-sm text-green-400/70">Press P to continue</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 text-center text-xs text-green-400/60">
        <div>Arrow keys to move • P to pause • ESC for menu</div>
      </div>
    </div>
  );
}
