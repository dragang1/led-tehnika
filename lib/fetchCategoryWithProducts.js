export async function fetchCategoryWithProducts(categorySlug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?filters[slug][$eq]=${categorySlug}&populate=products.category,products.images`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Ne mogu dohvatiti kategoriju');
  }

  const data = await res.json();
  const category = data.data?.[0];

  if (!category) return null;

  return category.attributes.products.data; // array proizvoda
}
