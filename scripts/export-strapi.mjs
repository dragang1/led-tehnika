/**
 * One-time export from Strapi (Render) into Keystatic-compatible content files.
 * Run: node scripts/export-strapi.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const STRAPI_BASE = 'https://led-backend-62tj.onrender.com/api';

const SLIDER_MESSAGES = [
  { title: 'Potrebna ti je', highlight: 'LED Rasvjeta?', description: 'Ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama.' },
  { title: 'Dostava', highlight: 'na sve proizvode', description: 'Dostava na teritoriji cijele Bosne i Hercegovine. Brza i sigurna dostava direktno na vašu adresu. Naručite danas!' },
  { title: 'Garancija kvalitete', highlight: 'i podrška', description: 'Svi proizvodi sa garancijom. Profesionalna instalacija i tehnička podrška. Vaše zadovoljstvo je naš prioritet.' },
  { title: 'Najbolje cijene', highlight: 'u BiH', description: 'Kvalitetni proizvodi po najboljim cijenama. Specijalne ponude i popusti za veće narudžbe. Kontaktirajte nas!' },
  { title: 'Moderna rješenja', highlight: 'za vaš dom', description: 'LED rasvjeta, automatski motori za kapije, bazenska rasvjeta i grijanje. Sve što vam treba na jednom mjestu.' },
];

function categoryNameToSlug(name) {
  return name ? name.toLowerCase().replace(/\s+/g, '-') : '';
}

function yamlQuote(str, { multiline = true } = {}) {
  if (str == null) return '""';
  const s = String(str).trim();
  // URLs and short values stay on one line
  if (!multiline || (!s.includes('\n') && s.length < 120)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return `|\n${s.split('\n').map((line) => `  ${line}`).join('\n')}`;
}

async function fetchJson(urlPath) {
  const res = await fetch(`${STRAPI_BASE}${urlPath}`);
  if (!res.ok) throw new Error(`Failed ${urlPath}: ${res.status}`);
  return res.json();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

async function main() {
  const [productsRes, categoriesRes, slidersRes, straniceRes] = await Promise.all([
    fetchJson('/proizvodi?populate=*&pagination[pageSize]=100'),
    fetchJson('/kategorije?populate=*'),
    fetchJson('/sliders?populate=*'),
    fetchJson('/stranices?populate=cover'),
  ]);

  const products = productsRes.data || [];
  const categories = categoriesRes.data || [];
  const sliders = slidersRes.data || [];
  const stranice = straniceRes.data || [];

  ensureDir(CONTENT);

  // Categories
  const categoryDir = path.join(CONTENT, 'categories');
  ensureDir(categoryDir);
  for (const cat of categories) {
    const slug = categoryNameToSlug(cat.name);
    const iconUrl = cat.icon?.url || '';
    const iconAlt = cat.icon?.alternativeText || cat.name || '';
    const yaml = [
      `slug: ${yamlQuote(slug, { multiline: false })}`,
      `title: ${yamlQuote(cat.name, { multiline: false })}`,
      `description: ${yamlQuote(cat.description || '')}`,
      `iconUrl: ${yamlQuote(iconUrl, { multiline: false })}`,
      `iconAlt: ${yamlQuote(iconAlt, { multiline: false })}`,
      `updatedAt: ${yamlQuote(cat.updatedAt || cat.publishedAt || new Date().toISOString(), { multiline: false })}`,
      '',
    ].join('\n');
    writeFile(path.join(categoryDir, `${slug}.yaml`), yaml);
  }

  // Products
  const productDir = path.join(CONTENT, 'products');
  ensureDir(productDir);
  for (const product of products) {
    if (!product.slug) continue;
    const categorySlug = categoryNameToSlug(product.kategorije?.name || '');
    const images = (product.image || []).map((img) => ({
      url: img.url || '',
      alt: img.alternativeText || product.name || '',
    }));
    const imageYaml = images.length
      ? `images:\n${images.map((img) => `  - url: ${yamlQuote(img.url, { multiline: false })}\n    alt: ${yamlQuote(img.alt, { multiline: false })}`).join('\n')}`
      : 'images: []';

    const yaml = [
      `slug: ${yamlQuote(product.slug, { multiline: false })}`,
      `title: ${yamlQuote(product.name, { multiline: false })}`,
      `price: ${product.price ?? 0}`,
      `description: ${yamlQuote(product.description || '')}`,
      `category: ${yamlQuote(categorySlug)}`,
      `updatedAt: ${yamlQuote(product.updatedAt || product.publishedAt || new Date().toISOString(), { multiline: false })}`,
      imageYaml,
      '',
    ].join('\n');
    writeFile(path.join(productDir, `${product.slug}.yaml`), yaml);
  }

  // Slider singleton
  const sliderImages = sliders[0]?.sliders || [];
  const slideYaml = sliderImages
    .map((slider, index) => {
      const msg = SLIDER_MESSAGES[index % SLIDER_MESSAGES.length];
      return [
        '  - imageUrl: ' + yamlQuote(slider.url || '', { multiline: false }),
        '    title: ' + yamlQuote(slider.title || msg.title, { multiline: false }),
        '    highlight: ' + yamlQuote(msg.highlight, { multiline: false }),
        '    description: ' + yamlQuote(slider.description || msg.description, { multiline: false }),
      ].join('\n');
    })
    .join('\n');

  writeFile(
    path.join(CONTENT, 'slider.yaml'),
    `slides:\n${slideYaml || '  []'}\n`
  );

  // CMS pages
  const pagesDir = path.join(CONTENT, 'pages');
  ensureDir(pagesDir);
  for (const page of stranice) {
    const contentJson = JSON.stringify(page.content || [], null, 2);
    const coverUrl = page.cover?.url || '';
    const yaml = [
      `slug: ${yamlQuote(page.slug, { multiline: false })}`,
      `title: ${yamlQuote(page.title || '')}`,
      `seoTitle: ${yamlQuote(page.seoTitle || '')}`,
      `seoDescription: ${yamlQuote(page.seoDescription || '')}`,
      `coverUrl: ${yamlQuote(coverUrl, { multiline: false })}`,
      `updatedAt: ${yamlQuote(page.updatedAt || page.publishedAt || new Date().toISOString(), { multiline: false })}`,
      `contentJson: ${yamlQuote(contentJson)}`,
      '',
    ].join('\n');
    writeFile(path.join(pagesDir, `${page.slug}.yaml`), yaml);
  }

  // Archive raw export for backup
  const archive = {
    exportedAt: new Date().toISOString(),
    products,
    categories,
    sliders,
    stranice,
  };
  writeFile(path.join(CONTENT, '_archive', 'strapi-export.json'), JSON.stringify(archive, null, 2));

  console.log(`Exported ${products.length} products, ${categories.length} categories, ${sliderImages.length} slides, ${stranice.length} pages`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
