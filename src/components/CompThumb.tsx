"use client";

import { useState } from "react";

/* Thumbnail for a competition scoreboard row. Hides itself if the image is
   missing (e.g. before the photo file is added), so prod never shows a broken
   image icon. */
export default function CompThumb({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="comp-thumb"
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setOk(false)}
    />
  );
}
