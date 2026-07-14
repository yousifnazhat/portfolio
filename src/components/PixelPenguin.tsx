// PenPal's mascot — a chunky pixel penguin (Pengu-inspired pose), mapped to the
// portfolio palette: ink body, cream belly bib, orange beak + feet, warm rim
// light from the upper-left. Rendered as crisp SVG rects, matching PixelJet.
const ROWS = [
  "..............HXH.............",
  "..............HXX.............",
  "..........HHHHXXXHHH..........",
  "........HHXXXXXXXXXXHH........",
  ".......HXXXXXXXXXXXXXXH.......",
  "......HXXXXXXXXXXXXXXXXH......",
  ".....HXXXXEEEXXXXEEEXXXXH.....",
  "....HXXXXEGUUEXXEGUUEXXXXH....",
  "....HXXXXEUUUEXXEUUUEXXXXX....",
  "...HXXXXXEEUEEXXEEUEEXXXXXH...",
  "...HXXXXXXEEEXXXXEEEXXXXXXX...",
  "...HXXXXXXXXXXOOXXXXXXXXXXX...",
  "...HXXXXXXPPPOOOOPPPXXXXXXX...",
  "...HXXXXPPPPPPOOPPPPPPXXXXX...",
  "...HXXXPPPPPPPPPPPPPPPPXXXX...",
  "...HXXXPPPPPPPPPPPPPPPPXXXX...",
  "....HXPPPPPPPPPPPPPPPPPPXX....",
  "....HXPPPPPPPPPPPPPPPPPPXX....",
  "....HXXPPPPPPPPPPPPPPPPXXX....",
  ".....HXPPPPPPPPPPPPPPPPXX.....",
  "......HXPPPPPPPPPPPPPPXX......",
  "......HXPPPPPPPPPPPPPPXX......",
  ".......HXPPPPPPPPPPPPXX.......",
  "........HXPPPPPPPPPPXX........",
  ".........HXXPPPPPPXXX.........",
  "..........HXXXXXXXXX..........",
  "...........HXXXXXXX...........",
  "............HXXXXX............",
  ".............HXXX.............",
  ".........OOOOO..OOOOO.........",
  ".........OOOOO..OOOOO.........",
  "..........OOO....OOO..........",
  "..............................",
];

const COLORS: Record<string, string> = {
  X: "var(--ink)",
  H: "#4a4433", // rim light — edges facing the upper-left light source
  P: "#f3f0e6", // cream belly bib (lighter than the paper page for contrast)
  E: "#f5f2e9", // eye white
  U: "var(--ink)", // pupil
  G: "#fffdf6", // catch-light glint
  O: "var(--gold)", // beak + feet
};

const W = ROWS[0].length;
const H = ROWS.length;
const PAD = 3;

const TICK = 2.6;
const TICK_W = 0.45;
const TICK_COLOR = "rgba(21, 20, 15, 0.35)";

export default function PixelPenguin() {
  return (
    <svg
      className="pixel-pengu"
      viewBox={`${-PAD} ${-PAD} ${W + PAD * 2} ${H + PAD * 2}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="PenPal mascot — a pixel-art penguin"
    >
      {/* corner registration ticks — matches the hero jet's spec-plate framing */}
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

      {/* soft drop shadow — lifts the mascot off the paper */}
      <g transform="translate(1.2 1.8)" opacity="0.1" fill="var(--ink)">
        {ROWS.flatMap((row, y) =>
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
