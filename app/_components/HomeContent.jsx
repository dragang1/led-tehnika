'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
        className="mb-16"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              Popularni proizvodi
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Najtraženiji proizvodi naših kupaca
            </p>
          </div>
          <Link
            href="/proizvodi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Vidi sve proizvode
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <ProductList productList={productList} limit={8} />
      </motion.section>
    </motion.div>
  );
}
