import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';
import { saveHighScore } from './HighScores';

interface CarGameProps {
  onGameStateChange: (isPlaying: boolean) => void;
  onLapsChange: (laps: number) => void;
}

export const CarGame = ({ onGameStateChange, onLapsChange }: CarGameProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [laps, setLaps] = useState(0);

  const handlePlay = () => {
    setIsPlaying(true);
    setLaps(0);
    onLapsChange(0);
    onGameStateChange(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    onGameStateChange(false);
  };

  const handleLapComplete = (newLaps: number) => {
    setLaps(newLaps);
    onLapsChange(newLaps);
    saveHighScore('race', newLaps);
  };

  return (
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
  );
};
