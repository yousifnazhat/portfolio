"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  SMAA,
  HueSaturation,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const PAPER = "#ece4d5";

/* Procedural neutral image-based lighting (no network HDRI needed). */
function StudioEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    scene.environmentIntensity = 0.45;
    return () => {
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ---- marble: physical material + procedural world-space veining shader ---- */
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
    color: 0xd6cdba,
    roughness: 0.5,
    metalness: 0.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.35,
    sheen: 0.5,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color(0xf4ecdd),
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
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;\n" + VEIN_NOISE)
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         float mTurb = mFbm(vWPos * 2.1);
         float mVein = smoothstep(0.44, 0.6, mTurb);
         vec3 mVeinCol = vec3(0.55, 0.52, 0.47);
         diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * mVeinCol, mVein * 0.7);
         float mDust = mFbm(vWPos * 11.0);
         diffuseColor.rgb *= 0.93 + 0.07 * mDust;`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        "#include <roughnessmap_fragment>\n roughnessFactor *= 0.82 + 0.3 * mFbm(vWPos * 3.0);"
      );
  };
  return mat;
}
const marble = makeMarble();

/* faint "DAEDALUS" word, rendered as a depth-occluded plane behind the statue */
function GhostWord() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#d8cdb8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    try {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "22px";
    } catch {}
    ctx.font = "700 230px Georgia, 'Times New Roman', serif";
    ctx.fillText("DAEDALUS", c.width / 2, c.height / 2 + 8);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh position={[0, 1.55, -2.4]}>
      <planeGeometry args={[9.2, 2.3]} />
      <meshBasicMaterial map={tex} transparent opacity={0.85} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

/* Loads a glb/gltf, auto-frames it onto the plinth, applies marble. */
function Model({ url, shadows }: { url: string; shadows: boolean }) {
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
        m.castShadow = shadows;
        m.receiveShadow = shadows;
        const mat = m.material as THREE.MeshStandardMaterial;
        if (!mat || !mat.map) m.material = marble;
      }
    });
  }, [cloned, shadows]);

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

function Placeholder() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.95, 0]} scale={[0.92, 1.08, 0.95]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <primitive object={marble} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.17, 0.21, 0.34, 32]} />
        <primitive object={marble} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.05, 0]} scale={[1.15, 0.92, 0.7]}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <primitive object={marble} attach="material" />
      </mesh>
    </group>
  );
}

/* Statue + subtle pointer parallax. */
function Statue({ modelUrl, shadows }: { modelUrl?: string; shadows: boolean }) {
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
          <Model url={modelUrl} shadows={shadows} />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </group>
  );
}

/* Scroll-driven camera dolly: glides toward the statue as you enter the museum. */
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
    const target = THREE.MathUtils.lerp(6.1, 4.5, progress.current);
    cur.current += (target - cur.current) * 0.08;
    controls.minDistance = cur.current;
    controls.maxDistance = cur.current;
  });
  return null;
}

export default function StatueScene({ modelUrl }: { modelUrl?: string }) {
  const [quality] = useState<"high" | "low">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 820px), (pointer: coarse)").matches
      ? "low"
      : "high"
  );
  const high = quality === "high";

  return (
    <Canvas
      shadows={high}
      dpr={high ? [1, 2] : [1, 1.5]}
      gl={{ antialias: !high, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 6.1], fov: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.78;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 9, 20]} />

      <StudioEnv />

      {/* dramatic gallery lighting — high key/fill contrast for cinematic sculpting */}
      <spotLight
        position={[4.5, 8.5, 5.5]}
        angle={Math.PI / 6}
        penumbra={0.6}
        intensity={1.25}
        decay={0}
        color={0xffe9c8}
        castShadow={high}
        shadow-mapSize-width={high ? 4096 : 1024}
        shadow-mapSize-height={high ? 4096 : 1024}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-5, 5, -6]} intensity={1.4} color={0xcfe0ff} />
      <directionalLight position={[0, 2.5, 6.5]} intensity={0.2} color={0xffffff} />
      <hemisphereLight args={[0xfbf3e3, 0x3a2f24, 0.25]} />
      <ambientLight intensity={0.14} />

      <GhostWord />

      {/* plinth */}
      <mesh castShadow={high} receiveShadow={high} position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.62, 0.74, 0.7, 48]} />
        <meshStandardMaterial color={0xd2c7b1} roughness={0.9} metalness={0} />
      </mesh>

      <ContactShadows
        position={[0, 0.0, 0]}
        opacity={0.45}
        scale={9}
        blur={2.6}
        far={4.5}
        resolution={high ? 1024 : 512}
        color="#1c1812"
      />

      {high && (
        <Sparkles count={50} scale={[5, 7, 5]} position={[0, 2.2, 0]} size={2} speed={0.25} opacity={0.5} color="#fff1d6" />
      )}

      <Statue modelUrl={modelUrl} shadows={high} />

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

      {high && (
        <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 1.5, 0]} focusRange={0.05} focalLength={0.02} bokehScale={1.8} />
          <Bloom mipmapBlur intensity={0.12} luminanceThreshold={0.95} luminanceSmoothing={0.15} />
          <HueSaturation saturation={0.06} />
          <BrightnessContrast brightness={-0.01} contrast={0.14} />
          <Vignette offset={0.34} darkness={0.6} />
          <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.04} />
          <SMAA />
        </EffectComposer>
      )}
    </Canvas>
  );
}
