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
  const orderedCases = cases
    .map((entry) => ({
      ...entry,
      findings: [...entry.findings].sort((a, b) => a.rank - b.rank),
    }))
    .sort((a, b) => a.findings[0].rank - b.findings[0].rank);
  const indexItems = orderedCases
    .flatMap((entry) => entry.findings)
    .sort((a, b) => a.rank - b.rank)
    .map((finding) => (
      <li key={finding.id} value={finding.rank}>
        <a href={`#${finding.id}`}>
          <span>{finding.name}</span>
          <span className={styles.indexRating}>{finding.rating}</span>
        </a>
      </li>
    ));

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
          I ranked the findings from five anonymized assessments by the impact I could demonstrate.
          The severity ratings are mine. Where shown, CVSS scores describe technical severity.
        </p>
        <a className={styles.researchLink} href="#browser-permissions-research">
          My ownership checks and the two arXiv papers I cited →
        </a>
        <nav id="case-index" className={styles.index} aria-labelledby="index-heading">
          <h2 id="index-heading">Findings by priority</h2>
          <ol>{indexItems.slice(0, 3)}</ol>
          {indexItems.length > 3 && (
            <details>
              <summary>{indexItems.length - 3} more findings</summary>
              <ol start={4}>{indexItems.slice(3)}</ol>
            </details>
          )}
        </nav>
        {orderedCases.map((entry) => (
          <article className={styles.case} id={entry.slug} key={entry.slug} aria-labelledby={`${entry.slug}-title`}>
            <h2 id={`${entry.slug}-title`}>{entry.title}</h2>
            <p className={styles.lede}>{entry.summary}</p>
            <ul className={styles.findings} aria-label="Findings">
              {entry.findings.map((finding) => (
                <li key={finding.id} id={finding.id} tabIndex={-1}>
                  <p className={styles.rating}>{finding.rating}</p>
                  <div>
                    <h3>{finding.name}</h3>
                    <p>{finding.evidence}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.sectionTitle} id={`${entry.slug}-research`}>
              <a className={styles.sectionAnchor} href={`#${entry.slug}-research`}>
                How I designed the tests <span aria-hidden="true">#</span>
              </a>
            </h3>
            {entry.research.map((study) => (
              <section className={styles.research} key={study.title}>
                <h4>{study.title}</h4>
                {study.papers.length > 0 && (
                  <div className={styles.sources}>
                    <p className={styles.noteLabel}>{study.papers.length === 1 ? "In the paper" : "In the papers"}</p>
                    <ul>
                      {study.papers.map((paper) => (
                        <li key={paper.url}>
                          <a href={paper.url}>{paper.title}</a>
                          <p>{paper.approach}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <dl className={styles.testNotes}>
                  <dt className={styles.noteLabel}>My test</dt>
                  <dd>{study.adaptation}</dd>
                  <dt className={styles.noteLabel}>What it established</dt>
                  <dd>{study.result}</dd>
                </dl>
              </section>
            ))}
            <h3 className={styles.sectionTitle}>Assessment and follow-up</h3>
            <p>{entry.decision}</p>
            <a className={styles.back} href="#case-index">↑ Back to findings</a>
          </article>
        ))}
      </div>
    </main>
  );
}
