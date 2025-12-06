const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const quality = parseInt(args.find(arg => arg.startsWith('--quality='))?.split('=')[1] || '85');
const format = args.find(arg => arg.startsWith('--format='))?.split('=')[1] || 'webp';
const recursive = args.includes('--recursive');
const paths = args.filter(arg => !arg.startsWith('--'));

async function optimizeImage(imagePath, outputFormat, quality) {
  if (!fs.existsSync(imagePath)) {
    console.log(`⚠️  Skipping ${imagePath} - file not found`);
    return;
  }

  const ext = path.extname(imagePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    console.log(`⚠️  Skipping ${imagePath} - not a supported image format`);
    return;
  }

  const outputPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, `.${outputFormat}`);

  // Skip if already optimized
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${imagePath} - already optimized`);
    return;
  }

  const stats = fs.statSync(imagePath);
  const originalSize = (stats.size / 1024).toFixed(2);

  try {
    await sharp(imagePath)
      [outputFormat]({ quality })
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

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

async function processPath(inputPath, outputFormat, quality, recursive) {
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Path not found: ${inputPath}`);
    return;
  }

  const stats = fs.statSync(inputPath);

  if (stats.isFile()) {
    await optimizeImage(inputPath, outputFormat, quality);
  } else if (stats.isDirectory() && recursive) {
    const files = getFilesRecursively(inputPath);
    for (const file of files) {
      await optimizeImage(file, outputFormat, quality);
    }
  } else if (stats.isDirectory()) {
    console.log(`⚠️  ${inputPath} is a directory. Use --recursive flag to process subdirectories.`);
  }
}

async function main() {
  if (paths.length === 0) {
    console.log('Usage: node scripts/optimize.js <path> [options]');
    console.log('\nOptions:');
    console.log('  --quality=<1-100>    Output quality (default: 85)');
    console.log('  --format=<webp|avif|jpg>  Output format (default: webp)');
    console.log('  --recursive          Process directories recursively');
    console.log('\nExamples:');
    console.log('  node scripts/optimize.js public/image.png');
    console.log('  node scripts/optimize.js public/Projects/NewProject/ --recursive');
    console.log('  node scripts/optimize.js public/hero.jpg --quality=90 --format=avif');
    return;
  }

  console.log(`Starting image optimization...\n`);
  console.log(`Format: ${format}, Quality: ${quality}\n`);

  for (const inputPath of paths) {
    await processPath(inputPath, format, quality, recursive);
  }

  console.log('Image optimization complete!');
}

main().catch(console.error);
