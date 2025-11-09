import { Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="h-screen w-screen p-4 md:p-6 lg:p-8">
      {/* Border Container */}
      <div className="h-full w-full border-2 border-foreground/20 rounded-2xl flex items-center relative">
        {/* Theme Toggle - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <ThemeToggle />
        </div>
        
        {/* Left Column - Text */}
        <div className="w-1/2 h-full flex flex-col justify-center px-12 lg:px-20 relative">
        
        <div className="space-y-6 max-w-xl">
          {/* H1 */}
          <h1 className="text-[clamp(48px,8vw,72px)] font-semibold tracking-tight leading-none">
            Jibe
          </h1>
          
          {/* Subtitle */}
          <p className="text-[clamp(16px,2vw,18px)] font-normal">
            Software engineer
          </p>
          
          {/* Micro-mention */}
          <p className="text-[clamp(13px,1.5vw,14px)] text-muted-foreground">
            Disponible — Remote EU / Paris
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
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
              className="p-2 rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:contact@example.com"
              aria-label="Send email"
              title="Email"
              className="p-2 rounded-md hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Vertical Divider */}
      <div className="w-px h-full bg-border" />
      
      {/* Right Column - Simple Gradient */}
      <div className="w-1/2 h-full flex items-center justify-center p-12">
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end opacity-80" />
      </div>
      </div>
    </div>
  );
};

export default Index;
