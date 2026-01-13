import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import ProductList from '../../_components/ProductList';
import Breadcrumbs from '@/app/_components/Breadcrumbs';

export const metadata = {
  title: 'Svi proizvodi - Motor za kapiju, LED rasvjeta, Bazenska rasvjeta | Led Tehnika',
  description: 'Pregled svih proizvoda na Led Tehnika. Motor za kapiju, LED rasvjeta, bazenska rasvjeta, kaloliferi i grijanje. Kvalitetni proizvodi po najboljim cijenama u Bosni.',
  alternates: {
    canonical: 'https://ledtehnika.com/proizvodi',
  },
  openGraph: {
    title: 'Svi proizvodi - Motor za kapiju, LED rasvjeta | Led Tehnika',
    description: 'Pregled svih proizvoda na Led Tehnika. Motor za kapiju, LED rasvjeta, bazenska rasvjeta i još mnogo toga.',
    url: 'https://ledtehnika.com/proizvodi',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'Led Tehnika - Svi proizvodi',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Svi proizvodi - Motor za kapiju, LED rasvjeta | Led Tehnika',
    description: 'Pregled svih proizvoda na Led Tehnika',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

async function AllProductsPage() {
    let products = [];
    
    try {
        products = await GlobalApi.getAllProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    const breadcrumbItems = [
        { label: 'Svi artikli', href: '#' }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className='px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto'>
                <h1 className='text-primary font-bold text-2xl mt-5 text-center'>Svi artikli</h1>
            <div className='py-5 md:py-10'>
                {products && products.length > 0 ? (
  <ProductList productList={products} limit={products.length} />
) : (
  <p className="text-center text-gray-500 text-lg">Učitavanje proizvoda...</p>
)}
            </div>
        </div>
        </>
    );
}

export default AllProductsPage;
