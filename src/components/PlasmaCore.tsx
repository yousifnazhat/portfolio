"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Ashima simplex noise (3D) — public domain. */
const SNOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0,0.5,1.0,2.0);
  vec3 i  = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z); vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m*m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime; uniform float uAmp; uniform float uFreq;
varying float vN; varying vec3 vNormalV; varying vec3 vViewV;
${SNOISE}
void main(){
  float n  = snoise(position * uFreq + uTime * 0.22);
  float n2 = snoise(position * uFreq * 2.3 + uTime * 0.5) * 0.45;
  float disp = n + n2;
  vN = disp;
  vec3 displaced = position + normal * disp * uAmp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormalV = normalize(normalMatrix * normal);
  vViewV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
precision highp float;
varying float vN; varying vec3 vNormalV; varying vec3 vViewV;
vec3 palette(float t){
  vec3 violet = vec3(0.46, 0.20, 0.78);
  vec3 magenta= vec3(0.92, 0.26, 0.66);
  vec3 gold   = vec3(1.00, 0.86, 0.52);
  vec3 orange = vec3(1.00, 0.52, 0.18);
  vec3 c = mix(violet, magenta, smoothstep(-0.6, 0.1, t));
  c = mix(c, gold,   smoothstep(0.05, 0.55, t));
  c = mix(c, orange, smoothstep(0.55, 1.05, t));
  return c;
}
void main(){
  float fres = pow(1.0 - max(dot(vViewV, vNormalV), 0.0), 2.2);
  float energy = smoothstep(-0.5, 0.9, vN);
  vec3 base = palette(vN);
  vec3 col = base * (0.55 + 0.85 * energy);
  col += vec3(1.0, 0.92, 0.7) * pow(energy, 2.4) * 0.45;   // hot core
  col += vec3(0.72, 0.34, 0.98) * fres * 0.95;             // violet rim
  col += vec3(1.0, 0.85, 0.5) * pow(fres, 3.0) * 0.5;      // gold edge
  gl_FragColor = vec4(col, 1.0);
}`;

const haloFragment = /* glsl */ `
precision highp float;
varying vec3 vNormalV; varying vec3 vViewV;
void main(){
  float fres = pow(1.0 - max(dot(vViewV, vNormalV), 0.0), 3.2);
  vec3 col = mix(vec3(0.40,0.16,0.58), vec3(0.85,0.62,0.36), fres);
  gl_FragColor = vec4(col, fres * 0.3);
}`;

const haloVertex = /* glsl */ `
varying vec3 vNormalV; varying vec3 vViewV;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormalV = normalize(normalMatrix * normal);
  vViewV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

function Orb() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const grp = useRef<THREE.Group>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAmp: { value: 0.24 }, uFreq: { value: 1.0 } }),
    []
  );
  useFrame((s, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
    if (grp.current) {
      grp.current.rotation.y += dt * 0.1;
      grp.current.rotation.x += (s.pointer.y * 0.3 - grp.current.rotation.x) * 0.04;
      grp.current.position.x += (s.pointer.x * 0.3 - grp.current.position.x) * 0.04;
    }
  });
  return (
    <group ref={grp}>
      <mesh>
        <icosahedronGeometry args={[0.82, 28]} />
        <shaderMaterial
          ref={mat}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh scale={1.32}>
        <icosahedronGeometry args={[0.82, 8]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function PlasmaCore() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Orb />
    </Canvas>
  );
}
