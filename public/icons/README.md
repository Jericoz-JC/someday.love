# Icon Generation Guide

To generate proper icons from the logo.svg:

## Using ImageMagick (if available)
```bash
# Install ImageMagick if not available
# Ubuntu/Debian: sudo apt install imagemagick
# macOS: brew install imagemagick

# Generate icons
convert public/assets/logo.svg -resize 192x192 -background transparent public/icons/icon-192.png
convert public/assets/logo.svg -resize 512x512 -background transparent public/icons/icon-512.png
```

## Using online converter
1. Go to https://convertio.co/svg-png/ or similar
2. Upload public/assets/logo.svg
3. Convert to PNG at 192x192 and 512x512 sizes
4. Save as public/icons/icon-192.png and public/icons/icon-512.png

## Using Node.js (sharp)
```bash
npm install sharp
node -e "
const sharp = require('sharp');
sharp('public/assets/logo.svg')
  .resize(192, 192)
  .png()
  .toFile('public/icons/icon-192.png');
sharp('public/assets/logo.svg')
  .resize(512, 512) 
  .png()
  .toFile('public/icons/icon-512.png');
"
```

The logo should now display the official design throughout the app!