// Pixel-art F-22 Raptor (top-down) with afterburner plumes and a flare fan,
// rendered as crisp SVG rects. Palette maps to the theme variables:
// X = ink, M = muted (fuselage spine), O = orange, L = light orange, Y = pale.
const ROWS = [
  "................X................",
  "................X................",
  "...............XXX...............",
  "...............XXX...............",
  "..............XXXXX..............",
  "..............XOOOX..............",
  "..............XOOOX..............",
  ".............XXXXXXX.............",
  ".............XXXMXXX.............",
  "............XXXXMXXXX............",
  "...........XXXXXMXXXXX...........",
  ".........XXXXXXXMXXXXXXX.........",
  ".......XXXXXXXXXMXXXXXXXXX.......",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  ".......XXXX.XXXXMXXXX.XXXX.......",
  "........XX...XXXMXXX...XX........",
  ".............XXXXXXX.............",
  "..........X..XXXXXXX..X..........",
  ".........XXX.XXXXXXX.XXX.........",
  "........XXXXXXXXXXXXXXXXX........",
  ".........XXX..XXXXX..XXX.........",
  "..............XX.XX..............",
  ".............O.O.O.O.............",
  "............O..O.O..O............",
  "...........L...L.L...L...........",
  "..........L....L.L....L..........",
  ".........Y.....Y.Y.....Y.........",
  "........Y..LL...Y...LL..Y........",
  ".........LL.....Y.....LL.........",
  ".......YY...............YY.......",
];

const COLORS: Record<string, string> = {
  X: "var(--ink)",
  M: "var(--muted)",
  O: "var(--gold)",
  L: "var(--gold-l)",
  Y: "var(--gold-pale)",
};

const W = ROWS[0].length;
const H = ROWS.length;

export default function PixelJet() {
  return (
    <svg
      className="pixel-jet"
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel art of an F-22 Raptor deploying flares"
    >
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
