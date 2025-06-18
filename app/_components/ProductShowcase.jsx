'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import GlobalApi from '@/app/_utils/GlobalApi';

const ProductShowcase = () => {
  const [productList, setProductList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
  try {
    const res = await GlobalApi.getAllProducts();
    const limited = (res || []).slice(0, 5); 
    setProductList(limited);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


    fetchProducts();
  }, []);

  useEffect(() => {
    if (productList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [productList]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + productList.length) % productList.length);
  };

  const currentProduct = productList[currentIndex];
  const imageUrl = currentProduct?.image?.[0]?.url;

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-2xl relative overflow-hidden border border-gray-200 min-h-[500px]">
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">

    
        {productList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Prethodni proizvod"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-transform duration-200"
            >
              <ArrowLeftCircle size={44} className="text-gray-600 hover:text-black" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Sljedeći proizvod"
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-transform duration-200"
            >
              <ArrowRightCircle size={44} className="text-gray-600 hover:text-black" />
            </button>
          </>
        )}

        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center w-full min-h-[420px]"
            >
              <div className="w-[220px] h-[200px] sm:w-[320px] sm:h-[260px] rounded-xl bg-gray-200 animate-pulse mb-4" />
              <div className="w-40 h-6 bg-gray-200 animate-pulse rounded" />
            </motion.div>
          ) : (
            currentProduct && (
              <Link href={`/productDetail/${currentProduct.slug}`} className="no-underline">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center min-h-[380px] sm:min-h-[420px] justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out"
                >
                  <div className="w-[220px] h-[200px] sm:w-[320px] sm:h-[260px] rounded-xl bg-gray-50 shadow-md overflow-hidden mb-4 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={currentProduct.name}
                        width={320}
                        height={260}
                        className="object-contain w-full h-full p-2"
                      />
                    ) : (
                      <div className="text-red-500">Nema slike</div>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 max-w-[90%] sm:max-w-[300px] leading-snug tracking-tight">
                    {currentProduct.name}
                  </h2>
                </motion.div>
              </Link>
            )
          )}
        </AnimatePresence>
      </div>

    
      {!loading && productList.length > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
  {productList.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      aria-label={`Prikaži proizvod ${index + 1}`}
      className={`w-4 h-4 rounded-full transition-colors duration-300 focus:outline-none ${
        index === currentIndex ? 'bg-black scale-110' : 'bg-gray-400 hover:bg-gray-600'
      }`}
      type="button"
    />
  ))}
</div>


      )}
    </div>
  );
};

export default ProductShowcase;
