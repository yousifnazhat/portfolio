"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* Cinematic clip-band intro — adapted (MIT) from Animmaster's "cinematic-loader-entrance".
   Reskinned to the Gilded Atelier: gold marquee on near-black, wipes to reveal the hero.
   Plays once per session, respects prefers-reduced-motion. */
const WORD = "DAEDALUS";
const SEP = "◆";

export default function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("daedalus-intro");
    if (seen || reduce) {
      setActive(false);
      return;
    }
    setActive(true);
    document.documentElement.classList.add("intro-lock");

    const ctx = gsap.context(() => {
      const finish = () => {
        document.documentElement.classList.remove("intro-lock");
        sessionStorage.setItem("daedalus-intro", "1");
        setActive(false);
      };
      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" }, onComplete: finish });
      tl.set(".il", { autoAlpha: 1 })
        .from(".il-band", { scaleY: 0, duration: 1.0, stagger: 0.08 })
        .from(".il-track", { xPercent: 8, opacity: 0, duration: 1.4 }, 0.1)
        .to(".il-track", { xPercent: -32, duration: 2.0, ease: "none" }, 0)
        .to(".il-band.top", { yPercent: -101, duration: 0.9 }, 1.7)
        .to(".il-band.bot", { yPercent: 101, duration: 0.9 }, 1.7)
        .to(".il-band.mid", { autoAlpha: 0, duration: 0.6 }, 1.7)
        .to(".il", { autoAlpha: 0, duration: 0.3 }, 2.1);
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  if (active === false) return null;

  const row = (
    <div className="il-track">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i}>
          {WORD}
          <i>{SEP}</i>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="il" aria-hidden="true" style={{ visibility: "hidden" }}>
      <div className="il-band top">{row}</div>
      <div className="il-band mid">{row}</div>
      <div className="il-band bot">{row}</div>
    </div>
  );
}
