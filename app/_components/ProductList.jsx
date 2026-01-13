'use client';

import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

function ProductList({ productList, limit }) {
  const displayProducts = limit ? productList.slice(0, limit) : productList;

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nema dostupnih proizvoda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {displayProducts.map((product, index) => (
        <motion.div
          key={product.id || product.documentId || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="h-full"
        >
          <ProductItem product={product} />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductList
