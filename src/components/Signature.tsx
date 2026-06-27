"use client";

import { useEffect, useRef } from "react";

/* Animated cursive signature — the name "writes" itself left-to-right via a
   CSS clip-path reveal with a glowing pen-tip. Waits for the intro loader,
   respects reduced-motion, and the text stays in the DOM for SEO/AT. */
export default function Signature({ text = "Yousif Nazhat" }: { text?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal");
      return;
    }
    const seenIntro = sessionStorage.getItem("daedalus-intro");
    el.style.setProperty("--d", (seenIntro ? 0.35 : 2.7) + "s");
    const id = requestAnimationFrame(() => el.classList.add("go"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={root} className="sig" aria-label={text}>
      <div className="sig-clip" aria-hidden="true">
        <span className="sig-text">{text}</span>
      </div>
      <span className="sig-pen" aria-hidden="true" />
    </div>
  );
}
