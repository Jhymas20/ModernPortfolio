const sharp = require('sharp');
const fs = require('fs');

const imagesToOptimize = [
  'public/Projects/Cybercodex.io/community.png',
  'public/Projects/Cybercodex.io/courses.png',
  'public/Projects/Cybercodex.io/dashboard.png',
  'public/Projects/Cybercodex.io/homepage.png',
];

async function optimizeImages() {
  console.log('Starting CyberCodex.io image optimization...\n');

  for (const imagePath of imagesToOptimize) {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Skipping ${imagePath} - file not found`);
      continue;
    }

    const outputPath = imagePath.replace(/\.png$/i, '.webp');
    const stats = fs.statSync(imagePath);
    const originalSize = (stats.size / 1024).toFixed(2);

    try {
      await sharp(imagePath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

      console.log(`✓ ${imagePath}`);
      console.log(`  ${originalSize}KB → ${newSize}KB (${savings}% reduction)\n`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${imagePath}:`, error.message);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
