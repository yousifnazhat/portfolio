// Pixel-art F-22 Raptor (top-down) with afterburner plumes and a flare fan,
// rendered as crisp SVG rects. Palette maps to the theme variables:
// X = ink, M = muted (fuselage spine), O = orange, L = light orange, Y = pale.
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

const TICK = 2.6;
const TICK_W = 0.45;
const TICK_COLOR = "rgba(21, 20, 15, 0.35)";

export default function PixelJet() {
  return (
    <svg
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
        {ROWS.slice(0, 39).flatMap((row, y) =>
          [...row].map((c, x) =>
            COLORS[c] ? <rect key={`s${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
          )
        )}
      </g>

      {/* sprite */}
      {ROWS.flatMap((row, y) =>
        [...row].map((c, x) =>
          COLORS[c] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS[c]} />
          ) : null
        )
      )}
    </svg>
  );
}
