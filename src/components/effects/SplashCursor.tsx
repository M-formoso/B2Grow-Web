import { useEffect, useRef } from 'react';

function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    let mouseX = 0;
    let mouseY = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.life = 1;
        this.maxLife = Math.random() * 50 + 20;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life -= 1;
      }

      draw() {
        const alpha = this.life / this.maxLife;
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, Math.random() * 3 + 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    function addParticles(x: number, y: number) {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y));
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      addParticles(mouseX, mouseY);
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}

export default SplashCursor;