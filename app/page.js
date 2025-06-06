
import Head from "next/head";
import CategoryList from "./_components/CategoryList";

import ProductList from "./_components/ProductList";
import ProductShowcase from "./_components/ProductShowcase";

import GlobalApi from "./_utils/GlobalApi";


export default async function Home() {

  
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <>

    <Head>
        <title>Led Tehnika | Uvoznik LED rasvjete i opreme</title>
        <meta name="description" content="Led Tehnika je ekskluzivni uvoznik bazenske i LED rasvjete, motora za kapije, kalolifera i više. Pouzdan partner za kvalitetnu rasvjetu." />
        <link rel="canonical" href="https://ledtehnika.com/" />

      
        <meta property="og:title" content="Led Tehnika | LED rasvjeta i oprema" />
        <meta property="og:description" content="Ekskluzivni uvoznik LED rasvjete, bazenske rasvjete, motora za kapije,kalolifera i još mnogo toga." />
        <meta property="og:url" content="https://ledtehnika.com/" />
        <meta property="og:type" content="website" />
      </Head>
    <div className='px-4 md:px-10 lg:px-16 py-5 max-w-screen-xl mx-auto'>
     
      <ProductShowcase productList={productList} />

      <CategoryList categoryList={categoryList} />
      <div>
        <h2 className='text-primary font-bold text-2xl mt-5 mx-2'>Popularni Proizvodi</h2>
        <ProductList productList={productList} />
      </div>

    </div>

    </>
  );
}
