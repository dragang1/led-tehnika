'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ProductShowcase = ({ productList }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % productList.length);
    }, 5000); // change slide every 5 seconds

    return () => clearInterval(timer);
  }, [productList.length]);

  const currentProduct = productList[current];

  const rawUrl = currentProduct?.images?.[0]?.url;

  const imageUrl = rawUrl
    ? rawUrl.startsWith('http')
      ? rawUrl
      : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, '')}${rawUrl}`
    : '/default-image.jpg';


  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6">
      <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={currentProduct.name}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.h2
        key={`title-${current}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="mt-4 text-xl font-bold text-center"
      >
        {currentProduct.name}
      </motion.h2>
    </div>
  );
};

export default ProductShowcase;
