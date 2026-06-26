"use client";

import { useState } from "react";
import type { TechItem } from "../data/portfolioData";

export default function TechTile({ item }: { item: TechItem }) {
  const [err, setErr] = useState(false);
  const mono =
    item.glyph || item.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 3).toLowerCase();
  const url = item.slug ? `/icons/${item.slug}.svg` : "";
  const showImg = item.slug && !err;

  return (
    <div className="tile">
      <div className="ico">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={item.name} loading="lazy" onError={() => setErr(true)} />
        ) : (
          <span className="glyph">{mono}</span>
        )}
      </div>
      <div className="name">{item.name}</div>
    </div>
  );
}
