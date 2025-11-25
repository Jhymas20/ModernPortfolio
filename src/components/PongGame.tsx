'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PongGameProps {
  onExit: () => void;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 4;
const WIN_SCORE = 11;

export default function PongGame({ onExit }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const gameStateRef = useRef({
    playerY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    aiY: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    ballX: CANVAS_WIDTH / 2,
    ballY: CANVAS_HEIGHT / 2,
    ballVelX: INITIAL_BALL_SPEED,
    ballVelY: INITIAL_BALL_SPEED,
    keys: { up: false, down: false },
    mouseY: CANVAS_HEIGHT / 2,
  });

  const resetBall = useCallback((towardsPlayer = true) => {
    gameStateRef.current.ballX = CANVAS_WIDTH / 2;
    gameStateRef.current.ballY = CANVAS_HEIGHT / 2;
    const angle = (Math.random() - 0.5) * Math.PI / 3; // -30 to 30 degrees
    const speed = INITIAL_BALL_SPEED;
    gameStateRef.current.ballVelX = (towardsPlayer ? -1 : 1) * speed * Math.cos(angle);
    gameStateRef.current.ballVelY = speed * Math.sin(angle);
  }, []);

  const resetGame = useCallback(() => {
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner(null);
    setIsPaused(false);
    gameStateRef.current.playerY = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    gameStateRef.current.aiY = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    resetBall();
  }, [resetBall]);

  // Keyboard controls
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
      if (gameOver && (e.key === 'Enter' || e.key === ' ')) {
        resetGame();
        return;
      }
      if (e.key === 'ArrowUp') gameStateRef.current.keys.up = true;
      if (e.key === 'ArrowDown') gameStateRef.current.keys.down = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') gameStateRef.current.keys.up = false;
      if (e.key === 'ArrowDown') gameStateRef.current.keys.down = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleY = CANVAS_HEIGHT / rect.height;
      gameStateRef.current.mouseY = (e.clientY - rect.top) * scaleY;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameOver, onExit, resetGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;

      if (!isPaused && !gameOver) {
        // Player movement (mouse takes priority)
        const targetY = state.mouseY - PADDLE_HEIGHT / 2;
        const diff = targetY - state.playerY;
        if (Math.abs(diff) > 2) {
          state.playerY += Math.sign(diff) * Math.min(PADDLE_SPEED, Math.abs(diff));
        }

        // Keyboard override
        if (state.keys.up) state.playerY -= PADDLE_SPEED;
        if (state.keys.down) state.playerY += PADDLE_SPEED;

        // Keep player paddle in bounds
        state.playerY = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, state.playerY));

        // AI movement (follows ball with some lag)
        const aiTarget = state.ballY - PADDLE_HEIGHT / 2;
        const aiDiff = aiTarget - state.aiY;
        state.aiY += Math.sign(aiDiff) * Math.min(PADDLE_SPEED * 0.7, Math.abs(aiDiff));
        state.aiY = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, state.aiY));

        // Ball movement
        state.ballX += state.ballVelX;
        state.ballY += state.ballVelY;

        // Ball collision with top/bottom walls
        if (state.ballY <= 0 || state.ballY >= CANVAS_HEIGHT - BALL_SIZE) {
          state.ballVelY *= -1;
          state.ballY = Math.max(0, Math.min(CANVAS_HEIGHT - BALL_SIZE, state.ballY));
        }

        // Ball collision with player paddle
        if (
          state.ballX <= PADDLE_WIDTH &&
          state.ballY + BALL_SIZE >= state.playerY &&
          state.ballY <= state.playerY + PADDLE_HEIGHT
        ) {
          state.ballVelX = Math.abs(state.ballVelX) * 1.05;
          const hitPos = (state.ballY - state.playerY) / PADDLE_HEIGHT - 0.5;
          state.ballVelY += hitPos * 3;
          state.ballX = PADDLE_WIDTH;
        }

        // Ball collision with AI paddle
        if (
          state.ballX >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE &&
          state.ballY + BALL_SIZE >= state.aiY &&
          state.ballY <= state.aiY + PADDLE_HEIGHT
        ) {
          state.ballVelX = -Math.abs(state.ballVelX) * 1.05;
          const hitPos = (state.ballY - state.aiY) / PADDLE_HEIGHT - 0.5;
          state.ballVelY += hitPos * 3;
          state.ballX = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE;
        }

        // Scoring
        if (state.ballX < 0) {
          setAiScore((prev) => {
            const newScore = prev + 1;
            if (newScore >= WIN_SCORE) {
              setGameOver(true);
              setWinner('ai');
            }
            return newScore;
          });
          resetBall(true);
        } else if (state.ballX > CANVAS_WIDTH) {
          setPlayerScore((prev) => {
            const newScore = prev + 1;
            if (newScore >= WIN_SCORE) {
              setGameOver(true);
              setWinner('player');
            }
            return newScore;
          });
          resetBall(false);
        }
      }

      // Draw
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Center line
      ctx.strokeStyle = '#22c55e40';
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Player paddle
      ctx.fillStyle = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22c55e';
      ctx.fillRect(0, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // AI paddle
      ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Ball
      ctx.fillRect(state.ballX, state.ballY, BALL_SIZE, BALL_SIZE);

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, gameOver, resetBall]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-4 font-mono">
      {/* Header */}
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between text-green-400">
        <div className="text-2xl font-bold">{playerScore}</div>
        <div className="text-lg">PONG</div>
        <div className="text-2xl font-bold">{aiScore}</div>
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
            <div className="text-3xl font-bold text-green-400">
              {winner === 'player' ? 'YOU WIN!' : 'AI WINS!'}
            </div>
            <div className="mt-4 text-xl text-green-400">
              {playerScore} - {aiScore}
            </div>
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
        <div>Move mouse or use arrow keys • First to {WIN_SCORE} wins</div>
        <div className="mt-1">P to pause • ESC for menu</div>
      </div>
    </div>
  );
}
