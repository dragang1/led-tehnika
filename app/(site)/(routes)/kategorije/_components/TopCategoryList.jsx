'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { normalizeImageUrl } from '@/lib/getImageUrl';
import { getCategorySlug } from '@/lib/cms/utils';

function TopCategoryList({ categoryList, selectedCategory }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getImageUrl = (iconUrl) => normalizeImageUrl(iconUrl);

  return (
    <div className="relative mt-6 mb-8 px-4">
      {/* Scroll Buttons - Desktop Only */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hidden md:flex items-center justify-center"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hidden md:flex items-center justify-center"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Category List */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-4 scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categoryList.map((cat, index) => {
          const iconUrl = getImageUrl(cat.icon?.url);
          const categorySlug = getCategorySlug(cat);
          const isActive = selectedCategory === cat.name;

          return (
            <Link
              href={`/kategorije/${categorySlug}`}
              key={cat.id || index}
              className={`relative flex-shrink-0 w-[140px] h-[110px] rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 shadow-md
                ${isActive 
                  ? 'ring-2 ring-primary ring-offset-2 shadow-xl scale-105 z-10' 
                  : 'hover:scale-105 hover:shadow-lg hover:ring-1 hover:ring-primary/50'
                }`}
            >
              {/* Background Image or Gradient */}
              {iconUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={iconUrl}
                    alt={cat?.name || 'category icon'}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      isActive ? 'brightness-90 scale-105' : 'group-hover:scale-110 brightness-75'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Gradient overlay for better text readability */}
                  <div 
                    className={`absolute inset-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/75' 
                        : 'bg-gradient-to-br from-black/60 via-black/50 to-black/70 group-hover:from-black/50'
                    }`}
                  />
                </div>
              ) : (
                // Beautiful gradient fallback
                <div 
                  className={`w-full h-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary to-primary/80' 
                      : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 group-hover:from-blue-600 group-hover:via-indigo-700'
                  }`}
                />
              )}

              {/* Text Overlay with improved styling */}
              <div className={`absolute inset-0 flex items-center justify-center p-2 ${
                isActive ? 'bg-primary/10' : 'bg-transparent group-hover:bg-black/10'
              } transition-all duration-300`}>
                <h3 className={`text-white text-sm font-bold text-center leading-tight transition-all duration-300 ${
                  isActive ? 'text-base drop-shadow-2xl scale-105' : 'drop-shadow-lg group-hover:scale-105'
                }`}>
                  {cat?.name || 'Kategorija'}
                </h3>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default TopCategoryList;
