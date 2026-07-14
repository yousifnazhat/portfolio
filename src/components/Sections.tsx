import {
  collection,
  atelier,
  counters,
  marquee,
  profile,
} from "../data/portfolioData";
import Reveal from "./Reveal";
import Counter from "./Counter";

export function Marquee() {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div className="grp" aria-hidden={hidden}>
      {marquee.map((m, i) => (
        <span className="kw" key={i}>
          {m}
          <span className="diamond" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <div className="wrap">
      <div className="stats">
        {counters.map((s) => (
          <Reveal key={s.k}>
            <div className="stat">
              <div className="n">
                <Counter value={s.v} suffix={s.suffix} />
              </div>
              <div className="k">{s.k}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Collection() {
  const items = [...collection].sort((a, b) => b.t - a.t);
  return (
    <section className="section" id="collection">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <h2 data-split>Selected Work</h2>
            <span className="idx">Timeline · 2025 → 2026</span>
          </div>
        </Reveal>
        <div className="timeline">
          {items.map((a, i) => {
            const lead = a.images[0];
            const thumbs = a.images.slice(1);
            const notLast = i !== items.length - 1;
            return (
              <div className="tl-row" key={a.id}>
                <Reveal>
                  <div className="tl-year">
                    <div className="y">{a.year}</div>
                    <div className="no">{a.no}</div>
                  </div>
                </Reveal>
                <div className="tl-spine">
                  {notLast && <span className="line" />}
                  <span className="node" />
                </div>
                <Reveal>
                  <a className="artifact" href={`/exhibit/${a.id}`}>
                    <span className="scan" />
                    {!lead && (
                      <div className="lead terminal">
                        <div>
                          <div className="l1">$ penpal init 10.10.11.42 --name box</div>
                          <div className="l2">› target scaffolded · scope enforced · evidence masked</div>
                          <div className="l3">› v1.0.0 · deterministic core · 11 PI tools</div>
                          <div className="l4">EVIDENCE &gt; CONTEXT &gt; NEXT STEP</div>
                        </div>
                      </div>
                    )}
                    {lead && lead.fit === "cover" && (
                      <div className="lead cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={lead.src} alt="" loading="lazy" />
                        <span className="scrim" />
                      </div>
                    )}
                    {lead && lead.fit === "contain" && (
                      <div className="lead contain">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={lead.src} alt="" loading="lazy" />
                      </div>
                    )}
                    <div className="a-no">
                      {a.no} · {a.category}
                    </div>
                    <h3 className="a-title">{a.title}</h3>
                    <div className="a-medium">{a.medium}</div>
                    <p className="a-blurb">{a.blurb}</p>
                    {thumbs.length > 0 && (
                      <div className="thumbs">
                        {thumbs.map((th, j) => (
                          <span key={j}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={th.src} alt="" loading="lazy" />
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="tags">
                      {a.tags.map((t) => (
                        <span className="tag" key={t.label}>
                          {t.kind === "security" && <span className="dot" />}
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <span className="arr">↗</span>
                  </a>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Atelier() {
  return (
    <section className="section" id="atelier">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <h2 data-split>Experience</h2>
            <span className="idx">Roles</span>
          </div>
        </Reveal>
        {atelier.map((r) => (
          <Reveal key={r.org}>
            <div className="atelier-row">
              <div>
                <div className="role">{r.role}</div>
                <div className="org">{r.org}</div>
                <div className="kind">{r.kind.charAt(0).toUpperCase() + r.kind.slice(1)}</div>
                <div className="period">
                  {r.period} · {r.location}
                </div>
              </div>
              <ul>
                {r.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal>
        <p className="lead">Get in touch.</p>
        <a className="email" href={`mailto:${profile.contact.email}`}>
          {profile.contact.email}
        </a>
        <div className="links">
          <a className="btn-gold" href={profile.contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn-outline" href={profile.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn-outline" href={`tel:${profile.contact.phone.replace(/[^0-9]/g, "")}`}>
            {profile.contact.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <div className="wrap">
      <footer className="footer">
        <div className="fn">YOUSIF NAZHAT</div>
        <div className="fm">© 2026 · ALWAYS ENUMERATING</div>
      </footer>
    </div>
  );
}
