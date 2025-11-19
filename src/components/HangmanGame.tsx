import { useState, useEffect } from 'react';

const WORDS = [
  'KUBERNETES', 'TYPESCRIPT', 'REACT', 'BLOCKCHAIN', 'ALGORITHM', 'TENSOR',
  'NEURAL', 'DOCKER', 'GOLANG', 'PYTHON', 'JAVASCRIPT', 'DATABASE',
  'QUANTUM', 'COMPILER', 'BACKEND', 'FRONTEND', 'DEVOPS', 'MACHINE'
];

export const HangmanGame = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [input, setInput] = useState('');
  const maxWrong = 6;

  useEffect(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const letter = input.toUpperCase();
    
    if (letter.length !== 1 || !/[A-Z]/.test(letter) || guessedLetters.has(letter)) {
      setInput('');
      return;
    }

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    setInput('');
  };

  const displayWord = word.split('').map(letter => 
    guessedLetters.has(letter) ? letter : '_'
  ).join(' ');

  const isWon = word.split('').every(letter => guessedLetters.has(letter));
  const isLost = wrongGuesses >= maxWrong;
  const gameOver = isWon || isLost;

  const resetGame = () => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setInput('');
  };

  const hangmanStages = [
    '',
    '  O',
    '  O\n  |',
    '  O\n /|',
    '  O\n /|\\',
    '  O\n /|\\\n /',
    '  O\n /|\\\n / \\'
  ];

  return (
    <div className="flex items-center justify-center h-full bg-background/90">
      <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Hangman - Tech Edition</h2>
        
        <div className="mb-6">
          <pre className="text-center text-3xl mb-4 text-destructive font-mono leading-tight">
            {hangmanStages[wrongGuesses]}
          </pre>
          <p className="text-sm text-muted-foreground text-center">
            Wrong guesses: {wrongGuesses}/{maxWrong}
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-3xl font-mono tracking-wider text-primary mb-4">
            {displayWord}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Guessed letters:</p>
          <div className="flex flex-wrap gap-1">
            {Array.from(guessedLetters).sort().map(letter => (
              <span
                key={letter}
                className={`px-2 py-1 rounded text-xs ${
                  word.includes(letter)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {!gameOver ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <input
              type="text"
              maxLength={1}
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              className="flex-1 bg-background/50 border border-border rounded px-3 py-2 text-foreground outline-none focus:border-primary uppercase text-center"
              placeholder="Letter..."
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
            {isWon ? (
              <p className="text-green-400 mb-4">You won! 🎉</p>
            ) : (
              <p className="text-destructive mb-4">
                Game Over! The word was: <span className="font-bold">{word}</span>
              </p>
            )}
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
