import { competitions, competitionStudies } from "../../../data/portfolioData";
import { renderOg, OG_SIZE } from "../../og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "CTF competition — Yousif Nazhat";

export function generateStaticParams() {
  return competitions
    .filter((c) => c.id && competitionStudies[c.id])
    .map((c) => ({ id: c.id as string }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = competitions.find((x) => x.id === id);
  const s = competitionStudies[id];
  return renderOg({
    eyebrow: `CTF · ${(c?.org ?? "Competition").toUpperCase()}`,
    title: (c?.name ?? "Competition").toUpperCase(),
    sub: s
      ? `${s.placement} · ${s.solved} solved · ${s.points} pts · team ${s.team}`
      : "",
  });
}
