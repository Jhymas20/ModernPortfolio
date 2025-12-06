const { optimize } = require('svgo');
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// SVGO configuration optimized for web performance
const svgoConfig = {
  multipass: true, // Run optimizations multiple times for better results
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox for proper scaling
          removeViewBox: false,
          // Keep dimensions if specified
          removeDimensions: false,
        },
      },
    },
    // Remove unnecessary metadata
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    // Optimize paths
    'convertPathData',
    'mergePaths',
    'convertShapeToPath',
    // Clean up attributes
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'removeUnusedNS',
    'cleanupIds',
    // Optimize colors
    'minifyStyles',
    'convertColors',
    // Remove hidden elements
    'removeHiddenElems',
  ],
};

// Parse CLI arguments
const args = process.argv.slice(2);
const paths = args.filter(arg => !arg.startsWith('--'));

if (paths.length === 0) {
  console.log('Usage: node scripts/optimize-svg.js <path-to-svg-file-or-directory>');
  console.log('Examples:');
  console.log('  node scripts/optimize-svg.js public/icons/skills/');
  console.log('  node scripts/optimize-svg.js public/icons/skills/react.svg');
  console.log('  node scripts/optimize-svg.js "public/icons/**/*.svg"');
  process.exit(1);
}

async function optimizeSVG(svgPath) {
  if (!fs.existsSync(svgPath)) {
    console.log(`⚠️  Skipping ${svgPath} - file not found`);
    return;
  }

  const ext = path.extname(svgPath).toLowerCase();
  if (ext !== '.svg') {
    console.log(`⚠️  Skipping ${svgPath} - not an SVG file`);
    return;
  }

  try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const stats = fs.statSync(svgPath);
    const originalSize = (stats.size / 1024).toFixed(2);

    // Optimize the SVG
    const result = optimize(svgContent, {
      path: svgPath,
      ...svgoConfig,
    });

    // Write optimized SVG back to the same file
    fs.writeFileSync(svgPath, result.data);

    const newStats = fs.statSync(svgPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

    console.log(`✓ ${svgPath}`);
    console.log(`  ${originalSize}KB → ${newSize}KB (${savings}% reduction)\n`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${svgPath}:`, error.message);
  }
}

async function processPath(targetPath) {
  const stats = fs.existsSync(targetPath) ? fs.statSync(targetPath) : null;

  if (!stats) {
    // Try as a glob pattern
    const files = globSync(targetPath);
    if (files.length === 0) {
      console.log(`⚠️  No files found matching: ${targetPath}`);
      return;
    }
    for (const file of files) {
      await optimizeSVG(file);
    }
  } else if (stats.isDirectory()) {
    // Process all SVG files in directory
    const files = globSync(`${targetPath}/**/*.svg`);
    if (files.length === 0) {
      console.log(`⚠️  No SVG files found in: ${targetPath}`);
      return;
    }
    console.log(`Found ${files.length} SVG file(s) to optimize\n`);
    for (const file of files) {
      await optimizeSVG(file);
    }
  } else if (stats.isFile()) {
    // Process single file
    await optimizeSVG(targetPath);
  }
}

async function main() {
  console.log('🎨 SVG Optimizer\n');

  for (const targetPath of paths) {
    await processPath(targetPath);
  }

  console.log('✨ SVG optimization complete!');
}

main();
