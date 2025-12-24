#!/bin/bash
# Copy and rename all sample images to public/samples/
set -e
cd "$(dirname "$0")/.."

echo "📁 Working directory: $(pwd)"
echo ""

# Create all directories
echo "📂 Creating directories..."
mkdir -p public/samples/anetos/after
mkdir -p public/samples/woodstreet/after
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
echo "📸 Copying images..."

# Anetos (note: folder has trailing space)
echo "  → Anetos"
cp "Samples/Anetos /before-1.jpg" public/samples/anetos/before.jpg 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Anetos /After/"*; do [ -f "$f" ] && cp "$f" "public/samples/anetos/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Woodstreet
echo "  → Woodstreet"
cp "Samples/Woodstreet/before.png" public/samples/woodstreet/before.png 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Woodstreet/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/woodstreet/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Drowsy
echo "  → Drowsy"
cp "Samples/Drowsy/before-1.webp" public/samples/drowsy/before.webp 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Drowsy/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/drowsy/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Growpro
echo "  → Growpro"
cp "Samples/Growpro/before-1.png" public/samples/growpro/before.png 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Growpro/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/growpro/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Homehive
echo "  → Homehive"
cp "Samples/Homehive/before-1.webp" public/samples/homehive/before.webp 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Homehive/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/homehive/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Kanso living
echo "  → Kanso Living"
cp "Samples/Kanso living/before-1.png" public/samples/kanso-living/before.png 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Kanso living/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/kanso-living/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Lillyhome (2 chapters)
echo "  → Lillyhome"
cp "Samples/Lillyhome/Before 1.jpg" public/samples/lillyhome/before-1.jpg 2>/dev/null || echo "    ⚠ before-1 not found"
cp "Samples/Lillyhome/before-2.jpg" public/samples/lillyhome/before-2.jpg 2>/dev/null || echo "    ⚠ before-2 not found"
i=1; for f in "Samples/Lillyhome/After 1/"*; do [ -f "$f" ] && cp "$f" "public/samples/lillyhome/after-1/$(printf '%02d' $i).${f##*.}" && ((i++)); done
i=1; for f in "Samples/Lillyhome/After 2/"*; do [ -f "$f" ] && cp "$f" "public/samples/lillyhome/after-2/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Masthal
echo "  → Masthal"
cp "Samples/Masthal/before-1.webp" public/samples/masthal/before.webp 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Masthal/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/masthal/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Mesh-mesh
echo "  → Mesh-mesh"
cp "Samples/Mesh-mesh/before-1.png" public/samples/mesh-mesh/before.png 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Mesh-mesh/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/mesh-mesh/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Nota-inspired-perfumes
echo "  → Nota"
cp "Samples/Nota-inspired-perfumes/before.webp" public/samples/nota-inspired-perfumes/before.webp 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Nota-inspired-perfumes/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/nota-inspired-perfumes/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Rustic
echo "  → Rustic"
cp "Samples/Rustic/Screenshot 2025-12-23 at 10.39.57 PM.png" public/samples/rustic/before.png 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/Rustic/after/"*; do [ -f "$f" ] && cp "$f" "public/samples/rustic/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

# Tajaleyat
echo "  → Tajaleyat"
cp "Samples/tajaleyat/before-1.webp" public/samples/tajaleyat/before.webp 2>/dev/null || echo "    ⚠ before not found"
i=1; for f in "Samples/tajaleyat/After/"*; do [ -f "$f" ] && cp "$f" "public/samples/tajaleyat/after/$(printf '%02d' $i).${f##*.}" && ((i++)); done

echo ""
echo "✅ All images copied!"
echo ""
echo "📊 Summary:"
find public/samples -type f | wc -l | xargs echo "   Total files:"

