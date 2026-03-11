#!/bin/bash
#
# Convert all PNG/JPG/JPEG images in public/samples to WebP format
# Uses cwebp with quality 90 (near-lossless lossy compression)
#
# Usage: npm run samples:webp
#        or: bash scripts/convert-samples-to-webp.sh
#
# Requirements: cwebp must be installed (brew install webp)
#

set -e

SAMPLES_DIR="public/samples"
QUALITY=90

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  Warning: cwebp is not installed. Skipping conversion."
    echo "   Images should already be converted and committed to the repository."
    echo "   To convert locally, install with: brew install webp"
    exit 0
fi

# Counters
converted=0
skipped=0
failed=0

echo "🔄 Converting images in $SAMPLES_DIR to WebP (quality: $QUALITY)..."
echo ""

# Find all PNG, JPG, JPEG files (case-insensitive)
while IFS= read -r -d '' file; do
    # Get the output path (same name, .webp extension)
    dir=$(dirname "$file")
    base=$(basename "$file")
    name="${base%.*}"
    out="$dir/$name.webp"
    
    # Skip if WebP already exists and is newer than source
    if [[ -f "$out" && "$out" -nt "$file" ]]; then
        echo "⏭️  Skipped (up-to-date): $out"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Convert
    echo "📸 Converting: $file → $out"
    if cwebp -q "$QUALITY" -m 6 -mt -metadata none "$file" -o "$out" 2>/dev/null; then
        converted=$((converted + 1))
    else
        echo "⚠️  Failed: $file"
        failed=$((failed + 1))
    fi
    
done < <(find "$SAMPLES_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0 2>/dev/null)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Conversion complete!"
echo "   Converted: $converted"
echo "   Skipped:   $skipped"
echo "   Failed:    $failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ $failed -gt 0 ]]; then
    exit 1
fi

