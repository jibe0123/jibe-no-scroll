import { useState } from 'react';
import Window from './Window';
import Dock from './Dock';
import { Terminal } from './Terminal';
import { FileText, Folder, Terminal as TerminalIcon, User } from 'lucide-react';
import { MacScreen } from './MacScreen';

export interface App {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const apps: App[] = [
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <TerminalIcon className="w-8 h-8" />,
      component: <MacScreen />
    },
    {
      id: 'about',
      name: 'About Me',
      icon: <User className="w-8 h-8" />,
      component: (
        <div className="p-6 text-foreground">
          <h2 className="text-2xl font-bold mb-4">À propos</h2>
          <p className="mb-2">Développeur Full-Stack passionné</p>
          <p className="mb-2">Spécialisé en React, TypeScript, Node.js</p>
        </div>
      )
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <Folder className="w-8 h-8" />,
      component: (
        <div className="p-6 text-foreground">
          <h2 className="text-2xl font-bold mb-4">Mes Projets</h2>
          <div className="space-y-2">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-bold">Projet 1</h3>
              <p className="text-sm text-muted-foreground">Description du projet</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'readme',
      name: 'README',
      icon: <FileText className="w-8 h-8" />,
      component: (
        <div className="p-6 text-foreground font-mono text-sm">
          <pre className="whitespace-pre-wrap">
{`# README.md

## Bienvenue sur mon portfolio interactif

Ce site est conçu comme un véritable système d'exploitation.
Explorez les différentes applications pour en savoir plus sur moi.

### Commandes disponibles
- Ouvrir le Terminal pour des commandes interactives
- Consulter mes projets
- En savoir plus sur mon parcours

Made with ❤️ and code`}
          </pre>
        </div>
      )
    }
  ];

  const openApp = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
    }
    setActiveWindow(appId);
  };

  const closeWindow = (appId: string) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
    if (activeWindow === appId) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2] : null);
    }
  };

  const focusWindow = (appId: string) => {
    setActiveWindow(appId);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid gap-6">
        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-secondary/50 transition-all group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform">
              {app.icon}
            </div>
            <span className="text-sm text-foreground font-medium">{app.name}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(appId => {
        const app = apps.find(a => a.id === appId);
        if (!app) return null;
        
        return (
          <Window
            key={appId}
            title={app.name}
            isActive={activeWindow === appId}
            onClose={() => closeWindow(appId)}
            onFocus={() => focusWindow(appId)}
          >
            {app.component}
          </Window>
        );
      })}

      {/* Dock */}
      <Dock apps={apps} onAppClick={openApp} openApps={openWindows} />
    </div>
  );
};

export default Desktop;
