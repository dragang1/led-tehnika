import GlobalApi from '@/app/_utils/GlobalApi';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await GlobalApi.getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    // Return basic metadata (page will redirect anyway)
    return {
      title: `${product.name} | Led Tehnika`,
      description: product.description?.slice(0, 155) || `${product.name} na Led Tehnika`,
    };
  } catch (e) {
    return {
      title: 'Proizvod nije pronađen',
      description: 'Traženi proizvod nije dostupan.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const products = await GlobalApi.getAllProducts();
    return products.map((product) => ({
      slug: product.slug || '',
    })).filter(p => p.slug);
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}


export default async function Page({ params }) {
  const { slug } = await params;
  const product = await GlobalApi.getProductBySlug(slug);

  if (!product) {
    return <p>Proizvod nije pronađen.</p>;
  }

  // Get category slug for redirect - data is already flattened
  const category = product.kategorije || {};
  const categoryName = category.name || '';
  // Generate slug from category name since API doesn't provide slug
  const categorySlug = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
  
  // 301 permanent redirect to new URL structure
  redirect(`/kategorije/${categorySlug}/${slug}`, 'replace');
}
