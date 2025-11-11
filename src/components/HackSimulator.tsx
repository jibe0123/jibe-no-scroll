import { useEffect, useState } from 'react';

export const HackSimulator = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const hackMessages = [
      'Initializing secure connection...',
      'Connecting to mainframe...',
      '[OK] Connection established',
      'Bypassing firewall layer 1...',
      'Bypassing firewall layer 2...',
      'Bypassing firewall layer 3...',
      '[OK] Firewall bypassed',
      'Scanning for vulnerabilities...',
      'Found: SQL Injection vulnerability',
      'Found: XSS vulnerability',
      'Found: CSRF token weakness',
      'Exploiting SQL Injection...',
      '[OK] Database access granted',
      'Extracting data...',
      'Progress: 23%',
      'Progress: 47%',
      'Progress: 71%',
      'Progress: 94%',
      '[OK] Data extraction complete',
      'Covering tracks...',
      'Clearing logs...',
      '[OK] All traces removed',
      '',
      'SYSTEM COMPROMISED ✓',
      '',
      'Just kidding! This is all fake 😄',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < hackMessages.length) {
        setLines((prev) => [...prev, hackMessages[currentIndex]]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm p-6 overflow-y-auto">
      {lines.map((line, index) => (
        <div
          key={index}
          className={`mb-1 ${line.startsWith('[OK]') ? 'text-green-500 font-bold' : ''} ${
            line.includes('COMPROMISED') ? 'text-red-500 font-bold text-xl' : ''
          } ${line.includes('Just kidding') ? 'text-yellow-400' : ''}`}
        >
          {line.startsWith('Progress:') ? (
            <div className="flex items-center gap-2">
              <span>{line}</span>
              <div className="flex-1 max-w-xs h-2 bg-green-900 rounded">
                <div
                  className="h-full bg-green-400 rounded transition-all duration-300"
                  style={{ width: line.match(/\d+/)?.[0] + '%' || '0%' }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              {line && <span className="text-green-600 mr-2">{'>'}</span>}
              {line}
            </>
          )}
        </div>
      ))}
      {!isComplete && <span className="animate-pulse">▋</span>}
    </div>
  );
};
