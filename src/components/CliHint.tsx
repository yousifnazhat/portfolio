"use client";

import { useState } from "react";

/* A small interactive CLI prompt that invites visitors to type "whoami".
   Fires the same event the global key-listener uses, opening the terminal. */
export default function CliHint() {
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");

  const open = () => {
    window.dispatchEvent(new CustomEvent("whoami-egg"));
    setVal("");
    setMsg("");
  };

  return (
    <div className="cli">
      <span className="cli-pre">~$</span>
      <input
        className="cli-in"
        value={val}
        placeholder="type ‘whoami’"
        spellCheck={false}
        autoComplete="off"
        aria-label="terminal — type whoami"
        onChange={(e) => {
          const v = e.target.value;
          setMsg("");
          if (v.trim().toLowerCase() === "whoami") open();
          else setVal(v);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          const c = val.trim().toLowerCase();
          if (c === "whoami") open();
          else if (c) setMsg("command not found — try ‘whoami’");
        }}
      />
      {msg && <span className="cli-msg">{msg}</span>}
    </div>
  );
}
