import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function TopCategoryList({ categoryList, selectedCategory }) {
    return (
        <div className="flex justify-center gap-5 mt-2 overflow-auto items-center mx-7 md:mx-20">
            {categoryList.map((cat, index) => {

                const iconUrl = cat.icon?.url || '/path/to/placeholder-image.png';

                return (
                    <Link
                        href={'/kategorije/' + cat.name}
                        key={index}
                        className={`relative w-[150px] min-w-[100px] h-[100px] rounded-lg overflow-hidden cursor-pointer group 
                    ${selectedCategory === cat.name ? 'bg-primary' : 'bg-blue-100 hover:bg-blue-300'}`}
                    >
                        {/* Full-size Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src={iconUrl}
                                alt={cat?.name || 'icon'}
                                layout="intrinsic"
                                width={150}
                                height={100}

                                className="group-hover:scale-110 transition-transform duration-300 object-contain"
                            />
                        </div>

                        {/* Overlay & Centered Text */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h2 className="text-white text-sm font-bold">{cat?.name}</h2>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default TopCategoryList;
