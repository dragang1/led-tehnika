'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail';
import Link from 'next/link';



function ProductItem({ product }) {
   



    return (


        <div className='p-2 md:p-6 flex flex-col items-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer' key={product.id}>
            {/* Image Section */}
            <div className='sm:w-[100px] md:w-[200px] h-[200px] flex items-center justify-center'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, '')}${product?.image?.[0]?.url}`}
                    width={200}
                    height={200}
                    alt={product.name}
                    className='object-contain' // Ensures image scales correctly
                />
            </div>

            {/* Text Section */}
            <div className='flex flex-col items-center justify-center w-full'>
                <h2 className='font-bold text-md text-center w-full mb-1' style={{ maxHeight: '3em', overflow: 'hidden' }}>
                    {product.name}
                </h2>
                <h2 className='font-bold text-lg text-primary text-center'>
                    {product.price}.00 KM
                </h2>

                {/* View Button */}
                <Link href={`/productDetail/${product?.documentId}`}>
                    <Button className='mt-2'>Pogledaj</Button> {/* Add some margin to separate it from the price */}
                </Link>





                {/* <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='outline' className='text-primary'>Pogledaj</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <ProductItemDetail product={product} />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> */}
            </div >
        </div >


    )
}

export default ProductItem