"use client";

import { useEffect, useState } from "react";

/* Brutalist page-transition overlay. Listens for a "page-transition" event
   ({ href, label }), sweeps an ink panel across, navigates (anchor scroll or
   route), then sweeps away. Navigation happens on a real timer, so it works
   even where the animation timeline is throttled. */
export default function Transition() {
  const [state, setState] = useState<"idle" | "in" | "out">("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onNav = (e: Event) => {
      const { href, label } = (e as CustomEvent<{ href: string; label: string }>).detail;
      setLabel(label || "");
      setState("in");

      window.setTimeout(() => {
        if (href.startsWith("#")) {
          document.documentElement.style.scrollBehavior = "auto";
          const el = document.querySelector(href) as HTMLElement | null;
          if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 10);
          else window.scrollTo(0, 0);
        } else {
          window.location.href = href;
          return;
        }
        setState("out");
        window.setTimeout(() => setState("idle"), 650);
      }, 620);
    };
    window.addEventListener("page-transition", onNav as EventListener);
    return () => window.removeEventListener("page-transition", onNav as EventListener);
  }, []);

  return (
    <div className={`ptrans ${state}`} aria-hidden={state === "idle"}>
      <span className="ptrans-label">{label}</span>
    </div>
  );
}
