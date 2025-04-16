'use client'
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GlobalApi from '@/app/_utils/GlobalApi';

const ProductShowcase = () => {
  const [productList, setProductList] = useState([]);

  // Fetching products data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await GlobalApi.getAllProducts();  // This is your function
        setProductList(productData);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []); // Runs once when the component mounts

  // Get the image URL dynamically using useMemo for performance optimization
  const currentProduct = productList[0]; // Just display the first product for now
  const imageUrl = useMemo(() => {
    if (currentProduct?.images?.[0]) {
      const imgUrl = currentProduct.images[0].url;
      console.log("Image URL:", imgUrl); // Debugging: Check the image URL
      if (process.env.NODE_ENV === 'production') {
        const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;
        return cloudinaryBaseUrl ? `${cloudinaryBaseUrl}${imgUrl}` : imgUrl;
      }
      return imgUrl;
    }
    return '/default-image.jpg';  // Fallback image
  }, [currentProduct]);  // Re-run if currentProduct changes

  return (
    <div>
      {currentProduct ? (
        <motion.div
          initial={{ opacity: 0 }} // Initial state (transparent)
          animate={{ opacity: 1 }} // Target state (fully visible)
          transition={{ duration: 1 }} // Transition duration
          className="flex flex-col items-center justify-center space-y-4"
        >
          {/* Product Image with Framer Motion animation */}
          <motion.div
            initial={{ scale: 0.8 }} // Start smaller
            animate={{ scale: 1 }}   // Scale to normal size
            transition={{ duration: 0.5 }}
          >
            <Image
              src={imageUrl}
              alt={currentProduct?.name || 'Product Image'}
              width={300}
              height={300}
              className="object-cover rounded"
            />
          </motion.div>

          {/* Product Name with Fade In */}
          <motion.p
            initial={{ opacity: 0 }} // Initial opacity (invisible)
            animate={{ opacity: 1 }}  // Fade to visible
            transition={{ duration: 1 }}
            className="font-semibold text-xl"
          >
            {currentProduct?.name}
          </motion.p>
        </motion.div>
      ) : (
        <p>Loading product...</p> // Loading text when product is not available
      )}
    </div>
  );
};

export default ProductShowcase;
