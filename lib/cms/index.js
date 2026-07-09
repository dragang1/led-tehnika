import 'server-only';
import reader from './reader.js';
import { categoryNameToSlug } from './utils.js';

let categoriesCache = null;
let productsCache = null;

async function loadCategoriesMap() {
  if (categoriesCache) return categoriesCache;
  const entries = await reader.collections.categories.all();
  categoriesCache = new Map();
  for (const entry of entries) {
    const data = entry.entry;
    const displayName = data.title || data.iconAlt || entry.slug.replace(/-/g, ' ');
    categoriesCache.set(entry.slug, {
      slug: entry.slug,
      name: displayName,
      description: data.description || null,
      icon: data.iconUrl
        ? { url: data.iconUrl.trim(), alternativeText: data.iconAlt || displayName }
        : null,
      updatedAt: data.updatedAt,
      publishedAt: data.updatedAt,
    });
    categoriesCache.set(displayName, categoriesCache.get(entry.slug));
  }
  return categoriesCache;
}

function toStrapiImage(img) {
  if (!img?.url) return null;
  return {
    url: img.url.trim(),
    alternativeText: img.alt || '',
  };
}

async function mapProduct(entry) {
  const data = entry.entry;
  const categories = await loadCategoriesMap();
  const categorySlug = data.category || '';
  const category = categories.get(categorySlug) || null;
  const displayName = data.title || data.images?.[0]?.alt || entry.slug.replace(/-/g, ' ');

  const images = (data.images || []).map(toStrapiImage).filter(Boolean);

  return {
    id: entry.slug,
    documentId: entry.slug,
    slug: entry.slug,
    name: displayName,
    price: data.price ?? 0,
    description: data.description || '',
    image: images,
    kategorije: category
      ? {
          name: category.name,
          slug: category.slug,
        }
      : null,
    updatedAt: data.updatedAt,
    publishedAt: data.updatedAt,
  };
}

async function loadAllProducts() {
  if (productsCache) return productsCache;
  const entries = await reader.collections.products.all();
  productsCache = await Promise.all(entries.map(mapProduct));
  return productsCache;
}

const getCategoryList = async () => {
  const categories = await loadCategoriesMap();
  const unique = new Map();
  for (const value of categories.values()) {
    if (value.name && !unique.has(value.slug)) {
      unique.set(value.slug, value);
    }
  }
  return Array.from(unique.values());
};

const getCategory = async () => {
  const data = await getCategoryList();
  return { data: { data } };
};

const getAllProducts = () => loadAllProducts();

const getProductById = async (documentId) => {
  const products = await loadAllProducts();
  return products.find((p) => p.documentId === documentId || p.slug === documentId) || null;
};

const getProductBySlug = async (slug) => {
  try {
    const entry = await reader.collections.products.read(slug);
    if (!entry) return null;
    return mapProduct({ slug, entry });
  } catch {
    const products = await loadAllProducts();
    return products.find((p) => p.slug === slug) || null;
  }
};

const getProductsByCategory = async (category, productDocumentId) => {
  const products = await loadAllProducts();
  return products.filter(
    (p) =>
      p.kategorije?.name === category &&
      p.documentId !== productDocumentId &&
      p.slug !== productDocumentId
  );
};

const getProductsByCategoryName = async (categoryName) => {
  const products = await loadAllProducts();
  return products.filter((p) => p.kategorije?.name === categoryName);
};

const getCategoryByName = async (categoryName) => {
  const categories = await loadCategoriesMap();
  return categories.get(categoryName) || null;
};

const getStranicaBySlug = async (slug) => {
  try {
    const entry = await reader.collections.pages.read(slug);
    if (!entry) return null;

    let content = [];
    if (entry.contentJson) {
      try {
        content = JSON.parse(entry.contentJson);
      } catch {
        content = [];
      }
    }

    return {
      slug,
      title: entry.title || entry.seoTitle?.split('|')[0]?.trim() || slug,
      seoTitle: entry.seoTitle || null,
      seoDescription: entry.seoDescription || null,
      content,
      description: entry.seoDescription || null,
      cover: entry.coverUrl
        ? { url: entry.coverUrl.trim() }
        : null,
      updatedAt: entry.updatedAt,
    };
  } catch {
    return null;
  }
};

const getSliders = async () => {
  const slider = await reader.singletons.slider.read();
  if (!slider?.slides?.length) return [];

  const sliders = slider.slides.map((slide) => ({
    url: slide.imageUrl?.trim() || '',
    title: slide.title || null,
    description: slide.description || null,
  }));

  return [{ sliders }];
};

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryName,
  getCategoryByName,
  getStranicaBySlug,
  getProductById,
  getProductBySlug,
};

export { categoryNameToSlug, getCategorySlug } from './utils.js';
