'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface BreakoutGameProps {
  onExit: () => void;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_SIZE = 10;
const PADDLE_SPEED = 8;
const BALL_SPEED = 5;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 55;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 5;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 10;

interface Brick {
  x: number;
  y: number;
  status: number;
  color: string;
}

const BRICK_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#3b82f6'];

export default function BreakoutGame({ onExit }: BreakoutGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameStateRef = useRef({
    paddleX: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
    ballX: CANVAS_WIDTH / 2,
    ballY: CANVAS_HEIGHT - 50,
    ballVelX: BALL_SPEED,
    ballVelY: -BALL_SPEED,
    keys: { left: false, right: false },
    mouseX: CANVAS_WIDTH / 2,
    bricks: [] as Brick[][],
  });

  const initializeBricks = useCallback(() => {
    const bricks: Brick[][] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      bricks[row] = [];
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks[row][col] = {
          x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
          status: 1,
          color: BRICK_COLORS[row],
        };
      }
    }
    gameStateRef.current.bricks = bricks;
  }, []);

  const resetBall = useCallback(() => {
    gameStateRef.current.ballX = CANVAS_WIDTH / 2;
    gameStateRef.current.ballY = CANVAS_HEIGHT - 50;
    const angle = (Math.random() - 0.5) * Math.PI / 4;
    gameStateRef.current.ballVelX = BALL_SPEED * Math.sin(angle);
    gameStateRef.current.ballVelY = -BALL_SPEED * Math.cos(angle);
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setWon(false);
    setIsPaused(false);
    gameStateRef.current.paddleX = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
    initializeBricks();
    resetBall();
  }, [initializeBricks, resetBall]);

  // Initialize bricks on mount
  useEffect(() => {
    initializeBricks();
  }, [initializeBricks]);

  // Keyboard and mouse controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        setIsPaused((prev) => !prev);
        return;
      }
      if ((gameOver || won) && (e.key === 'Enter' || e.key === ' ')) {
        resetGame();
        return;
      }
      if (e.key === 'ArrowLeft') gameStateRef.current.keys.left = true;
      if (e.key === 'ArrowRight') gameStateRef.current.keys.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') gameStateRef.current.keys.left = false;
      if (e.key === 'ArrowRight') gameStateRef.current.keys.right = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      gameStateRef.current.mouseX = (e.clientX - rect.left) * scaleX;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameOver, won, onExit, resetGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;

      if (!isPaused && !gameOver && !won) {
        // Paddle movement (mouse takes priority)
        const targetX = state.mouseX - PADDLE_WIDTH / 2;
        const diff = targetX - state.paddleX;
        if (Math.abs(diff) > 2) {
          state.paddleX += Math.sign(diff) * Math.min(PADDLE_SPEED, Math.abs(diff));
        }

        // Keyboard override
        if (state.keys.left) state.paddleX -= PADDLE_SPEED;
        if (state.keys.right) state.paddleX += PADDLE_SPEED;

        // Keep paddle in bounds
        state.paddleX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, state.paddleX));

        // Ball movement
        state.ballX += state.ballVelX;
        state.ballY += state.ballVelY;

        // Wall collisions
        if (state.ballX <= 0 || state.ballX >= CANVAS_WIDTH - BALL_SIZE) {
          state.ballVelX *= -1;
          state.ballX = Math.max(0, Math.min(CANVAS_WIDTH - BALL_SIZE, state.ballX));
        }
        if (state.ballY <= 0) {
          state.ballVelY *= -1;
          state.ballY = 0;
        }

        // Paddle collision
        if (
          state.ballY + BALL_SIZE >= CANVAS_HEIGHT - PADDLE_HEIGHT - 10 &&
          state.ballY + BALL_SIZE <= CANVAS_HEIGHT - 5 &&
          state.ballX + BALL_SIZE >= state.paddleX &&
          state.ballX <= state.paddleX + PADDLE_WIDTH
        ) {
          state.ballVelY = -Math.abs(state.ballVelY);
          const hitPos = (state.ballX + BALL_SIZE / 2 - state.paddleX) / PADDLE_WIDTH - 0.5;
          state.ballVelX += hitPos * 3;
        }

        // Brick collision
        let bricksRemaining = 0;
        for (let row = 0; row < BRICK_ROWS; row++) {
          for (let col = 0; col < BRICK_COLS; col++) {
            const brick = state.bricks[row][col];
            if (brick.status === 1) {
              bricksRemaining++;
              if (
                state.ballX + BALL_SIZE >= brick.x &&
                state.ballX <= brick.x + BRICK_WIDTH &&
                state.ballY + BALL_SIZE >= brick.y &&
                state.ballY <= brick.y + BRICK_HEIGHT
              ) {
                state.ballVelY *= -1;
                brick.status = 0;
                setScore((prev) => prev + (5 - row) * 10);
              }
            }
          }
        }

        // Check win condition
        if (bricksRemaining === 0) {
          setWon(true);
          setLevel((prev) => prev + 1);
        }

        // Ball out of bounds (lose life)
        if (state.ballY > CANVAS_HEIGHT) {
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            } else {
              resetBall();
            }
            return newLives;
          });
        }
      }

      // Draw
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw bricks
      for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLS; col++) {
          const brick = state.bricks[row][col];
          if (brick.status === 1) {
            ctx.fillStyle = brick.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = brick.color;
            ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
          }
        }
      }

      // Draw paddle
      ctx.fillStyle = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22c55e';
      ctx.fillRect(state.paddleX, CANVAS_HEIGHT - PADDLE_HEIGHT - 10, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.fillRect(state.ballX, state.ballY, BALL_SIZE, BALL_SIZE);

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, gameOver, won, resetBall]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-4 font-mono">
      {/* Header */}
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between text-green-400">
        <div className="text-lg">SCORE: {score}</div>
        <div className="text-lg">BREAKOUT</div>
        <div className="text-lg">LIVES: {lives}</div>
      </div>

      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-3xl font-bold text-green-400">GAME OVER</div>
            <div className="mt-4 text-xl text-green-400">SCORE: {score}</div>
            <div className="mt-2 text-lg text-green-400">LEVEL: {level}</div>
            <div className="mt-6 text-sm text-green-400/70">
              Press ENTER or SPACE to restart
            </div>
            <div className="mt-2 text-sm text-green-400/70">Press ESC for menu</div>
          </div>
        )}

        {/* Win Overlay */}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-3xl font-bold text-green-400">LEVEL COMPLETE!</div>
            <div className="mt-4 text-xl text-green-400">SCORE: {score}</div>
            <div className="mt-2 text-lg text-green-400">NEXT LEVEL: {level}</div>
            <div className="mt-6 text-sm text-green-400/70">
              Press ENTER or SPACE for next level
            </div>
            <div className="mt-2 text-sm text-green-400/70">Press ESC for menu</div>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !gameOver && !won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="text-3xl font-bold text-green-400">PAUSED</div>
            <div className="mt-4 text-sm text-green-400/70">Press P to continue</div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 text-center text-xs text-green-400/60">
        <div>Move mouse or use arrow keys • Break all bricks</div>
        <div className="mt-1">P to pause • ESC for menu</div>
      </div>
    </div>
  );
}
