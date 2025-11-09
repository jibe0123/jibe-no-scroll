import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const AnimatedBlob = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationIdRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Blob animation parameters
    let time = 0;
    const numPoints = 8;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      let centerX = rect.width / 2;
      let centerY = rect.height / 2;
      
      // Apply mouse interaction - blob follows cursor
      if (isHovering) {
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxOffset = baseRadius * 0.3;
        const influence = Math.min(distance, maxOffset) / maxOffset;
        
        centerX += dx * influence * 0.15;
        centerY += dy * influence * 0.15;
      }
      
      // Create blob shape with noise
      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const noiseFreq = prefersReducedMotion ? 0.5 : 1;
        const noise = Math.sin(time * noiseFreq + i) * 0.15 + Math.cos(time * 0.7 + i * 0.5) * 0.15;
        const radius = baseRadius * (1 + noise);
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth curves between points
          const prevAngle = ((i - 1) / numPoints) * Math.PI * 2;
          const prevNoise = Math.sin(time * noiseFreq + (i - 1)) * 0.15 + Math.cos(time * 0.7 + (i - 1) * 0.5) * 0.15;
          const prevRadius = baseRadius * (1 + prevNoise);
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      }
      ctx.closePath();
      
      // Create gradient based on theme
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius * 1.2
      );
      
      if (theme === 'dark') {
        // Dark mode: more vibrant but controlled
        gradient.addColorStop(0, 'hsl(30, 70%, 50%)'); // Amber
        gradient.addColorStop(0.5, 'hsl(330, 65%, 55%)'); // Magenta
        gradient.addColorStop(1, 'hsl(45, 80%, 55%)'); // Gold
      } else {
        // Light mode: softer saturation
        gradient.addColorStop(0, 'hsl(30, 60%, 65%)'); // Softer amber
        gradient.addColorStop(0.5, 'hsl(330, 55%, 70%)'); // Softer magenta
        gradient.addColorStop(1, 'hsl(45, 70%, 70%)'); // Softer gold
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add subtle shadow in light mode
      if (theme === 'light') {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
      }
      
      // Increment time for animation (slower if reduced motion)
      time += prefersReducedMotion ? 0.005 : 0.015;
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [theme, mousePos, isHovering]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-pointer"
      aria-hidden="true"
    />
  );
};
