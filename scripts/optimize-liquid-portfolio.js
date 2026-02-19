const sharp = require('sharp');
const fs = require('fs');
const { execSync } = require('child_process');

const imagesToOptimize = [
  'public/Projects/LiquidPortfolio/me.png',
  'public/Projects/LiquidPortfolio/projects.png',
  'public/Projects/LiquidPortfolio/projects2.png',
  'public/Projects/LiquidPortfolio/contact.png',
  'public/Projects/LiquidPortfolio/skills.png',
];

const videosToConvert = [
  'public/Projects/LiquidPortfolio/homePage.mov',
  'public/Projects/LiquidPortfolio/homepageAnimation.mov',
];

async function optimizeImages() {
  console.log('Starting Liquid Portfolio image optimization...\n');

  for (const imagePath of imagesToOptimize) {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Skipping ${imagePath} - file not found`);
      continue;
    }

    const outputPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${imagePath} - already optimized`);
      continue;
    }

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
}

function convertVideos() {
  console.log('Starting Liquid Portfolio video conversion...\n');

  for (const videoPath of videosToConvert) {
    if (!fs.existsSync(videoPath)) {
      console.log(`⚠️  Skipping ${videoPath} - file not found`);
      continue;
    }

    const outputPath = videoPath.replace(/\.mov$/i, '.mp4');

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${videoPath} - already converted`);
      continue;
    }

    const stats = fs.statSync(videoPath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);

    try {
      execSync(
        `ffmpeg -i "${videoPath}" -vcodec h264 -acodec aac -movflags +faststart "${outputPath}"`,
        { stdio: 'inherit' }
      );

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

      console.log(`✓ ${videoPath}`);
      console.log(`  ${originalSize}MB → ${newSize}MB (${savings}% reduction)\n`);
    } catch (error) {
      console.error(`✗ Failed to convert ${videoPath}:`, error.message);
    }
  }
}

async function main() {
  await optimizeImages();
  convertVideos();
  console.log('Liquid Portfolio optimization complete!');
}

main().catch(console.error);
