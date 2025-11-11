export const NyanCat = () => {
  return (
    <div className="h-full bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 relative overflow-hidden flex items-center justify-center">
      {/* Rainbow trail */}
      <div className="absolute left-0 w-full h-20 animate-pulse">
        <div className="h-4 bg-red-500"></div>
        <div className="h-4 bg-orange-500"></div>
        <div className="h-4 bg-yellow-500"></div>
        <div className="h-4 bg-green-500"></div>
        <div className="h-4 bg-blue-500"></div>
      </div>

      {/* Nyan Cat */}
      <div className="text-center animate-bounce">
        <div className="text-8xl mb-4">
          🌈😺
        </div>
        <div className="text-2xl font-bold text-white animate-pulse">
          NYAN NYAN NYAN
        </div>
        <div className="mt-4 text-white/70 text-sm">
          (Press 'clear' to stop the madness)
        </div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
};
