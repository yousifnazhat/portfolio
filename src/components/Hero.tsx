"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { navItems, profile } from "../data/portfolioData";

const StatueScene = dynamic(() => import("./StatueScene"), {
  ssr: false,
  loading: () => null,
});

const sparkles = [
  { top: "34%", left: "24%", size: 26, anim: "twinkle 4.2s ease-in-out infinite" },
  { top: "62%", left: "30%", size: 14, anim: "twinkle 5.5s ease-in-out .6s infinite" },
  { top: "40%", right: "26%", size: 18, anim: "twinkle 4.8s ease-in-out 1.1s infinite" },
  { top: "70%", right: "22%", size: 22, anim: "twinkle 6s ease-in-out .3s infinite" },
];

export default function Hero({ defaultModel }: { defaultModel?: string }) {
  const [modelUrl, setModelUrl] = useState<string | undefined>(defaultModel);
  const [dropping, setDropping] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropping(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!/\.(glb|gltf)$/i.test(file.name)) return;
    setModelUrl(URL.createObjectURL(file));
  }, []);

  return (
    <section
      className="hero"
      onDragOver={(e) => {
        e.preventDefault();
        setDropping(true);
      }}
      onDragLeave={() => setDropping(false)}
      onDrop={onDrop}
    >
      <div className="spotlight" />
      <div className="lattice" />

      <div className="giant">
        <h1>NAZHAT</h1>
        <div className="sublabel">Offensive&nbsp;&nbsp;Security&nbsp;&nbsp;Engineer</div>
      </div>

      <div className="rings" aria-hidden="true">
        <svg className="r1" viewBox="0 0 600 600">
          <ellipse cx="300" cy="300" rx="288" ry="116" transform="rotate(-16 300 300)" fill="none" stroke="rgba(201,162,76,.32)" strokeWidth="1" />
          <ellipse cx="300" cy="300" rx="252" ry="98" transform="rotate(26 300 300)" fill="none" stroke="rgba(201,162,76,.18)" strokeWidth="1" />
        </svg>
        <svg className="r2" viewBox="0 0 600 600">
          <ellipse cx="300" cy="300" rx="296" ry="150" transform="rotate(64 300 300)" fill="none" stroke="rgba(201,162,76,.12)" strokeWidth="1" />
        </svg>
      </div>

      <div className="scene">
        <StatueScene modelUrl={modelUrl} />
      </div>

      {sparkles.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            animation: s.anim,
          }}
        />
      ))}

      <nav className="nav">
        <div className="brand">
          <span className="mark">YN</span>
          <span>DAEDALUS</span>
        </div>
        <ul className="navlinks">
          {navItems.map((it) => (
            <li key={it.label}>
              <a href={it.href}>{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="navnum">
          {navItems.map((it) => (
            <a key={it.n} href={it.href}>
              <span className="rule" />
              {it.n}
            </a>
          ))}
        </div>
      </nav>

      <div className="wall">
        <div className="exhibit">Exhibit 01 · The Daedalus Collection</div>
        <p className="tagline">Maker of tools, breaker of trust boundaries.</p>
      </div>

      <div className="caption">
        <p>
          {profile.name} keeps red-team tradecraft, security tooling, and high-reliability
          hardware under one roof — a working museum of systems built and systems broken.
        </p>
      </div>

      <div className="plinthlabel">Marble · gilded breaks · 2026</div>

      <div className="herofoot">
        <a className="scrollcue" href="#collection">
          Scroll to enter the collection <span>↓</span>
        </a>
      </div>

      <div className="status">
        <span className="dot" />
        {profile.status}
      </div>
      <div className="vert">New Brunswick · MMXXVII</div>

      {dropping && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(11,10,8,.6)",
            fontFamily: "var(--font-mono-stack)",
            fontSize: 12,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--gold-l)",
          }}
        >
          Release to mount the statue
        </div>
      )}
    </section>
  );
}
