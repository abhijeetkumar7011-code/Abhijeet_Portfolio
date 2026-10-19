// Usage:  node scripts/remove-bg.mjs public/profile.png public/profile-cutout.png
// One-time setup:  npm i -D @imgly/background-removal-node
import { removeBackground } from "@imgly/background-removal-node";
import fs from "node:fs";
import path from "node:path";

const [input = "public/profile.png", output = "public/profile-cutout.png"] = process.argv.slice(2);
const blob = await removeBackground("file://" + path.resolve(input), { output: { format: "image/png" } });
fs.writeFileSync(output, Buffer.from(await blob.arrayBuffer()));
console.log("Saved:", output);
