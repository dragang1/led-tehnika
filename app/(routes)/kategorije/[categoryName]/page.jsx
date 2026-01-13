import GlobalApi from '@/app/_utils/GlobalApi'
import ProductList from '@/app/_components/ProductList'
import TopCategoryList from '../_components/TopCategoryList'
import Script from 'next/script'
import { generateCategoryBreadcrumbSchema } from '@/lib/generateSchemas'
import Breadcrumbs from '@/app/_components/Breadcrumbs'

export async function generateMetadata({ params }) {
  const { categoryName } = await params
  const baseDomain = 'https://ledtehnika.com'

  try {
    // Get all categories and find the one matching the slug
    const categoryList = await GlobalApi.getCategoryList()
    const category = categoryList.find(cat => {
      const catSlug = cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : ''
      return catSlug === categoryName
    })

    if (!category) {
      return {
        title: 'Kategorija nije pronađena | Led Tehnika',
        description: 'Tražena kategorija nije dostupna.',
        alternates: {
          canonical: `${baseDomain}/kategorije/${categoryName}`,
        },
      }
    }

    // Use the actual category name from database
    const categoryTitle = category.name
    const products = await GlobalApi.getProductsByCategoryName(categoryTitle)

    const categoryDescription = category.description 
      ? category.description.slice(0, 155).replace(/\n/g, ' ').trim()
      : `${categoryTitle} - Kvalitetni proizvodi na Led Tehnika. Pregled svih proizvoda iz kategorije ${categoryTitle}.`

    const imageUrl = category.icon?.url 
      ? (category.icon.url.startsWith('http') 
          ? category.icon.url 
          : `https://led-backend-62tj.onrender.com${category.icon.url}`)
      : 'https://ledtehnika.com/logo-black.png'

    return {
      title: `${categoryTitle} | Led Tehnika`,
      description: categoryDescription,
      alternates: {
        canonical: `${baseDomain}/kategorije/${categoryName}`,
      },
      openGraph: {
        title: `${categoryTitle} | Led Tehnika`,
        description: categoryDescription,
        url: `${baseDomain}/kategorije/${categoryName}`,
        siteName: 'Led Tehnika',
        type: 'website',
        locale: 'bs_BA',
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${categoryTitle} - Led Tehnika`,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categoryTitle} | Led Tehnika`,
        description: categoryDescription,
        images: [imageUrl],
      },
    }
  } catch (e) {
    return {
      title: 'Kategorija | Led Tehnika',
      description: 'Pregled proizvoda na Led Tehnika.',
      alternates: {
        canonical: `${baseDomain}/kategorije/${categoryName}`,
      },
    }
  }
}

export async function generateStaticParams() {
  try {
    const categories = await GlobalApi.getCategoryList()
    return categories.map((category) => {
      const categoryName = category.name || ''
      const categorySlug = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija'
      return {
        categoryName: categorySlug,
      }
    }).filter((c) => c.categoryName)
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
  }
}

export default async function Page({ params }) {
  const { categoryName } = await params
  
  let products = []
  let categoryList = []
  let actualCategory = null
  
  try {
    // Get all categories and find the one matching the slug
    categoryList = await GlobalApi.getCategoryList()
    actualCategory = categoryList.find(cat => {
      const catSlug = cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : ''
      return catSlug === categoryName
    })

    // If category found, use its actual name to fetch products
    if (actualCategory) {
      products = await GlobalApi.getProductsByCategoryName(actualCategory.name)
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
  }

  // If category not found, show error
  if (!actualCategory) {
    return (
      <div className='px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto'>
        <h1 className='text-primary font-bold text-2xl mt-5 text-center'>
          Kategorija nije pronađena
        </h1>
        <p className="text-center text-gray-500 text-lg mt-5">
          Tražena kategorija ne postoji.
        </p>
      </div>
    )
  }

  // Use actual category name from database
  const categoryTitle = actualCategory.name
  const baseDomain = 'https://ledtehnika.com'
  const categorySlug = categoryName
  const breadcrumbSchema = generateCategoryBreadcrumbSchema(
    categoryTitle,
    categorySlug,
    baseDomain
  )

  const breadcrumbItems = [
    { label: categoryTitle, href: `#` }
  ];

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className='px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto'>
        <h1 className='text-primary font-bold text-2xl mt-5 text-center'>
          {categoryTitle}
        </h1>
        
        <TopCategoryList 
          categoryList={categoryList} 
          selectedCategory={categoryTitle} 
        />
        
        <div className='py-5 md:py-10'>
          {products && products.length > 0 ? (
            <ProductList productList={products} limit={products.length} />
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Nema proizvoda u ovoj kategoriji.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
