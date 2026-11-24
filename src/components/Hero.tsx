"use client";

import Link from "next/link";
import { navItems, profile, stats } from "../data/portfolioData";
import CliHint from "./CliHint";
import FlightPoster from "./FlightPoster";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <nav className="nav" aria-label="Portfolio sections">
        <a className="brand" href="#top" aria-label="Yousif Nazhat, back to top">
          <span className="monogram">YN<span className="us">_</span></span>
          <span className="brand-name">{profile.name}</span>
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
      </nav>

      <FlightPoster>
        <div className="poster-type">
          <span className="poster-kicker">Red team · Tooling · Detection</span>
          <h1 className="bighead">
            Offense,
            <br />
            Engineered<span className="us">_</span>
          </h1>
        </div>
      </FlightPoster>

      <div className="hero-intro">
        <div className="hero-bio">
          <h2>{profile.role}.</h2>
          <p>{profile.bio}</p>
          <p className="hero-placement">
            I placed <Link href="/competition/cyber-apocalypse-2026">#12 worldwide at Cyber Apocalypse 2026</Link>.
            Hack The Box has called Cyber Apocalypse <a href="https://www.hackthebox.com/blog/htb-turns-seven">the world’s largest online hacking competition</a>.
          </p>
          <Link className="writeups-link" href="/writeups">
            Security writeups <span aria-hidden="true">→</span>
          </Link>
        </div>
        <CliHint />
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
        OFFENSIVE SECURITY · RED TEAM · DETECTION · TOOLING
      </div>
    </section>
  );
}
