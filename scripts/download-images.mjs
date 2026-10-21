import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const local = p => fileURLToPath(new URL(p, import.meta.url));
const assets = JSON.parse((await fs.readFile(local("../docs/image-sources.json"), "utf8")).replace(/^\uFEFF/, ""));
await fs.mkdir(local("../public/images/"), { recursive: true });
for (const asset of assets) {
  const url = `https://images.pexels.com/photos/${asset.id}/pexels-photo-${asset.id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  const response = await fetch(url);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Image ${asset.name}: HTTP ${response.status}`);
  const image = sharp(Buffer.from(await response.arrayBuffer())).rotate();
  await image.resize({ width: asset.name === "hero" ? 1200 : asset.name === "audience" ? 1440 : 960, withoutEnlargement: true }).webp({ quality: 82 }).toFile(local(`../public/images/${asset.name}.webp`));
  console.log(asset.name, (await image.metadata()).width);
}
const tiles = await Promise.all(assets.map(async (a, i) => ({input: await sharp(local(`../public/images/${a.name}.webp`)).resize(320,200,{fit:"cover"}).toBuffer(),left:(i%2)*320,top:Math.floor(i/2)*200})));
await sharp({create:{width:640,height:Math.ceil(assets.length/2)*200,channels:3,background:"#ffffff"}}).composite(tiles).png().toFile(local("../docs/image-contact-sheet.png"));


