import GlobalApi from '@/app/_utils/GlobalApi';

export default async function Head({ params }) {
  const { id } = params;
  const product = await GlobalApi.getProductById(id);

  if (!product) {
    return (
      <>
        <title>Led Tehnika</title>
        <meta name="description" content="Led Tehnika" />
      </>
    );
  }
  console.log(product)

  return (
    <>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />

      {/* Open Graph tags */}
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image?.[0]?.url} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={`https://ledtehnika.com/productDetail/${id}`} />

      {/* Twitter Card (opcionalno) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image?.[0]?.url} />
    </>
  );
}
