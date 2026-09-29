import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve(process.cwd(), 'public/tcdd-logo.svg');
const publicDir = path.resolve(process.cwd(), 'public');
const svgBuffer = fs.readFileSync(svgPath);

// Also copy to icon.svg
fs.copyFileSync(svgPath, path.join(publicDir, 'icon.svg'));

async function renderIcons() {
  console.log('Rendering high-res icons from SVG with Sharp...');

  // 192x192 PNG
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  // 512x512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  // 512x512 maskable (with subtle padding)
  await sharp(svgBuffer)
    .resize(460, 460)
    .extend({
      top: 26,
      bottom: 26,
      left: 26,
      right: 26,
      background: { r: 12, g: 22, b: 48, alpha: 1 }
    })
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  // 180x180 Apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('All icons successfully rendered to /public');
}

renderIcons().catch(err => {
  console.error('Error rendering icons:', err);
  process.exit(1);
});
