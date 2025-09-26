import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LaserFlow.css';

interface LaserFlowProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  className,
  style,
  color = '#B19EEF',
  horizontalBeamOffset = 0.5,
  verticalBeamOffset = 0.0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    mount.appendChild(canvas);

    // Vertex shader - using Three.js built-in attributes
    const vertexShader = `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader for laser beam effect - thin thread-like laser
    const fragmentShader = `
      precision highp float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uBeamX;
      uniform float uBeamY;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        
        // Create very thin vertical laser thread
        float beamX = uBeamX;
        float distFromBeam = abs(uv.x - beamX);
        
        // Very thin core thread - like a wire
        float thread = 1.0 / (1.0 + distFromBeam * 2000.0);
        thread = pow(thread, 0.1);
        
        // Minimal glow around the thread
        float glow = 1.0 / (1.0 + distFromBeam * 100.0);
        glow = pow(glow, 0.8);
        
        // Subtle animated flow along the thread
        float flow = sin(uv.y * 15.0 - uTime * 12.0) * 0.3 + 0.7;
        
        // Add very subtle noise for texture
        float noisePattern = noise(vec2(uv.x * 100.0, uv.y * 50.0 - uTime * 5.0)) * 0.1;
        
        // Vertical fade from top - stronger fall effect
        float verticalFade = smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
        verticalFade = max(verticalFade, 0.3);
        
        // Combine effects - emphasize the thin thread
        float intensity = (thread * 4.0 + glow * 0.5) * flow * verticalFade;
        intensity += noisePattern * intensity;
        intensity = max(intensity, 0.05);
        
        // Apply color with higher saturation for thin thread visibility
        vec3 finalColor = uColor * intensity * 3.0;
        
        // Minimal bloom to maintain thread-like appearance
        float bloom = intensity * 0.2;
        finalColor += uColor * bloom;
        
        gl_FragColor = vec4(finalColor, intensity * 0.8);
      }
    `;

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Convert hex color to RGB
    const hexToRGB = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      } : { r: 0.7, g: 0.6, b: 0.9 };
    };

    const { r, g, b } = hexToRGB(color);
    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(r, g, b) },
      uBeamX: { value: horizontalBeamOffset },
      uBeamY: { value: verticalBeamOffset }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation setup
    const clock = new THREE.Clock();

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width > 0 && height > 0) {
        renderer.setSize(width, height);
        uniforms.uResolution.value.set(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      uniforms.uTime.value = time;
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      
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