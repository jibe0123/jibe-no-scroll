import { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const messages = [
    'Initializing system...',
    'Loading kernel modules...',
    'Starting services...',
    'Mounting filesystems...',
    'Loading user interface...',
    'System ready.',
  ];

  useEffect(() => {
    let messageIndex = 0;
    let progressValue = 0;

    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setBootMessages(prev => [...prev, messages[messageIndex]]);
        messageIndex++;
      }
    }, 300);

    const progressInterval = setInterval(() => {
      if (progressValue < 100) {
        progressValue += 2;
        setProgress(progressValue);
      } else {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setTimeout(onBootComplete, 500);
      }
    }, 30);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[100]">
      <div className="w-full max-w-2xl px-8">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2 animate-pulse">
            PortfolioOS
          </h1>
          <p className="text-muted-foreground text-sm">Booting system...</p>
        </div>

        {/* Boot Messages */}
        <div className="bg-secondary/50 rounded-lg p-6 mb-6 h-48 overflow-hidden font-mono text-sm">
          {bootMessages.map((message, index) => (
            <div
              key={index}
              className="text-foreground mb-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-green-500">✓</span> {message}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
