import { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Terminal } from './Terminal';
import { RaceGame } from './RaceGame';
import { YouTubePlayer } from './YouTubePlayer';
import { MatrixEffect } from './MatrixEffect';
import { HackSimulator } from './HackSimulator';
import { NyanCat } from './NyanCat';
import { GlitchEffect } from './GlitchEffect';
import { SnakeGame } from './SnakeGame';
import { TicTacToe } from './TicTacToe';
import { TetrisGame } from './TetrisGame';
import { HighScores } from './HighScores';
import { GuessGame } from './GuessGame';
import { HangmanGame } from './HangmanGame';
import { TypingTest } from './TypingTest';
import { AdventureGame } from './AdventureGame';
import { useTerminalCommands } from '../hooks/useTerminalCommands';
import confetti from 'canvas-confetti';

type ScreenContent = 'idle' | 'race' | 'music' | 'video' | 'help' | 'matrix' | 'hack' | 'nyan' | 'glitch' | 'party' | 'snake' | 'morpion' | 'tetris' | 'scores' | 'guess' | 'hangman' | 'typing' | 'adventure' | 'whoami' | 'ls' | 'cat' | 'skills' | 'coffee' | 'fortune' | 'nasa' | 'crypto' | 'story' | 'timeline' | 'reboot' | 'scan' | 'build' | 'bench';

export const MacScreen = () => {
  const [screenContent, setScreenContent] = useState<ScreenContent>('idle');
  const [isRacePlaying, setIsRacePlaying] = useState(false);
  const [laps, setLaps] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { fileSystem, navigateDirectory, listDirectory } = useTerminalCommands();

  const handleCommand = (command: string, args: string[] = []) => {
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
      case 'snake':
        setScreenContent('snake');
        setIsRacePlaying(false);
        break;
      case 'morpion':
        setScreenContent('morpion');
        setIsRacePlaying(false);
        break;
      case 'tetris':
        setScreenContent('tetris');
        setIsRacePlaying(false);
        break;
      case 'scores':
        setScreenContent('scores');
        setIsRacePlaying(false);
        break;
      case 'guess':
        setScreenContent('guess');
        setIsRacePlaying(false);
        break;
      case 'hangman':
        setScreenContent('hangman');
        setIsRacePlaying(false);
        break;
      case 'typing':
        setScreenContent('typing');
        setIsRacePlaying(false);
        break;
      case 'adventure':
        setScreenContent('adventure');
        setIsRacePlaying(false);
        break;
      case 'whoami':
        setScreenContent('whoami');
        setIsRacePlaying(false);
        break;
      case 'ls':
        setScreenContent('ls');
        setIsRacePlaying(false);
        break;
      case 'cd':
        if (args.length > 0) {
          navigateDirectory(args[0]);
        }
        setScreenContent('ls');
        setIsRacePlaying(false);
        break;
      case 'cat':
        if (args.includes('readme.md') || args.includes('readme')) {
          setScreenContent('cat');
        }
        setIsRacePlaying(false);
        break;
      case 'skills':
        setScreenContent('skills');
        setIsRacePlaying(false);
        break;
      case 'coffee':
        setScreenContent('coffee');
        setIsRacePlaying(false);
        break;
      case 'fortune':
        setScreenContent('fortune');
        setIsRacePlaying(false);
        break;
      case 'nasa':
        setScreenContent('nasa');
        setIsRacePlaying(false);
        break;
      case 'crypto':
        setScreenContent('crypto');
        setIsRacePlaying(false);
        break;
      case 'story':
        setScreenContent('story');
        setIsRacePlaying(false);
        break;
      case 'timeline':
        setScreenContent('timeline');
        setIsRacePlaying(false);
        break;
      case 'reboot':
        setScreenContent('reboot');
        setIsRacePlaying(false);
        setTimeout(() => setScreenContent('idle'), 3000);
        break;
      case 'scan':
        setScreenContent('scan');
        setIsRacePlaying(false);
        break;
      case 'build':
        setScreenContent('build');
        setIsRacePlaying(false);
        setTimeout(() => setScreenContent('idle'), 3000);
        break;
      case 'bench':
        setScreenContent('bench');
        setIsRacePlaying(false);
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
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-4 overflow-y-auto">
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-primary mb-4">Available Commands</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">🎮 Games</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">race</span> - Racing game</p>
                    <p><span className="text-green-400">snake</span> - Snake game</p>
                    <p><span className="text-green-400">morpion</span> - Tic-Tac-Toe</p>
                    <p><span className="text-green-400">tetris</span> - Tetris game</p>
                    <p><span className="text-green-400">guess</span> - Guess the number</p>
                    <p><span className="text-green-400">hangman</span> - Hangman tech edition</p>
                    <p><span className="text-green-400">typing</span> - Typing speed test</p>
                    <p><span className="text-green-400">adventure</span> - Text adventure game</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">ℹ️ Info</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">whoami</span> - About me</p>
                    <p><span className="text-green-400">cat readme.md</span> - Read my bio</p>
                    <p><span className="text-green-400">skills</span> - Tech skills matrix</p>
                    <p><span className="text-green-400">story</span> - My journey</p>
                    <p><span className="text-green-400">timeline</span> - Career timeline</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">📁 Navigation</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">ls</span> - List files/folders</p>
                    <p><span className="text-green-400">cd &lt;folder&gt;</span> - Change directory</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">🌐 API & Data</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">nasa</span> - NASA image of the day</p>
                    <p><span className="text-green-400">crypto</span> - Bitcoin price</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">🎨 Fun & Effects</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">matrix</span> - Matrix effect</p>
                    <p><span className="text-green-400">hack</span> - Hacking simulator</p>
                    <p><span className="text-green-400">nyan</span> - Nyan Cat</p>
                    <p><span className="text-green-400">glitch</span> - Glitch effect</p>
                    <p><span className="text-green-400">party</span> - Party mode!</p>
                    <p><span className="text-green-400">coffee</span> - Initialize caffeine</p>
                    <p><span className="text-green-400">fortune</span> - Random quote</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">🔧 System</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">reboot</span> - Reboot system</p>
                    <p><span className="text-green-400">scan</span> - System scan</p>
                    <p><span className="text-green-400">build</span> - Build animation</p>
                    <p><span className="text-green-400">bench</span> - Run benchmark</p>
                    <p><span className="text-green-400">scores</span> - High scores</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary/80 mb-2">📺 Media</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-green-400">musique</span> - Spotify player</p>
                    <p><span className="text-green-400">video</span> - YouTube player</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mt-4">
                    <span className="text-green-400">clear</span> - Clear screen
                  </p>
                </div>
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
      case 'snake':
        return <SnakeGame />;
      case 'morpion':
        return <TicTacToe />;
      case 'tetris':
        return <TetrisGame />;
      case 'scores':
        return <HighScores />;
      case 'guess':
        return <GuessGame />;
      case 'hangman':
        return <HangmanGame />;
      case 'typing':
        return <TypingTest />;
      case 'adventure':
        return <AdventureGame />;
      case 'whoami':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-2xl font-bold text-primary mb-4">$ whoami</h2>
              <div className="space-y-3 text-sm">
                <p><span className="text-green-400">Name:</span> Jibe</p>
                <p><span className="text-green-400">Role:</span> Full-Stack Developer & AI Enthusiast</p>
                <p><span className="text-green-400">Status:</span> Caffeinated ☕</p>
                <p><span className="text-green-400">Mood:</span> Ready to ship 🚀</p>
                <p className="text-muted-foreground italic pt-4">
                  "I turn coffee into code and bugs into features. Sometimes both at once."
                </p>
              </div>
            </div>
          </div>
        );
      case 'ls':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary mb-4">
                {fileSystem.currentPath === '~' ? '~' : `~/${fileSystem.currentPath}`}
              </h2>
              <pre className="text-sm text-green-400 whitespace-pre">
                {listDirectory()}
              </pre>
              <p className="text-xs text-muted-foreground pt-4">
                Use "cd &lt;folder&gt;" to navigate
              </p>
            </div>
          </div>
        );
      case 'cat':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8 overflow-y-auto">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl font-bold text-primary mb-4">README.md</h2>
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-green-400 font-bold">## About Me</p>
                <p>
                  Hey! I'm Jibe, a developer who loves crafting elegant solutions to complex problems.
                  My journey in tech started with curiosity and evolved into a passion for building
                  things that matter.
                </p>
                <p className="text-green-400 font-bold pt-4">## What I Do</p>
                <p>
                  I specialize in full-stack development with a focus on modern web technologies.
                  From React frontends to scalable backends, I enjoy the entire spectrum of software development.
                </p>
                <p className="text-green-400 font-bold pt-4">## Philosophy</p>
                <p className="italic">
                  "Write code that humans can read, because machines will execute anything."
                </p>
                <p className="text-muted-foreground pt-4">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                  or debugging something that "worked yesterday" 😅
                </p>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8 overflow-y-auto">
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-primary mb-4">Tech Skills Matrix</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-green-400 mb-2">Frontend ████████████░░ 85%</p>
                  <p className="text-muted-foreground text-xs">React, TypeScript, Tailwind, Next.js</p>
                </div>
                <div>
                  <p className="text-green-400 mb-2">Backend  ███████████░░░ 80%</p>
                  <p className="text-muted-foreground text-xs">Node.js, Go, PostgreSQL, Redis</p>
                </div>
                <div>
                  <p className="text-green-400 mb-2">DevOps   ██████████░░░░ 75%</p>
                  <p className="text-muted-foreground text-xs">Docker, Kubernetes, CI/CD, AWS</p>
                </div>
                <div>
                  <p className="text-green-400 mb-2">AI/ML    ████████░░░░░░ 65%</p>
                  <p className="text-muted-foreground text-xs">Python, TensorFlow, OpenAI API</p>
                </div>
                <div>
                  <p className="text-green-400 mb-2">Blockchain ███████░░░░░░░ 60%</p>
                  <p className="text-muted-foreground text-xs">Solidity, Web3.js, Smart Contracts</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'coffee':
        return (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-amber-900/20 to-background/50">
            <div className="text-center space-y-4 font-mono">
              <div className="text-6xl mb-4">☕</div>
              <div className="text-green-400 space-y-2">
                <p>Initializing caffeine protocol...</p>
                <p>Loading espresso.dll...</p>
                <p>Compiling motivation.exe...</p>
                <p className="text-primary pt-4">System ready! ✓</p>
              </div>
            </div>
          </div>
        );
      case 'fortune':
        const fortunes = [
          "The best code is no code at all.",
          "It works on my machine. ¯\\_(ツ)_/¯",
          "There are only two hard things in Computer Science: cache invalidation and naming things.",
          "A programmer's favorite bar: foo.",
          "In theory, there is no difference between theory and practice. In practice, there is.",
          "Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.",
          "Debugging is like being a detective in a crime movie where you are also the murderer."
        ];
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="max-w-xl text-center">
              <div className="text-6xl mb-6">🔮</div>
              <p className="text-lg text-primary italic">"{randomFortune}"</p>
            </div>
          </div>
        );
      case 'nasa':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-primary">NASA APOD</p>
              <p className="text-sm text-muted-foreground">
                (API integration coming soon...)
              </p>
            </div>
          </div>
        );
      case 'crypto':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">₿</div>
              <p className="text-primary">Bitcoin Price Tracker</p>
              <p className="text-sm text-muted-foreground">
                (API integration coming soon...)
              </p>
            </div>
          </div>
        );
      case 'story':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8 overflow-y-auto">
            <div className="space-y-3 max-w-2xl text-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">System Log: Journey.exe</h2>
              <p><span className="text-green-400">[INIT]</span> Started with curiosity and a laptop</p>
              <p><span className="text-green-400">[LOAD]</span> Learned HTML/CSS, made terrible websites</p>
              <p><span className="text-green-400">[DEBUG]</span> Discovered JavaScript, fell in love</p>
              <p><span className="text-green-400">[COMPILE]</span> Built first real app, felt unstoppable</p>
              <p><span className="text-green-400">[ERROR]</span> Hit production bugs, learned humility</p>
              <p><span className="text-green-400">[OPTIMIZE]</span> Mastered React, TypeScript, modern stack</p>
              <p><span className="text-green-400">[DEPLOY]</span> Shipped projects that helped real people</p>
              <p><span className="text-green-400">[SCALE]</span> Explored backend, DevOps, cloud architecture</p>
              <p><span className="text-green-400">[INNOVATE]</span> Dove into AI/ML, blockchain, cutting-edge tech</p>
              <p><span className="text-green-400">[STATUS]</span> Still learning, still building, still excited</p>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8 overflow-y-auto">
            <div className="space-y-4 max-w-2xl text-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">git log --oneline --graph</h2>
              <pre className="text-green-400 space-y-2">
{`* 2024  (HEAD -> main) Senior Full-Stack Developer
|       - Leading projects, mentoring juniors
|
* 2023  Blockchain & AI Integration
|       - Smart contracts, ML models
|
* 2022  DevOps & Cloud Architecture
|       - K8s, Docker, AWS mastery
|
* 2021  Backend Specialization
|       - Node.js, Go, microservices
|
* 2020  React & Modern Frontend
|       - SPA, TypeScript, state management
|
* 2019  First Developer Job
|       - Junior frontend position
|
* 2018  Learning Phase
|       - Bootcamps, tutorials, projects
|
* 2017  Initial Commit
        - "Hello, World!" in JavaScript`}
              </pre>
            </div>
          </div>
        );
      case 'reboot':
        return (
          <div className="flex items-center justify-center h-full bg-black text-green-400 font-mono p-8">
            <div className="space-y-2 text-sm animate-pulse">
              <p>System reboot initiated...</p>
              <p>Shutting down processes... ✓</p>
              <p>Clearing cache... ✓</p>
              <p>Reloading kernel modules... ✓</p>
              <p>Starting services... ✓</p>
              <p className="text-primary pt-4">Jibe OS v2.0 - Ready!</p>
            </div>
          </div>
        );
      case 'scan':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-primary mb-4">System Scan Results</h2>
              <div className="space-y-3 text-sm">
                <p><span className="text-green-400">Energy Level:</span> ████████░░ 85%</p>
                <p><span className="text-green-400">AI Expertise:</span> ███████░░░ 75%</p>
                <p><span className="text-green-400">Code Quality:</span> █████████░ 92%</p>
                <p><span className="text-green-400">Debugging Skills:</span> ████████░░ 88%</p>
                <p><span className="text-green-400">Coffee Addiction:</span> ██████████ 100%</p>
                <p className="text-muted-foreground pt-4 italic">
                  All systems operational. Ready to code! 🚀
                </p>
              </div>
            </div>
          </div>
        );
      case 'build':
        return (
          <div className="flex items-center justify-center h-full bg-black text-green-400 font-mono p-8">
            <div className="space-y-2 text-sm animate-pulse">
              <p>Building project...</p>
              <p>→ Compiling TypeScript... ✓</p>
              <p>→ Bundling modules... ✓</p>
              <p>→ Optimizing assets... ✓</p>
              <p>→ Running tests... ✓</p>
              <p>→ Generating build... ✓</p>
              <p className="text-primary pt-4">Build completed successfully! 🎉</p>
            </div>
          </div>
        );
      case 'bench':
        return (
          <div className="flex items-center justify-center h-full text-foreground/70 font-mono p-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-xl font-bold text-primary mb-4">Benchmark Results</h2>
              <div className="space-y-3 text-sm">
                <p><span className="text-green-400">Lines of code/hour:</span> 247</p>
                <p><span className="text-green-400">Bugs introduced:</span> 12</p>
                <p><span className="text-green-400">Bugs fixed:</span> 15</p>
                <p><span className="text-green-400">Stack Overflow visits:</span> 34</p>
                <p><span className="text-green-400">Coffee consumed:</span> 5 cups</p>
                <p><span className="text-green-400">Performance:</span> ████████░░ 83%</p>
                <p className="text-primary pt-4">Net positive! 📈</p>
              </div>
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
    <div className={`flex items-center justify-center transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-background p-2' 
        : 'w-full h-full p-4'
    }`}>
      <div className={`relative bg-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden border-[6px] border-[#3d3d3d] transition-all duration-300 ${
        isFullscreen 
          ? 'w-full h-full max-w-none max-h-none' 
          : 'w-full h-full'
      }`}>
        {/* Fullscreen Toggle Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-12 right-4 z-20 p-2 bg-background/80 hover:bg-background rounded-lg transition-colors text-foreground/70 hover:text-foreground"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

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
