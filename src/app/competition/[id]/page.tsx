import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  competitions,
  competitionStudies,
  profile,
} from "../../../data/portfolioData";
import Gallery from "../../../components/Gallery";

export function generateStaticParams() {
  return competitions
    .filter((c) => c.id && competitionStudies[c.id])
    .map((c) => ({ id: c.id as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = competitions.find((x) => x.id === id);
  const s = competitionStudies[id];
  if (!c || !s) return { title: "Yousif Nazhat" };
  const description = `${s.event} — ${s.placement}, ${s.solved} challenges solved for ${s.points} points with team ${s.team}.`;
  return {
    title: c.name,
    description,
    alternates: { canonical: `/competition/${id}` },
    openGraph: {
      title: `${c.name} — ${profile.name}`,
      description,
      url: `/competition/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.name} — ${profile.name}`,
      description,
    },
  };
}

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comp = competitions.find((c) => c.id === id);
  const study = competitionStudies[id];
  if (!comp || !study) notFound();

  const imgs = study.certificate
    ? [
        {
          src: study.certificate,
          fit: "contain" as const,
          caption: `Certificate of participation — ${study.event}, ${study.placement}.`,
        },
      ]
    : [];

  return (
    <article className="study">
      <div className="wrap">
        <nav className="study-nav">
          <Link href="/" className="brand">
            <span className="mark">YN</span>DAEDALUS
          </Link>
          <Link href="/#competitions" className="study-back">
            ← Back to competitions
          </Link>
        </nav>

        <header className="study-head">
          <div className="study-eyebrow">CTF · {comp.org}</div>
          <h1>{comp.name}</h1>
          <p className="study-medium">
            {study.event} · {study.dates}
          </p>

          <div className="study-meta">
            <div>
              <span className="k">Placement</span>
              <span className="v">{study.placement}</span>
            </div>
            <div>
              <span className="k">Solved</span>
              <span className="v">{study.solved}</span>
            </div>
            <div>
              <span className="k">Points</span>
              <span className="v">{study.points}</span>
            </div>
            <div>
              <span className="k">Team</span>
              <span className="v">{study.team}</span>
            </div>
          </div>
        </header>

        <div className="study-body">
          <p className="study-overview">{study.overview}</p>

          <Gallery images={imgs} />

          <h2 className="study-h2">Selected solves</h2>
          <ul className="study-highlights">
            {study.highlights.map((h) => (
              <li key={h.label}>
                <span className="hl-label">{h.label}</span>
                <span className="hl-detail">{h.detail}</span>
              </li>
            ))}
          </ul>

          <h2 className="study-h2">Techniques</h2>
          <div className="study-stack">
            {study.stack.map((s) => (
              <span className="tag neutral" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <footer className="study-foot">
          <Link href="/#competitions" className="view">
            ← Back to competitions
          </Link>
          <a className="view" href={`mailto:${profile.contact.email}`}>
            Get in touch →
          </a>
        </footer>
      </div>

      <div className="vignette" />
      <div className="grain" />
    </article>
  );
}
