#!/usr/bin/env node
/**
 * Validate that all image paths in librarySamples.ts exist on disk as .webp files.
 * 
 * Usage: npm run samples:validate
 *        or: node scripts/validate-samples.mjs
 * 
 * This script should be run in development to ensure all image references are valid.
 */

import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Dynamically import the samples data
// We need to use a workaround since librarySamples.ts is TypeScript
const samplesPath = join(projectRoot, 'data', 'librarySamples.ts');

// Read and parse the file manually since we can't import TS directly
import { readFileSync } from 'fs';

const tsContent = readFileSync(samplesPath, 'utf-8');

// Extract all image paths from the file
const pathPattern = /["']\/samples\/[^"']+\.webp["']/g;
const matches = tsContent.matchAll(pathPattern);
const imagePaths = [...matches].map(m => m[0].replace(/["']/g, ''));

// Remove duplicates
const uniquePaths = [...new Set(imagePaths)];

console.log('🔍 Validating library sample images...\n');

let missing = 0;
let found = 0;

for (const imagePath of uniquePaths) {
  const fullPath = join(projectRoot, 'public', imagePath);
  
  if (existsSync(fullPath)) {
    found++;
    console.log(`✅ ${imagePath}`);
  } else {
    missing++;
    console.log(`❌ MISSING: ${imagePath}`);
  }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📊 Validation Summary:`);
console.log(`   Found:   ${found}`);
console.log(`   Missing: ${missing}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (missing > 0) {
  console.log('\n⚠️  Some images are missing!');
  console.log('   Run: npm run samples:webp');
  console.log('   Or manually copy images to public/samples/\n');
  process.exit(1);
} else {
  console.log('\n✅ All images validated successfully!\n');
  process.exit(0);
}

