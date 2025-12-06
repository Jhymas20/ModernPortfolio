# Image Optimization Scripts

## optimize.js

Generic image optimizer using Sharp library for converting and compressing images to modern formats like WebP and AVIF.

### Usage

**Basic (single file):**
```bash
node scripts/optimize.js <path-to-image>
```

**Directory (recursive):**
```bash
node scripts/optimize.js <directory-path> --recursive
```

**Custom quality:**
```bash
node scripts/optimize.js <path> --quality=90
```

**Different format:**
```bash
node scripts/optimize.js <path> --format=avif
```

**Using NPM script:**
```bash
npm run optimize:images -- <path> [options]
```

### Options

- `--quality=<1-100>` - Output quality (default: 85)
- `--format=<webp|avif|jpg>` - Output format (default: webp)
- `--recursive` - Process directories recursively

### Examples

```bash
# Optimize a single image
node scripts/optimize.js public/Projects/NewProject/hero.png

# Optimize all images in a directory
node scripts/optimize.js public/Projects/NewProject/ --recursive

# Optimize with high quality
node scripts/optimize.js public/hero.jpg --quality=95 --format=webp

# Optimize all images in multiple directories
node scripts/optimize.js public/Projects/Project1/ --recursive
node scripts/optimize.js public/Projects/Project2/ --recursive

# Using NPM script
npm run optimize:images -- public/image.png
npm run optimize:images -- public/Projects/ --recursive --quality=90
```

### Features

- **Smart Skipping**: Automatically skips files that have already been optimized
- **Size Reporting**: Shows original size, new size, and percentage reduction
- **Error Handling**: Gracefully handles missing files and unsupported formats
- **Format Detection**: Automatically detects PNG, JPG, and JPEG files
- **Recursive Processing**: Can process entire directory trees with `--recursive` flag
- **No Additional Dependencies**: Uses only Sharp (already in devDependencies) and Node.js built-ins

### Dependencies

- `sharp` (v0.34.5) - Already installed in devDependencies
- No additional packages needed

### Supported Input Formats

- PNG (.png)
- JPEG (.jpg, .jpeg)

### Supported Output Formats

- WebP (.webp) - Default, excellent compression with good quality
- AVIF (.avif) - Next-gen format, even better compression
- JPEG (.jpg) - Standard format, good for photos
