import { useState, useEffect } from 'react';

type HighlightColor = 'red' | 'yellow' | 'pink';

const colorClasses: Record<HighlightColor, string> = {
  red: 'bg-red-500/50',
  yellow: 'bg-yellow-400/50',
  pink: 'bg-pink-500/50',
};

export const useHighlightColor = () => {
  const [color, setColor] = useState<HighlightColor>('red');

  useEffect(() => {
    // Choose a random color once on mount
    const colors: HighlightColor[] = ['red', 'yellow', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  return colorClasses[color];
};
