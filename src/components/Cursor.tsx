"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Custom gold cursor + magnetic pull on [data-magnetic] targets.
   Fine-pointer only; disabled for touch and reduced-motion (native cursor stays). */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");
    const ringEl = ring.current!;
    const dotEl = dot.current!;

    const xTo = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });

    const grow = () => ringEl.classList.add("grow");
    const shrink = () => ringEl.classList.remove("grow");
    const hot = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, [data-magnetic], .exhibit-card")
    );
    hot.forEach((el) => {
      el.addEventListener("pointerenter", grow);
      el.addEventListener("pointerleave", shrink);
    });

    // magnetic pull
    const mags = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = mags.map((el) => {
      const strength = Number(el.dataset.magnetic) || 0.35;
      const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * strength);
        qy((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        qx(0);
        qy(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      window.removeEventListener("pointermove", move);
      hot.forEach((el) => {
        el.removeEventListener("pointerenter", grow);
        el.removeEventListener("pointerleave", shrink);
      });
      cleanups.forEach((c) => c());
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
