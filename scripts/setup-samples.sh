#!/bin/bash
#
# Setup script to copy and rename sample images from Samples/ to public/samples/
# This only needs to be run once, then use convert-samples-to-webp.sh for WebP conversion.
#
# Usage: bash scripts/setup-samples.sh
#

set -e

cd "$(dirname "$0")/.."
echo "📁 Working directory: $(pwd)"

# Create directories
echo "📂 Creating directories..."
mkdir -p public/samples/drowsy/after
mkdir -p public/samples/growpro/after
mkdir -p public/samples/homehive/after
mkdir -p public/samples/kanso-living/after
mkdir -p public/samples/lillyhome/after-1
mkdir -p public/samples/lillyhome/after-2
mkdir -p public/samples/masthal/after
mkdir -p public/samples/mesh-mesh/after
mkdir -p public/samples/nota-inspired-perfumes/after
mkdir -p public/samples/rustic/after
mkdir -p public/samples/tajaleyat/after

echo ""
echo "📸 Copying and renaming images..."

# Drowsy
if [ -f "Samples/Drowsy/before-1.webp" ]; then
  cp "Samples/Drowsy/before-1.webp" "public/samples/drowsy/before.webp"
  echo "  ✓ Drowsy before"
fi
i=1
for f in Samples/Drowsy/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/drowsy/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Drowsy after ($((i-1)) files)"

# Growpro
if [ -f "Samples/Growpro/before-1.png" ]; then
  cp "Samples/Growpro/before-1.png" "public/samples/growpro/before.png"
  echo "  ✓ Growpro before"
fi
i=1
for f in Samples/Growpro/After/*.jpg; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/growpro/after/$(printf '%02d' $i).jpg"
    ((i++))
  fi
done
echo "  ✓ Growpro after ($((i-1)) files)"

# Homehive
if [ -f "Samples/Homehive/before-1.webp" ]; then
  cp "Samples/Homehive/before-1.webp" "public/samples/homehive/before.webp"
  echo "  ✓ Homehive before"
fi
i=1
for f in Samples/Homehive/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/homehive/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Homehive after ($((i-1)) files)"

# Kanso Living
if [ -f "Samples/Kanso living/before-1.png" ]; then
  cp "Samples/Kanso living/before-1.png" "public/samples/kanso-living/before.png"
  echo "  ✓ Kanso Living before"
fi
i=1
for f in "Samples/Kanso living/After/"*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/kanso-living/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Kanso Living after ($((i-1)) files)"

# Lillyhome (2 chapters)
if [ -f "Samples/Lillyhome/Before 1.jpg" ]; then
  cp "Samples/Lillyhome/Before 1.jpg" "public/samples/lillyhome/before-1.jpg"
  echo "  ✓ Lillyhome before-1"
fi
if [ -f "Samples/Lillyhome/before-2.jpg" ]; then
  cp "Samples/Lillyhome/before-2.jpg" "public/samples/lillyhome/before-2.jpg"
  echo "  ✓ Lillyhome before-2"
fi
i=1
for f in "Samples/Lillyhome/After 1/"*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/lillyhome/after-1/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Lillyhome after-1 ($((i-1)) files)"
i=1
for f in "Samples/Lillyhome/After 2/"*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/lillyhome/after-2/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Lillyhome after-2 ($((i-1)) files)"

# Masthal
if [ -f "Samples/Masthal/before-1.webp" ]; then
  cp "Samples/Masthal/before-1.webp" "public/samples/masthal/before.webp"
  echo "  ✓ Masthal before"
fi
i=1
for f in Samples/Masthal/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/masthal/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Masthal after ($((i-1)) files)"

# Mesh-mesh
if [ -f "Samples/Mesh-mesh/before-1.png" ]; then
  cp "Samples/Mesh-mesh/before-1.png" "public/samples/mesh-mesh/before.png"
  echo "  ✓ Mesh-mesh before"
fi
i=1
for f in Samples/Mesh-mesh/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/mesh-mesh/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Mesh-mesh after ($((i-1)) files)"

# Nota-inspired-perfumes
if [ -f "Samples/Nota-inspired-perfumes/before.webp" ]; then
  cp "Samples/Nota-inspired-perfumes/before.webp" "public/samples/nota-inspired-perfumes/before.webp"
  echo "  ✓ Nota before"
fi
i=1
for f in Samples/Nota-inspired-perfumes/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/nota-inspired-perfumes/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Nota after ($((i-1)) files)"

# Rustic
if [ -f "Samples/Rustic/Screenshot 2025-12-23 at 10.39.57 PM.png" ]; then
  cp "Samples/Rustic/Screenshot 2025-12-23 at 10.39.57 PM.png" "public/samples/rustic/before.png"
  echo "  ✓ Rustic before"
fi
i=1
for f in Samples/Rustic/after/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/rustic/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Rustic after ($((i-1)) files)"

# Tajaleyat
if [ -f "Samples/tajaleyat/before-1.webp" ]; then
  cp "Samples/tajaleyat/before-1.webp" "public/samples/tajaleyat/before.webp"
  echo "  ✓ Tajaleyat before"
fi
i=1
for f in Samples/tajaleyat/After/*.png; do
  if [ -f "$f" ]; then
    cp "$f" "public/samples/tajaleyat/after/$(printf '%02d' $i).png"
    ((i++))
  fi
done
echo "  ✓ Tajaleyat after ($((i-1)) files)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Sample images copied and renamed!"
echo ""
echo "Next step: Run WebP conversion"
echo "  npm run samples:webp"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"


