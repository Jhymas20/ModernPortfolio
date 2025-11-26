const sharp = require('sharp');
const fs = require('fs');

async function optimizeImage() {
  const imagePath = 'public/Me/homeMeNoBackground.png';
  const outputPath = 'public/Me/homeMeNoBackground.webp';

  if (!fs.existsSync(imagePath)) {
    console.log('❌ File not found:', imagePath);
    return;
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
    console.log(`  ${originalSize}KB → ${newSize}KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${imagePath}:`, error.message);
  }
}

optimizeImage().catch(console.error);
