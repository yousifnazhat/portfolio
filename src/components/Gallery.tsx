"use client";

import { useCallback, useEffect, useState } from "react";

type Img = { src: string; fit: "cover" | "contain"; caption?: string };

export default function Gallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (active === null) return;
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((im, i) => (
          <figure className="gfig" key={im.src} onClick={() => setActive(i)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActive(i); }}
            aria-label={im.caption ? `Open image: ${im.caption.slice(0, 60)}` : "Open image"}>
            <div className="gfig-img" style={{ aspectRatio: im.fit === "contain" ? "16 / 10" : "4 / 3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.caption ?? ""} style={{ objectFit: im.fit }} loading="lazy" />
              <span className="gfig-zoom">View ↗</span>
            </div>
            {im.caption && <figcaption>{im.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close image">×</button>
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active].src} alt={images[active].caption ?? ""} />
            {images[active].caption && <figcaption>{images[active].caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
