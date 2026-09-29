import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const outputDir = resolve("out");
const templatePath = resolve("scripts/sw-template.js");
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath.replace(/\/$/, "");

if (basePath && (!basePath.startsWith("/") || basePath.includes(".."))) {
  throw new Error(`Invalid NEXT_PUBLIC_BASE_PATH: ${rawBasePath}`);
}
if (!existsSync(join(outputDir, "index.html")) || !existsSync(join(outputDir, "manifest.webmanifest"))) {
  throw new Error("Run the Next.js static build before generating the service worker.");
}

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

const allowedExtensions = /\.(?:html|js|css|png|svg|webp|woff2?|webmanifest|ico)$/i;
const files = listFiles(outputDir)
  .filter((file) => allowedExtensions.test(file) && !file.endsWith(`${sep}sw.js`))
  .sort();
const urls = files.map((file) => `${basePath}/${relative(outputDir, file).split(sep).join("/")}`);
const appUrl = `${basePath}/`;
urls.unshift(appUrl);

const hash = createHash("sha256");
for (const file of files) {
  hash.update(relative(outputDir, file));
  hash.update(readFileSync(file));
}
const cacheName = `fe-assistant-${hash.digest("hex").slice(0, 12)}`;

const serviceWorker = readFileSync(templatePath, "utf8")
  .replace("__CACHE_NAME__", cacheName)
  .replace("__APP_URL__", appUrl)
  .replace("__PRECACHE_URLS__", JSON.stringify(urls));
writeFileSync(join(outputDir, "sw.js"), serviceWorker);
console.log(`PWA service worker generated: ${urls.length} cached files (${cacheName}).`);
