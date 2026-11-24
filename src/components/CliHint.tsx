"use client";

import { useState } from "react";
import { collection, competitions } from "../data/portfolioData";

const SECTIONS: Record<string, string> = {
  work: "#collection",
  ...(competitions.length
    ? { competitions: "#competitions", comps: "#competitions", ctf: "#competitions" }
    : {}),
  experience: "#atelier",
  exp: "#atelier",
  stack: "#arsenal",
  contact: "#contact",
  home: "#top",
  "~": "#top",
};

const PROJECTS = new Set(collection.map((c) => c.id));

const QUICK_COMMANDS = ["sudo -l", "intercept", "whoami"];

/* Portfolio commands are handled locally. `whoami` opens the bio terminal;
   `cd <page>` navigates, and `sudo -l`/`help`/`ls` lists available commands. */
export default function CliHint() {
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");

  const go = (href: string, label: string) => {
    window.dispatchEvent(new CustomEvent("page-transition", { detail: { href, label } }));
    setVal("");
    setMsg("");
  };

  const run = (command = val) => {
    const c = command.trim().toLowerCase().replace(/\s+/g, " ");
    if (!c) return;
    setVal(command);
    if (c === "whoami") {
      window.dispatchEvent(new CustomEvent("whoami-egg"));
      setVal("");
      setMsg("");
      return;
    }
    if (c === "sudo -l" || c === "help" || c === "ls" || c === "?") {
      setMsg(
        `allowed → whoami · cd experience${competitions.length ? " · cd competitions" : ""} · cd work · cd stack · cd contact · cd home · cd <project> · flares · intercept · clear · help / ls`
      );
      return;
    }
    if (c === "intercept") {
      window.dispatchEvent(new CustomEvent("jet-intercept"));
      setVal("");
      setMsg("↗ intercept launched_");
      return;
    }
    if (c === "flares") {
      window.dispatchEvent(new CustomEvent("jet-flares"));
      setVal("");
      setMsg("↯ countermeasures away_");
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
          placeholder="sudo -l"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          enterKeyHint="go"
          aria-label="portfolio command line — try sudo -l"
          onChange={(e) => {
            setMsg("");
            setVal(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
            if (window.matchMedia("(pointer: coarse)").matches) e.currentTarget.blur();
            run();
          }}
        />
      </div>
      <div className="cli-shortcuts" role="group" aria-label="Quick portfolio commands">
        {QUICK_COMMANDS.map((command) => (
          <button type="button" key={command} onClick={() => run(command)} aria-label={`Run ${command}`}>
            {command}
          </button>
        ))}
      </div>
      <div className="cli-tip" role="status">
        {msg || (
          <>
            ↳ <b>sudo -l</b> lists available commands
          </>
        )}
      </div>
    </div>
  );
}
