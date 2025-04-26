'use client';

import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    opacity: number;
    direction: number;

    constructor(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `hsla(${Math.random() * 60 + 200}, 70%, 50%, 0.6)`; // blue-purple
      this.opacity = Math.random() * 0.5 + 0.3;
      this.direction = Math.random() * Math.PI * 2;
    }

    update(width: number, height: number) {
      this.x += this.speedX + Math.cos(this.direction) * 0.2;
      this.y += this.speedY + Math.sin(this.direction) * 0.2;
      this.direction += 0.01;

      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset previous scaling
      ctx.scale(dpr, dpr);
    };

    const createParticles = (count: number) => {
      const { width, height } = canvas;
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(width / dpr, height / dpr));
      }
    };

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles(30);
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles(30);
    });

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', () => {
        resizeCanvas();
        createParticles(30);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        filter: 'blur(2px)',
        background: 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--background) / 0.8))'
      }}
    />
  );
};
