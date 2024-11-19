import { createCanvas } from "canvas";
import fs, { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { dir } from "node:console";
const name = process.argv[2];
const desc = process.argv[3];
const tech = process.argv[4];

const canvas = createCanvas(300, 150);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#1a1a2e";
ctx.fillRect(0, 0, 300, 150);

//title
ctx.fillStyle = "#ff3366";
ctx.font = "bold 18px Arial";
ctx.fillText(name, 20, 40);

//description
if (desc) {
  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial";
  ctx.fillText(desc, 20, 60, 260);
}
// Details
if (tech) {
  ctx.font = "12px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(tech, 20, 110);
}
//create path
const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);
const folderPath = join(directory, "images");
if (!existsSync(folderPath)) {
  mkdirSync(folderPath, { recursive: true });
}
const outputPath = join(folderPath, `${name}.png`);
// save
const out = fs.createWriteStream(outputPath);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => console.log("card created"));
