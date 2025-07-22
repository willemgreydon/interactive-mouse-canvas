import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface CanvasProps {
  color: string;
  intensity: number;
  particleCount: number;
  trailLength: number;
  gravity: number;
  size: number;
  effectMode: string;
  enableTrail: boolean;
  enableGlow: boolean;
  enableRipples: boolean;
}

export function InteractiveCanvas({
  color,
  intensity,
  particleCount,
  trailLength,
  gravity,
  size,
  effectMode,
  enableTrail,
  enableGlow,
  enableRipples
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const trailRef = useRef<{ x: number; y: number; time: number }[]>([]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  const createParticle = useCallback((x: number, y: number) => {
    const rgb = hexToRgb(color);
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * intensity + 1;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 255,
      maxLife: 255,
      size: Math.random() * size + 2,
      color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
    };
  }, [color, intensity, size]);

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply gravity
      particle.vy += gravity * 0.1;
      
      // Apply gentle friction
      particle.vx *= 0.995;
      particle.vy *= 0.995;
      
      // Update life
      particle.life -= 2;
      
      if (particle.life <= 0) return false;
      
      // Update color with alpha
      const alpha = particle.life / particle.maxLife;
      const rgb = hexToRgb(color);
      particle.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      
      return true;
    });
  }, [gravity, color]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(particle => {
      ctx.save();
      
      if (enableGlow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
      }
      
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }, [enableGlow]);

  const drawTrail = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!enableTrail || trailRef.current.length < 2) return;
    
    const now = Date.now();
    trailRef.current = trailRef.current.filter(point => now - point.time < trailLength * 100);
    
    for (let i = 1; i < trailRef.current.length; i++) {
      const prev = trailRef.current[i - 1];
      const curr = trailRef.current[i];
      const age = (now - curr.time) / (trailLength * 100);
      const alpha = (1 - age) * 0.8;
      
      const rgb = hexToRgb(color);
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      ctx.lineWidth = (1 - age) * 3;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.stroke();
    }
  }, [enableTrail, trailLength, color]);

  const drawRipples = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!enableRipples || !mouseRef.current.isDown) return;
    
    const time = Date.now() * 0.005;
    const rgb = hexToRgb(color);
    
    for (let i = 0; i < 3; i++) {
      const radius = (time * 3 + i * 30) % 120;
      const alpha = Math.max(0, 1 - (radius / 120)) * 0.6;
      
      if (alpha > 0) {
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }, [enableRipples, color]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with subtle fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    updateParticles();
    drawTrail(ctx);
    drawParticles(ctx);
    drawRipples(ctx);
    
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawTrail, drawParticles, drawRipples]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    
    // Add to trail
    if (enableTrail) {
      trailRef.current.push({ x, y, time: Date.now() });
    }
    
    // Create particles based on effect mode
    if (effectMode === 'continuous' || (effectMode === 'drag' && mouseRef.current.isDown)) {
      for (let i = 0; i < particleCount; i++) {
        if (particlesRef.current.length < 300) {
          particlesRef.current.push(createParticle(x, y));
        }
      }
    }
  }, [effectMode, particleCount, createParticle, enableTrail]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseRef.current.isDown = true;
    
    if (effectMode === 'click') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create burst of particles on click
      for (let i = 0; i < particleCount * 3; i++) {
        if (particlesRef.current.length < 300) {
          particlesRef.current.push(createParticle(x, y));
        }
      }
    }
  }, [effectMode, particleCount, createParticle]);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-black cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
}