import { useState } from 'react';
import type { App } from './Desktop';

interface DockProps {
  apps: App[];
  onAppClick: (appId: string) => void;
  openApps: string[];
}

const Dock = ({ apps, onAppClick, openApps }: DockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 px-4 py-3 bg-secondary/80 backdrop-blur-xl rounded-2xl border border-border shadow-2xl">
        {apps.map((app, index) => {
          const isOpen = openApps.includes(app.id);
          const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 3;
          const scale = hoveredIndex !== null ? Math.max(1, 1.5 - distance * 0.2) : 1;

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <button
                onClick={() => onAppClick(app.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-background/50 hover:bg-primary/10 transition-all duration-200 group"
                style={{
                  transform: `scale(${scale}) translateY(-${(scale - 1) * 20}px)`,
                }}
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {app.name}
                </div>
              </button>
              
              {/* Open indicator */}
              {isOpen && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
