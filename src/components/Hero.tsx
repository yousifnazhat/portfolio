"use client";

import { navItems, profile, stats } from "../data/portfolioData";
import CliHint from "./CliHint";

export default function Hero() {
  return (
    <section className="hero">
      <div className="topbar">
        <span>AVAILABLE FOR WORK_ // OFFENSIVE SECURITY ENGINEER</span>
        <span className="tb-right">
          {profile.contact.email} <i>|</i> {profile.contact.phone}
        </span>
      </div>

      <nav className="nav">
        <a className="brand" href="#top">
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
        <span className="codeicon" aria-hidden="true">&gt;/&lt;</span>
      </nav>

      <div className="hero-main">
        <div className="hero-left">
          <span className="chip">RED TEAM · TOOLING · DETECTION_</span>
          <h1 className="bighead">
            Build&nbsp;It<span className="us">_</span>
            <br />
            Then
            <br />
            Break&nbsp;It<span className="us">_</span>
          </h1>
          <CliHint />
        </div>

        <div className="hero-right">
          <h2 className="rlabel">
            Hey, I&rsquo;m Yousif<span className="us">_</span>
          </h2>
          <p>
            An offensive-security engineer who designs. I build security tooling and
            high-reliability systems — then I take them apart.
          </p>
          <p>
            Red team, detection, and a little hardware. I love{" "}
            <span className="hl">enumerating</span>.
          </p>
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
