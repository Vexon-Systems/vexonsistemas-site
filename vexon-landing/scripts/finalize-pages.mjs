import { copyFileSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

// Next's segment filenames use dots in exported URLs. Some Windows exports
// retain backslash-derived subdirectories instead. Emit the expected aliases
// without changing correctly generated files on Linux/Cloudflare.
function normalizeSegments(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      const copySegments = (current) => {
        for (const segment of readdirSync(current, { withFileTypes: true })) {
          const source = join(current, segment.name);
          if (segment.isDirectory()) copySegments(source);
          else
            copyFileSync(
              source,
              join(directory, entry.name + "." + relative(child, source).split(sep).join(".")),
            );
        }
      };
      copySegments(child);
    } else if (entry.name !== "_next") normalizeSegments(child);
  }
}
normalizeSegments(resolve("out"));

// Retain source photographs in public, but do not ship unused multi-megabyte
// originals alongside the WebP assets used by the exported site.
for (const relative of [
  "assets/close-up-people-working-office.jpg",
  "assets/hero/vexon-team-working.jpg",
]) {
  const file = resolve("out", relative);
  if (existsSync(file)) unlinkSync(file);
}
for (const required of [
  "index.html",
  "404.html",
  "_headers",
  "_routes.json",
  "sitemap.xml",
  "robots.txt",
  "opengraph-image",
]) {
  if (!existsSync(resolve("out", required))) throw new Error(`Pages export is missing ${required}`);
}
console.log("Pages export verified: static pages, security headers and Function routing.");
