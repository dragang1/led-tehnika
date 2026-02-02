'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import ProductShowcase from './ProductShowcase';
import Hero from './Hero';

export default function HomeContent({ categoryList, productList, initialFeaturedProduct, initialSliderData }) {
  return (
    <>
      {/* Hero Section with Categories between Izdvojeno and Slider */}
      <Hero initialFeaturedProduct={initialFeaturedProduct} initialSliderData={initialSliderData}>
        {/* Categories Section - Between Izdvojeno and Slider */}
        <section className="bg-white py-10 md:py-14">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Pretraži po kategoriji
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Pronađite proizvode po kategorijama
              </p>
            </div>
            <CategoryList categoryList={categoryList} />
          </motion.div>
        </section>
      </Hero>

      {/* Products Section */}
      <section className="bg-slate-50 py-12 md:py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                Popularni proizvodi
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                Najtraženiji proizvodi naših kupaca
              </p>
            </div>
            <Link
              href="/proizvodi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Vidi sve proizvode
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ProductList productList={productList} limit={8} />
        </motion.div>
      </section>
    </>
  );
}
