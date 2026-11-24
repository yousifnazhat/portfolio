"use client";

import { type ReactNode, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import InterceptVideo from "./InterceptVideo";
import PixelJet from "./PixelJet";
import "./flight-poster.css";

type Mode = "intercept" | "contrail";
const reduceMotion = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(reduceMotion);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
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

export default function FlightPoster({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("intercept");
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const prefersReduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(reduceMotion).matches,
    () => true,
  );
  const playing = playChoice ?? !prefersReduced;
  const onPlaybackBlocked = useCallback(() => setPlayChoice(false), []);

  useEffect(() => {
    const intercept = () => setMode("intercept");
    const contrail = () => setMode("contrail");
    window.addEventListener("jet-intercept", intercept);
    window.addEventListener("jet-contrail", contrail);
    window.addEventListener("jet-flares", contrail);
    return () => {
      window.removeEventListener("jet-intercept", intercept);
      window.removeEventListener("jet-contrail", contrail);
      window.removeEventListener("jet-flares", contrail);
    };
  }, []);

  return (
    <div className="screenprint flight-poster" data-mode={mode} data-playing={playing}>
      {mode === "intercept" && <InterceptVideo playing={playing} onPlaybackBlocked={onPlaybackBlocked} />}
      <div className="flight-contrail" hidden={mode !== "contrail"} aria-hidden="true">
        <svg className="flight-scene" viewBox="0 0 180 150" preserveAspectRatio="xMidYMid meet">
          <g className="flight-formation">
            <Contrail />
            <PixelJet />
          </g>
        </svg>
      </div>
      {children}
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
