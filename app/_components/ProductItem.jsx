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
import ProductItemDetail from './ProductItemDetail'


function ProductItem({ product }) {
    return (


        <div className='p-2 md:p-6 flex flex-col items-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer' key={product.id}>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.images[0]?.url} width={500} height={200} alt={product.name}

                className='w-[200px] h-[200px] object-contain' />
            <div className='flex flex-col items-center justify-center gap-2 '>

                <h2 className=' font-bold text-lg' >{product.name}</h2>
                <h2 className='font-bold text-lg'>{product.price}.00 KM</h2>
                {/* <p>{product.description}</p> */}

                <Dialog>
                    <DialogTrigger asChild><Button variant='outline' className='text-primary'  >Dodaj u korpu</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>

                            <DialogDescription>
                                <ProductItemDetail product={product} />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </div>

    )
}

export default ProductItem