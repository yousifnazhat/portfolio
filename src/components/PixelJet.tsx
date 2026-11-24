"use client";

import { memo, useEffect, useRef } from "react";

// Pixel-art F-22 Raptor (top-down) with afterburner plumes and a flare fan,
// rendered on a crisp SVG pixel grid. Palette maps to the theme variables:
// X = ink, H = rim light, M = muted spine, O/L/Y = flame, G = glint, W = core.
const ROWS = [
  "................H................",
  "................H................",
  "...............HXH...............",
  "...............HXX...............",
  "..............HXXXH..............",
  "..............HXXXX..............",
  ".............HXGOOXH.............",
  ".............HXOOOXX.............",
  ".............HXOOOXX.............",
  "............HXXXMXXXH............",
  "............HXXXMXXXX............",
  "............HXXXMXXXX............",
  "...........HXXXXMXXXXH...........",
  "...........HXXXXMXXXXX...........",
  "..........HXXXXXMXXXXXH..........",
  ".........HXXXXXXMXXXXXXH.........",
  "........HXXXXXXXMXXXXXXXH........",
  ".......HXXXXXXXXMXXXXXXXXH.......",
  "......HXXXXXXXXXMXXXXXXXXXH......",
  ".....HXXXXXXXXXXMXXXXXXXXXXH.....",
  "....HXXXXXXXXXXXMXXXXXXXXXXXH....",
  "...HXXXXXXXXXXXXMXXXXXXXXXXXXH...",
  "..HXXXXXXXXXXXXXMXXXXXXXXXXXXXH..",
  ".HXXXXXXXXXXXXXXMXXXXXXXXXXXXXXH.",
  "HXXXXXXXXXXXXXXXMXXXXXXXXXXXXXXXH",
  "..HXXXXXXXXXXXXXMXXXXXXXXXXXXXX..",
  "....HXXXXXXXXXXXMXXXXXXXXXXXX....",
  "......HXXXXXXXXXMXXXXXXXXXX......",
  "........HXXXXXXXMXXXXXXXX........",
  "..........HXXXXXMXXXXXX..........",
  "........HH.HXXXXMXXXXX.HH........",
  ".......HXX..HXXXMXXXX..HXH.......",
  ".......HXXHHXXXXMXXXXHHXXX.......",
  "......HXXXXXXXXXMXXXXXXXXXH......",
  "......HXXXXXXXXXMXXXXXXXXXX......",
  ".........HXXXXXXXXXXXXXX.........",
  "............HXXXXXXXX............",
  "..............HX.HX..............",
  "..............HX.HX..............",
  "..............WW.WW..............",
  "...........O..OO.OO..O...........",
  "..........O...OO.OO...O..........",
  ".........L..O.LL.LL.O..L.........",
  "........L.LL..LL.LL..LL.L........",
  ".......YYY.....Y.Y.....YYY.......",
  "............L.YY.YY.L............",
  "..........YY....Y....YY..........",
];

const COLORS: Record<string, string> = {
  X: "var(--jet-body, var(--ink))",
  H: "var(--jet-rim, #4a4433)",
  M: "var(--jet-spine, var(--muted))",
  O: "var(--gold)",
  L: "var(--gold-l)",
  Y: "var(--gold-pale)",
  G: "#ffd8b4", // canopy glint
  W: "#fff3dd", // white-hot afterburner core
};

const W = ROWS[0].length;
const H = ROWS.length;
const PAD = 3; // original framing around the pixel sprite
const FLAME_Y = 39; // first flame row — everything below flickers (core stays steady)

// Extra countermeasure fan, shown only while the `flares` command bursts.
const BURST: [number, number, string][] = [
  [6, 40, "L"], [26, 40, "L"],
  [4, 41, "O"], [28, 41, "O"],
  [7, 42, "Y"], [25, 42, "Y"],
  [2, 43, "Y"], [30, 43, "Y"],
  [10, 43, "L"], [22, 43, "L"],
  [15, 44, "Y"], [17, 44, "Y"],
  [5, 45, "Y"], [27, 45, "Y"],
  [12, 46, "Y"], [20, 46, "Y"],
  [16, 47, "Y"],
];

// One path per color and flicker phase keeps the original pixels inexpensive to animate.
const layers = new Map<string, { color: string; phase: string; path: string }>();
ROWS.forEach((row, y) => {
  [...row].forEach((color, x) => {
    if (!COLORS[color]) return;
    const phase = y >= FLAME_Y && color !== "W" ? `pj-fl pj-f${(x * 7 + y * 13) % 3}` : "";
    const key = color + phase;
    const layer = layers.get(key) ?? { color: COLORS[color], phase, path: "" };
    layer.path += `M${x} ${y}h1v1h-1z`;
    layers.set(key, layer);
  });
});

const PixelJet = memo(function PixelJet() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onFlares = () => {
      el.classList.add("burst");
      el.querySelector(".pj-burst")?.getAnimations().forEach((animation) => {
        animation.currentTime = 0;
      });
    };
    window.addEventListener("jet-flares", onFlares);
    return () => {
      window.removeEventListener("jet-flares", onFlares);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="pixel-jet"
      x="-39"
      y="-53"
      width="78"
      height="106"
      viewBox={`${-PAD} ${-PAD} ${W + PAD * 2} ${H + PAD * 2}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {Array.from(layers, ([key, layer]) => (
        <path key={key} d={layer.path} fill={layer.color} className={layer.phase || undefined} />
      ))}

      {/* countermeasure burst — hidden until the `flares` command fires */}
      <g className="pj-burst" onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) ref.current?.classList.remove("burst");
      }}>
        {BURST.map(([x, y, c], i) => (
          <rect
            key={`b${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={COLORS[c]}
            className={`pj-fl pj-f${i % 3}`}
          />
        ))}
      </g>
    </svg>
  );
});

export default PixelJet;
