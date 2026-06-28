"use client";

import { useState } from "react";
import { collection } from "../data/portfolioData";

const SECTIONS: Record<string, string> = {
  work: "#collection",
  experience: "#atelier",
  exp: "#atelier",
  stack: "#arsenal",
  contact: "#contact",
  home: "#top",
  "~": "#top",
};

const PROJECTS = new Set(collection.map((c) => c.id));

/* The hero command line. `whoami` opens the bio terminal; `cd <page>` runs a
   page transition; `help`/`ls` lists commands. */
export default function CliHint() {
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");

  const go = (href: string, label: string) => {
    window.dispatchEvent(new CustomEvent("page-transition", { detail: { href, label } }));
    setVal("");
    setMsg("");
  };

  const run = () => {
    const c = val.trim().toLowerCase();
    if (!c) return;
    if (c === "whoami") {
      window.dispatchEvent(new CustomEvent("whoami-egg"));
      setVal("");
      setMsg("");
      return;
    }
    if (c === "help" || c === "ls" || c === "?") {
      setMsg("cmds → whoami · cd work · cd experience · cd stack · cd contact");
      return;
    }
    if (c === "clear") {
      setVal("");
      setMsg("");
      return;
    }
    if (c.startsWith("cd ") || c === "cd") {
      const target = c.slice(2).trim().replace(/^\/+|\/+$/g, "") || "home";
      if (SECTIONS[target]) return go(SECTIONS[target], `cd ${target}`);
      if (PROJECTS.has(target)) return go(`/exhibit/${target}`, `cd ${target}`);
      setMsg(`cd: no such directory: ${target}`);
      return;
    }
    setMsg(`command not found: ${c.split(" ")[0]} — try 'help'`);
  };

  return (
    <div className="cliwrap">
      <div className="cli">
        <span className="cli-pre">~$</span>
        <input
          className="cli-in"
          value={val}
          placeholder="type a command…"
          spellCheck={false}
          autoComplete="off"
          aria-label="command line — try whoami or cd work"
          onChange={(e) => {
            setMsg("");
            setVal(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
        />
      </div>
      <div className="cli-tip">
        {msg || (
          <>
            ↳ try <b>whoami</b> · <b>cd work</b> · <b>cd contact</b>
          </>
        )}
      </div>
    </div>
  );
}
