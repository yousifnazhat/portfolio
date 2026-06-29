"use client";

import { useEffect, useRef, useState } from "react";

/* Phase 1 — the entry gate. A real terminal: just start typing (no input to
   focus, no Enter required). Typing "whoami" grants access and wipes to the
   site. Once per session, reduced-motion safe, never traps the user. */
type Phase = "boot" | "prompt" | "granted" | "done";

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const phaseRef = useRef<Phase>("boot");
  const valRef = useRef("");
  phaseRef.current = phase;

  const enter = () => {
    if (phaseRef.current === "granted" || phaseRef.current === "done") return;
    setPhase("granted");
    window.setTimeout(() => {
      sessionStorage.setItem("entered", "1");
      window.dispatchEvent(new CustomEvent("gate-entered"));
      document.documentElement.classList.remove("gate-lock");
      setPhase("done");
    }, 1100);
  };

  useEffect(() => {
    if (sessionStorage.getItem("entered")) {
      setPhase("done");
      return;
    }
    document.documentElement.classList.add("gate-lock");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setPhase("prompt"), reduce ? 0 : 1000);

    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current !== "prompt") return;
      let next = valRef.current;
      if (e.key === "Backspace") next = next.slice(0, -1);
      else if (e.key === "Enter") next = next; // submit current
      else if (e.key.length === 1) next = (next + e.key).slice(0, 24);
      else return;
      e.preventDefault();
      valRef.current = next;
      setVal(next);
      setErr(false);
      if (next.toLowerCase().includes("whoami")) enter();
      else if (e.key === "Enter" && next.trim()) setErr(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("gate-lock");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`gate${phase === "granted" ? " exit" : ""}`} aria-label="entry terminal — type whoami to enter">
      <div className="gate-inner">
        <pre className="gate-boot">{`> establishing secure channel ...... ok
> tls handshake ................... ok
> fingerprinting visitor .......... ok
> identity required to proceed`}</pre>

        {phase !== "boot" && (
          <div className="gate-line">
            <span className="gate-pre">visitor@yousif.dev:~$</span>
            <span className="gate-typed">{val}</span>
            <span className="gate-caret" />
          </div>
        )}

        {err && <pre className="gate-err">{`> access denied — hint: just type whoami`}</pre>}
        {phase === "granted" && <pre className="gate-grant">{`> ACCESS GRANTED — welcome, Yousif is expecting you.`}</pre>}
        {phase === "prompt" && (
          <div className="gate-hint">
            [ start typing <b>whoami</b> ·{" "}
            <button className="gate-skip" onClick={enter}>
              skip ↵
            </button>{" "}
            ]
          </div>
        )}
      </div>
    </div>
  );
}
