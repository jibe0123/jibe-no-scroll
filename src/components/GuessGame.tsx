import { useState, useEffect } from 'react';

export const GuessGame = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<{ guess: number; hint: string }[]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    
    if (isNaN(num) || num < 1 || num > 100) {
      return;
    }

    if (num === targetNumber) {
      setAttempts([...attempts, { guess: num, hint: '🎉 Correct!' }]);
      setIsWon(true);
    } else if (num < targetNumber) {
      setAttempts([...attempts, { guess: num, hint: '⬆️ Too low!' }]);
    } else {
      setAttempts([...attempts, { guess: num, hint: '⬇️ Too high!' }]);
    }
    
    setGuess('');
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts([]);
    setIsWon(false);
    setGuess('');
  };

  return (
    <div className="flex items-center justify-center h-full bg-background/90">
      <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Guess the Number</h2>
        <p className="text-muted-foreground mb-6">I'm thinking of a number between 1 and 100</p>
        
        <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
          {attempts.map((attempt, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-foreground/70">Try #{i + 1}: {attempt.guess}</span>
              <span className={attempt.hint.includes('Correct') ? 'text-green-400' : 'text-primary'}>
                {attempt.hint}
              </span>
            </div>
          ))}
        </div>

        {!isWon ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <input
              type="number"
              min="1"
              max="100"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="flex-1 bg-background/50 border border-border rounded px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="Enter your guess..."
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Guess
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-400 mb-4">
              You won in {attempts.length} attempts! 🎉
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
