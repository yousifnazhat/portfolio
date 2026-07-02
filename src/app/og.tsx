// Shared Open Graph image template — brutalist paper/ink/orange, Space Mono.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#e4dfd1";
const INK = "#15140f";
const ORANGE = "#ff5a1f";
const MUTED = "#514c40";
const GREEN = "#2f8f5a";

export async function renderOg({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  const spaceMono = await readFile(
    join(process.cwd(), "src/app/fonts/SpaceMono-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "Space Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 54px",
            borderBottom: `3px solid ${INK}`,
            fontSize: 24,
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ display: "flex" }}>
            YN<span style={{ color: ORANGE }}>_</span>
          </span>
          <span>{eyebrow}</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 54px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: title.length > 16 ? 68 : 92,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            <span>{title}</span>
            <span style={{ color: ORANGE }}>_</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 26,
              color: MUTED,
              maxWidth: 920,
              lineHeight: 1.45,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 54px",
            borderTop: `3px solid ${INK}`,
            fontSize: 20,
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                backgroundColor: GREEN,
                marginRight: 14,
              }}
            />
            AVAILABLE FOR WORK_
          </span>
          <span style={{ color: ORANGE }}>yousifsportfolio.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Space Mono", data: spaceMono, style: "normal", weight: 700 }],
    }
  );
}
