import { Github, Linkedin, Mail, Monitor, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StatusLed } from '@/components/StatusLed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useLanguage } from '@/hooks/useLanguage';
import { useHighlightColor } from '@/hooks/useHighlightColor';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

const Index = () => {
  const { trackSocialClick } = useAnalytics();
  const { t } = useLanguage();
  const highlightColor = useHighlightColor();
  
  useKonamiCode(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
    }, 250);
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
  });
  
  return (
    <div className="h-screen w-screen p-4 md:p-6 lg:p-8">
      {/* Border Container */}
      <div className="h-full w-full border-2 border-foreground/20 rounded-2xl flex items-center justify-center relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {/* Theme Toggle - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <ThemeToggle />
        </div>
        
        {/* Main Content - Centered */}
        <div className="w-full max-w-4xl flex flex-col justify-center px-6 md:px-12 lg:px-20 py-8 relative">
        
        <div className="space-y-8">
          {/* H1 with highlight - Centered */}
          <h1 className="text-[clamp(48px,8vw,72px)] font-semibold tracking-tight leading-none text-center">
            {t.title}
          </h1>
          
          {/* Subtitle with highlight - Centered */}
          <p className="text-[clamp(16px,2vw,18px)] font-normal text-center">
            <span className="relative inline-block">
              <span className="relative z-10 font-semibold px-1">{t.subtitle}</span>
              <span className={`absolute bottom-0 left-0 w-full h-3 ${highlightColor} -z-0 rounded-sm`}></span>
            </span>
          </p>

          {/* Description - Centered */}
          <div className="pt-4 max-w-2xl mx-auto">
            <p className="text-[clamp(14px,1.5vw,15px)] text-muted-foreground leading-relaxed whitespace-pre-line text-center">
              {t.description.split(/\b(Golang|Python|PHP|TypeScript|AI|ML\/DL|IoT|Web3|Agentic)\b/).map((part, index) => {
                const keywords = ['Golang', 'Python', 'PHP', 'TypeScript', 'AI', 'ML/DL', 'IoT', 'Web3', 'Agentic'];
                const isHighlighted = keywords.includes(part);
                
                if (isHighlighted) {
                  return (
                    <span key={index} className="relative inline-block mx-0.5">
                      <span className="relative z-10 font-bold text-foreground px-1">{part}</span>
                      <span className={`absolute bottom-0 left-0 w-full h-3 ${highlightColor} -z-0 rounded-sm`}></span>
                    </span>
                  );
                }
                return <span key={index}>{part}</span>;
              })}
            </p>
          </div>

          {/* Available Status with highlight - Centered */}
          <p className="text-[clamp(13px,1.5vw,14px)] text-muted-foreground flex items-center justify-center gap-2 pt-2">
            <StatusLed />
            <span className="relative inline-block">
              <span className="relative z-10 font-bold px-1">{t.available}</span>
              <span className={`absolute bottom-0 left-0 w-full h-2.5 ${highlightColor} -z-0 rounded-sm`}></span>
            </span>
            <span className="mx-1">—</span>
            {t.location}
          </p>
          
          {/* Social Links - Centered */}
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.github}
              title="GitHub"
              onClick={() => trackSocialClick('github', 'https://github.com')}
              className="p-2 rounded-md hover:bg-secondary/50 hover:ring-2 hover:ring-red-500/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.linkedin}
              title="LinkedIn"
              onClick={() => trackSocialClick('linkedin', 'https://linkedin.com')}
              className="p-2 rounded-md hover:bg-secondary/50 hover:ring-2 hover:ring-red-500/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:contact@example.com"
              aria-label={t.email}
              title="Email"
              onClick={() => trackSocialClick('email', 'mailto:contact@example.com')}
              className="p-2 rounded-md hover:bg-secondary/50 hover:ring-2 hover:ring-red-500/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* OS Launch Button - Centered */}
          <div className="pt-12 flex justify-center">
            <Link 
              to="/os"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-end via-gradient-mid to-gradient-start opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Monitor className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Explorer l'OS Interactif</span>
              <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
            </Link>
          </div>

          {/* Crypto Info - Discreet & Centered */}
          <div className="pt-12 border-t border-border/30 space-y-3 max-w-2xl mx-auto">
            <div className="space-y-2 text-[10px] font-mono">
              {/* PGP Key */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground/70">PGP Key</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`-----BEGIN PGP PUBLIC KEY BLOCK-----

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
v35Y+YikLoX5DsNlTxrlSQ3Z3g==
=sOc0
-----END PGP PUBLIC KEY BLOCK-----`);
                      const { toast } = require('@/hooks/use-toast');
                      toast({ description: '✓ PGP key copied!' });
                    }}
                    className="text-[9px] text-muted-foreground/50 hover:text-foreground transition-colors px-2 py-0.5 rounded hover:bg-secondary/50"
                  >
                    Copy
                  </button>
                </div>
                <code className="block text-muted-foreground/70 break-all hover:text-foreground transition-colors cursor-pointer leading-tight">
                  D759301818E4B514BC0E7979CE33102F60B0DD6B
                </code>
              </div>

              {/* BTC Address */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground/70">BTC</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('[Your BTC Address]');
                      const { toast } = require('@/hooks/use-toast');
                      toast({ description: '✓ BTC address copied!' });
                    }}
                    className="text-[9px] text-muted-foreground/50 hover:text-foreground transition-colors px-2 py-0.5 rounded hover:bg-secondary/50"
                  >
                    Copy
                  </button>
                </div>
                <code className="block text-muted-foreground/70 break-all hover:text-foreground transition-colors cursor-pointer">
                  [Your BTC Address]
                </code>
              </div>

              {/* ETH Address */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground/70">ETH</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('[Your ETH Address]');
                      const { toast } = require('@/hooks/use-toast');
                      toast({ description: '✓ ETH address copied!' });
                    }}
                    className="text-[9px] text-muted-foreground/50 hover:text-foreground transition-colors px-2 py-0.5 rounded hover:bg-secondary/50"
                  >
                    Copy
                  </button>
                </div>
                <code className="block text-muted-foreground/70 break-all hover:text-foreground transition-colors cursor-pointer">
                  [Your ETH Address]
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
