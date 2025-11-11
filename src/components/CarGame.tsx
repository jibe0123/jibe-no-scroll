import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

export const CarGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Position sur le périmètre (0-100%)
  const [laps, setLaps] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      setDirection('forward');
      setPosition((prev) => {
        const newPos = (prev + 2) % 100;
        if (prev > 95 && newPos < 5) {
          setLaps((l) => l + 1);
        }
        return newPos;
      });
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      setDirection('backward');
      setPosition((prev) => {
        const newPos = prev - 2;
        if (newPos < 0) {
          setLaps((l) => Math.max(0, l - 1));
          return 100 + newPos;
        }
        return newPos;
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isPlaying, handleKeyPress]);

  const getCarPosition = () => {
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 32 : 1000;
    const containerHeight = typeof window !== 'undefined' ? window.innerHeight - 32 : 800;
    const perimeter = 2 * (containerWidth + containerHeight);
    const distance = (position / 100) * perimeter;

    let x = 0, y = 0, rotation = 0;

    if (distance < containerWidth) {
      // Top edge - going right
      x = distance;
      y = -16;
      rotation = 90;
    } else if (distance < containerWidth + containerHeight) {
      // Right edge - going down
      x = containerWidth;
      y = distance - containerWidth - 16;
      rotation = 180;
    } else if (distance < 2 * containerWidth + containerHeight) {
      // Bottom edge - going left
      x = containerWidth - (distance - containerWidth - containerHeight);
      y = containerHeight;
      rotation = 270;
    } else {
      // Left edge - going up
      x = -16;
      y = containerHeight - (distance - 2 * containerWidth - containerHeight);
      rotation = 0;
    }

    if (direction === 'backward') {
      rotation = (rotation + 180) % 360;
    }

    return { x, y, rotation };
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setPosition(0);
    setLaps(0);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const carPos = isPlaying ? getCarPosition() : null;

  return (
    <>
      <Button
        onClick={isPlaying ? handleStop : handlePlay}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-secondary/70 transition-all duration-200"
        aria-label={isPlaying ? "Arrêter le jeu" : "Démarrer le jeu"}
      >
        {isPlaying ? (
          <>
            <X className="w-4 h-4" />
            Stop
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Jouer
          </>
        )}
      </Button>

      {isPlaying && carPos && (
        <>
          {/* Car */}
          <div
            className="fixed text-3xl pointer-events-none transition-all duration-75 z-50"
            style={{
              left: `${carPos.x + 16}px`,
              top: `${carPos.y + 16}px`,
              transform: `rotate(${carPos.rotation}deg)`,
            }}
          >
            🏎️
          </div>

          {/* Lap Counter */}
          <div className="fixed top-24 right-8 bg-background/95 backdrop-blur-sm border-2 border-primary/50 rounded-xl p-4 shadow-lg z-50 animate-fade-in">
            <div className="text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Tours
              </p>
              <p className="text-4xl font-bold text-primary">
                {laps}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                ← → ou ↑ ↓
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
