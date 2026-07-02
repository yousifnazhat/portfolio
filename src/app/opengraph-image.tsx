import { renderOg, OG_SIZE } from "./og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Yousif Nazhat — Offensive Security Engineer";

export default function Image() {
  return renderOg({
    eyebrow: "OFFENSIVE SECURITY ENGINEER",
    title: "YOUSIF NAZHAT",
    sub: "Offensive-security engineer who designs — red team, security tooling, and a little hardware.",
  });
}
