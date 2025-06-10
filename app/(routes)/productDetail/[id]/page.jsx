import GlobalApi from '@/app/_utils/GlobalApi';
import ProductDetailPage from './productDetailPage';


export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const product = await GlobalApi.getProductById(id);

    if (!product) {
      return {
        title: 'Proizvod nije pronađen',
        description: 'Traženi proizvod nije dostupan.',
      };
    }

    return {
      title: product.name,
      description: product.description
        ? product.description.slice(0, 160).replace(/\n/g, ' ')
        : 'Detalji proizvoda',
    };
  } catch {
    return {
      title: 'Greška',
      description: 'Došlo je do greške prilikom učitavanja proizvoda.',
    };
  }
}

export default function Page({ params }) {
  return <ProductDetailPage params={params} />;
}