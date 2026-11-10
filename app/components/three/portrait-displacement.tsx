"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useDeviceCapability } from "../../hooks/use-device-capability";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { createShaderLoop } from "../../lib/shader-loop";

export const HERO_MARK_URL = "/portrait-line.png";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 centered = vUv - 0.5;
    vec2 uv = vUv;

    // Radial ripple that tightens while the pointer is over the mark.
    float ripple = sin(length(centered) * 16.0 - uTime * 2.0) * 0.006 * uHover;
    uv += normalize(centered + 0.0001) * ripple;

    // Depth parallax: the cut-out leans with the pointer.
    uv += uPointer * 0.012;

    // Faint horizontal scan so the edge never looks perfectly static.
    uv.y += sin(uv.x * 18.0 + uTime * 1.1) * 0.0012 * uHover;

    vec4 base = texture2D(uTexture, uv);

    // Chromatic separation using alpha, strongest at the silhouette.
    float edge = smoothstep(0.2, 0.5, length(centered));
    vec2 split = normalize(centered + 0.0001) * 0.0045 * edge * (0.35 + uHover);
    float red = texture2D(uTexture, uv + split).a;
    float blue = texture2D(uTexture, uv - split).a;

    vec3 accent = vec3(0.42, 0.94, 0.55);
    vec3 color = base.rgb + accent * edge * 0.05;
    float alpha = max(base.a, max(red, blue) * 0.55);
    color += accent * (red - blue) * 0.6;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function PortraitDisplacement({ className }: { className?: string }) {
  const capable = useDeviceCapability();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!capable || !canvas) return;
    let cancelled = false;
    let loop: ReturnType<typeof createShaderLoop> = null;
    const hover = { value: 0 };

    (async () => {
      const THREE = await import("three");
      if (cancelled) return;
      new THREE.TextureLoader().load(HERO_MARK_URL, (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        const image = texture.image as { width?: number; height?: number } | undefined;
        const imageAspect = image?.width && image?.height ? image.width / image.height : 1;

        loop = createShaderLoop({
          THREE,
          canvas,
          maxPixelRatio: 1.75,
          setup: () => {
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const uniforms = {
              uTexture: { value: texture },
              uTime: { value: 0 },
              uHover: { value: 0 },
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
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
            scene.add(mesh);
            const eased = new THREE.Vector2(0, 0);
            return {
              scene,
              camera,
              update: ({ elapsed, pointer, width, height }) => {
                uniforms.uTime.value = elapsed;
                uniforms.uHover.value = hover.value;
                eased.lerp(pointer, 0.06);
                uniforms.uPointer.value.copy(eased);
                const canvasAspect = width / Math.max(height, 1);
                if (imageAspect > canvasAspect) mesh.scale.set(1, canvasAspect / imageAspect, 1);
                else mesh.scale.set(imageAspect / canvasAspect, 1, 1);
              },
            };
          },
        });
        if (loop) setReady(true);
      });
    })();

    const root = rootRef.current;
    const enter = () => {
      if (!prefersReducedMotion()) gsap.to(hover, { value: 1, duration: 0.6, ease: "power2.out" });
    };
    const leave = () => gsap.to(hover, { value: 0, duration: 0.8, ease: "power2.out" });
    root?.addEventListener("pointerenter", enter);
    root?.addEventListener("pointerleave", leave);

    return () => {
      cancelled = true;
      root?.removeEventListener("pointerenter", enter);
      root?.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(hover);
      loop?.dispose();
      setReady(false);
    };
  }, [capable]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rootRef.current) return;
      const el = rootRef.current;
      gsap.set(el, { y: 6, rotation: -1.6, transformOrigin: "50% 60%" });
      const float = gsap.to(el, { y: -12, duration: 4.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      const sway = gsap.to(el, { rotation: 1.6, duration: 6.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      return () => {
        float.kill();
        sway.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-cursor="hover" className={`group relative aspect-square w-full ${className ?? ""}`}>
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-primary/20 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
      />
      <img
        src={HERO_MARK_URL}
        alt="Line-art portrait of Mohammad Khosrotabar"
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {capable ? (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
    </div>
  );
}
