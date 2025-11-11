import { useEffect, useState, useCallback, useRef } from 'react';
import { saveHighScore } from './HighScores';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

type Tetromino = number[][];
type Board = number[][];

const SHAPES: Tetromino[] = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

const COLORS = ['#00f0f0', '#f0f000', '#a000f0', '#f0a000', '#0000f0', '#00f000', '#f00000'];

export const TetrisGame = () => {
  const [board, setBoard] = useState<Board>(
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino>(SHAPES[0]);
  const [currentColor, setCurrentColor] = useState(0);
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const spawnPiece = useCallback(() => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    setCurrentPiece(SHAPES[shapeIndex]);
    setCurrentColor(shapeIndex);
    setPosition({ x: 4, y: 0 });
  }, []);

  const checkCollision = useCallback(
    (piece: Tetromino, pos: { x: number; y: number }): boolean => {
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x]) {
            const newX = pos.x + x;
            const newY = pos.y + y;
            if (
              newX < 0 ||
              newX >= BOARD_WIDTH ||
              newY >= BOARD_HEIGHT ||
              (newY >= 0 && board[newY][newX])
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board]
  );

  const mergePiece = useCallback(() => {
    const newBoard = board.map((row) => [...row]);
    currentPiece.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentColor + 1;
          }
        }
      });
    });

    // Clear full lines
    let linesCleared = 0;
    const filteredBoard = newBoard.filter((row) => {
      if (row.every((cell) => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });

    while (filteredBoard.length < BOARD_HEIGHT) {
      filteredBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    setBoard(filteredBoard);
    setScore((s) => s + linesCleared * 100);
    return filteredBoard;
  }, [board, currentPiece, position, currentColor]);

  const moveDown = useCallback(() => {
    if (gameOver || isPaused) return;

    const newPos = { x: position.x, y: position.y + 1 };
    if (checkCollision(currentPiece, newPos)) {
      const newBoard = mergePiece();
      spawnPiece();
      
      // Check game over
      if (checkCollision(SHAPES[0], { x: 4, y: 0 })) {
        setGameOver(true);
        saveHighScore('tetris', score);
      }
    } else {
      setPosition(newPos);
    }
  }, [position, currentPiece, checkCollision, mergePiece, spawnPiece, gameOver, isPaused]);

  const rotate = useCallback(() => {
    if (gameOver || isPaused) return;
    
    const rotated = currentPiece[0].map((_, i) =>
      currentPiece.map((row) => row[i]).reverse()
    );
    if (!checkCollision(rotated, position)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, checkCollision, gameOver, isPaused]);

  const move = useCallback(
    (direction: number) => {
      if (gameOver || isPaused) return;
      
      const newPos = { x: position.x + direction, y: position.y };
      if (!checkCollision(currentPiece, newPos)) {
        setPosition(newPos);
      }
    },
    [position, currentPiece, checkCollision, gameOver, isPaused]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowDown') moveDown();
      if (e.key === 'ArrowUp') rotate();
      if (e.key === ' ') setIsPaused((p) => !p);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [move, moveDown, rotate]);

  useEffect(() => {
    const interval = setInterval(moveDown, 500);
    return () => clearInterval(interval);
  }, [moveDown]);

  useEffect(() => {
    spawnPiece();
  }, []);

  const resetGame = () => {
    setBoard(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    spawnPiece();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-background/50 p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">🎮 Tetris</h2>
        <p className="text-lg text-primary font-bold">Score: {score}</p>
        {isPaused && <p className="text-yellow-400">PAUSE</p>}
      </div>

      <div
        className="relative border-4 border-primary/50 rounded-lg bg-black"
        style={{
          width: BOARD_WIDTH * CELL_SIZE,
          height: BOARD_HEIGHT * CELL_SIZE,
        }}
      >
        {/* Board */}
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="absolute border border-gray-800"
              style={{
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell ? COLORS[cell - 1] : 'transparent',
              }}
            />
          ))
        )}

        {/* Current Piece */}
        {currentPiece.map((row, y) =>
          row.map(
            (cell, x) =>
              cell && (
                <div
                  key={`piece-${y}-${x}`}
                  className="absolute"
                  style={{
                    left: (position.x + x) * CELL_SIZE,
                    top: (position.y + y) * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: COLORS[currentColor],
                  }}
                />
              )
          )
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-red-500 mb-4">Game Over!</p>
            <p className="text-xl text-white mb-6">Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        ← → Move | ↑ Rotate | ↓ Drop | Space Pause
      </p>
    </div>
  );
};
