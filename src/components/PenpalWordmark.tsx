// PENPAL pixel-block wordmark — echoes PenPal's V1 startup art (blocky letters
// threaded with circuit traces), remapped to the terminal card's palette:
// cream tiles, orange "wire" traces, on the dark card background.
const GLYPHS: Record<string, string[]> = {
  P: ["####", "#..#", "#..#", "####", "#...", "#...", "#..."],
  E: ["####", "#...", "#...", "###.", "#...", "#...", "####"],
  N: ["#..#", "##.#", "##.#", "#.##", "#.##", "#..#", "#..#"],
  A: [".##.", "#..#", "#..#", "####", "#..#", "#..#", "#..#"],
  L: ["#...", "#...", "#...", "#...", "#...", "#...", "####"],
};

const WORD = "PENPAL";
const LW = 4; // letter width
const GAP = 2; // gap between letters
const ROWS = 7;
const W = WORD.length * LW + (WORD.length - 1) * GAP; // total grid width
const TRACE_Y = ROWS + 1; // orange circuit trace sits below the letters
const H = TRACE_Y + 2;

const CREAM = "#ece8db";
const CREAM_DIM = "#b9b3a2";
const ORANGE = "#ff5a1f";

type Cell = { x: number; y: number; fill: string };

function build(): Cell[] {
  const cells: Cell[] = [];
  const lit = new Set<string>(); // baseline anchor per letter for the trace stubs
  WORD.split("").forEach((ch, li) => {
    const g = GLYPHS[ch];
    const ox = li * (LW + GAP);
    g.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c !== "#") return;
        // a sparse deterministic scatter of dim tiles gives the "assembled from
        // tiles" texture of the source art without leaving the palette
        const fill = (x * 3 + y * 7 + li * 5) % 9 === 0 ? CREAM_DIM : CREAM;
        cells.push({ x: ox + x, y, fill });
      })
    );
    // one lit orange node at each letter's baseline, wired to the trace
    lit.add(`${ox + 1}`);
  });
  // horizontal orange circuit trace + a vertical stub up to each letter
  for (let x = 0; x < W; x++) cells.push({ x, y: TRACE_Y, fill: ORANGE });
  lit.forEach((sx) => cells.push({ x: Number(sx), y: ROWS, fill: ORANGE }));
  return cells;
}

const CELLS = build();

export default function PenpalWordmark() {
  return (
    <svg
      className="penpal-wordmark"
      viewBox={`-1 -1 ${W + 2} ${H + 1}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="PenPal"
    >
      {CELLS.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill={c.fill} />
      ))}
    </svg>
  );
}
