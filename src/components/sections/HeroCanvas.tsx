"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The site's single WebGL accent (DESIGN_DNA: "one shader, one place").
 * An original domain-warped fbm flow field — slow amber embers drifting
 * through warm darkness — with gentle pointer influence. One hue on dark,
 * matching the observed genre (Jayden/Davies/Platform run a single-hue
 * ambient layer, never a rainbow). Budgeted: DPR ≤ 1.5, antialias off,
 * rendering paused whenever the hero is off-screen.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uMouse;

  // hash + value noise + fbm — standard building blocks, original composition
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(17.0, -9.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0) * 2.2;

    float t = uTime * 0.045;
    vec2 drift = uMouse * 0.18;

    // domain warp: q feeds r feeds the field
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p + 1.6 * q + vec2(1.7, 9.2) + t * 0.6 + drift),
      fbm(p + 1.6 * q + vec2(8.3, 2.8) - t * 0.4)
    );
    float f = fbm(p + 1.8 * r);

    vec3 ground = vec3(0.047, 0.043, 0.035);   // #0c0b09
    vec3 ember  = vec3(0.910, 0.392, 0.173);   // #e8642c
    vec3 smoke  = vec3(0.180, 0.160, 0.130);   // warm mid

    vec3 col = ground;
    col = mix(col, smoke, smoothstep(0.25, 0.85, f));
    // amber only in the hottest, thinnest band — accent, not wallpaper
    float band = smoothstep(0.55, 0.78, f) * smoothstep(0.95, 0.72, f);
    col = mix(col, ember, band * 0.38);

    // vignette keeps the headline zone quiet
    float vig = smoothstep(1.45, 0.35, length(p));
    col *= mix(0.55, 1.0, vig);

    // fine grain so gradients never band
    col += (hash(uv * vec2(912.0, 543.0) + uTime) - 0.5) * 0.016;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FlowField() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!mat.current) return;
    mouse.current.lerp(target.current, 0.035);
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mat.current.uniforms.uMouse.value.copy(mouse.current);
    mat.current.uniforms.uAspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uAspect: { value: 1 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Pause the frameloop when the hero scrolls out of view.
  useEffect(() => {
    if (!wrapper.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={onScreen ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1] }}
      >
        <FlowField />
      </Canvas>
    </div>
  );
}
