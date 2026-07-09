import CmsApi from '@/lib/cms';
import { permanentRedirect } from 'next/navigation';
import { getCategorySlug } from '@/lib/cms/utils';
import { truncateAtWord } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour - cached for speed, fresh data in background

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await CmsApi.getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    // Return basic metadata (page will redirect anyway). Layout template adds " | Led Tehnika".
    return {
      title: product.name,
      description: product.description ? truncateAtWord(product.description.replace(/\n/g, ' ').trim(), 155) : `${product.name} na Led Tehnika`,
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
    const products = await CmsApi.getAllProducts();
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
  const product = await CmsApi.getProductBySlug(slug);

  if (!product) {
    return <p>Proizvod nije pronađen.</p>;
  }

  // Get category slug for redirect - data is already flattened
  const category = product.kategorije || {};
  const categorySlug = getCategorySlug(category) || 'nepoznata-kategorija';

  permanentRedirect(`/kategorije/${categorySlug}/${slug}`);
}
