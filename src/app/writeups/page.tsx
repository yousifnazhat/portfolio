import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "../../data/portfolioData";
import cases from "../../data/securityWriteups.json";
import styles from "./writeups.module.css";

const title = "Security research writeups";
const description = "Five anonymized web and API security reviews. Each case shows what I tested, what I observed, and what I recommended.";

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
        <p className={styles.intro}>{description}</p>
        <nav id="case-index" className={styles.index} aria-labelledby="index-heading">
          <h2 id="index-heading">Read a case</h2>
          <ol>
            {cases.map((entry) => (
              <li key={entry.slug}><a href={`#${entry.slug}`}>{entry.title}</a></li>
            ))}
          </ol>
        </nav>
        {cases.map((entry) => (
          <article className={styles.case} id={entry.slug} key={entry.slug} aria-labelledby={`${entry.slug}-title`}>
            <h2 id={`${entry.slug}-title`}>{entry.title}</h2>
            <p className={styles.question}>{entry.question}</p>
            <dl>
              <dt>My role</dt><dd>{entry.work}</dd>
              <dt>Observed evidence</dt><dd>{entry.evidence}</dd>
              <dt>Limits of the evidence</dt><dd>{entry.limits}</dd>
              <dt>Recommended follow-up</dt><dd>{entry.recommendation}</dd>
            </dl>
            <a className={styles.back} href="#case-index">↑ All writeups</a>
          </article>
        ))}
      </div>
    </main>
  );
}
