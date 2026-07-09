'use client';

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { normalizeImageUrl } from '@/lib/getImageUrl';
import { getCategorySlug } from '@/lib/cms/utils';

function CategoryDropdown({ categoryList }) {
  const getImageUrl = (iconUrl) => normalizeImageUrl(iconUrl);

  return (
    <div className='md:flex'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex gap-2 items-center rounded-full px-6 py-2.5 cursor-pointer transition-all duration-200 font-medium text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 hover:border-primary hover:text-primary shadow-sm hover:shadow-md'>
            <LayoutGrid className='h-5 w-5' />
            <span>Kategorije</span>
            <ChevronDown className='h-4 w-4 opacity-60' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 max-h-[500px] overflow-y-auto" align="start">
          <div className="px-2 py-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sve kategorije</p>
          </div>
          <DropdownMenuSeparator />
          <div className="py-1">
            {categoryList?.map((cat) => {
              const iconUrl = getImageUrl(cat?.icon?.url);
              const categorySlug = getCategorySlug(cat);

              return (
                <Link href={`/kategorije/${categorySlug}`} key={cat.id || cat.name}>
                  <DropdownMenuItem className='flex gap-3 items-center cursor-pointer py-2.5 px-3 hover:bg-blue-50 transition-colors'>
                    {iconUrl ? (
                      <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={iconUrl}
                          fill
                          alt={`${cat?.name || 'category'} icon`}
                          className="object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {!iconUrl && (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                        )}
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                      {cat?.name}
                    </span>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CategoryDropdown;
