"use client";

import { navItems, profile, stats } from "../data/portfolioData";
import CliHint from "./CliHint";
import PixelJet from "./PixelJet";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="topbar">
        <span>AVAILABLE FOR WORK_ // OFFENSIVE SECURITY ENGINEER</span>
        <span className="tb-right">
          {profile.contact.email}
        </span>
      </div>

      <nav className="nav" aria-label="Portfolio sections">
        <a className="brand" href="#top" aria-label="Yousif Nazhat, back to top">
          YN<span className="us">_</span>
        </a>
        <ul className="navlinks">
          {navItems.map((it, i) => (
            <li key={it.label}>
              <a href={it.href} className={i === 0 ? "active" : ""}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-nav">
          <a className="experience-link" href={navItems[0].href}>
            {navItems[0].label} <span aria-hidden="true">↓</span>
          </a>
          <details
            className="section-menu"
            onBlur={(e) => {
              if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) e.currentTarget.open = false;
            }}
            onKeyDown={(e) => {
              if (e.key !== "Escape") return;
              e.currentTarget.open = false;
              e.currentTarget.querySelector("summary")?.focus();
            }}
          >
            <summary>Menu</summary>
            <ul>
              {navItems.slice(1).map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <span className="codeicon" aria-hidden="true">&gt;/&lt;</span>
      </nav>

      <div className="hero-main">
        <div className="hero-left">
          <span className="chip">RED TEAM · TOOLING · DETECTION_</span>
          <h1 className="bighead">
            Offense,
            <br />
            Engineered<span className="us">_</span>
          </h1>
          <CliHint />
        </div>

        <div className="hero-right">
          <h2 className="rlabel">
            Hey, I&rsquo;m Yousif<span className="us">_</span>
          </h2>
          <p>
            An offensive-security engineer who designs. I build security tooling and
            high-reliability systems.
          </p>
          <p>
            I love <span className="hl">enumerating</span>.
          </p>
          <div className="jetbox">
            <PixelJet />
            <div className="ascii-cap">{"// f-22 raptor"}<span> · air superiority_</span></div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map((s) => (
          <div className="hstat" key={s.k}>
            <span className="hn">{s.n}</span>
            <span className="hk">
              {s.k}<span className="us">_</span>
            </span>
          </div>
        ))}
      </div>

      <div className="sidebar" aria-hidden="true">
        OFFENSIVE SECURITY · RED TEAM · DETECTION · TOOLING · {profile.status}
      </div>
    </section>
  );
}
