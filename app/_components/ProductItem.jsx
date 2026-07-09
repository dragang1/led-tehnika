'use client'
import { useCart } from '@/app/_components/CartContext'
import { getCategorySlug } from '@/lib/cms/utils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getImageUrl } from '@/lib/getImageUrl'

function ProductItem({ product }) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Data is already flattened - no attributes wrapper
  const name = product.name || 'Nepoznat proizvod'
  const price = product.price || 0
  const productSlug = product.slug || 'nepoznat-proizvod'

  // Kategorija - data is already flattened, kategorije is an object with name (no slug)
  const category = product.kategorije || {}
  const categoryName = category.name || ''
  const categorySlug = getCategorySlug(category) || 'nepoznata-kategorija'

  // Slika - API uses 'image' not 'images'
  const imageData = product.image?.[0] || {}
  const imageUrl = imageData.url ? getImageUrl(imageData) : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const cartItem = {
      quantity: 1,
      amount: price.toFixed(2),
      product: { ...product },
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingIndex = cart.findIndex(item => {
      const itemId = item.product?.documentId || item.product?.id
      return itemId === (product.documentId || product.id)
    })

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1
      cart[existingIndex].amount = (cart[existingIndex].quantity * price).toFixed(2)
    } else {
      cart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    addToCart(cartItem)
    toast.success(`${name} je dodat u korpu!`)
  }

  const productUrl = `/kategorije/${categorySlug}/${productSlug}`

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(productUrl)
  }

  if (!mounted) {
    // Return a non-interactive version during SSR to prevent hydration mismatch
    return (
      <div className="group relative w-full h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary/30">
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              quality={75}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <p className="text-xs text-gray-500">Nema slike</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 h-[3rem] leading-tight">
            {name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary">
              {price.toFixed(2)} KM
            </span>
            {categoryName && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {categoryName}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative w-full h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary/30">
      {/* Sadržaj kartice (samo prikaz) */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            quality={75}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs text-gray-500">Nema slike</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Eye className="w-4 h-4 text-gray-700" />
          </div>
        </div>
      </div>
      <div className="relative z-0 bg-white px-4 pt-4 pb-2 flex-shrink-0">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 min-h-[3rem] leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
      <div className="p-4 pt-2 flex flex-col flex-grow relative z-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">
            {price.toFixed(2)} KM
          </span>
          {categoryName && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {categoryName}
            </span>
          )}
        </div>
      </div>

      {/* Dugmad kao sibling linka, z-10 da budu iznad linka i klikabilna */}
      <div className="relative z-10 p-4 pt-0 flex gap-2 mt-auto">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm py-2 h-auto"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Dodaj
        </Button>
        <button
          onClick={handleQuickView}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:border-primary hover:bg-primary/5 transition-colors text-sm text-gray-700 hover:text-primary"
          aria-label="Pregledaj proizvod"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Cijela kartica klikabilna – jedan link kao sloj (z-[1] ispod dugmadi) */}
      <Link
        href={productUrl}
        className="absolute inset-0 z-[1]"
        aria-label={`Pogledaj proizvod: ${name}`}
      />
    </div>
  )
}

export default ProductItem
