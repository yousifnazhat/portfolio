import {
  stats,
  collection,
  atelier,
  skillGroups,
  certifications,
  education,
  profile,
} from "../data/portfolioData";
import Reveal from "./Reveal";

export function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.k}>
          <div className="n">{s.n}</div>
          <div className="k">{s.k}</div>
        </div>
      ))}
    </div>
  );
}

export function Collection() {
  return (
    <section className="section" id="collection">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <h2>The Collection</h2>
            <span className="idx">FOUR ARTIFACTS</span>
          </div>
        </Reveal>
        <div className="gallery">
          {collection.map((a) => (
            <Reveal key={a.id}>
              <a className="exhibit-card" href={`/exhibit/${a.id}`}>
                <span className="arrow">↗</span>
                <div className="no">
                  {a.no} · {a.category}
                </div>
                <h3>{a.title}</h3>
                <div className="medium">{a.medium}</div>
                <p className="blurb">{a.blurb}</p>
                <div className="tags">
                  {a.tags.map((t) => (
                    <span className={`tag ${t.kind}`} key={t.label}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
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
            <h2>The Atelier</h2>
            <span className="idx">APPOINTMENTS</span>
          </div>
        </Reveal>
        {atelier.map((r) => (
          <Reveal key={r.org}>
            <div className="atelier-row">
              <div className="meta">
                <div className="role">{r.role}</div>
                <div className="org">{r.org}</div>
                <div className={`kind ${r.kind === "security" ? "security" : ""}`}>
                  {r.kind}
                </div>
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

export function Arsenal() {
  return (
    <section className="section" id="arsenal">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <h2>The Arsenal</h2>
            <span className="idx">INSTRUMENTS</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="skills">
            {skillGroups.map((g) => (
              <div className="skill-group" key={g.title}>
                <h4>{g.title}</h4>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="skill-group">
              <h4>Certifications · In Progress</h4>
              <ul>
                {certifications.inProgress.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="skill-group">
              <h4>Honors</h4>
              <ul>
                {certifications.honors.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                <li>{education.degree}</li>
                <li>{education.minor}</li>
                <li>{education.graduation}</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal>
          <p className="lead">Commission a breach.</p>
          <a className="email" href={`mailto:${profile.contact.email}`}>
            {profile.contact.email}
          </a>
          <div className="links">
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`tel:${profile.contact.phone.replace(/[^0-9]/g, "")}`}>
              {profile.contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div className="fn">{profile.name.toUpperCase()}</div>
        <div className="fm">© 2026 · CURATED IN THE LABYRINTH</div>
      </div>
    </footer>
  );
}
