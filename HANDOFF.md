# Master Prompt — Yousif Nazhat Portfolio (continue in a fresh chat)

Paste everything below into a new Claude Code chat to pick up exactly where we left off.

---

You are continuing work on **Yousif Nazhat's personal portfolio** — an offensive-security engineer who also designs. Read this whole brief, then confirm you've read the current code before making changes.

## Repo & deploy
- Local: `/Users/yousi/Projects/portfolio-current` (Next.js 16, React 19, App Router, Tailwind v4). Current branch: `design-sync`.
- GitHub: `github.com/yousifnazhat/portfolio`. **Push with `git push origin HEAD:main`** (deploys to Vercel → https://yousifsportfolio.vercel.app). Last commit: `0cceb45`.
- Build to verify: `npm run build` (must stay green before pushing). Dev: preview server config `.claude/launch.json` name **"daedalus"**, port 3000.

## HARD RULE (NDA)
Never publish the YC defense-startup / "GUILD" internship anywhere. It's under NDA. It is intentionally absent from all content — keep it that way.

## Current design direction — "brutalist-technical" (locked)
Warm **paper** background `#e4dfd1`, **ink** text `#15140f`, bold **orange** accent `#ff5a1f`, everything **monospace** (Space Mono for display via `--font-display`, JetBrains Mono for body/UI via `--font-mono`). Underscore motifs, chunky 1.5px borders, big stat numbers, a vertical sidebar. Reference was Kevin Pham's "CTAR_" software-engineering shot.
> History: went dark-gold "Gilded Atelier" (rejected), had a 3D marble statue then an antimatter plasma orb in the hero (both removed as "ugly"). Don't reintroduce those. CSS variable NAMES are legacy (`--gold` now holds orange, `--ivory` now holds ink) — don't be confused by the names.

## Signature interactions (all live)
- **Entry gate** (`Gate.tsx`): full-screen terminal; you just start typing — typing `whoami` triggers a staggered "access granted" sequence (~3.4s) then a 1.25s wipe to reveal the site. Once per session (`sessionStorage.entered`).
- **Hero CLI** (`CliHint.tsx`): a real command line. `whoami` opens the bio terminal (`EasterEgg.tsx`), `cd work|experience|stack|contact|<project-id>` fires a brutalist wipe (`Transition.tsx`) + navigates, `help`/`ls` lists commands.
- **Stack = velocity marquee** (`VelocityMarquee.tsx`): 3 rows of the toolchain run sideways (alternating), skew + accelerate with scroll velocity; each item has its real tech logo (`<img src="/icons/{slug}.svg">`, from Simple Icons, in `public/icons`).
- Also: custom gold cursor + magnetic (`Cursor.tsx`), GSAP SplitText heading reveals (`HeadingReveals.tsx`, `[data-split]`).

## Structure
- `src/app/page.tsx`: Gate, Transition, Cursor, HeadingReveals, `<Hero/>`, then `<main>` = Marquee, Collection (timeline), Atelier, VelocityMarquee, Contact, Footer. `src/components/Sections.tsx` holds most sections. `src/data/portfolioData.ts` is the single source of truth (profile, collection/projects, atelier/experience, stack, credentials, caseStudies, navItems).
- Exhibit case studies: `src/app/exhibit/[id]/page.tsx` + `Gallery.tsx` (clickable lightbox; diagram images sit on **white** cards so transparent SVGs show).
- Content mirrors his resume (`~/Desktop/Nazhat_Yousif_6_22_2026.pdf`): projects PenPal, Attack & Detection Labs, Mu Sigma Alumni Platform (live `musigmaalumni.vercel.app`), Project Daedalus (NASA/Lockheed UAV), RISC-V Pipeline Simulator.

## CRITICAL: preview-environment limitation
The Claude Preview **freezes CSS/RAF animations and cannot screenshot** sections using `position: sticky`, `transform`, or `will-change` (they come back blank), and `window.scrollTo` is unreliable. This is NOT a real bug — real browsers are fine. **Verify these via DOM inspection** (`preview_eval`: check element presence, computed styles, `elementFromPoint`, image `naturalWidth`) instead of screenshots, and tell the user to confirm animated/scroll sections on the live Vercel site. Normal static sections (the hero at scroll 0) DO screenshot fine.

## Working style he expects
- He's picky about aesthetics and has rejected effects that look "weird/ugly" — when choosing a visual effect, look at real references (he bought an "Awwwards Pack" at `~/Downloads/Awwwards Pack-4/` — extract preview frames with ffmpeg to judge before implementing) and prefer restraint that fits the theme. When taste is a real fork, ask with concrete options rather than guessing.
- Ship in small verified increments: edit → `npm run build` green → `git push origin HEAD:main`. Keep components fail-safe (never leave content hidden if an animation/JS path fails).
- Repo was cleaned of Firebase/IDX cruft and dead components — keep it tidy.

## Likely next tasks (confirm with him)
Accessibility pass, SEO/metadata + per-exhibit `<title>`s, tune the marquee (speed / logo color — currently black, he may want orange or brand color), gate timing tweaks, and general polish. Ask him what to prioritize.

**First action in the new chat:** read `src/app/globals.css`, `src/app/page.tsx`, `src/components/Hero.tsx`, and `src/data/portfolioData.ts` to sync with current state, then ask what he wants to work on.
