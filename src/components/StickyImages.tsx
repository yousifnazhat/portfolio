"use client";

import { useEffect } from "react";
import * as THREE from "three";

/* Scroll-velocity image distortion — adapted from the pack's "StickyImageEffect".
   A fixed WebGL layer mirrors every [data-sticky] image at its DOM position and
   skews + RGB-splits it with scroll momentum. Fail-safe: if WebGL can't start,
   the plain DOM images are left visible and nothing else changes. */

const vertexShader = /* glsl */ `
uniform float uVelo;
varying vec2 vUv;
void main(){
  vec3 p = position;
  float bend = sin(uv.x * 3.14159265);
  p.y += uVelo * bend * 0.16;     // sticky lag along scroll
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const fragmentShader = /* glsl */ `
uniform sampler2D uTex;
uniform float uVelo;
uniform vec2 uCover;              // cover-fit scale factor
varying vec2 vUv;
vec2 cover(vec2 uv, vec2 f){ return (uv - 0.5) * f + 0.5; }
void main(){
  float amt = clamp(abs(uVelo) * 0.0016, 0.0, 0.05);
  vec2 uv = cover(vUv, uCover);
  float r = texture2D(uTex, uv + vec2(0.0,  amt)).r;
  float g = texture2D(uTex, uv).g;
  float b = texture2D(uTex, uv + vec2(0.0, -amt)).b;
  float a = texture2D(uTex, uv).a;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
  // only visible while scrolling — at rest the crisp DOM image shows through
  float reveal = clamp(abs(uVelo) * 0.05, 0.0, 0.9);
  gl_FragColor = vec4(r, g, b, a * reveal);
}`;

type Item = { img: HTMLImageElement; mesh: THREE.Mesh; mat: THREE.ShaderMaterial };

export default function StickyImages() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-sticky]"));
    if (!imgs.length) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL unavailable → leave DOM images visible
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.className = "sticky-gl";
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    const geo = new THREE.PlaneGeometry(1, 1, 24, 24);
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    const items: Item[] = imgs.map((img) => {
      const tex = loader.load(img.currentSrc || img.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.ShaderMaterial({
        uniforms: { uTex: { value: tex }, uVelo: { value: 0 }, uCover: { value: new THREE.Vector2(1, 1) } },
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return { img, mesh, mat };
    });

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.left = -w / 2; camera.right = w / 2; camera.top = h / 2; camera.bottom = -h / 2;
      camera.near = -1000; camera.far = 1000;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = window.scrollY;
    let velo = 0;
    let raf = 0;
    const tick = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const cur = window.scrollY;
      velo += ((cur - last) - velo) * 0.18;
      last = cur;
      velo *= 0.92;
      for (const { img, mesh, mat } of items) {
        const r = img.getBoundingClientRect();
        if (r.width === 0) { mesh.visible = false; continue; }
        mesh.visible = true;
        mesh.position.set(r.left + r.width / 2 - w / 2, -(r.top + r.height / 2 - h / 2), 0);
        mesh.scale.set(r.width, r.height, 1);
        const iw = (mat.uniforms.uTex.value as THREE.Texture).image?.width || r.width;
        const ih = (mat.uniforms.uTex.value as THREE.Texture).image?.height || r.height;
        const planeAspect = r.width / r.height;
        const imgAspect = iw / ih;
        const cov = mat.uniforms.uCover.value as THREE.Vector2;
        if (imgAspect > planeAspect) cov.set(planeAspect / imgAspect, 1);
        else cov.set(1, imgAspect / planeAspect);
        mat.uniforms.uVelo.value = velo;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      items.forEach(({ img, mat }) => {
        img.style.opacity = "";
        (mat.uniforms.uTex.value as THREE.Texture)?.dispose?.();
        mat.dispose();
      });
      geo.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
}
