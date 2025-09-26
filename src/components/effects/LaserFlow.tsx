import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LaserFlow.css';

interface LaserFlowProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  wispDensity?: number;
  mouseTiltStrength?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  mouseSmoothTime?: number;
  dpr?: number;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  className,
  style,
  color = '#FF79C6',
  horizontalBeamOffset = 0.5,
  verticalBeamOffset = 0.0,
  wispDensity = 0.8,
  mouseTiltStrength = 0.05,
  flowSpeed = 1.0,
  verticalSizing = 1.0,
  horizontalSizing = 1.0,
  fogIntensity = 0.6,
  fogScale = 1.0,
  wispSpeed = 1.0,
  wispIntensity = 0.8,
  flowStrength = 1.0,
  decay = 0.95,
  falloffStart = 0.1,
  fogFallSpeed = 1.0,
  mouseSmoothTime = 0.1,
  dpr = 1.0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const hexToRGB = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 1, g: 1, b: 1 };
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Basic laser beam shader - simplified version
    const vertexShader = `
      precision highp float;
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec4 iMouse;
      uniform vec3 uColor;
      uniform float uFade;
      uniform float uBeamXFrac;
      uniform float uBeamYFrac;

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        
        // Create vertical laser beam
        float beamX = uBeamXFrac + (iMouse.x / iResolution.x - 0.5) * 0.1;
        float dist = abs(uv.x - beamX);
        
        // Main beam intensity
        float beam = 1.0 / (1.0 + dist * 300.0);
        beam = pow(beam, 2.0);
        
        // Add glow
        float glow = 1.0 / (1.0 + dist * 50.0);
        glow = pow(glow, 0.5);
        
        // Vertical fade
        float verticalFade = 1.0 - abs(uv.y - 0.5) * 2.0;
        verticalFade = max(0.0, verticalFade);
        
        // Animated flow
        float flow = sin(uv.y * 10.0 - iTime * 5.0) * 0.5 + 0.5;
        beam *= (0.8 + flow * 0.2);
        
        // Combine effects
        float intensity = (beam + glow * 0.3) * verticalFade * uFade;
        
        vec3 finalColor = uColor * intensity;
        gl_FragColor = vec4(finalColor, intensity);
      }
    `;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    mount.appendChild(canvas);

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const { r, g, b } = hexToRGB(color);
    const uniforms = {
      iResolution: { value: new THREE.Vector2() },
      iTime: { value: 0 },
      iMouse: { value: new THREE.Vector4() },
      uColor: { value: new THREE.Vector3(r, g, b) },
      uFade: { value: 0 },
      uBeamXFrac: { value: horizontalBeamOffset },
      uBeamYFrac: { value: verticalBeamOffset }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation setup
    const clock = new THREE.Clock();
    let fade = 0;
    const mousePos = new THREE.Vector2();

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mousePos.x = event.clientX - rect.left;
      mousePos.y = event.clientY - rect.top;
      uniforms.iMouse.value.set(mousePos.x, mousePos.y, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      uniforms.iTime.value = time;
      
      // Fade in effect
      if (fade < 1) {
        fade = Math.min(1, fade + 0.02);
        uniforms.uFade.value = fade;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (mount.contains(canvas)) {
        mount.removeChild(canvas);
      }
    };
  }, [color, horizontalBeamOffset, verticalBeamOffset]);

  return (
    <div 
      ref={mountRef} 
      className={`laser-flow-container ${className || ''}`} 
      style={style}
    />
  );
};

export default LaserFlow;