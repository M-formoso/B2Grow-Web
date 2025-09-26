import { useEffect, useRef } from 'react';
import './SpeedLines.css';

interface SpeedLinesProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  intensity?: number;
  speed?: number;
}

const SpeedLines: React.FC<SpeedLinesProps> = ({
  className = '',
  style,
  color = '#ff4444',
  intensity = 50,
  speed = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing lines
    container.innerHTML = '';

    // Create speed lines
    for (let i = 0; i < intensity; i++) {
      const line = document.createElement('div');
      line.className = 'speed-line';
      
      // Random positioning and properties
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const length = Math.random() * 50 + 20;
      const width = Math.random() * 2 + 1;
      const animationDelay = Math.random() * 2;
      const animationDuration = (Math.random() * 2 + 1) / speed;
      const opacity = Math.random() * 0.7 + 0.3;
      
      line.style.left = `${startX}%`;
      line.style.top = `${startY}%`;
      line.style.width = `${length}px`;
      line.style.height = `${width}px`;
      line.style.background = color;
      line.style.opacity = opacity.toString();
      line.style.animationDelay = `${animationDelay}s`;
      line.style.animationDuration = `${animationDuration}s`;
      
      container.appendChild(line);
    }

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [color, intensity, speed]);

  return (
    <div 
      ref={containerRef}
      className={`speed-lines-container ${className}`}
      style={style}
    />
  );
};

export default SpeedLines;