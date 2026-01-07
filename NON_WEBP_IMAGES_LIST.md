# Non-WebP Images in Codebase

This list contains all images referenced in the code that are NOT in WebP format.

## Header Images (Now Fixed)
- ✅ `/branding/vs-icon-light.png` → **CONVERTED TO WEBP** (updated in SiteHeader.tsx)

## Footer Images
- `/branding/vs-logo-light.png` (used in SiteFooter.tsx - 2 instances)
  - Line 28: Mobile footer logo
  - Line 111: Desktop footer logo

## Metadata/Schema Images
- `/branding/vs-logo-light.png` (used in app/layout.tsx - 3 instances)
  - Line 44: Open Graph image URL
  - Line 56: Twitter card image
  - Line 67: Schema.org logo

## 404 Page
- `/branding/vs-logo-light.png` (used in app/not-found.tsx)
  - Line 115: Logo image

## Before/After Images
- `/media/before-after/before-1.jpg` (used in data/varyonContent.ts)
- `/media/before-after/after-1.jpg` (used in data/varyonContent.ts)
- `/media/before-after/before-2.jpg` (used in data/varyonContent.ts)
- `/media/before-after/after-2.jpg` (used in data/varyonContent.ts)
- `/media/before-after/before-3.jpg` (used in data/varyonContent.ts)
- `/media/before-after/after-3.jpg` (used in data/varyonContent.ts)

## Library Samples
- `/samples/rustic/before.png` (used in data/librarySamples.ts)
  - Line 213: Before image for Rustic sample

## Logo Carousel Images
The following PNG files are referenced in components/home/LibraryTeaserSection.tsx (lines 11-26):
- `20250518_2020_Minimalist_Logo_Design_remix_01jvj6hnfcf8w9xe6ksz2e3xqh_1 copy.png`
- `352988881_588704730017442_5215786875835733250_n-removebg-preview copy.png`
- `Anetos_Logo_White.png`
- `Drowzy_Logo_No_BKGD copy.png`
- `Favicon copy.png`
- `Long_Black_no_BG copy.png`
- `MESH_logo_transparent-removebg-preview copy.png`
- `Purple_Modern_Eid_Al_Fitr_Greeting_Instagram_Post copy.png`
- `Zee_Designs_Plexi_Glass_Logo copy.png`
- `home-hive-white.png`
- `lilly-home-logo_180x copy.png`
- `logo copy.png`
- `logo-header copy.png`
- `transparent-1-1 copy.png`
- `website-logo-Main copy.png`
- `wood_workers_logo copy.png`

## Summary
- **Total non-WebP images found:** 28
- **Header image:** ✅ Fixed (converted to WebP)
- **Remaining:** 27 images still in PNG/JPG format
