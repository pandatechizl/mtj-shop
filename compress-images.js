import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "assets/raw-images";
const outputDir = "assets/images";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, ".webp"));

    await sharp(inputPath)
      .resize({ width: 1200 }) // Resize to max 1200px width (optional)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Compressed: ${file} → ${path.basename(outputPath)}`);
  }

  console.log("\n🎉 All done! Compressed images are in:", outputDir);
})();
