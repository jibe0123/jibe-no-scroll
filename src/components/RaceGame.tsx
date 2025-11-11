import { useEffect, useRef, useState } from 'react';

interface RaceGameProps {
  isPlaying: boolean;
  onLapComplete: (laps: number) => void;
}

export const RaceGame = ({ isPlaying, onLapComplete }: RaceGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerPositionRef = useRef(0);
  const aiPositionRef = useRef(0);
  const playerSpeedRef = useRef(0);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lapsRef = useRef(0);
  const aiSpeedRef = useRef(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      keysRef.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const trackRadius = Math.min(rect.width, rect.height) * 0.35;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Get theme colors
      const isDark = document.documentElement.classList.contains('dark');
      const trackColor = isDark ? '#333' : '#ddd';
      const lineColor = isDark ? '#555' : '#fff';
      const playerColor = isDark ? '#60a5fa' : '#3b82f6';
      const aiColor = isDark ? '#f87171' : '#ef4444';

      // Draw track
      ctx.strokeStyle = trackColor;
      ctx.lineWidth = 80;
      ctx.beginPath();
      ctx.arc(centerX, centerY, trackRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw center line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, trackRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (isPlaying) {
        // Player controls
        if (keysRef.current['ArrowUp'] || keysRef.current['ArrowRight']) {
          playerSpeedRef.current = Math.min(playerSpeedRef.current + 0.15, 4);
        } else if (keysRef.current['ArrowDown'] || keysRef.current['ArrowLeft']) {
          playerSpeedRef.current = Math.max(playerSpeedRef.current - 0.15, -2);
        } else {
          playerSpeedRef.current *= 0.98;
        }

        // Update positions
        playerPositionRef.current += playerSpeedRef.current * 0.01;
        if (playerPositionRef.current > Math.PI * 2) {
          playerPositionRef.current -= Math.PI * 2;
          lapsRef.current += 1;
          onLapComplete(lapsRef.current);
        }
        if (playerPositionRef.current < 0) {
          playerPositionRef.current += Math.PI * 2;
        }

        // AI logic - simple rubber banding
        const distanceToPlayer = Math.abs(playerPositionRef.current - aiPositionRef.current);
        if (distanceToPlayer > Math.PI) {
          aiSpeedRef.current = 2.5;
        } else if (distanceToPlayer < 0.5) {
          aiSpeedRef.current = 1.5;
        } else {
          aiSpeedRef.current = 2;
        }

        aiPositionRef.current += aiSpeedRef.current * 0.01;
        if (aiPositionRef.current > Math.PI * 2) {
          aiPositionRef.current -= Math.PI * 2;
        }

        // Draw player car
        const playerX = centerX + Math.cos(playerPositionRef.current) * trackRadius;
        const playerY = centerY + Math.sin(playerPositionRef.current) * trackRadius;
        ctx.save();
        ctx.translate(playerX, playerY);
        ctx.rotate(playerPositionRef.current + Math.PI / 2);
        ctx.fillStyle = playerColor;
        ctx.fillRect(-8, -12, 16, 24);
        ctx.fillStyle = isDark ? '#93c5fd' : '#1e40af';
        ctx.fillRect(-6, -8, 12, 16);
        ctx.restore();

        // Draw AI car
        const aiX = centerX + Math.cos(aiPositionRef.current) * trackRadius;
        const aiY = centerY + Math.sin(aiPositionRef.current) * trackRadius;
        ctx.save();
        ctx.translate(aiX, aiY);
        ctx.rotate(aiPositionRef.current + Math.PI / 2);
        ctx.fillStyle = aiColor;
        ctx.fillRect(-8, -12, 16, 24);
        ctx.fillStyle = isDark ? '#fca5a5' : '#991b1b';
        ctx.fillRect(-6, -8, 12, 16);
        ctx.restore();
      } else {
        // Draw static cars at start position
        const startAngle = -Math.PI / 2;
        const playerX = centerX + Math.cos(startAngle) * trackRadius;
        const playerY = centerY + Math.sin(startAngle) * trackRadius;
        
        ctx.save();
        ctx.translate(playerX, playerY);
        ctx.rotate(startAngle + Math.PI / 2);
        ctx.fillStyle = playerColor;
        ctx.fillRect(-8, -12, 16, 24);
        ctx.fillStyle = isDark ? '#93c5fd' : '#1e40af';
        ctx.fillRect(-6, -8, 12, 16);
        ctx.restore();

        const aiX = centerX + Math.cos(startAngle + 0.3) * trackRadius;
        const aiY = centerY + Math.sin(startAngle + 0.3) * trackRadius;
        
        ctx.save();
        ctx.translate(aiX, aiY);
        ctx.rotate(startAngle + 0.3 + Math.PI / 2);
        ctx.fillStyle = aiColor;
        ctx.fillRect(-8, -12, 16, 24);
        ctx.fillStyle = isDark ? '#fca5a5' : '#991b1b';
        ctx.fillRect(-6, -8, 12, 16);
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, onLapComplete]);

  // Reset when game starts
  useEffect(() => {
    if (isPlaying) {
      playerPositionRef.current = -Math.PI / 2;
      aiPositionRef.current = -Math.PI / 2 + 0.3;
      playerSpeedRef.current = 0;
      lapsRef.current = 0;
      keysRef.current = {};
    }
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
};
