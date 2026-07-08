"use client";

import { useEffect, useRef } from "react";

// Pixel-art F-22 Raptor (top-down) with afterburner plumes and a flare fan,
// rendered as crisp SVG rects. Palette maps to the theme variables:
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
  X: "var(--ink)",
  H: "#4a4433", // rim light — edges facing the (upper-left) light source
  M: "var(--muted)",
  O: "var(--gold)",
  L: "var(--gold-l)",
  Y: "var(--gold-pale)",
  G: "#ffd8b4", // canopy glint
  W: "#fff3dd", // white-hot afterburner core
};

const W = ROWS[0].length;
const H = ROWS.length;
const PAD = 3; // breathing room for the registration ticks
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

const TICK = 2.6;
const TICK_W = 0.45;
const TICK_COLOR = "rgba(21, 20, 15, 0.35)";

export default function PixelJet() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const onFlares = () => {
      el.classList.add("burst");
      window.clearTimeout(t);
      t = window.setTimeout(() => el.classList.remove("burst"), 1800);
    };
    window.addEventListener("jet-flares", onFlares);
    return () => {
      window.removeEventListener("jet-flares", onFlares);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="pixel-jet"
      viewBox={`${-PAD} ${-PAD} ${W + PAD * 2} ${H + PAD * 2}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art of an F-22 Raptor deploying flares"
    >
      {/* corner registration ticks — spec-sheet framing */}
      {[
        [-PAD, -PAD, 1, 1],
        [W + PAD, -PAD, -1, 1],
        [-PAD, H + PAD, 1, -1],
        [W + PAD, H + PAD, -1, -1],
      ].map(([cx, cy, dx, dy], i) => (
        <g key={`t${i}`} fill={TICK_COLOR}>
          <rect x={Math.min(cx, cx + dx * TICK)} y={Math.min(cy, cy + dy * TICK_W)} width={TICK} height={TICK_W} />
          <rect x={Math.min(cx, cx + dx * TICK_W)} y={Math.min(cy, cy + dy * TICK)} width={TICK_W} height={TICK} />
        </g>
      ))}

      {/* soft drop shadow — airframe only (the plume is a light source) */}
      <g transform="translate(1.4 2)" opacity="0.1" fill="var(--ink)">
        {ROWS.slice(0, FLAME_Y).flatMap((row, y) =>
          [...row].map((c, x) =>
            COLORS[c] ? <rect key={`s${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
          )
        )}
      </g>

      {/* sprite — flame pixels flicker in three offset phases */}
      {ROWS.flatMap((row, y) =>
        [...row].map((c, x) =>
          COLORS[c] ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={COLORS[c]}
              className={y >= FLAME_Y && c !== "W" ? `pj-fl pj-f${(x * 7 + y * 13) % 3}` : undefined}
            />
          ) : null
        )
      )}

      {/* countermeasure burst — hidden until the `flares` command fires */}
      <g className="pj-burst">
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
}
