export function categoryNameToSlug(name) {
  return name ? name.toLowerCase().replace(/\s+/g, '-') : '';
}

export function getCategorySlug(category) {
  if (!category) return '';
  if (category.slug) return category.slug;
  return categoryNameToSlug(category.name);
}

export function normalizeImageUrl(url) {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (trimmed.startsWith('http')) return trimmed;
  if (trimmed.startsWith('/')) return `https://ledtehnika.com${trimmed}`;
  return `https://ledtehnika.com/${trimmed}`;
}
