"use client";

import { useEffect, useRef, useState } from "react";
import {
  siDocker,
  siGithub,
  siGo,
  siJsonwebtokens,
  siNextdotjs,
  siPostgresql,
  siPrometheus,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import type * as THREE_NS from "three";
import { useDeviceCapability } from "../../hooks/use-device-capability";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { isFinePointer, ScrollTrigger } from "../../lib/gsap";
import { createShaderLoop } from "../../lib/shader-loop";
import { SectionHeading } from "../ui/section-heading";
import { PortraitMarker } from "../ui/portrait-marker";
import { Reveal } from "../ui/reveal";

type TechItem = { name: string; path: string; hex: string };

/** Brand colours that disappear on a dark background are rendered in near-white instead. */
function readableHex(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60 ? "eff2f4" : hex;
}

const tech: TechItem[] = [
  { name: "Go", icon: siGo },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Redis", icon: siRedis },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind", icon: siTailwindcss },
  { name: "Docker", icon: siDocker },
  { name: "Prometheus", icon: siPrometheus },
  { name: "JWT", icon: siJsonwebtokens },
  { name: "GitHub", icon: siGithub },
  { name: "Vercel", icon: siVercel },
].map(({ name, icon }) => ({ name, path: icon.path, hex: readableHex(icon.hex) }));

async function iconTexture(item: TechItem, THREE: typeof THREE_NS) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;
  try {
    const image = new Image();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#ffffff" d="${item.path}"/></svg>`;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();
    context.drawImage(image, 0, 0, 256, 256);
  } catch {
    context.fillStyle = "#ffffff";
    context.font = "bold 84px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(item.name.slice(0, 2).toUpperCase(), 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function TechGrid() {
  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4 lg:grid-cols-6">
      {tech.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2.5 bg-card px-3 py-5 transition-colors duration-300 hover:bg-accent"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-7" style={{ fill: `#${item.hex}` }}>
            <path d={item.path} />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export function TechOrbit() {
  const capable = useDeviceCapability();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const mounted = reducedMotion !== null;
  const reduced = reducedMotion !== false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!capable || !canvas) return;
    let cancelled = false;
    let loop: ReturnType<typeof createShaderLoop> = null;
    const drag = { active: false, lastX: 0, offset: 0, velocity: 0 };
    const fine = isFinePointer();

    (async () => {
      const THREE = await import("three");
      const textures = await Promise.all(tech.map((item) => iconTexture(item, THREE)));
      if (cancelled) {
        textures.forEach((texture) => texture?.dispose());
        return;
      }
      const items = tech
        .map((item, index) => ({ item, texture: textures[index] }))
        .filter((entry): entry is { item: TechItem; texture: THREE_NS.CanvasTexture } => !!entry.texture);
      if (!items.length) return;

      loop = createShaderLoop({
        THREE,
        canvas,
        maxPixelRatio: 1.6,
        setup: () => {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
          camera.position.set(0, 0.35, 6.1);
          camera.lookAt(0, 0, 0);
          const ring = new THREE.Group();
          scene.add(ring);
          const step = (Math.PI * 2) / items.length;
          const planes = items.map(({ item, texture }, index) => {
            const angle = index * step;
            const material = new THREE.MeshBasicMaterial({
              map: texture,
              color: new THREE.Color(`#${item.hex}`),
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
            });
            const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 0.78), material);
            plane.position.set(2.35 * Math.sin(angle), index % 2 === 0 ? 0.34 : -0.34, 2.35 * Math.cos(angle));
            plane.rotation.y = angle;
            ring.add(plane);
            return plane;
          });

          let spin = 0;
          let scroll = 0;
          let tilt = 0;
          const trigger = ScrollTrigger.create({
            trigger: stageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              scroll = self.progress * Math.PI * 2.2;
            },
          });

          return {
            scene,
            camera,
            update: ({ elapsed, delta, pointer, width, height }) => {
              camera.aspect = width / Math.max(height, 1);
              camera.updateProjectionMatrix();
              spin += 0.22 * delta;
              if (!drag.active) {
                drag.offset += drag.velocity * delta * 60;
                drag.velocity *= 0.94;
                if (Math.abs(drag.velocity) < 0.0002) drag.velocity = 0;
              }
              ring.rotation.y = spin + scroll + drag.offset;
              tilt += (0.28 * pointer.x - tilt) * 0.05;
              ring.rotation.x = -0.08 + 0.35 * tilt;
              ring.rotation.z = 0.03 * Math.sin(0.6 * spin);
              planes.forEach((plane) => {
                const facing = Math.max(0, Math.cos(plane.rotation.y + ring.rotation.y));
                (plane.material as THREE_NS.MeshBasicMaterial).opacity = 0.12 + 0.88 * Math.pow(facing, 1.4);
                plane.scale.setScalar(0.82 + 0.24 * facing);
              });
              camera.position.z = 5.9 + 0.18 * Math.sin(0.25 * elapsed);
              camera.lookAt(0, 0, 0);
            },
            dispose: () => trigger.kill(),
          };
        },
      });
      if (loop) setReady(true);
      else setFailed(true);
    })();

    const down = (event: PointerEvent) => {
      if (!fine) return;
      drag.active = true;
      drag.lastX = event.clientX;
      drag.velocity = 0;
      canvas.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!drag.active) return;
      const dx = event.clientX - drag.lastX;
      drag.lastX = event.clientX;
      drag.offset += 0.008 * dx;
      drag.velocity = 0.0009 * dx;
    };
    const up = (event: PointerEvent) => {
      if (!drag.active) return;
      drag.active = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelled = true;
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      loop?.dispose();
      setReady(false);
    };
  }, [capable]);

  const show3d = capable && !reduced && !failed;

  return (
    <section id="stack" className="relative scroll-mt-20 border-t border-border py-20 md:py-28">
      <PortraitMarker />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The stack"
          title="The tools behind every build"
          description="Not a wishlist — this is what actually ships in my work, from the PostgreSQL schema up to the Next.js frontend."
        />
        <Reveal y={30} className="mt-12">
          <div ref={stageRef} className="relative overflow-hidden rounded-3xl border border-border bg-card/40">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.82_0.19_150/0.10),transparent_70%)]"
            />
            {!mounted ? (
              <div className="aspect-[4/3] w-full md:aspect-[16/9]" />
            ) : show3d ? (
              <div className="relative aspect-[4/3] w-full md:aspect-[16/9]">
                <canvas
                  ref={canvasRef}
                  data-cursor={ready ? "hover" : undefined}
                  data-cursor-text={ready ? "Drag" : undefined}
                  className={`absolute inset-0 h-full w-full touch-pan-y transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
                />
                {ready ? null : (
                  <div className="absolute inset-0 grid place-items-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Loading stack…</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 md:p-8">
                <TechGrid />
              </div>
            )}
          </div>
        </Reveal>
        {show3d ? (
          <Reveal stagger={0.02} y={10} className="mt-6 flex flex-wrap justify-center gap-2">
            {tech.map((item) => (
              <span
                key={item.name}
                data-reveal-item
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {item.name}
              </span>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
