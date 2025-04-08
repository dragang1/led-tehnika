'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function ProductItem({ product }) {
    const image = product?.image?.[0]; // Get the first image (if it exists)

    // Select the 'small' format image for the product list
    const imageUrl = image?.formats?.small?.url || image?.url; // Default to large if no small format

    return (
        <Link href={`/productDetail/${product?.documentId}`}>
            <div className="p-2 md:p-6 flex flex-col items-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer" key={product.id}>
                {/* Image Section */}
                <div className="sm:w-[100px] md:w-[200px] h-[200px] flex items-center justify-center">
                    {imageUrl && (
                        <Image
                            src={imageUrl} // Use the image URL, either small or large
                            alt={image.alternativeText || 'Product image'} // Fallback if no alt text
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    )}
                </div>

                {/* Text Section */}
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="font-bold text-md text-center w-full mb-1" style={{ maxHeight: '3em', overflow: 'hidden' }}>
                        {product.name}
                    </h2>
                    <h2 className="font-bold text-lg text-primary text-center">
                        {product.price}.00 KM
                    </h2>

                    <Button className="mt-2">Pogledaj</Button>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
