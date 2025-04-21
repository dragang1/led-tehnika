'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from 'next/link';

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
    <div className="w-full flex justify-center items-center p-8 bg-gray-100 rounded-xl shadow-2xl overflow-hidden relative max-w-[1200px] mx-auto">
      <div className="relative w-full h-auto sm:h-[500px] flex flex-col sm:flex-row justify-between items-center sm:px-16 lg:px-24 z-20">

        {/* Product Image and Name Section */}
        <AnimatePresence mode="wait">
          {currentProduct && (
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-20 w-full sm:w-[45%] mb-6 sm:mb-0 flex-shrink-0 min-h-[400px] flex flex-col justify-center items-center"
            >
              {/* Image */}
              <div className="mb-6 mx-auto w-[200px] sm:w-[300px] h-[180px] sm:h-[250px] rounded-lg overflow-hidden shadow-2xl">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={currentProduct.name}
                    width={300} // Fixed width for desktop
                    height={250} // Fixed height for both mobile and desktop
                    className="object-cover rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                ) : (
                  <p className="text-red-500">Nema slike za ovaj proizvod</p>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide mt-4">{currentProduct.name}</h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description Section */}
        <div className="w-full sm:w-[50%] text-center sm:text-left px-6 sm:px-12 mt-6 sm:mt-0 flex-shrink-0 min-h-[400px] flex flex-col justify-center items-center sm:items-start">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 sm:text-5xl leading-tight">
            Potrebna ti je
            <strong className="block font-extrabold text-primary"> Led Rasvjeta? </strong>
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto sm:mx-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
          </p>

          {/* Button Container */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center sm:justify-start">
            {/* Shop Button */}
            <Link href={'/products'} className="block w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-xl hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
              Shop Now
            </Link>

            {/* About Us Button */}
            <Link href="#" className="block w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-rose-600 shadow-xl hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
              About Us
            </Link>
          </div>
        </div>

      </div>
    </div>




























  );
};

export default ProductShowcase;
