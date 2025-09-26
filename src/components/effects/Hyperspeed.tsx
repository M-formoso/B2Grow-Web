import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

import './Hyperspeed.css';

interface HyperspeedProps {
  effectOptions?: {
    onSpeedUp?: () => void;
    onSlowDown?: () => void;
    distortion?: string;
    length?: number;
    roadWidth?: number;
    islandWidth?: number;
    lanesPerRoad?: number;
    fov?: number;
    fovSpeedUp?: number;
    speedUp?: number;
    carLightsFade?: number;
    totalSideLightSticks?: number;
    lightPairsPerRoadWay?: number;
    shoulderLinesWidthPercentage?: number;
    brokenLinesWidthPercentage?: number;
    brokenLinesLengthPercentage?: number;
    lightStickWidth?: number[];
    lightStickHeight?: number[];
    movingAwaySpeed?: number[];
    movingCloserSpeed?: number[];
    carLightsLength?: number[];
    carLightsRadius?: number[];
    carWidthPercentage?: number[];
    carShiftX?: number[];
    carFloorSeparation?: number[];
    colors?: {
      roadColor?: number;
      islandColor?: number;
      background?: number;
      shoulderLines?: number;
      brokenLines?: number;
      leftCars?: number[];
      rightCars?: number[];
      sticks?: number;
    };
  };
}

const Hyperspeed: React.FC<HyperspeedProps> = ({
  effectOptions = {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
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
      shoulderLines: 0xffffff,
      brokenLines: 0xffffff,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  }
}) => {
  const hyperspeed = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      const container = document.getElementById('lights');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    }

    // Distortion uniforms and functions
    const mountainUniforms = {
      uFreq: { value: new THREE.Vector3(3, 6, 10) },
      uAmp: { value: new THREE.Vector3(30, 30, 20) }
    };

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    let nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

    const distortions: any = {
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          const uFreq = turbulentUniforms.uFreq.value;
          const uAmp = turbulentUniforms.uAmp.value;

          const getX = (p: number) =>
            Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
            Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;

          const getY = (p: number) =>
            -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
            Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;

          let distortion = new THREE.Vector3(
            getX(progress) - getX(progress + 0.007),
            getY(progress) - getY(progress + 0.007),
            0
          );
          let lookAtAmp = new THREE.Vector3(-2, -5, 0);
          let lookAtOffset = new THREE.Vector3(0, 0, -10);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      }
    };

    const random = (base: number | number[]) => {
      if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
      return Math.random() * base;
    };

    const pickRandom = (arr: any) => {
      if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
      return arr;
    };

    function lerp(current: number, target: number, speed = 0.1, limit = 0.001) {
      let change = (target - current) * speed;
      if (Math.abs(change) < limit) {
        change = target - current;
      }
      return change;
    }

    class App {
      options: any;
      container: HTMLElement;
      renderer: THREE.WebGLRenderer;
      composer: EffectComposer;
      camera: THREE.PerspectiveCamera;
      scene: THREE.Scene;
      fogUniforms: any;
      clock: THREE.Clock;
      assets: any;
      disposed: boolean;
      road: Road;
      leftCarLights: CarLights;
      rightCarLights: CarLights;
      leftSticks: LightsSticks;
      fovTarget: number;
      speedUpTarget: number;
      speedUp: number;
      timeOffset: number;
      renderPass: any;
      bloomPass: any;

      constructor(container: HTMLElement, options: any = {}) {
        this.options = options;
        if (this.options.distortion == null) {
          this.options.distortion = distortions.turbulentDistortion;
        }
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true
        });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.composer = new EffectComposer(this.renderer);
        container.append(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
          options.fov,
          container.offsetWidth / container.offsetHeight,
          0.1,
          10000
        );
        this.camera.position.z = -5;
        this.camera.position.y = 8;
        this.camera.position.x = 0;
        this.scene = new THREE.Scene();
        this.scene.background = null;

        let fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = {
          fogColor: { value: fog.color },
          fogNear: { value: fog.near },
          fogFar: { value: fog.far }
        };
        this.clock = new THREE.Clock();
        this.assets = {};
        this.disposed = false;

        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(
          this,
          options,
          options.colors.leftCars,
          options.movingAwaySpeed,
          new THREE.Vector2(0, 1 - options.carLightsFade)
        );
        this.rightCarLights = new CarLights(
          this,
          options,
          options.colors.rightCars,
          options.movingCloserSpeed,
          new THREE.Vector2(1, 0 + options.carLightsFade)
        );
        this.leftSticks = new LightsSticks(this, options);

        this.fovTarget = options.fov;
        this.speedUpTarget = 0;
        this.speedUp = 0;
        this.timeOffset = 0;

        this.tick = this.tick.bind(this);
        this.init = this.init.bind(this);
        this.setSize = this.setSize.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize);
      }

      onWindowResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(width, height);
      }

      initPasses() {
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new EffectPass(
          this.camera,
          new BloomEffect({
            luminanceThreshold: 0.2,
            luminanceSmoothing: 0,
            resolutionScale: 1
          })
        );

        const smaaPass = new EffectPass(
          this.camera,
          new SMAAEffect({
            preset: SMAAPreset.MEDIUM
          })
        );
        this.renderPass.renderToScreen = false;
        this.bloomPass.renderToScreen = false;
        smaaPass.renderToScreen = true;
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(smaaPass);
      }

      init() {
        this.initPasses();
        const options = this.options;
        this.road.init();
        this.leftCarLights.init();

        this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2));

        this.tick();
      }

      update(delta: number) {
        let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
        this.timeOffset += this.speedUp * delta;

        let time = this.clock.elapsedTime + this.timeOffset;

        this.rightCarLights.update(time);
        this.leftCarLights.update(time);
        this.leftSticks.update(time);
        this.road.update(time);

        let updateCamera = false;
        let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage);
        if (fovChange !== 0) {
          this.camera.fov += fovChange * delta * 6;
          updateCamera = true;
        }

        if (this.options.distortion.getJS) {
          const distortion = this.options.distortion.getJS(0.025, time);

          this.camera.lookAt(
            new THREE.Vector3(
              this.camera.position.x + distortion.x,
              this.camera.position.y + distortion.y,
              this.camera.position.z + distortion.z
            )
          );
          updateCamera = true;
        }
        if (updateCamera) {
          this.camera.updateProjectionMatrix();
        }
      }

      render(delta: number) {
        this.composer.render(delta);
      }

      dispose() {
        this.disposed = true;

        if (this.renderer) {
          this.renderer.dispose();
        }
        if (this.composer) {
          this.composer.dispose();
        }
        if (this.scene) {
          this.scene.clear();
        }

        window.removeEventListener('resize', this.onWindowResize);
      }

      setSize(width: number, height: number, updateStyles?: boolean) {
        this.composer.setSize(width, height, updateStyles);
      }

      tick() {
        if (this.disposed || !this) return;
        
        const delta = this.clock.getDelta();
        this.render(delta);
        this.update(delta);
        requestAnimationFrame(this.tick);
      }
    }

    // Simplified Road, CarLights, and LightsSticks classes with basic functionality
    class Road {
      webgl: App;
      options: any;
      uTime: { value: number };
      leftRoadWay: THREE.Mesh;
      rightRoadWay: THREE.Mesh;
      island: THREE.Mesh;

      constructor(webgl: App, options: any) {
        this.webgl = webgl;
        this.options = options;
        this.uTime = { value: 0 };
      }

      init() {
        // Create simplified road geometry
        const geometry = new THREE.PlaneGeometry(this.options.roadWidth * 2 + this.options.islandWidth, this.options.length, 20, 100);
        const material = new THREE.MeshBasicMaterial({ 
          color: this.options.colors.roadColor,
          transparent: true,
          opacity: 0.8
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -this.options.length / 2;
        this.webgl.scene.add(mesh);
        this.leftRoadWay = mesh;
      }

      update(time: number) {
        this.uTime.value = time;
      }
    }

    class CarLights {
      webgl: App;
      options: any;
      colors: any;
      speed: number[];
      fade: THREE.Vector2;
      mesh: THREE.Mesh;

      constructor(webgl: App, options: any, colors: any, speed: number[], fade: THREE.Vector2) {
        this.webgl = webgl;
        this.options = options;
        this.colors = colors;
        this.speed = speed;
        this.fade = fade;
      }

      init() {
        // Create simplified car lights
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
          color: Array.isArray(this.colors) ? this.colors[0] : this.colors,
          transparent: true,
          opacity: 0.6
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.webgl.scene.add(this.mesh);
      }

      update(time: number) {
        // Simple animation
        if (this.mesh) {
          this.mesh.position.z = Math.sin(time) * 10;
        }
      }
    }

    class LightsSticks {
      webgl: App;
      options: any;
      mesh: THREE.Mesh;

      constructor(webgl: App, options: any) {
        this.webgl = webgl;
        this.options = options;
      }

      init() {
        // Create simplified light sticks
        const geometry = new THREE.BoxGeometry(0.1, 2, 0.1);
        const material = new THREE.MeshBasicMaterial({ 
          color: this.options.colors.sticks,
          transparent: true,
          opacity: 0.4
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.webgl.scene.add(this.mesh);
      }

      update(time: number) {
        // Simple animation
        if (this.mesh) {
          this.mesh.position.y = Math.sin(time * 2) * 0.5 + 1;
        }
      }
    }

    // Initialize the app
    const container = document.getElementById('lights');
    if (container) {
      const options = { ...effectOptions };
      options.distortion = distortions[options.distortion || 'turbulentDistortion'];

      const myApp = new App(container, options);
      appRef.current = myApp;
      myApp.init();
    }

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [effectOptions]);

  return <div id="lights" ref={hyperspeed}></div>;
};

export default Hyperspeed;