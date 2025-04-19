'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlobalApi from '@/app/_utils/GlobalApi';

const ProductShowcase = () => {
  const [productList, setProductList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GlobalApi.getAllProducts();
        console.log('Fetched products:', res); // 🔍 Provjera podataka
        setProductList(res || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (productList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [productList]);

  const currentProduct = productList[currentIndex];
  const imageUrl = currentProduct?.image?.[0]?.url;

  console.log('Current Product:', currentProduct); // 🔍 Provjera pojedinačnog proizvoda
  console.log('Image URL:', imageUrl); // 🔍 Provjera slike

  return (
    <div className="w-full flex justify-center items-center min-h-[300px] p-4 bg-gray-50 rounded-md shadow-sm overflow-hidden">
      <AnimatePresence mode="wait">
        {currentProduct && (
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Image */}
            <div className="mb-4">
              {imageUrl ? (
                <div className="relative w-[400px] h-[300px] mx-auto">
                  <Image
                    src={imageUrl}
                    alt={currentProduct.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <p className="text-red-500">Nema slike za ovaj proizvod</p>
              )}
            </div>

            {/* Product Name */}
            <h2 className="text-xl font-semibold">{currentProduct.name}</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductShowcase;
