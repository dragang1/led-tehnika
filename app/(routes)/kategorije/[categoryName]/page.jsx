import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

export async function generateMetadata({ params }) {
  const categoryName = decodeURIComponent(params.categoryName.replace(/-/g, ' '));
  const baseDomain = 'https://ledtehnika.com';
  
  // SEO-optimized category metadata
  const getCategoryMetadata = (category) => {
    const lowerCategory = category.toLowerCase();
    
    // Special handling for gate motor category (motor za kapiju)
    if (lowerCategory.includes('motor') || lowerCategory.includes('kapij')) {
      return {
        title: `Motor za kapiju - ${category} | Led Tehnika`,
        description: `Pronađite najbolji motor za kapiju - ${category} na Led Tehnika. Kvalitetni motori za kapije po najboljim cijenama u Bosni. Širok izbor automatskih motora za kapije.`,
        keywords: [
          'motor za kapiju',
          'motori za kapije',
          'kapijski motor',
          'automatska kapija',
          category,
          'Led Tehnika',
          'motor za kapiju cijena',
          'motor za kapiju Bosna'
        ]
      };
    }
    
    // LED lighting category
    if (lowerCategory.includes('led') || lowerCategory.includes('rasvjet')) {
      return {
        title: `${category} - LED rasvjeta | Led Tehnika`,
        description: `${category} na Led Tehnika. Kvalitetna LED rasvjeta po najboljim cijenama. Ekskluzivni uvoznik LED rasvjete u Bosni.`,
        keywords: [
          'LED rasvjeta',
          category,
          'LED svjetla',
          'LED osvjetljenje',
          'Led Tehnika',
          'LED rasvjeta Bosna'
        ]
      };
    }
    
    // Pool lighting category
    if (lowerCategory.includes('bazen') || lowerCategory.includes('bazensk')) {
      return {
        title: `${category} - Bazenska rasvjeta | Led Tehnika`,
        description: `${category} na Led Tehnika. Profesionalna bazenska rasvjeta i osvjetljenje. Kvalitetni proizvodi za bazensko osvjetljenje.`,
        keywords: [
          'bazenska rasvjeta',
          'bazensko osvjetljenje',
          category,
          'Led Tehnika',
          'bazenska rasvjeta Bosna'
        ]
      };
    }
    
    // Default metadata
    return {
      title: `${category} | Led Tehnika`,
      description: `${category} na Led Tehnika. Kvalitetni proizvodi po najboljim cijenama. Ekskluzivni uvoznik i distributer.`,
      keywords: [category, 'Led Tehnika', 'uvoznik', 'distributer']
    };
  };
  
  const metadata = getCategoryMetadata(categoryName);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `${baseDomain}/kategorije/${params.categoryName}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseDomain}/kategorije/${params.categoryName}`,
      siteName: 'Led Tehnika',
      type: 'website',
      locale: 'bs_BA',
      images: [{
        url: `${baseDomain}/logo-black.png`,
        width: 1200,
        height: 630,
        alt: `${categoryName} - Led Tehnika`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${baseDomain}/logo-black.png`],
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await GlobalApi.getCategoryList();
    return categories.map((category) => {
      // Convert category name to URL-friendly format
      const categoryName = category.name || category.attributes?.name || '';
      const urlFriendly = categoryName.toLowerCase().replace(/\s+/g, '-');
      return {
        categoryName: urlFriendly,
      };
    }).filter(c => c.categoryName);
  } catch (error) {
    console.error('Error generating category static params:', error);
    return [];
  }
}

async function ProductCategory({ params }) {
    const categoryName = decodeURIComponent(params.categoryName.replace(/-/g, ' '));
    const productList = await GlobalApi.getProductsByCategory(categoryName);
    const categoryList = await GlobalApi.getCategoryList();
    
    // Breadcrumb structured data
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Početna",
          "item": "https://ledtehnika.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Kategorije",
          "item": "https://ledtehnika.com/kategorije"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": categoryName,
          "item": `https://ledtehnika.com/kategorije/${params.categoryName}`
        }
      ]
    };
    
    return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <div className="px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
              <h1 className="w-full text-center text-white font-semibold text-lg md:text-2xl py-3 md:py-4 px-4 
      bg-gradient-to-r from-blue-600 to-indigo-500 rounded-md shadow-md tracking-wide">
                  {categoryName}
              </h1>

      <div className="hidden sm:block">
          <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />
      </div>

              <div className="py-5 md:py-10">
        {productList && productList.length > 0 ? (
          <ProductList productList={productList} />
        ) : (
          <p className="text-center text-gray-500 text-lg">Stiže uskoro.</p>
        )}
      </div>

          </div>
        </>
    )
}

export default ProductCategory