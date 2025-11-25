'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface AsteroidsGameProps {
  onExit: () => void;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const SHIP_SIZE = 15;
const ROTATION_SPEED = 0.1;
const THRUST_POWER = 0.2;
const FRICTION = 0.98;
const BULLET_SPEED = 7;
const MAX_BULLETS = 5;

interface Ship {
  x: number;
  y: number;
  angle: number;
  velX: number;
  velY: number;
}

interface Asteroid {
  x: number;
  y: number;
  velX: number;
  velY: number;
  size: 'large' | 'medium' | 'small';
  radius: number;
}

interface Bullet {
  x: number;
  y: number;
  velX: number;
  velY: number;
  life: number;
}

const ASTEROID_SIZES = {
  large: 40,
  medium: 25,
  small: 15,
};

const ASTEROID_POINTS = {
  large: 20,
  medium: 50,
  small: 100,
};

export default function AsteroidsGame({ onExit }: AsteroidsGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameStateRef = useRef({
    ship: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      angle: 0,
      velX: 0,
      velY: 0,
    } as Ship,
    asteroids: [] as Asteroid[],
    bullets: [] as Bullet[],
    keys: { left: false, right: false, up: false, space: false },
    invulnerable: 0,
  });

  const createAsteroid = useCallback(
    (x?: number, y?: number, size: 'large' | 'medium' | 'small' = 'large'): Asteroid => {
      const radius = ASTEROID_SIZES[size];
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;

      return {
        x: x ?? Math.random() * CANVAS_WIDTH,
        y: y ?? Math.random() * CANVAS_HEIGHT,
        velX: Math.cos(angle) * speed,
        velY: Math.sin(angle) * speed,
        size,
        radius,
      };
    },
    []
  );

  const initializeLevel = useCallback(
    (levelNum: number) => {
      const asteroidCount = 3 + levelNum;
      const asteroids: Asteroid[] = [];
      for (let i = 0; i < asteroidCount; i++) {
        let asteroid: Asteroid;
        do {
          asteroid = createAsteroid();
        } while (
          Math.hypot(asteroid.x - CANVAS_WIDTH / 2, asteroid.y - CANVAS_HEIGHT / 2) < 100
        );
        asteroids.push(asteroid);
      }
      gameStateRef.current.asteroids = asteroids;
      gameStateRef.current.bullets = [];
      gameStateRef.current.ship = {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        angle: 0,
        velX: 0,
        velY: 0,
      };
      gameStateRef.current.invulnerable = 120; // 2 seconds
    },
    [createAsteroid]
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    initializeLevel(1);
  }, [initializeLevel]);

  useEffect(() => {
    initializeLevel(level);
  }, []);

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
      if (e.key === 'ArrowLeft') gameStateRef.current.keys.left = true;
      if (e.key === 'ArrowRight') gameStateRef.current.keys.right = true;
      if (e.key === 'ArrowUp') gameStateRef.current.keys.up = true;
      if (e.key === ' ') {
        e.preventDefault();
        gameStateRef.current.keys.space = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') gameStateRef.current.keys.left = false;
      if (e.key === 'ArrowRight') gameStateRef.current.keys.right = false;
      if (e.key === 'ArrowUp') gameStateRef.current.keys.up = false;
      if (e.key === ' ') gameStateRef.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver, onExit, resetGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastBulletTime = 0;

    const gameLoop = (timestamp: number) => {
      const state = gameStateRef.current;

      if (!isPaused && !gameOver) {
        // Ship rotation
        if (state.keys.left) state.ship.angle -= ROTATION_SPEED;
        if (state.keys.right) state.ship.angle += ROTATION_SPEED;

        // Ship thrust
        if (state.keys.up) {
          state.ship.velX += Math.cos(state.ship.angle) * THRUST_POWER;
          state.ship.velY += Math.sin(state.ship.angle) * THRUST_POWER;
        }

        // Apply friction
        state.ship.velX *= FRICTION;
        state.ship.velY *= FRICTION;

        // Move ship
        state.ship.x += state.ship.velX;
        state.ship.y += state.ship.velY;

        // Wrap ship around screen
        if (state.ship.x < 0) state.ship.x = CANVAS_WIDTH;
        if (state.ship.x > CANVAS_WIDTH) state.ship.x = 0;
        if (state.ship.y < 0) state.ship.y = CANVAS_HEIGHT;
        if (state.ship.y > CANVAS_HEIGHT) state.ship.y = 0;

        // Shooting
        if (state.keys.space && timestamp - lastBulletTime > 200 && state.bullets.length < MAX_BULLETS) {
          state.bullets.push({
            x: state.ship.x + Math.cos(state.ship.angle) * SHIP_SIZE,
            y: state.ship.y + Math.sin(state.ship.angle) * SHIP_SIZE,
            velX: Math.cos(state.ship.angle) * BULLET_SPEED,
            velY: Math.sin(state.ship.angle) * BULLET_SPEED,
            life: 60,
          });
          lastBulletTime = timestamp;
        }

        // Update bullets
        state.bullets = state.bullets
          .map((bullet) => ({
            ...bullet,
            x: bullet.x + bullet.velX,
            y: bullet.y + bullet.velY,
            life: bullet.life - 1,
          }))
          .filter((bullet) => bullet.life > 0);

        // Update asteroids
        state.asteroids.forEach((asteroid) => {
          asteroid.x += asteroid.velX;
          asteroid.y += asteroid.velY;

          // Wrap around screen
          if (asteroid.x < -asteroid.radius) asteroid.x = CANVAS_WIDTH + asteroid.radius;
          if (asteroid.x > CANVAS_WIDTH + asteroid.radius) asteroid.x = -asteroid.radius;
          if (asteroid.y < -asteroid.radius) asteroid.y = CANVAS_HEIGHT + asteroid.radius;
          if (asteroid.y > CANVAS_HEIGHT + asteroid.radius) asteroid.y = -asteroid.radius;
        });

        // Bullet-asteroid collision
        const newAsteroids: Asteroid[] = [];
        state.bullets = state.bullets.filter((bullet) => {
          let hit = false;
          state.asteroids = state.asteroids.filter((asteroid) => {
            const dist = Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y);
            if (dist < asteroid.radius) {
              hit = true;
              setScore((prev) => prev + ASTEROID_POINTS[asteroid.size]);

              // Split asteroid
              if (asteroid.size === 'large') {
                newAsteroids.push(createAsteroid(asteroid.x, asteroid.y, 'medium'));
                newAsteroids.push(createAsteroid(asteroid.x, asteroid.y, 'medium'));
              } else if (asteroid.size === 'medium') {
                newAsteroids.push(createAsteroid(asteroid.x, asteroid.y, 'small'));
                newAsteroids.push(createAsteroid(asteroid.x, asteroid.y, 'small'));
              }

              return false;
            }
            return true;
          });
          return !hit;
        });
        state.asteroids.push(...newAsteroids);

        // Ship-asteroid collision
        if (state.invulnerable > 0) {
          state.invulnerable--;
        } else {
          for (const asteroid of state.asteroids) {
            const dist = Math.hypot(state.ship.x - asteroid.x, state.ship.y - asteroid.y);
            if (dist < asteroid.radius + SHIP_SIZE) {
              setLives((prev) => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  setGameOver(true);
                } else {
                  state.ship = {
                    x: CANVAS_WIDTH / 2,
                    y: CANVAS_HEIGHT / 2,
                    angle: 0,
                    velX: 0,
                    velY: 0,
                  };
                  state.invulnerable = 120;
                }
                return newLives;
              });
              break;
            }
          }
        }

        // Level complete
        if (state.asteroids.length === 0) {
          setLevel((prev) => {
            const newLevel = prev + 1;
            initializeLevel(newLevel);
            return newLevel;
          });
        }
      }

      // Draw
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw ship
      if (!gameOver && (state.invulnerable === 0 || Math.floor(state.invulnerable / 10) % 2 === 0)) {
        ctx.save();
        ctx.translate(state.ship.x, state.ship.y);
        ctx.rotate(state.ship.angle);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(SHIP_SIZE, 0);
        ctx.lineTo(-SHIP_SIZE, -SHIP_SIZE / 2);
        ctx.lineTo(-SHIP_SIZE / 2, 0);
        ctx.lineTo(-SHIP_SIZE, SHIP_SIZE / 2);
        ctx.closePath();
        ctx.stroke();

        // Thrust flame
        if (state.keys.up && !isPaused) {
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.moveTo(-SHIP_SIZE / 2, -3);
          ctx.lineTo(-SHIP_SIZE / 2 - 8, 0);
          ctx.lineTo(-SHIP_SIZE / 2, 3);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      // Draw asteroids
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#22c55e';
      state.asteroids.forEach((asteroid) => {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const variance = 0.8 + Math.random() * 0.4;
          const x = asteroid.x + Math.cos(angle) * asteroid.radius * variance;
          const y = asteroid.y + Math.sin(angle) * asteroid.radius * variance;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // Draw bullets
      ctx.fillStyle = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22c55e';
      state.bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4);
      });

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, gameOver, initializeLevel, createAsteroid]);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-4 font-mono">
      {/* Header */}
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between text-green-400">
        <div className="text-lg">SCORE: {score}</div>
        <div className="text-lg">ASTEROIDS</div>
        <div className="flex items-center gap-4">
          <div className="text-lg">LEVEL: {level}</div>
          <div className="text-lg">LIVES: {lives}</div>
        </div>
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
        <div>← → to rotate • ↑ to thrust • SPACE to shoot</div>
        <div className="mt-1">P to pause • ESC for menu</div>
      </div>
    </div>
  );
}
