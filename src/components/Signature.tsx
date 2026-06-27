"use client";

import { useEffect, useRef } from "react";

/* Animated cursive signature — the name "writes" itself left-to-right by
   retracting a cover (transform: scaleX). Driven by the Web Animations API with
   a real-timer fallback that uncovers the name even if the animation engine
   never ticks, so the name is ALWAYS visible. The text stays in the DOM for AT/SEO. */
export default function Signature({ text = "Yousif Nazhat" }: { text?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cover = el.querySelector<HTMLElement>(".sig-cover");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal");
      return;
    }
    if (!cover) return;

    const seenIntro = sessionStorage.getItem("daedalus-intro");
    const delay = seenIntro ? 350 : 2700;
    const duration = 2300;

    cover.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
      { duration, delay, easing: "cubic-bezier(0.5, 0.05, 0.2, 1)", fill: "forwards" }
    );

    // Guarantee the name is uncovered even if the animation timeline is frozen.
    const t = window.setTimeout(() => {
      cover.style.display = "none";
    }, delay + duration + 60);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={root} className="sig" aria-label={text}>
      <span className="sig-clip" aria-hidden="true">
        <span className="sig-text">{text}</span>
      </span>
      <span className="sig-cover" aria-hidden="true" />
    </div>
  );
}
