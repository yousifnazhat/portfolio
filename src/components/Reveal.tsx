"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(min-width: 861px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!element || !motion.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) {
        element.animate(
          [{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: "none" }],
          { duration: 800, delay: delay * 1000, easing: "cubic-bezier(.16,1,.3,1)" }
        );
      }
    }, { rootMargin: "0px 0px -80px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, y]);

  return <div ref={ref}>{children}</div>;
}
