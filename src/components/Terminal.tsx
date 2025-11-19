import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onCommand: (command: string, args?: string[]) => void;
}

interface CommandHistory {
  command: string;
  timestamp: string;
}

export const Terminal = ({ onCommand }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: 'Welcome! Type "help" for available commands.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [
      ...history,
      { command: `$ ${input}`, timestamp: new Date().toLocaleTimeString() }
    ];

    setHistory(newHistory);
    
    // Parse command and arguments
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    onCommand(command, args);
    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 overflow-hidden flex flex-col cursor-text"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {history.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-muted-foreground text-xs">{item.timestamp}</span>
            <span className={item.command.startsWith('$') ? 'text-green-400' : 'text-foreground/80'}>
              {item.command}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-foreground/90"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};
