import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import './Hyperspeed.css';

export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  }
};

interface HyperspeedProps {
  effectOptions?: any;
}

const Hyperspeed = ({
  effectOptions = hyperspeedPresets.one
}: HyperspeedProps) => {
  const hyperspeed = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      const container = hyperspeed.current?.querySelector('#lights');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    }

    // Create simplified visual effect using basic Three.js
    class HyperspeedApp {
      container: HTMLElement;
      renderer: THREE.WebGLRenderer;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      clock: THREE.Clock;
      disposed: boolean = false;
      particles: THREE.Points[] = [];

      constructor(container: HTMLElement) {
        this.container = container;
        
        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false
        });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // Setup scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
          75,
          container.offsetWidth / container.offsetHeight,
          0.1,
          2000
        );
        this.camera.position.z = 5;

        this.clock = new THREE.Clock();
        this.createHyperspeedEffect();
        
        window.addEventListener('resize', this.onWindowResize.bind(this));
      }

      createHyperspeedEffect() {
        // Create multiple particle systems for the hyperspeed effect
        for (let i = 0; i < 3; i++) {
          const particleCount = 800;
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(particleCount * 3);
          const colors = new Float32Array(particleCount * 3);

          for (let j = 0; j < particleCount; j++) {
            const idx = j * 3;
            
            // Random positions in a tunnel-like distribution
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 50 + 10;
            
            positions[idx] = Math.cos(angle) * radius;
            positions[idx + 1] = Math.sin(angle) * radius;
            positions[idx + 2] = (Math.random() - 0.5) * 1000;

            // Color based on layer
            if (i === 0) {
              // Red particles
              colors[idx] = 1;
              colors[idx + 1] = 0.2;
              colors[idx + 2] = 0.4;
            } else if (i === 1) {
              // Blue particles
              colors[idx] = 0.2;
              colors[idx + 1] = 0.4;
              colors[idx + 2] = 1;
            } else {
              // White particles
              colors[idx] = 1;
              colors[idx + 1] = 1;
              colors[idx + 2] = 1;
            }
          }

          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const material = new THREE.PointsMaterial({
            size: 2 + i,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
          });

          const particles = new THREE.Points(geometry, material);
          this.scene.add(particles);
          this.particles.push(particles);
        }
      }

      onWindowResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      }

      update() {
        const time = this.clock.getElapsedTime();
        
        // Animate particles to create hyperspeed effect
        this.particles.forEach((particles, index) => {
          const positions = particles.geometry.attributes.position.array as Float32Array;
          
          for (let i = 0; i < positions.length; i += 3) {
            // Move particles towards camera
            positions[i + 2] += (index + 1) * 5;
            
            // Reset particles that have passed the camera
            if (positions[i + 2] > 50) {
              positions[i + 2] = -500;
            }
          }
          
          particles.geometry.attributes.position.needsUpdate = true;
          particles.rotation.z = time * 0.1 * (index + 1);
        });
      }

      render() {
        this.renderer.render(this.scene, this.camera);
      }

      animate() {
        if (this.disposed) return;
        
        requestAnimationFrame(this.animate.bind(this));
        this.update();
        this.render();
      }

      dispose() {
        this.disposed = true;
        
        this.particles.forEach(particles => {
          this.scene.remove(particles);
          particles.geometry.dispose();
          if (particles.material instanceof THREE.Material) {
            particles.material.dispose();
          }
        });
        
        this.renderer.dispose();
        window.removeEventListener('resize', this.onWindowResize.bind(this));
      }
    }

    // Initialize the effect
    if (hyperspeed.current) {
      let container = hyperspeed.current.querySelector('#lights') as HTMLElement;
      if (!container) {
        container = document.createElement('div');
        container.id = 'lights';
        hyperspeed.current.appendChild(container);
      }

      const app = new HyperspeedApp(container);
      appRef.current = app;
      app.animate();
    }

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [effectOptions]);

  return <div ref={hyperspeed} className="hyperspeed-container"></div>;
};

export default Hyperspeed;