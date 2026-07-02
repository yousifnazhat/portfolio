"use client";

import { useEffect, useRef } from "react";
import { stack, credentials, type TechItem } from "../data/portfolioData";

const ITEMS: TechItem[] = stack.flatMap((g) => g.items);
const ROWS: TechItem[][] = [[], [], []];
ITEMS.forEach((x, i) => ROWS[i % 3].push(x));
const DIRS = [-1, 1, -1];

/* Scroll-velocity marquee: rows of the toolchain run sideways on their own,
   alternating direction, and skew + speed up with scroll velocity. */
export default function VelocityMarquee() {
  const tracks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xs = ROWS.map(() => 0);
    let last = performance.now();
    let lastScroll = window.scrollY;
    let vel = 0;

    const onScroll = () => {
      const y = window.scrollY;
      vel += y - lastScroll;
      lastScroll = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(48, now - last) / 16.667;
      last = now;
      vel *= 0.9;
      const skew = Math.max(-16, Math.min(16, vel * 0.42));
      ROWS.forEach((_, i) => {
        const el = tracks.current[i];
        if (!el) return;
        const dir = DIRS[i];
        const speed = (0.85 + Math.abs(vel) * 0.35) * dir;
        xs[i] -= speed * dt;
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (xs[i] <= -half) xs[i] += half;
          else if (xs[i] >= 0) xs[i] -= half;
        }
        el.style.transform = `translate3d(${xs[i].toFixed(2)}px,0,0) skewX(${(skew * dir).toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="section marq" id="arsenal">
      <div className="wrap">
        <div className="sec-head">
          <h2>Stack</h2>
          <span className="idx">Toolchain · scroll to warp</span>
        </div>
      </div>

      <div className="marq-rows">
        {ROWS.map((row, i) => (
          <div className="marq-row" key={i}>
            <div
              className="marq-track"
              ref={(el) => {
                tracks.current[i] = el;
              }}
            >
              {[...row, ...row, ...row].map((it, j) => (
                <span className="marq-item" key={j}>
                  {it.slug ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="marq-ico"
                      src={`/icons/${it.slug}.svg`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  ) : it.glyph ? (
                    <span className="marq-glyph">{it.glyph}</span>
                  ) : null}
                  {it.name}
                  <i className="marq-sep">/</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="wrap marq-creds">
        {credentials.map((c) => (
          <div className="cred" key={c.title}>
            <h5>{c.title}</h5>
            <ul>
              {c.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
