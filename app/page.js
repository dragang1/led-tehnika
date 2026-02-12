import GlobalApi from './_utils/GlobalApi';
import HomeContent from './_components/HomeContent';
import { generateProductSchema } from '@/lib/generateSchemas';
import { truncateAtWord } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour - cached for speed, fresh data in background

const BASE_DOMAIN = 'https://ledtehnika.com';

function normalizeImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/') || url.startsWith('/api/')) return `https://led-backend-62tj.onrender.com${url}`;
  return url.startsWith('/') ? `https://ledtehnika.com${url}` : `https://ledtehnika.com/${url}`;
}

const DEFAULT_DESCRIPTION = 'Led Tehnika - ekskluzivni uvoznik motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama u Bosni.';

export async function generateMetadata() {
  let description = DEFAULT_DESCRIPTION;
  try {
    const featured = await GlobalApi.getProductBySlug('motor-za-kapiju-set');
    if (featured?.name) {
      const lead = `Izdvojeno: ${featured.name}. `;
      description = truncateAtWord(lead + DEFAULT_DESCRIPTION, 160);
    }
  } catch (_) {
    // use default
  }
  return {
    title: 'LED rasvjeta, Bazenska rasvjeta, Motori za kapije',
    description,
    alternates: {
      canonical: 'https://ledtehnika.com',
    },
    openGraph: {
      title: 'Led Tehnika – LED rasvjeta, motori za kapije i bazenska oprema u BiH',
      description: description,
      url: 'https://ledtehnika.com',
      siteName: 'Led Tehnika',
      type: 'website',
      locale: 'bs_BA',
      images: [{
        url: 'https://ledtehnika.com/logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Led Tehnika - LED rasvjeta, Bazenska rasvjeta i Motori za kapije',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Led Tehnika – LED rasvjeta, motori za kapije i bazenska oprema u BiH',
      description: description,
      images: ['https://ledtehnika.com/logo-black.png'],
    },
  };
}

const SLIDER_MESSAGES = [
  { title: 'Potrebna ti je', highlight: 'LED Rasvjeta?', description: 'Ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama.' },
  { title: 'Dostava', highlight: 'na sve proizvode', description: 'Dostava na teritoriji cijele Bosne i Hercegovine. Brza i sigurna dostava direktno na vašu adresu. Naručite danas!' },
  { title: 'Garancija kvalitete', highlight: 'i podrška', description: 'Svi proizvodi sa garancijom. Profesionalna instalacija i tehnička podrška. Vaše zadovoljstvo je naš prioritet.' },
  { title: 'Najbolje cijene', highlight: 'u BiH', description: 'Kvalitetni proizvodi po najboljim cijenama. Specijalne ponude i popusti za veće narudžbe. Kontaktirajte nas!' },
  { title: 'Moderna rješenja', highlight: 'za vaš dom', description: 'LED rasvjeta, automatski motori za kapije, bazenska rasvjeta i grijanje. Sve što vam treba na jednom mjestu.' },
];

export default async function Home() {
  const [categoryList, productList, featuredProductRaw, slidersResponse] = await Promise.all([
    GlobalApi.getCategoryList(),
    GlobalApi.getAllProducts(),
    GlobalApi.getProductBySlug('motor-za-kapiju-set'),
    GlobalApi.getSliders(),
  ]);

  let initialFeaturedProduct = null;
  if (featuredProductRaw?.image?.[0]?.url) {
    const category = featuredProductRaw.kategorije || {};
    const categorySlug = category.name ? category.name.toLowerCase().replace(/\s+/g, '-') : 'automatizacija';
    const imageUrl = normalizeImageUrl(featuredProductRaw.image[0].url);
    if (imageUrl) {
      initialFeaturedProduct = {
        ...featuredProductRaw,
        categorySlug,
        imageUrl,
      };
    }
  }

  let initialSliderData = [];
  if (slidersResponse?.[0]?.sliders) {
    const sliders = slidersResponse[0].sliders;
    initialSliderData = sliders.map((slider, index) => {
      const url = slider?.url?.replace(/^\//, '') || '';
      const imageUrl = normalizeImageUrl(url);
      if (!imageUrl) return null;
      const msg = SLIDER_MESSAGES[index % SLIDER_MESSAGES.length];
      return { imageUrl, title: slider?.title ?? msg.title, description: slider?.description ?? msg.description, highlight: msg.highlight };
    }).filter(Boolean);
  }

  const featuredProductSchema = initialFeaturedProduct
    ? generateProductSchema(
        initialFeaturedProduct,
        initialFeaturedProduct.kategorije?.name || 'Automatizacija',
        initialFeaturedProduct.categorySlug,
        BASE_DOMAIN
      )
    : null;

  return (
    <>
      {featuredProductSchema && (
        <script
          id="featured-product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredProductSchema) }}
        />
      )}
      <HomeContent
        categoryList={categoryList}
        productList={productList}
        initialFeaturedProduct={initialFeaturedProduct}
        initialSliderData={initialSliderData}
      />
    </>
  );
}
