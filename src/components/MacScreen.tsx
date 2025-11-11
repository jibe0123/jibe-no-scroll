import { useState } from 'react';
import { Terminal } from './Terminal';
import { RaceGame } from './RaceGame';
import { YouTubePlayer } from './YouTubePlayer';
import { MatrixEffect } from './MatrixEffect';
import { HackSimulator } from './HackSimulator';
import { NyanCat } from './NyanCat';
import { GlitchEffect } from './GlitchEffect';
import confetti from 'canvas-confetti';

type ScreenContent = 'idle' | 'race' | 'music' | 'video' | 'help' | 'matrix' | 'hack' | 'nyan' | 'glitch' | 'party';

export const MacScreen = () => {
  const [screenContent, setScreenContent] = useState<ScreenContent>('idle');
  const [isRacePlaying, setIsRacePlaying] = useState(false);
  const [laps, setLaps] = useState(0);

  const handleCommand = (command: string) => {
    switch (command) {
      case 'help':
        setScreenContent('help');
        setIsRacePlaying(false);
        break;
      case 'race':
        setScreenContent('race');
        setIsRacePlaying(true);
        setLaps(0);
        break;
      case 'musique':
      case 'music':
        setScreenContent('music');
        setIsRacePlaying(false);
        break;
      case 'video':
        setScreenContent('video');
        setIsRacePlaying(false);
        break;
      case 'matrix':
        setScreenContent('matrix');
        setIsRacePlaying(false);
        break;
      case 'hack':
        setScreenContent('hack');
        setIsRacePlaying(false);
        break;
      case 'nyan':
        setScreenContent('nyan');
        setIsRacePlaying(false);
        break;
      case 'glitch':
        setScreenContent('glitch');
        setIsRacePlaying(false);
        break;
      case 'party':
        setScreenContent('party');
        setIsRacePlaying(false);
        // Trigger confetti
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        setTimeout(() => setScreenContent('idle'), duration);
        break;
      case 'clear':
        setScreenContent('idle');
        setIsRacePlaying(false);
        break;
      default:
        // Command not recognized
        break;
    }
  };

  const renderScreen = () => {
    switch (screenContent) {
      case 'help':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary mb-4">Available Commands:</h2>
              <div className="space-y-2">
                <p><span className="text-green-400">help</span> - Show this help message</p>
                <p><span className="text-green-400">race</span> - Start the racing game</p>
                <p><span className="text-green-400">musique</span> - Open Spotify player</p>
                <p><span className="text-green-400">video</span> - Open YouTube player</p>
                <p><span className="text-green-400">clear</span> - Clear the screen</p>
              </div>
            </div>
          </div>
        );
      case 'matrix':
        return <MatrixEffect />;
      case 'hack':
        return <HackSimulator />;
      case 'nyan':
        return <NyanCat />;
      case 'glitch':
        return <GlitchEffect />;
      case 'party':
        return (
          <div className="h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-pulse flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4 animate-bounce">🎉</div>
              <div className="text-6xl font-bold animate-pulse">PARTY MODE!</div>
              <div className="text-2xl mt-4">🎊 🎈 🎁 🎊</div>
            </div>
          </div>
        );
      case 'race':
        return (
          <div className="relative w-full h-full bg-background/50">
            <RaceGame 
              isPlaying={isRacePlaying}
              onLapComplete={setLaps}
            />
            {isRacePlaying && (
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm border border-primary/50 rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Laps
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {laps}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-sm"></div>
                    <p className="text-xs text-muted-foreground">You</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-destructive rounded-sm"></div>
                    <p className="text-xs text-muted-foreground">AI</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-center pt-1">
                    ↑ ↓ or ← →
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case 'music':
        return (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-900/20 to-background/50">
            <div className="text-center space-y-6 p-8">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-2xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Spotify Player</h3>
                <p className="text-muted-foreground">Music player coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'video':
        return <YouTubePlayer />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground font-mono">
            <div className="text-center space-y-4">
              <div className="text-6xl">💻</div>
              <p>Type "help" in the terminal below to get started</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[700px] bg-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden border-[6px] border-[#3d3d3d]">
        {/* Mac Window Header */}
        <div className="h-10 bg-[#323232] flex items-center px-4 gap-2 border-b border-[#1e1e1e]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground font-medium">
            jibe-os ~ terminal
          </div>
        </div>

        {/* Screen Area */}
        <div className="h-[calc(60%-2.5rem)] bg-background border-b border-[#1e1e1e]">
          {renderScreen()}
        </div>

        {/* Terminal Area */}
        <div className="h-[40%]">
          <Terminal onCommand={handleCommand} />
        </div>
      </div>
    </div>
  );
};
