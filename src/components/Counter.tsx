"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [disp, setDisp] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;

    const run = () => {
      if (value === 0) {
        setDisp("0" + suffix);
        return;
      }
      const dur = 1500;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setDisp(Math.round(value * e).toLocaleString("en-US") + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting && !done) {
            done = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>{disp}</span>;
}
