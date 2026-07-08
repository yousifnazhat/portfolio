// Pixel-art F-22 Raptor (top-down) with afterburner plumes and a flare fan,
// rendered as crisp SVG rects. Palette maps to the theme variables:
// X = ink, M = muted (fuselage spine), O = orange, L = light orange, Y = pale.
const ROWS = [
  "................X................",
  "................X................",
  "...............XXX...............",
  "...............XXX...............",
  "..............XXXXX..............",
  "..............XXXXX..............",
  ".............XXOOOXX.............",
  ".............XXOOOXX.............",
  ".............XXOOOXX.............",
  "............XXXXMXXXX............",
  "............XXXXMXXXX............",
  "............XXXXMXXXX............",
  "...........XXXXXMXXXXX...........",
  "...........XXXXXMXXXXX...........",
  "..........XXXXXXMXXXXXX..........",
  ".........XXXXXXXMXXXXXXX.........",
  "........XXXXXXXXMXXXXXXXX........",
  ".......XXXXXXXXXMXXXXXXXXX.......",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  ".....XXXXXXXXXXXMXXXXXXXXXXX.....",
  "....XXXXXXXXXXXXMXXXXXXXXXXXX....",
  "...XXXXXXXXXXXXXMXXXXXXXXXXXXX...",
  "..XXXXXXXXXXXXXXMXXXXXXXXXXXXXX..",
  ".XXXXXXXXXXXXXXXMXXXXXXXXXXXXXXX.",
  "XXXXXXXXXXXXXXXXMXXXXXXXXXXXXXXXX",
  "..XXXXXXXXXXXXXXMXXXXXXXXXXXXXX..",
  "....XXXXXXXXXXXXMXXXXXXXXXXXX....",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  "........XXXXXXXXMXXXXXXXX........",
  "..........XXXXXXMXXXXXX..........",
  "........XX.XXXXXMXXXXX.XX........",
  ".......XXX..XXXXMXXXX..XXX.......",
  ".......XXXXXXXXXMXXXXXXXXX.......",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  "......XXXXXXXXXXMXXXXXXXXXX......",
  ".........XXXXXXXXXXXXXXX.........",
  "............XXXXXXXXX............",
  "..............XX.XX..............",
  "..............XX.XX..............",
  "..............OO.OO..............",
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
