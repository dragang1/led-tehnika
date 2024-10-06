'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function ProductItemDetail({ product }) {
    const [productTotalPrice, setProductTotalPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(1)


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black '>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images[0]?.url} width={300} height={300} alt={product.name}
                className='h-[320px] w-[300px] object-contain'
            />
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.description}</h2>
                <h2 className='font-bold text-3xl'>{(product.price).toFixed(2)}KM</h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>

                        <div className='flex items-center gap-10 border p-2 px-5'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)} >+</button>
                        </div>
                        <h2 className='text-2xl font-bold'>=    {(quantity * productTotalPrice).toFixed(2)}KM</h2>
                    </div>
                    <Button className='flex gap-3'>
                        <ShoppingCart />
                        Dodaj u korpu
                    </Button>
                </div>
                <h2 ><span className='font-bold'>Kategorija: </span>{product.kategorije?.name}</h2>
            </div>

        </div>
    )
}

export default ProductItemDetail