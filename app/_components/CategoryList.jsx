import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CategoryList({ categoryList }) {
    return (
        <div>
            <h2 className='text-primary font-bold text-2xl mt-5'>Pretraži po kategoriji</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-2 sm:p-2'>
                {categoryList.map((cat) => {
                    const imageUrl = cat?.icon?.url;

                    return (
                        <Link
                            href={`/kategorije/${cat.name}`}
                            className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer group"
                            key={cat.id}
                        >
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={cat?.name || 'category icon'}
                                    className="group-hover:scale-110 transition-transform duration-300"
                                />
                            ) : (
                                // Fallback image or placeholder when imageUrl is not available
                                <div className="w-full h-full bg-gray-300" />
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h2 className="text-white text-lg font-bold">{cat?.name}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryList;
