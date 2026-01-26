'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CategoryList({ categoryList }) {
  const getImageUrl = (iconUrl) => {
    if (!iconUrl) return null;
    if (iconUrl.startsWith('http')) return iconUrl;
    if (iconUrl.startsWith('/uploads/') || iconUrl.startsWith('/api/')) {
      return `https://led-backend-62tj.onrender.com${iconUrl}`;
    }
    return iconUrl;
  };

  // Color gradients for categories without images
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-emerald-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
  ];

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-2 sm:p-2'>
        {categoryList.map((cat, index) => {
          const imageUrl = getImageUrl(cat?.icon?.url);
          const categorySlug = cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : '';
          const gradientClass = gradients[index % gradients.length];

          return (
            <Link
              href={`/kategorije/${categorySlug}`}
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              key={cat.id}
            >
              {/* Background Image or Gradient */}
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    fill
                    alt={cat?.name || 'category icon'}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    quality={75}
                    loading={index < 5 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
                </div>
              ) : (
                // Beautiful gradient fallback
                <div className={`w-full h-full bg-gradient-to-br ${gradientClass}`} />
              )}

              {/* Text Overlay with better styling */}
              <div className="absolute inset-0 flex items-center justify-center p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h2 className="text-white text-sm sm:text-base font-bold text-center leading-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {cat?.name || 'Kategorija'}
                </h2>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
