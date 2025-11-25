'use client';

import { useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';

// Tetris pieces (tetrominoes)
const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

type Board = number[][];
type Piece = number[][];

interface Position {
  x: number;
  y: number;
}

interface TetrisGameProps {
  onGameOver?: () => void;
  onExit?: () => void;
}

export interface TetrisGameControls {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
  reset: () => void;
}

export const TetrisGame = forwardRef<TetrisGameControls, TetrisGameProps>(({ onGameOver, onExit }, ref) => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece>([]);
  const [nextPiece, setNextPiece] = useState<Piece>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 4, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  function createEmptyBoard(): Board {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
  }

  function getRandomPiece(): Piece {
    const pieces = Object.values(TETROMINOES);
    return pieces[Math.floor(Math.random() * pieces.length)];
  }

  // Initialize game
  useEffect(() => {
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
  }, []);

  const moveDown = useCallback(() => {
    if (canMove(currentPiece, currentPosition.x, currentPosition.y + 1)) {
      setCurrentPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      mergePiece();
    }
  }, [currentPiece, currentPosition, board]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused || currentPiece.length === 0) return;

    const interval = setInterval(() => {
      moveDown();
    }, 1000 - (level - 1) * 100);

    return () => clearInterval(interval);
  }, [gameOver, isPaused, currentPiece, level, moveDown]);

  const canMove = (piece: Piece, newX: number, newY: number): boolean => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;

          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }

          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const mergePiece = () => {
    const newBoard = board.map(row => [...row]);

    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x]) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }

    setBoard(newBoard);
    clearLines(newBoard);

    // Spawn new piece (use next piece)
    const newPos = { x: 4, y: 0 };

    if (!canMove(nextPiece, newPos.x, newPos.y)) {
      setGameOver(true);
      if (onGameOver) {
        setTimeout(() => onGameOver(), 2000); // Wait 2 seconds before calling onGameOver
      }
    } else {
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
      setCurrentPosition(newPos);
    }
  };

  const clearLines = (newBoard: Board) => {
    let linesCleared = 0;

    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++; // Check the same row again
      }
    }

    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      setScore(prev => prev + linesCleared * 100 * level);
      setLevel(Math.floor(lines / 10) + 1);
    }
  };

  // Render the board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    // Add current piece to display
    if (currentPiece.length > 0) {
      for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
          if (currentPiece[y][x]) {
            const boardY = currentPosition.y + y;
            const boardX = currentPosition.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = 2; // 2 represents current piece
            }
          }
        }
      }
    }

    return displayBoard;
  };

  // Hard drop function (space bar)
  const hardDrop = useCallback(() => {
    let newY = currentPosition.y;
    // Find the lowest possible position
    while (canMove(currentPiece, currentPosition.x, newY + 1)) {
      newY++;
    }

    // Update position and merge immediately
    setCurrentPosition(prev => ({ ...prev, y: newY }));

    // Merge the piece at the new position
    const newBoard = board.map(row => [...row]);
    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x]) {
          const boardY = newY + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }

    setBoard(newBoard);
    clearLines(newBoard);

    // Spawn new piece
    const newPos = { x: 4, y: 0 };
    if (!canMove(nextPiece, newPos.x, newPos.y)) {
      setGameOver(true);
      if (onGameOver) {
        setTimeout(() => onGameOver(), 2000);
      }
    } else {
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
      setCurrentPosition(newPos);
    }
  }, [currentPiece, currentPosition, board, nextPiece, onGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // ESC to exit to menu
      if (e.key === 'Escape' && onExit) {
        onExit();
        return;
      }

      if (gameOver || isPaused) return;

      // Prevent default behavior for arrow keys and space (stops page scrolling)
      if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (canMove(currentPiece, currentPosition.x - 1, currentPosition.y)) {
            setCurrentPosition(prev => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          if (canMove(currentPiece, currentPosition.x + 1, currentPosition.y)) {
            setCurrentPosition(prev => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          // Rotate piece
          const rotated = rotatePiece(currentPiece);
          if (canMove(rotated, currentPosition.x, currentPosition.y)) {
            setCurrentPiece(rotated);
          }
          break;
        case ' ':
          // Hard drop with space bar
          hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, currentPosition, gameOver, isPaused, onExit]);

  const rotatePiece = (piece: Piece): Piece => {
    const newPiece: Piece = [];
    for (let x = 0; x < piece[0].length; x++) {
      const row: number[] = [];
      for (let y = piece.length - 1; y >= 0; y--) {
        row.push(piece[y][x]);
      }
      newPiece.push(row);
    }
    return newPiece;
  };

  // Expose control methods via ref
  useImperativeHandle(ref, () => ({
    moveLeft: () => {
      if (gameOver || isPaused) return;
      if (canMove(currentPiece, currentPosition.x - 1, currentPosition.y)) {
        setCurrentPosition(prev => ({ ...prev, x: prev.x - 1 }));
      }
    },
    moveRight: () => {
      if (gameOver || isPaused) return;
      if (canMove(currentPiece, currentPosition.x + 1, currentPosition.y)) {
        setCurrentPosition(prev => ({ ...prev, x: prev.x + 1 }));
      }
    },
    moveDown: () => {
      if (gameOver || isPaused) return;
      moveDown();
    },
    rotate: () => {
      if (gameOver || isPaused) return;
      const rotated = rotatePiece(currentPiece);
      if (canMove(rotated, currentPosition.x, currentPosition.y)) {
        setCurrentPiece(rotated);
      }
    },
    hardDrop: () => {
      if (gameOver || isPaused) return;
      hardDrop();
    },
    reset: () => {
      setBoard(createEmptyBoard());
      setCurrentPiece(getRandomPiece());
      setNextPiece(getRandomPiece());
      setCurrentPosition({ x: 4, y: 0 });
      setScore(0);
      setLevel(1);
      setLines(0);
      setGameOver(false);
      setIsPaused(false);
    },
  }));

  const displayBoard = renderBoard();

  return (
    <div className="w-full h-full flex bg-[#9bbc0f] p-1 overflow-hidden relative">
      {/* Game Grid */}
      <div className="flex-1 bg-[#8bac0f] border-2 border-[#0f380f] p-0.5 flex items-center justify-center overflow-hidden">
        <div
          className="grid gap-0 h-full"
          style={{
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
            aspectRatio: `${BOARD_WIDTH} / ${BOARD_HEIGHT}`,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {displayBoard.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`aspect-square ${
                  cell === 2
                    ? 'bg-[#0f380f] border-2 border-[#0f380f]' // Current piece - thick border
                    : cell === 1
                    ? 'bg-[#306230] border-2 border-[#0f380f]' // Placed blocks - thick border
                    : 'bg-[#8bac0f] border border-[#0f380f]/5' // Empty - thin border
                }`}
                style={{
                  backgroundImage: cell !== 0
                    ? 'radial-gradient(circle at 25% 25%, rgba(15, 56, 15, 0.3) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(15, 56, 15, 0.3) 1px, transparent 1px)'
                    : undefined,
                  backgroundSize: cell !== 0 ? '50% 50%' : undefined,
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Score Panel */}
      <div className="w-20 ml-1 flex flex-col gap-1 text-[#0f380f] font-mono overflow-hidden">
        <div className="bg-[#8bac0f] border-2 border-[#0f380f] p-0.5 flex flex-col justify-center">
          <div className="text-[6px] font-bold leading-tight">SCORE</div>
          <div className="text-xs font-bold leading-tight">{score}</div>
        </div>
        <div className="bg-[#8bac0f] border-2 border-[#0f380f] p-0.5 flex flex-col justify-center">
          <div className="text-[6px] font-bold leading-tight">LEVEL</div>
          <div className="text-xs font-bold leading-tight">{level}</div>
        </div>
        <div className="bg-[#8bac0f] border-2 border-[#0f380f] p-0.5 flex flex-col justify-center">
          <div className="text-[6px] font-bold leading-tight">LINES</div>
          <div className="text-xs font-bold leading-tight">{lines}</div>
        </div>

        {/* Next Piece Preview */}
        <div className="bg-[#8bac0f] border-2 border-[#0f380f] p-0.5 flex-1 flex flex-col">
          <div className="text-[6px] font-bold leading-tight mb-0.5">NEXT</div>
          <div className="flex-1 flex items-center justify-center">
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(4, 8px)`,
                gridTemplateRows: `repeat(4, 8px)`,
              }}
            >
              {Array(4).fill(null).map((_, y) =>
                Array(4).fill(null).map((_, x) => {
                  const inPiece = nextPiece[y] && nextPiece[y][x];
                  return (
                    <div
                      key={`next-${y}-${x}`}
                      className={`w-full h-full ${
                        inPiece ? 'bg-[#0f380f] border border-[#0f380f]/20' : 'bg-transparent'
                      }`}
                      style={{
                        backgroundImage: inPiece
                          ? 'radial-gradient(circle at 25% 25%, rgba(15, 56, 15, 0.3) 1px, transparent 1px)'
                          : undefined,
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-[#9bbc0f] border-2 border-[#0f380f] p-2 text-center">
            <div className="text-[#0f380f] font-bold text-sm mb-1">GAME OVER</div>
            <div className="text-[#0f380f] text-xs">Score: {score}</div>
          </div>
        </div>
      )}
    </div>
  );
});

TetrisGame.displayName = 'TetrisGame';
