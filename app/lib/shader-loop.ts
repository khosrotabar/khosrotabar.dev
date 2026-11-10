"use client";

import type * as THREE_NS from "three";
import { gsap } from "./gsap";

type ThreeModule = typeof THREE_NS;

export type LoopFrame = {
  elapsed: number;
  delta: number;
  pointer: THREE_NS.Vector2;
  width: number;
  height: number;
};

type SetupResult = {
  scene: THREE_NS.Scene;
  camera: THREE_NS.Camera;
  update?: (frame: LoopFrame) => void;
  dispose?: () => void;
};

type ShaderLoopOptions = {
  THREE: ThreeModule;
  canvas: HTMLCanvasElement;
  setup: (size: { width: number; height: number }) => SetupResult;
  resolutionScale?: number;
  maxPixelRatio?: number;
};

/**
 * Shared render loop: one WebGL renderer per canvas, driven by the GSAP ticker,
 * paused while offscreen or when the tab is hidden, resized with its parent.
 */
export function createShaderLoop({
  THREE,
  canvas,
  setup,
  resolutionScale = 1,
  maxPixelRatio = 1.75,
}: ShaderLoopOptions) {
  let renderer: THREE_NS.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  const host = canvas.parentElement ?? canvas;
  let width = Math.max(1, host.clientWidth);
  let height = Math.max(1, host.clientHeight);

  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, maxPixelRatio) * resolutionScale,
    );
    renderer.setSize(width, height, false);
  };

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  resize();

  const { scene, camera, update, dispose } = setup({ width, height });
  const pointer = new THREE.Vector2(0, 0);

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    );
  };

  let visible = true;
  let pageVisible = !document.hidden;
  let elapsed = 0;

  const tick = (_time: number, deltaMs: number) => {
    if (!visible || !pageVisible) return;
    const delta = Math.min(deltaMs, 64) / 1000;
    elapsed += delta;
    update?.({ elapsed, delta, pointer, width, height });
    renderer.render(scene, camera);
  };

  gsap.ticker.add(tick);
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const intersection = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) visible = entry.isIntersecting;
    },
    { rootMargin: "150px" },
  );
  intersection.observe(canvas);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  const onVisibility = () => {
    pageVisible = !document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);

  const disposeMaterial = (material: THREE_NS.Material) => {
    const uniforms = (material as THREE_NS.ShaderMaterial).uniforms;
    if (uniforms) {
      Object.values(uniforms).forEach((uniform) => {
        const value = uniform?.value;
        if (value instanceof THREE.Texture) value.dispose();
      });
    }
    const map = (material as THREE_NS.MeshBasicMaterial).map;
    if (map) map.dispose();
    material.dispose();
  };

  return {
    dispose() {
      gsap.ticker.remove(tick);
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        const mesh = object as THREE_NS.Mesh;
        mesh.geometry?.dispose?.();
        if (Array.isArray(mesh.material)) mesh.material.forEach(disposeMaterial);
        else if (mesh.material) disposeMaterial(mesh.material);
      });
      dispose?.();
      renderer.dispose();
    },
  };
}
