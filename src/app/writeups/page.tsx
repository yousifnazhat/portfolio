import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "../../data/portfolioData";
import cases from "../../data/securityWriteups.json";
import styles from "./writeups.module.css";

const title = "Security research writeups";
const description = "Five anonymized web, API and mobile security assessments. Findings, severity, research methods and the evidence behind each rating.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/writeups" },
  openGraph: { title, description, url: "/writeups", type: "article" },
  twitter: { card: "summary", title, description },
};

export default function WriteupsPage() {
  return (
    <main className={styles.reader}>
      <header className={styles.cover}>
        <div className={styles.column}>
          <nav className={styles.byline} aria-label="Portfolio">
            <span>{profile.name}</span>
            <Link href="/">← Back to portfolio</Link>
          </nav>
          <h1>{title}<span aria-hidden="true">_</span></h1>
        </div>
      </header>
      <div className={styles.column}>
        <p className={styles.intro}>
          Five anonymized assessments. The priorities and severity ratings are mine.
          Where shown, CVSS scores describe technical severity. Each finding explains what I observed and what affected my rating.
        </p>
        <nav id="case-index" className={styles.index} aria-labelledby="index-heading">
          <h2 id="index-heading">Read a case</h2>
          <ul>
            {cases.map((entry) => (
              <li key={entry.slug}>
                <a href={`#${entry.slug}`}>
                  <span>{entry.title}</span>
                  <span className={styles.indexRating}>{entry.assessment}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {cases.map((entry) => (
          <article className={styles.case} id={entry.slug} key={entry.slug} aria-labelledby={`${entry.slug}-title`}>
            <h2 id={`${entry.slug}-title`}>{entry.title}</h2>
            <p className={styles.lede}>{entry.summary}</p>
            <ul className={styles.findings} aria-label="Findings">
              {entry.findings.map((finding) => (
                <li key={finding.name}>
                  <p className={styles.rating}>{finding.rating}</p>
                  <div>
                    <h3>{finding.name}</h3>
                    <p>{finding.evidence}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.sectionTitle}>How I designed the tests</h3>
            <p>{entry.method}</p>
            {entry.papers.length > 0 && (
              <div className={styles.sources}>
                <h4>Research cited in my notes</h4>
                <ul>
                  {entry.papers.map((paper) => (
                    <li key={paper.url}><a href={paper.url}>{paper.title}</a></li>
                  ))}
                </ul>
              </div>
            )}
            <h3 className={styles.sectionTitle}>Assessment and follow-up</h3>
            <p>{entry.decision}</p>
            <a className={styles.back} href="#case-index">↑ All writeups</a>
          </article>
        ))}
      </div>
    </main>
  );
}
