"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* Procedural neutral image-based lighting (no network HDRI needed). */
function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    scene.environmentIntensity = 0.32;
    return () => {
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ---- gilded marble: warm stone + gold kintsugi cracks (emissive) ---- */
const VEIN_NOISE = /* glsl */ `
float mHash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float mNoise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(mHash(i+vec3(0,0,0)),mHash(i+vec3(1,0,0)),f.x),
                 mix(mHash(i+vec3(0,1,0)),mHash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(mHash(i+vec3(0,0,1)),mHash(i+vec3(1,0,1)),f.x),
                 mix(mHash(i+vec3(0,1,1)),mHash(i+vec3(1,1,1)),f.x),f.y),f.z); }
float mFbm(vec3 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*mNoise(p); p=p*2.03; a*=0.5; } return v; }
`;

function makeMarble() {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xd9d0bb,
    roughness: 0.52,
    metalness: 0.0,
    clearcoat: 0.22,
    clearcoatRoughness: 0.4,
    sheen: 0.4,
    sheenColor: new THREE.Color(0xf0e3c6),
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 1.0,
    envMapIntensity: 0.7,
  });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\n vWPos = (modelMatrix * vec4(transformed,1.0)).xyz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;\nfloat gCrack;\n" + VEIN_NOISE)
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         float mV = mFbm(vWPos * 2.0);
         float ridge = 1.0 - abs(mV - 0.5) * 2.0;
         gCrack = smoothstep(0.8, 0.98, ridge);
         float mDust = mFbm(vWPos * 10.0);
         diffuseColor.rgb *= 0.9 + 0.1 * mDust;
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.79, 0.63, 0.30), gCrack * 0.85);`
      )
      .replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\n totalEmissiveRadiance += vec3(0.85, 0.66, 0.32) * gCrack * 1.25;"
      )
      .replace(
        "#include <roughnessmap_fragment>",
        "#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.28, gCrack);"
      );
  };
  return mat;
}
const marble = makeMarble();

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  const ref = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const obj = ref.current;
    if (!obj) return;
    obj.scale.setScalar(1);
    obj.position.set(0, 0, 0);
    obj.rotation.set(0, Math.PI, 0);
    let box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);
    const s = 2.4 / (size.y || 1);
    obj.scale.setScalar(s);
    box = new THREE.Box3().setFromObject(obj);
    const c = new THREE.Vector3();
    box.getCenter(c);
    obj.position.x -= c.x;
    obj.position.z -= c.z;
    obj.position.y -= box.min.y;
    obj.position.y += 0.7;
    obj.traverse((n) => {
      const m = n as THREE.Mesh;
      if (m.isMesh) {
        const mat = m.material as THREE.MeshStandardMaterial;
        if (!mat || !mat.map) m.material = marble;
      }
    });
  }, [cloned]);

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

function Placeholder() {
  return (
    <group>
      <mesh position={[0, 1.95, 0]} scale={[0.92, 1.08, 0.95]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <primitive object={marble} attach="material" />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.17, 0.21, 0.34, 32]} />
        <primitive object={marble} attach="material" />
      </mesh>
      <mesh position={[0, 1.05, 0]} scale={[1.15, 0.92, 0.7]}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <primitive object={marble} attach="material" />
      </mesh>
    </group>
  );
}

function Statue({ modelUrl }: { modelUrl?: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    group.current.position.x += (px * 0.14 - group.current.position.x) * 0.05;
    group.current.rotation.z += (-px * 0.045 - group.current.rotation.z) * 0.05;
    group.current.rotation.x += (-py * 0.025 - group.current.rotation.x) * 0.05;
  });
  return (
    <group ref={group}>
      {modelUrl ? (
        <Suspense fallback={<Placeholder />}>
          <Model url={modelUrl} />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </group>
  );
}

/* Scroll-driven camera dolly: glides toward the statue as you enter. */
function ScrollDolly() {
  const controls = useThree((s) => s.controls) as unknown as {
    minDistance: number;
    maxDistance: number;
  } | null;
  const progress = useRef(0);
  const cur = useRef(6.1);
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      progress.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame(() => {
    if (!controls) return;
    const target = THREE.MathUtils.lerp(6.1, 4.6, progress.current);
    cur.current += (target - cur.current) * 0.08;
    controls.minDistance = cur.current;
    controls.maxDistance = cur.current;
  });
  return null;
}

export default function StatueScene({ modelUrl }: { modelUrl?: string }) {
  const [high] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? !window.matchMedia("(max-width: 820px), (pointer: coarse)").matches
      : true
  );

  return (
    <Canvas
      dpr={high ? [1, 2] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 6.1], fov: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <StudioEnv />

      {/* gilded gallery lighting against the dark room */}
      <spotLight position={[4.5, 8.5, 5.5]} angle={Math.PI / 6} penumbra={0.6} intensity={2.3} decay={0} color={0xffe2a8} />
      <directionalLight position={[-5.5, 4.5, -5]} intensity={2.0} color={0xd8b765} />
      <directionalLight position={[0, 2.5, 7]} intensity={0.35} color={0xfff0d6} />
      <hemisphereLight args={[0x3a2f1c, 0x07060a, 0.3]} />
      <ambientLight intensity={0.1} />

      {/* dark plinth */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.62, 0.74, 0.7, 48]} />
        <meshStandardMaterial color={0x14110b} roughness={0.85} metalness={0.1} />
      </mesh>

      {high && (
        <Sparkles count={40} scale={[5, 7, 5]} position={[0, 2.2, 0]} size={2.2} speed={0.22} opacity={0.6} color="#e9cd84" />
      )}

      <Statue modelUrl={modelUrl} />

      <OrbitControls
        makeDefault
        target={[0, 1.55, 0]}
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.5}
        maxPolarAngle={1.85}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ScrollDolly />
    </Canvas>
  );
}
