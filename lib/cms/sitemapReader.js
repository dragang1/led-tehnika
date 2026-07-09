import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config.js';

const reader = createReader(process.cwd(), keystaticConfig);

export async function getSitemapCategories() {
  const entries = await reader.collections.categories.all();
  return entries.map((entry) => {
    const data = entry.entry;
    return {
      slug: entry.slug,
      name: data.title || data.iconAlt || entry.slug,
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  });
}

export async function getSitemapProducts() {
  const [products, categories] = await Promise.all([
    reader.collections.products.all(),
    getSitemapCategories(),
  ]);
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  return products.map((entry) => {
    const data = entry.entry;
    const categorySlug = data.category || '';
    const category = categoryBySlug.get(categorySlug);
    return {
      slug: entry.slug,
      categorySlug: category?.slug || categorySlug || 'nepoznata-kategorija',
      updatedAt: data.updatedAt || new Date().toISOString(),
    };
  }).filter((p) => p.slug);
}
