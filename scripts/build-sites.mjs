import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const publicRoot = join(dist, "server", "public");

const staticFiles = [
  "index.html",
  "index-en.html",
  "monteure.html",
  "installers.html",
  "staticwebapp.config.json",
  "GEAR CARRIER VW T6.1 .png",
  "assets/hero-van-no-mtb-final.jpg",
  "assets/skep-detail-alps.jpg",
  "assets/skep-van-alps.jpg",
  "assets/skep-v11-ford-transit-custom.png",
  "assets/skep-v11-renault-trafic.png",
  "assets/skep-v11-van-configurator.png",
  "assets/skep-v11-vw-t6.png",
  "assets/two-vans-workshop-yard-anonymized.jpg",
  "assets/van-on-lift.jpg",
  "assets/van-side-gear-carrier-anonymized.jpg",
  "public/screenshot.jpeg",
];

async function copyIntoPublic(relativePath) {
  const from = join(root, relativePath);
  const to = join(publicRoot, relativePath);
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to);
}

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "server"), { recursive: true });

await cp(join(root, "worker", "index.js"), join(dist, "server", "index.js"));

for (const file of staticFiles) {
  await copyIntoPublic(file);
}

