// Pixel-art F-22 Raptor (top-down), rendered as crisp SVG rects.
// Palette: X = ink, O = orange accent (canopy / afterburners).
const ROWS = [
  "..........X..........",
  "..........X..........",
  ".........XXX.........",
  ".........XXX.........",
  "........XXXXX........",
  "........XOOOX........",
  "........XOOOX........",
  ".......XXXXXXX.......",
  ".......XXXXXXX.......",
  "......XXXXXXXXX......",
  ".....XXXXXXXXXXX.....",
  "...XXXXXXXXXXXXXXX...",
  ".XXXXXXXXXXXXXXXXXXX.",
  "XXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXX",
  ".XXXX.XXXXXXXXX.XXXX.",
  "..XX...XXXXXXX...XX..",
  ".......XXXXXXX.......",
  "....X..XXXXXXX..X....",
  "...XXX.XXXXXXX.XXX...",
  "..XXXXXXXXXXXXXXXXX..",
  "...XXX..XXXXX..XXX...",
  "........XX.XX........",
  ".........O.O.........",
  ".........O.O.........",
];

const COLORS: Record<string, string> = {
  X: "var(--ink)",
  O: "var(--gold)",
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
      aria-label="Pixel art of an F-22 Raptor"
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
