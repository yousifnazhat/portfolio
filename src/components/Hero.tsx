"use client";

import dynamic from "next/dynamic";
import { navItems, profile } from "../data/portfolioData";
import Signature from "./Signature";

const PlasmaCore = dynamic(() => import("./PlasmaCore"), {
  ssr: false,
  loading: () => null,
});

const sparkles = [
  { top: "34%", left: "24%", size: 26, anim: "twinkle 4.2s ease-in-out infinite" },
  { top: "62%", left: "30%", size: 14, anim: "twinkle 5.5s ease-in-out .6s infinite" },
  { top: "40%", right: "26%", size: 18, anim: "twinkle 4.8s ease-in-out 1.1s infinite" },
  { top: "70%", right: "22%", size: 22, anim: "twinkle 6s ease-in-out .3s infinite" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="spotlight" />
      <div className="lattice" />

      <div className="giant">
        <Signature text="Yousif Nazhat" />
        <div className="sublabel">Offensive&nbsp;&nbsp;Security&nbsp;&nbsp;Engineer</div>
      </div>

      <div className="rings" aria-hidden="true">
        <svg className="r1" viewBox="0 0 600 600">
          <ellipse cx="300" cy="300" rx="288" ry="116" transform="rotate(-16 300 300)" fill="none" stroke="rgba(201,162,76,.32)" strokeWidth="1" />
          <ellipse cx="300" cy="300" rx="252" ry="98" transform="rotate(26 300 300)" fill="none" stroke="rgba(201,162,76,.18)" strokeWidth="1" />
        </svg>
        <svg className="r2" viewBox="0 0 600 600">
          <ellipse cx="300" cy="300" rx="296" ry="150" transform="rotate(64 300 300)" fill="none" stroke="rgba(201,162,76,.12)" strokeWidth="1" />
        </svg>
      </div>

      <div className="scene">
        <PlasmaCore />
      </div>

      {sparkles.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            animation: s.anim,
          }}
        />
      ))}

      <nav className="nav">
        <div className="brand">
          <span className="mark">YN</span>
          <span>DAEDALUS</span>
        </div>
        <ul className="navlinks">
          {navItems.map((it) => (
            <li key={it.label}>
              <a href={it.href}>{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="navnum">
          {navItems.map((it) => (
            <a key={it.n} href={it.href}>
              <span className="rule" />
              {it.n}
            </a>
          ))}
        </div>
      </nav>

      <div className="wall">
        <div className="exhibit">Yousif Nazhat · Portfolio ’26</div>
        <p className="tagline">Hey, I&rsquo;m Yousif&nbsp;— I love enumerating.</p>
      </div>

      <div className="caption">
        <p>
          An offensive-security engineer who designs. I build security tooling and
          high-reliability systems — then I take them apart. Red team, detection, and a
          little hardware.
        </p>
      </div>

      <div className="plinthlabel">Antimatter core · always enumerating</div>

      <div className="herofoot">
        <a className="scrollcue" href="#collection" data-magnetic="0.4">
          Scroll to see the work <span>↓</span>
        </a>
      </div>

      <div className="status">
        <span className="dot" />
        {profile.status}
      </div>
      <div className="vert">New Brunswick · MMXXVII</div>
    </section>
  );
}
