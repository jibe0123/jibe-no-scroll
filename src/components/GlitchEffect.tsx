import { useEffect, useState } from 'react';

export const GlitchEffect = () => {
  const [glitchText, setGlitchText] = useState('SYSTEM ERROR');
  const [bgColor, setBgColor] = useState('bg-red-500');

  useEffect(() => {
    const texts = [
      'SYSTEM ERROR',
      'Ḑ̴̝̈́A̸͎͝T̴̰̾A̸̗͋ ̷̱̈C̸͙̓O̴̰͝R̵̰̈́R̸̜̾Ű̴̮P̸̰͝T̵̰̔E̵̪͛D̵̰̈',
      '01001000 01000101 01001100 01010000',
      'S̵̢̛̛͓̺̺̹̤̰̝̿̎̏̓̀̀̕͜Y̶̡̡̛͚̺̥̋̿̽̎̾S̷̛̛̙̱̤͂̔̏̅̄̂͝T̴̨̡̺̥̜̼͖̋̎̔Ê̷̡̨̡̧͎̙̜̟̈́̚̕͜M̸̨̛̜̜̥̥̰͋̀̃',
      '<!> FATAL ERROR <!>',
      '⚠️ GLITCH DETECTED ⚠️',
    ];

    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-pink-500',
    ];

    const interval = setInterval(() => {
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`h-full ${bgColor} transition-colors duration-75 flex items-center justify-center relative overflow-hidden`}>
      {/* Glitch lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-black/30"
            style={{
              top: `${i * 10}%`,
              transform: `translateX(${Math.random() * 100}px)`,
              animation: `glitch ${Math.random() * 0.5 + 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div className="relative">
        <div className="text-6xl font-bold text-white text-center animate-pulse mix-blend-difference">
          {glitchText}
        </div>
        <div 
          className="absolute inset-0 text-6xl font-bold text-cyan-400 mix-blend-screen"
          style={{
            transform: `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`,
          }}
        >
          {glitchText}
        </div>
        <div 
          className="absolute inset-0 text-6xl font-bold text-red-400 mix-blend-screen"
          style={{
            transform: `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`,
          }}
        >
          {glitchText}
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
