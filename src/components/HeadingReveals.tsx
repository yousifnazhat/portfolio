"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeadingReveals() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 861px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      for (const el of gsap.utils.toArray<HTMLElement>("[data-split]")) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            const split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "split-line" });
            gsap.from(split.lines, {
              yPercent: 115,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.09,
              onComplete: () => split.revert(),
            });
          },
        });
      }
    });
    return () => media.revert();
  }, []);

  return null;
}
