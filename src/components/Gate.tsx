"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

/* Typing "whoami" grants access and plays the terminal sequence once per session. */
type Phase = "boot" | "prompt" | "granted" | "exit" | "done";

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("done");
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const finish = () => {
    try {
      sessionStorage.setItem("entered", "1");
    } catch {
      // The visitor can still enter when storage is disabled.
    }
    window.dispatchEvent(new CustomEvent("gate-entered"));
    document.documentElement.classList.remove("gate-lock");
    setPhase("done");
  };

  const enter = () => {
    if (phase !== "prompt") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 700 : 3400; // let the granted sequence be read before the wipe
    const wipe = reduce ? 50 : 1300; // slower reveal wipe
    setPhase("granted");
    window.setTimeout(() => {
      setPhase("exit");
      window.setTimeout(finish, wipe);
    }, hold);
  };

  const updateCommand = (next: string) => {
    setVal(next);
    setErr(false);
    if (next.toLowerCase().includes("whoami")) enter();
  };

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (phase !== "prompt" || e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    if (e.target instanceof HTMLButtonElement || e.target === inputRef.current) return;
    e.preventDefault();
    inputRef.current?.focus({ preventScroll: true });
    updateCommand((val + e.key).slice(0, 24));
  });

  useEffect(() => {
    try {
      if (sessionStorage.getItem("entered")) return;
    } catch {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number;
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("gate-lock");
      setPhase(reduce ? "prompt" : "boot");
      if (!reduce) timer = window.setTimeout(() => setPhase("prompt"), 1000);
    });

    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("gate-lock");
    };
  }, []);

  if (phase === "done") return null;

  const granted = phase === "granted" || phase === "exit";

  return (
    <div
      className={`gate${phase === "exit" ? " exit" : ""}`}
      aria-label="entry terminal — type whoami to enter"
    >
      <div className="gate-inner">
        <pre className="gate-boot">{`> establishing secure channel ...... ok
> tls handshake ................... ok
> fingerprinting visitor .......... ok
> identity required to proceed`}</pre>

        {phase !== "boot" && !granted && (
          <label className="gate-line">
            <span className="gate-pre">visitor@yousif.dev:~$</span>
            <input
              ref={inputRef}
              className="gate-input"
              aria-label="Type whoami to enter"
              value={val}
              maxLength={24}
              placeholder="whoami"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              onChange={(e) => updateCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && val.trim()) setErr(true);
              }}
            />
          </label>
        )}

        {err && !granted && <pre className="gate-err" role="status">{`> access denied — hint: just type whoami`}</pre>}

        {granted && (
          <div className="gate-grantseq">
            <pre className="gate-grant gl1">{`visitor@yousif.dev:~$ whoami`}</pre>
            <pre className="gate-grant gl2">{`> identity ............. Yousif Nazhat`}</pre>
            <pre className="gate-grant gl3">{`> clearance ............ GRANTED`}</pre>
            <pre className="gate-grant gl4">{`> booting portfolio ....`}</pre>
          </div>
        )}

        {phase === "prompt" && (
          <>
            <div className="gate-hint">
              [ start typing <b>whoami</b> ·{" "}
              <button className="gate-skip" onClick={enter}>
                skip ↵
              </button>{" "}
              ]
            </div>
            <button type="button" className="gate-enter" onClick={finish}>
              Enter portfolio <span aria-hidden="true">↵</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
