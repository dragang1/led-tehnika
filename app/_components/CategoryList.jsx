
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({ categoryList }) {

    return (
        <div>
            <h2 className='text-primary font-bold text-2xl mt-5'>Pretraži po kategoriji</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-2 sm:p-2'>
                {categoryList.map((cat, index) => {

                    const iconUrl = cat?.icon?.url;
                    const fullImageUrl = iconUrl
                        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, '')}${iconUrl}`
                        : '/path/to/placeholder-image.png'; // Fallback image



                    return (
                        <Link
                            href={'/kategorije/' + cat.name}
                            className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer group"
                            key={index}
                        >
                            {/* Full-size Image */}
                            <Image
                                src={fullImageUrl}
                                layout="fill"
                                objectFit="cover"
                                alt={cat?.name || 'icon'} // Fallback alt text
                                className="group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* Overlay & Text */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <h2 className="text-white text-lg font-bold">{cat?.name}</h2>
                            </div>
                        </Link>

                    );
                })}

            </div>


        </div>
    )
}

export default CategoryList
