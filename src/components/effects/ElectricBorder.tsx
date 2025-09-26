import { useEffect, useId, useRef, ReactNode } from 'react';
import './ElectricBorder.css';

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ElectricBorder = ({ 
  children, 
  color = '#ff4757', 
  speed = 1, 
  chaos = 0.5, 
  thickness = 2, 
  className = '', 
  style = {} 
}: ElectricBorderProps) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGRectElement>(null);

  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }

    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach(a => {
        if (typeof (a as any).beginElement === 'function') {
          try {
            (a as any).beginElement();
          } catch {
            // Ignore errors
          }
        }
      });
    });
  };

  useEffect(() => {
    updateAnim();
  }, [speed, chaos]);

  return (
    <div ref={rootRef} className={`electric-border ${className}`} style={style}>
      <svg ref={svgRef} className="electric-border-svg">
        <defs>
          <filter id={filterId}>
            <feTurbulence baseFrequency="0.1" numOctaves="1" result="turb">
              <animate attributeName="baseFrequency" values="0.1; 0.2; 0.1" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feOffset in="turb" result="offset1">
              <animate attributeName="dy" dur="6s" repeatCount="indefinite" />
            </feOffset>
            <feOffset in="offset1" result="offset2">
              <animate attributeName="dx" dur="6s" repeatCount="indefinite" />
            </feOffset>
            <feDisplacementMap in="SourceGraphic" in2="offset2" scale="30" />
          </filter>
        </defs>
        <rect
          ref={strokeRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          rx="8"
        />
      </svg>
      <div className="electric-border-content">
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;