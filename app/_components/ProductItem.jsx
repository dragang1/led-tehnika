'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/app/_components/CartContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'

function ProductItem({ product }) {
    const router = useRouter()
    const { addToCart } = useCart()

    const image = product?.image?.[0]
    const imageUrl = image?.formats?.small?.url || image?.url

    const handleAddToCart = (e) => {
        e.stopPropagation() // sprečava klik na kart da otvori detalje

        const cartItem = {
            quantity: 1,
            amount: product.price.toFixed(2),
            product: {
                ...product,
                documentId: product.documentId,
            }
        }

        // Uzmi postojeci cart iz localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []

        const existingProductIndex = cart.findIndex(
            item => item.product.documentId === product.documentId
        )

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1
            cart[existingProductIndex].amount = (
                cart[existingProductIndex].quantity * product.price
            ).toFixed(2)
        } else {
            cart.push(cartItem)
        }

        // Spremi ažurirani cart
        localStorage.setItem('cart', JSON.stringify(cart))

        // Pozovi kontekstualnu metodu da ažurira UI
        addToCart(cartItem)

        // Prikazi toast
        toast.success(`${product.name} je dodat u korpu!`)
    }

    const goToProductPage = () => {
        router.push(`/productDetail/${product.documentId}`)
    }

    return (
        <div
            key={product.id}
            onClick={goToProductPage}
            className="w-full max-w-[250px] min-h-[360px] p-4 flex flex-col items-center justify-between gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer"
        >
            {/* Image Section */}
            <div className="w-full h-[180px] flex items-center justify-center">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={image?.alternativeText || 'Product image'}
                        width={180}
                        height={180}
                        className="object-contain max-h-full"
                    />
                ) : (
                    <div className="text-red-500 text-sm">Nema slike</div>
                )}
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center justify-center w-full text-center px-2">
                <h2 className="font-bold text-md w-full mb-1 line-clamp-2">
                    {product.name}
                </h2>

                <h2 className="font-bold text-lg text-primary">
                    {product.price.toFixed(2)} KM
                </h2>

                <Button className="mt-3" onClick={handleAddToCart}>
                    Dodaj u korpu
                </Button>
            </div>
        </div>
    )
}

export default ProductItem
