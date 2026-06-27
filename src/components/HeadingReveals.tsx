"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Line-mask reveal on any [data-split] element. Robust for above-the-fold
   headings (fires immediately if already in view) and below-the-fold ones. */
export default function HeadingReveals() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = gsap.utils.toArray<HTMLElement>("[data-split]");
    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        const split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        splits.push(split);

        if (reduce) {
          gsap.set(split.lines, { yPercent: 0 });
          return;
        }

        const tween = gsap.from(split.lines, {
          yPercent: 115,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.09,
          paused: true,
        });
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => tween.play(),
        });
        triggers.push(st);
      });
      ScrollTrigger.refresh();
    });

    return () => {
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return null;
}
