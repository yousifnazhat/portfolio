import * as si from "simple-icons";
import { writeFileSync, mkdirSync } from "node:fs";

const slugs = [
  "python", "typescript", "javascript", "cplusplus", "php",
  "metasploit", "kalilinux", "wireshark", "burpsuite",
  "pytorch", "react", "nextdotjs", "nodedotjs",
  "docker", "vercel", "git", "linux",
  "postgresql", "supabase", "elasticsearch", "stripe",
];

mkdirSync("public/icons", { recursive: true });
const gold = "#c9a24c";
const ok = [];
const miss = [];

for (const slug of slugs) {
  const key = "si" + slug[0].toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon || !icon.path) {
    miss.push(slug);
    continue;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${gold}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
  writeFileSync(`public/icons/${slug}.svg`, svg);
  ok.push(slug);
}

console.log("OK (" + ok.length + "):", ok.join(", "));
console.log("MISSING:", miss.join(", ") || "none");
