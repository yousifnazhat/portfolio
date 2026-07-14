import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collection, caseStudies, profile } from "../../../data/portfolioData";
import Gallery from "../../../components/Gallery";
import PixelPenguin from "../../../components/PixelPenguin";

export function generateStaticParams() {
  return collection.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const a = collection.find((x) => x.id === id);
  if (!a) return { title: "Yousif Nazhat" };
  return {
    title: a.title,
    description: a.blurb,
    alternates: { canonical: `/exhibit/${a.id}` },
    openGraph: {
      title: `${a.title} — ${profile.name}`,
      description: a.blurb,
      url: `/exhibit/${a.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.title} — ${profile.name}`,
      description: a.blurb,
    },
  };
}

export default async function ExhibitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artifact = collection.find((a) => a.id === id);
  const study = caseStudies[id];
  if (!artifact || !study) notFound();

  const imgs = artifact.images?.length
    ? artifact.images
    : artifact.image
      ? [{ src: artifact.image, fit: "cover" as const }]
      : [];

  return (
    <article className="study">
      <div className="wrap">
        <nav className="study-nav">
          <Link href="/" className="brand">
            <span className="mark">YN</span>DAEDALUS
          </Link>
          <Link href="/#collection" className="study-back">
            ← Back to work
          </Link>
        </nav>

        <header className="study-head">
          <div className="study-eyebrow">
            {artifact.no} · {artifact.category}
          </div>
          <h1>{artifact.title}</h1>
          <p className="study-medium">{artifact.medium}</p>

          <div className="study-meta">
            <div>
              <span className="k">Year</span>
              <span className="v">{study.year}</span>
            </div>
            <div>
              <span className="k">Role</span>
              <span className="v">{study.role}</span>
            </div>
            {study.github && (
              <div>
                <span className="k">Source</span>
                <a className="v link" href={study.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
            )}
            {study.live && (
              <div>
                <span className="k">Live</span>
                <a className="v link" href={study.live} target="_blank" rel="noreferrer">
                  Visit ↗
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="study-body">
          <p className="study-overview">{study.overview}</p>

          {artifact.id === "penpal" && (
            <figure className="pengu-plate">
              <PixelPenguin />
              <figcaption>PenPal · evidence &gt; context &gt; next step_</figcaption>
            </figure>
          )}

          <Gallery images={imgs} />

          <h2 className="study-h2">Selected work</h2>
          <ul className="study-highlights">
            {study.highlights.map((h) => (
              <li key={h.label}>
                <span className="hl-label">{h.label}</span>
                <span className="hl-detail">{h.detail}</span>
              </li>
            ))}
          </ul>

          <h2 className="study-h2">Stack</h2>
          <div className="study-stack">
            {study.stack.map((s) => (
              <span className="tag neutral" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <footer className="study-foot">
          <Link href="/#collection" className="view">
            ← Back to work
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
