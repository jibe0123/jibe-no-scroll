import { Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MacScreen } from '@/components/MacScreen';
import { StatusLed } from '@/components/StatusLed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useLanguage } from '@/hooks/useLanguage';
import { useHighlightColor } from '@/hooks/useHighlightColor';
import confetti from 'canvas-confetti';

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
      <div className="h-full w-full border-2 border-foreground/20 rounded-2xl flex flex-col md:flex-row items-center relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {/* Theme Toggle - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <ThemeToggle />
        </div>
        
        {/* Left Column - Text */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 py-8 md:py-0 relative">
        
        <div className="space-y-6 max-w-xl">
          {/* H1 with highlight */}
          <h1 className="text-[clamp(48px,8vw,72px)] font-semibold tracking-tight leading-none">
            {t.title}
          </h1>
          
          {/* Subtitle with highlight */}
          <p className="text-[clamp(16px,2vw,18px)] font-normal">
            <span className="relative inline-block">
              <span className="relative z-10 font-semibold px-1">{t.subtitle}</span>
              <span className={`absolute bottom-0 left-0 w-full h-3 ${highlightColor} -z-0 rounded-sm`}></span>
            </span>
          </p>

          {/* Description */}
          <div className="pt-4">
            <p className="text-[clamp(14px,1.5vw,15px)] text-muted-foreground leading-relaxed whitespace-pre-line">
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

          {/* Available Status with highlight */}
          <p className="text-[clamp(13px,1.5vw,14px)] text-muted-foreground flex items-center gap-2 pt-2">
            <StatusLed />
            <span className="relative inline-block">
              <span className="relative z-10 font-bold px-1">{t.available}</span>
              <span className={`absolute bottom-0 left-0 w-full h-2.5 ${highlightColor} -z-0 rounded-sm`}></span>
            </span>
            <span className="mx-1">—</span>
            {t.location}
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
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

          {/* Crypto Info - Discreet */}
          <details className="pt-6 group">
            <summary className="text-xs text-muted-foreground/50 hover:text-muted-foreground cursor-pointer transition-colors">
              🔐 Security & Crypto
            </summary>
            <div className="mt-3 space-y-2 text-xs font-mono">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground/70 min-w-[3rem]">PGP:</span>
                <code className="text-[10px] text-muted-foreground/80 break-all hover:text-foreground transition-colors cursor-pointer">
                  [Your PGP Key]
                </code>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground/70 min-w-[3rem]">BTC:</span>
                <code className="text-[10px] text-muted-foreground/80 break-all hover:text-foreground transition-colors cursor-pointer">
                  [Your BTC Address]
                </code>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground/70 min-w-[3rem]">ETH:</span>
                <code className="text-[10px] text-muted-foreground/80 break-all hover:text-foreground transition-colors cursor-pointer">
                  [Your ETH Address]
                </code>
              </div>
            </div>
          </details>
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-px md:w-px md:h-full bg-border" />
      
      {/* Right Column - Mac Computer */}
      <div className="w-full md:w-1/2 min-h-[40vh] md:h-full flex items-center justify-center">
        <MacScreen />
      </div>
      </div>
    </div>
  );
};

export default Index;
