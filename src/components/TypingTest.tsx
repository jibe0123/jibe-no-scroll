import { useState, useEffect, useRef } from 'react';

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog",
  "Kubernetes orchestrates containerized applications across clusters",
  "React hooks revolutionized functional component state management",
  "Neural networks learn patterns through backpropagation algorithms",
  "Docker containers provide consistent deployment environments",
  "TypeScript adds static typing to JavaScript for better code quality"
];

export const TypingTest = () => {
  const [sentence, setSentence] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setInput('');
    setEndTime(null);
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    setInput(value);

    if (value === sentence) {
      setEndTime(Date.now());
      setIsStarted(false);
    }
  };

  const resetTest = () => {
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setIsStarted(false);
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const words = sentence.split(' ').length;
    return Math.round(words / timeInMinutes);
  };

  const getCharacterColor = (index: number) => {
    if (index >= input.length) return 'text-muted-foreground';
    return input[index] === sentence[index] ? 'text-green-400' : 'text-destructive';
  };

  return (
    <div className="flex items-center justify-center h-full bg-background/90">
      <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Typing Speed Test</h2>
        
        {!isStarted && !endTime && (
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Type the sentence as fast as you can!
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Start Test
            </button>
          </div>
        )}

        {(isStarted || endTime) && (
          <>
            <div className="mb-6 p-4 bg-background/50 rounded-lg">
              <p className="text-lg font-mono leading-relaxed">
                {sentence.split('').map((char, index) => (
                  <span key={index} className={getCharacterColor(index)}>
                    {char}
                  </span>
                ))}
              </p>
            </div>

            {!endTime ? (
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                className="w-full bg-background/50 border border-border rounded px-4 py-3 text-foreground outline-none focus:border-primary font-mono"
                placeholder="Start typing..."
                autoFocus
              />
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <p className="text-4xl font-bold text-green-400 mb-2">
                    {calculateWPM()} WPM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time: {((endTime - startTime!) / 1000).toFixed(2)}s
                  </p>
                </div>
                <button
                  onClick={resetTest}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
