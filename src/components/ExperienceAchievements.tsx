"use client";

import { useEffect, useRef } from "react";

export default function ExperienceAchievements({ bullets }: { bullets: string[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const phone = window.matchMedia("(max-width: 700px)");
    const syncViewport = () => {
      details.open = !phone.matches;
    };

    syncViewport();
    phone.addEventListener("change", syncViewport);
    return () => phone.removeEventListener("change", syncViewport);
  }, []);

  const remaining = bullets.slice(1);

  return (
    <div className="experience-achievements">
      <ul>
        <li>{bullets[0]}</li>
      </ul>
      {remaining.length > 0 && (
        // Expanded server output keeps every achievement readable without JavaScript.
        <details className="experience-more" ref={detailsRef} open>
          <summary>
            <span className="more-label">
              {remaining.length} more {remaining.length === 1 ? "achievement" : "achievements"}
            </span>
            <span className="less-label">Show fewer achievements</span>
            <span className="disclosure-symbol" aria-hidden="true">+</span>
          </summary>
          <ul>
            {remaining.map((bullet, index) => <li key={index}>{bullet}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}
