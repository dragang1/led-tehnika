'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LoaderCircle, ShoppingCart, Minus, Plus, Info } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";
import { useCart } from '@/app/_components/CartContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import GlobalApi from '@/app/_utils/GlobalApi';
import Breadcrumbs from '@/app/_components/Breadcrumbs';

const ProductDetailPage = ({ product, categoryName, categorySlug }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Get product ID - data is already flattened
  // Use documentId for related products query as that's what the API expects
  const productId = product?.documentId || product?.id;
  // API uses 'image' not 'images'
  const productImages = product?.image || [];
  
  const getImageUrl = (img) => {
    if (!img?.url) return '/placeholder.png';
    if (img.url.startsWith('http')) return img.url;
    if (img.url.startsWith('/uploads/') || img.url.startsWith('/api/')) return `https://led-backend-62tj.onrender.com${img.url}`;
    return img.url.startsWith('/') ? `https://ledtehnika.com${img.url}` : `https://ledtehnika.com/${img.url}`;
  };
  
  const selectedImageInitial = productImages?.[0] ? getImageUrl(productImages[0]) : '/placeholder.png';
  
  const [selectedImage, setSelectedImage] = useState(selectedImageInitial);
  const { addToCart } = useCart();
  const audioRef = useRef(null);

  // Fetch related products by category **name**, exclude current product
  useEffect(() => {
    const fetchRelated = async () => {
      if (!categoryName || !productId) return;

      try {
        const related = await GlobalApi.getProductsByCategory(categoryName, productId);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };
    fetchRelated();
  }, [productId, categoryName]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const productTotalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    setLoading(true);
    const cartItem = { quantity, amount: productTotalPrice.toFixed(2), product };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => {
      const itemId = item.product?.documentId || item.product?.id;
      return itemId === productId;
    });

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
      cart[existingIndex].amount = (cart[existingIndex].quantity * product.price).toFixed(2);
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    addToCart(cartItem);
    toast.success(`${product.name} je dodat u korpu!`);
    playSound();
    setTimeout(() => setLoading(false), 500);
  };

  const breadcrumbItems = [
    { label: categoryName, href: `/kategorije/${categorySlug}` },
    { label: product.name, href: `#` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <motion.div 
        className='p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mx-4 sm:mx-5 mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className='flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 px-2 sm:px-4 max-w-screen-xl mx-auto'>
        {/* Product Image */}
        <div className='w-full lg:w-1/2 flex flex-col items-center mb-6 lg:mb-0'>
          <div className="relative w-full max-w-[500px] h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <Image
              src={selectedImage}
              alt={productImages?.[0]?.alternativeText || 'product image'}
              fill
              className='object-contain p-6 transition-transform duration-300 ease-in-out hover:scale-105'
              priority
            />
          </div>
          
          {/* Image Thumbnails */}
          {productImages && productImages.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {productImages?.map((img, idx) => {
                const imgUrl = getImageUrl(img);
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === imgUrl 
                        ? 'border-blue-600 ring-2 ring-blue-200 shadow-md scale-105' 
                        : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={img.alternativeText || `Thumbnail ${idx + 1}`}
                      fill
                      className='object-cover'
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6'>
          {/* Product Title */}
          <div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4'>
              {product?.name || 'Nepoznat proizvod'}
            </h1>
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle2 className="text-green-600 w-5 h-5" />
              <span className="text-green-700 font-semibold text-sm sm:text-base">Na stanju</span>
            </div>
          </div>

          {/* Product Description */}
          {product?.description && (
            <div className='prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed'>
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          )}

          {/* Price Section */}
          <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
            <div className='flex items-baseline gap-3'>
              <span className='text-gray-600 text-lg font-medium'>Cijena:</span>
              <span className='font-bold text-4xl sm:text-5xl text-blue-600'>
                {product?.price?.toFixed(2) || '0.00'} KM
              </span>
            </div>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200'>
              <div className='flex items-center gap-1'>
                <span className='text-gray-700 font-medium text-sm sm:text-base'>Količina:</span>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-4 bg-white border-2 border-gray-300 rounded-lg px-3 py-2 shadow-sm'>
                  <button 
                    disabled={quantity === 1} 
                    onClick={() => setQuantity(quantity - 1)} 
                    className="p-1 rounded-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    aria-label="Smanji količinu"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className='text-xl font-bold text-gray-900 min-w-[2rem] text-center'>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="p-1 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    aria-label="Povećaj količinu"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-500 text-sm'>Ukupno:</span>
                  <span className='text-2xl font-bold text-gray-900'>
                    = {(quantity * product?.price)?.toFixed(2)} KM
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className='flex gap-3 justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold'
              onClick={handleAddToCart} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className='animate-spin w-5 h-5' />
                  <span>Dodavanje...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Dodaj u korpu</span>
                </>
              )}
            </Button>
            <audio ref={audioRef} src="/sounds/success-340660.mp3" preload="auto" />
          </div>

          {/* Category Badge */}
          <div className='flex items-center gap-2 pt-4 border-t border-gray-200'>
            <Info className="w-4 h-4 text-gray-400" />
            <span className='text-gray-600 text-sm'>
              <span className='font-semibold text-gray-700'>Kategorija:</span> {categoryName}
            </span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 px-2 sm:px-4 max-w-screen-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Slični proizvodi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => {
              // Generate category slug from name since API doesn't provide slug
              const relatedCategory = item.kategorije || {};
              const relatedCategoryName = relatedCategory.name || '';
              const relatedCategorySlug = relatedCategoryName ? relatedCategoryName.toLowerCase().replace(/\s+/g, '-') : 'nepoznata-kategorija';
              
              return (
              <Link key={item.id} href={`/kategorije/${relatedCategorySlug}/${item.slug}`}>
                <motion.div 
                  className="flex flex-col h-full rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 ease-in-out overflow-hidden group"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <Image 
                      src={getImageUrl(item.image?.[0])} 
                      alt={item.image?.[0]?.alternativeText || 'related product image'} 
                      fill 
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-grow">
                    <h4 className="text-center font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                    <p className="font-bold text-center text-blue-600 text-lg sm:text-xl">{item.price?.toFixed(2) || '0.00'} KM</p>
                  </div>
                </motion.div>
              </Link>
              );
            })}
          </div>
        </div>
      )}
      </motion.div>
    </>
  );
};

export default ProductDetailPage;
