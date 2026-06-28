"use client";

import { useEffect, useRef, useState } from "react";

/* Phase 1 — the entry gate. A full-screen terminal that requires the visitor
   to type `whoami` to enter. Granted → wipes up to reveal the site.
   Once per session, reduced-motion safe, and it never traps the user
   (entering/skipping unmounts via React state, not animation completion). */
type Phase = "boot" | "prompt" | "granted" | "done";

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove("gate-lock");
    };
  }, []);

  const enter = () => {
    setPhase("granted");
    window.setTimeout(() => {
      sessionStorage.setItem("entered", "1");
      document.documentElement.classList.remove("gate-lock");
      setPhase("done");
    }, 1100);
  };

  const submit = () => {
    const c = val.trim().toLowerCase();
    if (c === "whoami") enter();
    else {
      setErr(true);
      setVal("");
    }
  };

  if (phase === "done") return null;

  return (
    <div className={`gate${phase === "granted" ? " exit" : ""}`} aria-label="entry terminal">
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
              spellCheck={false}
              autoComplete="off"
              aria-label="type whoami to enter"
              onChange={(e) => {
                setErr(false);
                setVal(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
          </div>
        )}

        {err && <pre className="gate-err">{`> "${"access denied"}" — hint: type whoami`}</pre>}
        {phase === "granted" && <pre className="gate-grant">{`> ACCESS GRANTED — welcome, Yousif is expecting you.`}</pre>}

        {phase === "prompt" && (
          <div className="gate-hint">
            [ type <b>whoami</b> and hit enter ·{" "}
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
