"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import PixelJet from "./PixelJet";
import "./flight-poster.css";

type Mode = "intercept" | "contrail";
const reduceMotion = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(reduceMotion);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function Intercept() {
  const bolt = "M93 65 L105 55 L110 52 L121 44 L127 39";
  return (
    <g>
      <g transform="translate(127 39)" fill="var(--orange)">
        <g className="flight-glitch">
          <path d="M-3 -12h3v3h-3z M-8 -7h15v3H-8z M-10 -2H5v3h-15z M-5 3h14v3H-5z M3 8h3v2H3z" />
          <path fill="var(--bg-card)" d="M-7 -7h4v1h-4z M5 3h4v1H5z" />
        </g>
        <g className="flight-debris">
          <path d="M-12 -6h4v2h-4z M9 -11h3v3H9z M6 7h3v2H6z" />
          <path fill="var(--bg-card)" d="M-5 -10h2v2h-2z M11 1h2v2h-2z" />
        </g>
      </g>
      <g className="flight-bolt" fill="none">
        <path d={bolt} pathLength="1" stroke="var(--orange)" strokeWidth="3" />
        <path d={bolt} pathLength="1" stroke="var(--bg-card)" strokeWidth="1" />
      </g>
    </g>
  );
}

function Contrail() {
  return (
    <g className="flight-wake">
      <path fill="var(--bg-card)" d="M-6 34 C-8 62 -24 75 -50 84 S-81 107 -78 124 C-86 105 -71 88 -52 80 S-13 59 -3 34Z" />
      <path fill="var(--bg-card)" d="M1 35 C1 61 -17 80 -44 90 S-70 108 -66 122 C-75 108 -63 92 -45 85 S-2 57 4 35Z" />
      <path className="flight-wake-dashes" fill="none" stroke="#b8a987" strokeWidth="1" strokeDasharray="3 15"
        d="M-4 35 C-9 63 -25 75 -51 82 S-79 106 -76 122 M2 35 C2 62 -18 80 -44 88 S-68 108 -67 121" />
    </g>
  );
}

export default function FlightPoster() {
  const [mode, setMode] = useState<Mode>("intercept");
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const prefersReduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(reduceMotion).matches,
    () => true,
  );
  const playing = playChoice ?? !prefersReduced;

  useEffect(() => {
    const intercept = () => setMode("intercept");
    const contrail = () => setMode("contrail");
    window.addEventListener("jet-intercept", intercept);
    window.addEventListener("jet-contrail", contrail);
    return () => {
      window.removeEventListener("jet-intercept", intercept);
      window.removeEventListener("jet-contrail", contrail);
    };
  }, []);

  return (
    <div className="poster-art flight-poster" data-mode={mode} data-playing={playing}>
      <div className="flight-stage">
        {mode === "intercept" && <span className="flight-field" aria-hidden="true" />}
        <svg className="flight-scene" viewBox="0 0 180 150" preserveAspectRatio="xMidYMid meet"
          role="img" aria-label={mode === "intercept" ? "Pixel F-22 passing a digital glitch" : "Pixel F-22 banking along a curved contrail"}>
          <g className="flight-formation">
            {mode === "contrail" && <Contrail />}
            <PixelJet />
          </g>
          {mode === "intercept" && <Intercept />}
        </svg>
      </div>
      <div className="flight-controls" role="group" aria-label="Flight animation controls">
        <button type="button" aria-pressed={mode === "intercept"} onClick={() => setMode("intercept")}>Intercept</button>
        <button type="button" aria-pressed={mode === "contrail"} onClick={() => setMode("contrail")}>Contrail</button>
        <button type="button" className="flight-play" aria-label={playing ? "Pause flight animation" : "Play flight animation"}
          onClick={() => setPlayChoice(!playing)}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path fill="currentColor" d={playing ? "M3 2h3v12H3z M10 2h3v12h-3z" : "M3 1l11 7-11 7z"} />
          </svg>
        </button>
      </div>
    </div>
  );
}
