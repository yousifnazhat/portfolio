import { collection } from "../../../data/portfolioData";
import { renderOg, OG_SIZE } from "../../og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study — Yousif Nazhat";

export function generateStaticParams() {
  return collection.map((a) => ({ id: a.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const a = collection.find((x) => x.id === id);
  return renderOg({
    eyebrow: a ? `${a.no} · ${a.category}`.toUpperCase() : "CASE STUDY",
    title: (a?.title ?? "Case Study").toUpperCase(),
    sub: a?.blurb ?? "",
  });
}
