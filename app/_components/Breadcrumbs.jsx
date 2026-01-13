'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto pt-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link 
            href="/" 
            className="flex items-center hover:text-primary transition-colors"
            aria-label="Početna"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
