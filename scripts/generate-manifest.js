#!/usr/bin/env node
/**
 * Auto-generate manifest.json for articles
 * Scans client/public/articles/ directory for .md files
 * and creates a manifest with article slugs
 */

import { readdir, writeFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARTICLES_DIR = join(__dirname, '../client/public/articles');
const MANIFEST_PATH = join(ARTICLES_DIR, 'manifest.json');

async function generateManifest() {
  try {
    console.log('🔍 Scanning articles directory...');
    
    const files = await readdir(ARTICLES_DIR);
    
    // Filter for .md files and extract slugs (filename without extension)
    const articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => basename(file, '.md'))
      .sort(); // Sort alphabetically for consistency

    const manifest = {
      articles: articles
    };

    await writeFile(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2) + '\n',
      'utf-8'
    );

    console.log(`✅ Generated manifest with ${articles.length} article(s):`);
    articles.forEach(article => console.log(`   - ${article}`));
    console.log(`📝 Manifest saved to: ${MANIFEST_PATH}`);
    
  } catch (error) {
    console.error('❌ Error generating manifest:', error);
    process.exit(1);
  }
}

generateManifest();
