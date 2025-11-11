import { useEffect, useState, useCallback, useRef } from 'react';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef<Direction>('RIGHT');

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return snakeBody.some((segment) => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const dir = directionRef.current;

      switch (dir) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore((s) => s + 10);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [gameOver, food, generateFood, checkCollision]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === 'ArrowUp' && directionRef.current !== 'DOWN') {
        directionRef.current = 'UP';
        setDirection('UP');
      } else if (key === 'ArrowDown' && directionRef.current !== 'UP') {
        directionRef.current = 'DOWN';
        setDirection('DOWN');
      } else if (key === 'ArrowLeft' && directionRef.current !== 'RIGHT') {
        directionRef.current = 'LEFT';
        setDirection('LEFT');
      } else if (key === 'ArrowRight' && directionRef.current !== 'LEFT') {
        directionRef.current = 'RIGHT';
        setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-900/20 to-background/50 p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">🐍 Snake</h2>
        <p className="text-lg text-primary font-bold">Score: {score}</p>
      </div>

      <div
        className="relative border-4 border-primary/50 rounded-lg bg-background/80"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />

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

      <p className="mt-4 text-xs text-muted-foreground">Use arrow keys to control</p>
    </div>
  );
};
