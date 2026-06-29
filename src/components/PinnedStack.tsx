"use client";

import { useEffect, useRef } from "react";
import { stack, credentials } from "../data/portfolioData";
import TechTile from "./TechTile";

/* Horizontal pinned scroll for the Stack: the section pins while the toolchain
   panels move sideways with vertical scroll. Scroll-position driven (no timeline),
   so it's smooth and resilient. Falls back to a vertical stack on small screens. */
export default function PinnedStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const desktop = window.matchMedia("(min-width: 861px)");
    let overflow = 0;

    const measure = () => {
      if (!desktop.matches) {
        section.style.height = "";
        track.style.transform = "";
        overflow = 0;
        return;
      }
      overflow = Math.max(0, track.scrollWidth - window.innerWidth + 92);
      section.style.height = window.innerHeight + overflow + "px";
    };

    const onScroll = () => {
      if (!desktop.matches) return;
      const total = section.offsetHeight - window.innerHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total)) : 0;
      track.style.transform = `translate3d(${-(prog * overflow).toFixed(2)}px,0,0)`;
      if (fillRef.current) fillRef.current.style.width = (prog * 100).toFixed(1) + "%";
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <section className="section stackpin" id="arsenal" ref={sectionRef}>
      <div className="stackpin-sticky">
        <div className="wrap stackpin-bar">
          <div className="sec-head" style={{ margin: 0, border: 0, paddingBottom: 0 }}>
            <h2>Stack</h2>
            <span className="idx">Toolchain · scroll&nbsp;→</span>
          </div>
          <div className="stackpin-prog" aria-hidden="true">
            <span ref={fillRef} />
          </div>
        </div>

        <div className="stackpin-track" ref={trackRef}>
          {stack.map((g, i) => (
            <div className="spanel" key={g.title}>
              <div className="spanel-no">{String(i + 1).padStart(2, "0")}</div>
              <h4 className="spanel-title">
                {g.title}
                <span className="us">_</span>
              </h4>
              <div className="spanel-tiles">
                {g.items.map((it) => (
                  <TechTile key={it.name} item={it} />
                ))}
              </div>
            </div>
          ))}

          <div className="spanel creds">
            <div className="spanel-no">{String(stack.length + 1).padStart(2, "0")}</div>
            <h4 className="spanel-title">
              Credentials
              <span className="us">_</span>
            </h4>
            <div className="spanel-creds">
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
          </div>
        </div>
      </div>
    </section>
  );
}
