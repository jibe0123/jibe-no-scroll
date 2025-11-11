import { useEffect, useState } from 'react';

interface Scores {
  snake: number;
  tetris: number;
  race: number;
}

export const HighScores = () => {
  const [scores, setScores] = useState<Scores>({ snake: 0, tetris: 0, race: 0 });

  useEffect(() => {
    const savedScores = localStorage.getItem('highScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-900/20 to-background/50 p-8">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">🏆 High Scores</h2>
        
        <div className="space-y-4">
          <div className="bg-background/50 border-2 border-primary/30 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐍</span>
                <span className="text-lg font-semibold text-foreground">Snake</span>
              </div>
              <span className="text-2xl font-bold text-primary">{scores.snake}</span>
            </div>
          </div>

          <div className="bg-background/50 border-2 border-primary/30 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <span className="text-lg font-semibold text-foreground">Tetris</span>
              </div>
              <span className="text-2xl font-bold text-primary">{scores.tetris}</span>
            </div>
          </div>

          <div className="bg-background/50 border-2 border-primary/30 rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏎️</span>
                <span className="text-lg font-semibold text-foreground">Race</span>
              </div>
              <span className="text-2xl font-bold text-primary">{scores.race} laps</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Play games to beat these scores!
        </p>
      </div>
    </div>
  );
};

export const saveHighScore = (game: keyof Scores, score: number) => {
  const savedScores = localStorage.getItem('highScores');
  const scores: Scores = savedScores ? JSON.parse(savedScores) : { snake: 0, tetris: 0, race: 0 };
  
  if (score > scores[game]) {
    scores[game] = score;
    localStorage.setItem('highScores', JSON.stringify(scores));
  }
};
