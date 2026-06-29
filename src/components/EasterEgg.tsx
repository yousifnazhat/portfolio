"use client";

import { useEffect, useState } from "react";

/* Type "whoami" anywhere → a small terminal pops with a playful offsec bio.
   Subtle nod to the craft. Dismiss with Esc, the ×, or a click outside. */
export default function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // don't capture typing while the entry gate is still up
      if (!sessionStorage.getItem("entered")) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-12);
        if (buf.includes("whoami")) {
          setOpen(true);
          buf = "";
        }
      }
    };
    const onEgg = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("whoami-egg", onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("whoami-egg", onEgg);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="egg" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="whoami">
      <div className="egg-term" onClick={(e) => e.stopPropagation()}>
        <div className="egg-bar">
          <span className="egg-dot" />
          <span className="egg-dot" />
          <span className="egg-dot" />
          <span className="egg-title">yousif@offsec — whoami</span>
          <button className="egg-x" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </div>
        <pre className="egg-body">
{`yousif@offsec:~$ whoami
> Yousif Nazhat — offensive security engineer & designer
> likes ......: enumerating, red teams, gilded UIs
> motto ......: build it, then break it
> certs (wip) : OSCP+, HTB CPTS, Security+
> based ......: New Brunswick, NJ
> status .....: available · 2026
yousif@offsec:~$ `}
          <span className="egg-cursor">█</span>
        </pre>
      </div>
    </div>
  );
}
