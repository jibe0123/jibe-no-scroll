import { Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedIllustration } from '@/components/AnimatedIllustration';
import { StatusLed } from '@/components/StatusLed';
import { useAnalytics } from '@/hooks/useAnalytics';

const Index = () => {
  const { trackSocialClick } = useAnalytics();
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
          {/* H1 */}
          <h1 className="text-[clamp(48px,8vw,72px)] font-semibold tracking-tight leading-none">
            Jibe
          </h1>
          
          {/* Subtitle */}
          <p className="text-[clamp(16px,2vw,18px)] font-normal">
            Software engineer
          </p>

          {/* Summary Section */}
          <div className="pt-4 space-y-3">
            <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              Summary
            </h2>
            <p className="text-[clamp(14px,1.5vw,15px)] text-muted-foreground leading-relaxed">
              Développeur full-stack passionné par la création d'expériences web modernes et performantes. 
              Spécialisé en React, TypeScript et architecture cloud.
            </p>
          </div>

          {/* Disponible Status */}
          <p className="text-[clamp(13px,1.5vw,14px)] text-muted-foreground flex items-center gap-2 pt-2">
            <StatusLed />
            Disponible — Remote EU / Paris
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
              onClick={() => trackSocialClick('github', 'https://github.com')}
              className="p-2 rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
              onClick={() => trackSocialClick('linkedin', 'https://linkedin.com')}
              className="p-2 rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:contact@example.com"
              aria-label="Send email"
              title="Email"
              onClick={() => trackSocialClick('email', 'mailto:contact@example.com')}
              className="p-2 rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Current Activity Section - Enhanced */}
          <div className="pt-8 space-y-4 border-t border-border/50 mt-8">
            <h2 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
              Actuellement
            </h2>
            <div className="space-y-3">
              <div className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Projet</p>
                    <p className="text-[clamp(14px,1.5vw,15px)] text-foreground font-medium leading-relaxed">
                      Plateforme SaaS B2B avec React & Supabase
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Apprentissage</p>
                    <p className="text-[clamp(14px,1.5vw,15px)] text-foreground font-medium leading-relaxed">
                      Architecture microservices avec Kubernetes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-px md:w-px md:h-full bg-border" />
      
      {/* Right Column - Animated Illustration */}
      <div className="w-full md:w-1/2 min-h-[40vh] md:h-full flex items-center justify-center p-6 md:p-12">
        <div className="w-full h-full">
          <AnimatedIllustration />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;
