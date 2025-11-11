import { useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (onSuccess: () => void) => {
  const handleKonamiCode = useCallback(() => {
    let currentIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key === KONAMI_CODE[currentIndex]) {
        currentIndex++;
        
        if (currentIndex === KONAMI_CODE.length) {
          onSuccess();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSuccess]);

  useEffect(() => {
    const cleanup = handleKonamiCode();
    return cleanup;
  }, [handleKonamiCode]);
};
