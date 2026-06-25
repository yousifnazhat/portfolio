"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { profile } from "../data/portfolioData";

const StatueScene = dynamic(() => import("./StatueScene"), {
  ssr: false,
  loading: () => <div className="loading">Carving marble…</div>,
});

export default function Hero({ defaultModel }: { defaultModel?: string }) {
  const [modelUrl, setModelUrl] = useState<string | undefined>(defaultModel);
  const [dropping, setDropping] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropping(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!/\.(glb|gltf)$/i.test(file.name)) {
      alert("Drop a .glb or .gltf statue file.");
      return;
    }
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
      <div className="scene">
        <StatueScene modelUrl={modelUrl} />
      </div>

      <div className="ui">
        <nav className="nav">
          <div className="brand">
            <span className="mark">YN</span>DAEDALUS
          </div>
          <ul className="navlinks">
            <li><a href="#collection">The Collection</a></li>
            <li><a href="#atelier">The Atelier</a></li>
            <li><a href="#arsenal">Arsenal</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="status">
            <span className="dot" />
            {profile.status}
          </div>
        </nav>

        <div className="wall">
          <div className="exhibit">Exhibit 01 · Offensive Security</div>
          <h1>{profile.name}</h1>
          <p>{profile.tagline}</p>
          <a className="view" href="#collection">
            View the collection →
          </a>
        </div>

        <div className="vert">{profile.role} — Rutgers MMXXVII</div>

        <div className="hint">
          drag to orbit · <b>drop a .glb statue here</b> to load your model
        </div>
      </div>

      <div className={`drop${dropping ? " show" : ""}`}>
        <div className="box">Release to mount the statue</div>
      </div>
    </section>
  );
}
