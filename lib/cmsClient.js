async function cmsFetch(action, params = {}) {
  const search = new URLSearchParams({ action, ...params });
  const res = await fetch(`/api/cms?${search.toString()}`);
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

const getCategory = async () => {
  const data = await cmsFetch('categories');
  return { data: { data } };
};

const getCategoryList = () => cmsFetch('categories');

const getAllProducts = () => cmsFetch('products');

const getProductBySlug = (slug) => cmsFetch('product', { slug });

const getProductsByCategory = (category, productDocumentId) =>
  cmsFetch('products', { category, exclude: productDocumentId });

const getProductsByCategoryName = (categoryName) =>
  cmsFetch('products', { category: categoryName });

const getSliders = () => cmsFetch('sliders');

const getStranicaBySlug = (slug) => cmsFetch('page', { slug });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  getProductsByCategoryName,
  getStranicaBySlug,
  getProductBySlug,
};
