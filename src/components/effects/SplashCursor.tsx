'use client';
import { useEffect, useRef, useState } from 'react';
import './SplashCursor.css';

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.02, g: 0.02, b: 0.03 },
  TRANSPARENT = true
}: SplashCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#ff4757', '#2ed573', '#ffa502', '#5352ed', '#ff3838'];
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate movement velocity
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Create particles based on movement speed
      if (velocity > 2) {
        const numParticles = Math.min(Math.floor(velocity / 4), 8);
        const newParticles: Particle[] = [];

        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;
          const size = 2 + Math.random() * 4;
          const life = 60 + Math.random() * 60;

          newParticles.push({
            id: particleIdRef.current++,
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life,
            maxLife: life,
            color: colors[Math.floor(Math.random() * colors.length)],
            size
          });
        }

        setParticles(prev => [...prev, ...newParticles]);
      }

      lastMousePos.current = { x, y };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create burst effect on click
      const burstParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        const size = 3 + Math.random() * 8;
        const life = 80 + Math.random() * 80;

        burstParticles.push({
          id: particleIdRef.current++,
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          color: colors[Math.floor(Math.random() * colors.length)],
          size
        });
      }

      setParticles(prev => [...prev, ...burstParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Update particles
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98, // Friction
            vy: particle.vy * 0.98 + 0.1, // Gravity
            life: particle.life - 1,
            size: particle.size * 0.995
          }))
          .filter(particle => particle.life > 0 && particle.size > 0.5)
      );
    };

    const interval = setInterval(updateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="splash-cursor">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="splash-particle"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default SplashCursor;