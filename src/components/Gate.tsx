"use client";

import { useEffect, useRef, useState } from "react";

/* Phase 1 — the entry gate. Type `whoami` to enter (no Enter key required).
   Detection is robust: a window-level key buffer catches "whoami" typed
   anywhere on the gate even if the input isn't focused, AND the visible input
   auto-triggers on match. Granted → wipes up to reveal the site. Once per
   session, reduced-motion safe, and it never traps the user. */
type Phase = "boot" | "prompt" | "granted" | "done";

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const phaseRef = useRef<Phase>("boot");
  phaseRef.current = phase;

  const enter = () => {
    if (phaseRef.current === "granted" || phaseRef.current === "done") return;
    setPhase("granted");
    window.setTimeout(() => {
      sessionStorage.setItem("entered", "1");
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
    const t = window.setTimeout(
      () => {
        setPhase("prompt");
        inputRef.current?.focus();
      },
      reduce ? 0 : 1000
    );

    // safety net: catch "whoami" typed anywhere on the gate, focus or not
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const p = phaseRef.current;
      if (p === "boot" || p === "granted" || p === "done") return;
      if (e.key === "Backspace") {
        buf = buf.slice(0, -1);
        return;
      }
      if (e.key === "Enter") {
        if (buf.toLowerCase().includes("whoami")) enter();
        else if (buf.trim()) setErr(true);
        return;
      }
      if (e.key.length === 1) {
        buf = (buf + e.key).slice(-16);
        if (document.activeElement !== inputRef.current) inputRef.current?.focus();
        if (buf.toLowerCase().includes("whoami")) enter();
      }
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
    <div
      className={`gate${phase === "granted" ? " exit" : ""}`}
      aria-label="entry terminal — type whoami to enter"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="gate-inner">
        <pre className="gate-boot">{`> establishing secure channel ...... ok
> tls handshake ................... ok
> fingerprinting visitor .......... ok
> identity required to proceed`}</pre>

        {phase !== "boot" && (
          <div className="gate-line">
            <span className="gate-pre">visitor@yousif.dev:~$</span>
            <input
              ref={inputRef}
              className="gate-in"
              value={val}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="type whoami to enter"
              onChange={(e) => {
                setErr(false);
                const v = e.target.value;
                setVal(v);
                if (v.toLowerCase().trim() === "whoami") enter();
              }}
            />
          </div>
        )}

        {err && <pre className="gate-err">{`> access denied — hint: just type whoami`}</pre>}
        {phase === "granted" && <pre className="gate-grant">{`> ACCESS GRANTED — welcome, Yousif is expecting you.`}</pre>}
        {phase === "prompt" && (
          <div className="gate-hint">
            [ type <b>whoami</b> to enter ·{" "}
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
