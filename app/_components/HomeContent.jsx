'use client';

import { motion } from 'framer-motion';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import ProductShowcase from './ProductShowcase';

export default function HomeContent({ categoryList, productList }) {
  return (
    <motion.div
      className="px-4 md:px-10 lg:px-20 py-10 max-w-screen-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProductShowcase productList={productList} />
      </motion.section>

      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2 border-gray-200">
          Kategorije proizvoda
        </h2>
        <CategoryList categoryList={categoryList} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2 border-gray-200">
          Popularni proizvodi
        </h2>
        <ProductList productList={productList} />
      </motion.section>
    </motion.div>
  );
}
