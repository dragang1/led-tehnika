'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import ProductItem from '../../_components/ProductItem'; // Import ProductItem component
import { toast } from 'sonner';
import Head from 'next/head';

function AllProductsPage() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await GlobalApi.getAllProducts();

                setProducts(fetchedProducts);

            } catch (error) {
                toast.error('Greška na serveru. Pokušajte ponovo kasnije.');
            }
        };

        fetchProducts();
    }, []);



    return (
        <>

        <Head>
  <title>Artikli | Led Tehnika</title>
  <meta name="description" content="Pogledajte naš asortiman LED rasvjete, bazenske opreme, motora za kapije, lampi i druge opreme." />
  <link rel="canonical" href="https://ledtehnika.com/proizvodi" />

  <meta property="og:title" content="Artikli | Led Tehnika" />
  <meta property="og:description" content="Pregledajte kompletnu ponudu LED rasvjete, kalolifera, bazenske opreme,motora za kapije i više." />
  <meta property="og:url" content="https://ledtehnika.com/proizvodi" />
</Head>

        <div className='px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto'>
            <h2 className='text-primary font-bold text-2xl mt-5 text-center'>Svi artikli</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-4 container mx-auto p-4'>
                {products.map((product, index) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
        </>
    );
}

export default AllProductsPage;
