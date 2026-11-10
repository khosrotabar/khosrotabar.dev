"use client";

import { useEffect, useRef } from "react";
import { useDeviceCapability } from "../../hooks/use-device-capability";
import { createShaderLoop } from "../../lib/shader-loop";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    float t = uTime * 0.045;

    vec2 warp = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 - t + 3.7));
    float field = fbm(p * 2.1 + warp * 1.5 + t * 0.6);

    vec2 pointer = uPointer * 0.5 * aspect;
    float glow = smoothstep(0.95, 0.0, length(p - pointer)) * 0.32;

    float bands = smoothstep(0.05, 0.95, field + glow + 0.12 * sin(p.y * 3.5 + t * 2.5));

    vec3 deep = vec3(0.05, 0.16, 0.14);
    vec3 accent = vec3(0.42, 0.94, 0.55);
    vec3 color = mix(deep, accent, bands);

    float vignette = smoothstep(1.25, 0.1, length(p * vec2(1.0, 1.4)));
    float alpha = bands * 0.42 * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

/** Fixed, liquid gradient behind the whole site; follows the pointer softly. */
export function GradientField() {
  const capable = useDeviceCapability();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!capable || !canvas) return;
    let cancelled = false;
    let loop: ReturnType<typeof createShaderLoop> = null;

    (async () => {
      const THREE = await import("three");
      if (cancelled) return;
      loop = createShaderLoop({
        THREE,
        canvas,
        resolutionScale: 0.5,
        maxPixelRatio: 1.5,
        setup: ({ width, height }) => {
          const scene = new THREE.Scene();
          const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
          const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(width, height) },
            uPointer: { value: new THREE.Vector2(0, 0) },
          };
          const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
          });
          scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
          const eased = new THREE.Vector2(0, 0);
          return {
            scene,
            camera,
            update: ({ elapsed, pointer, width: w, height: h }) => {
              uniforms.uTime.value = elapsed;
              uniforms.uResolution.value.set(w, h);
              eased.lerp(pointer, 0.04);
              uniforms.uPointer.value.copy(eased);
            },
          };
        },
      });
    })();

    return () => {
      cancelled = true;
      loop?.dispose();
    };
  }, [capable]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.82_0.19_150/0.16),transparent_60%),radial-gradient(90%_60%_at_10%_110%,oklch(0.7_0.14_195/0.12),transparent_65%)]" />
      {capable ? <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" /> : null}
    </div>
  );
}
