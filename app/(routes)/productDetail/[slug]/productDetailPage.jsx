'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LoaderCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";
import { useCart } from '../../../_components/CartContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import GlobalApi from '@/app/_utils/GlobalApi';

const ProductDetailPage = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [selectedImage, setSelectedImage] = useState(product?.image?.[0]?.url || '');
    const { addToCart } = useCart();

   
  const audioRef = useRef(null);

   useEffect(() => {
  const fetchRelated = async () => {
    if (!product?.kategorije?.name) return;

    try {
      const related = await GlobalApi.getProductsByCategory(
        product.kategorije.name,
        product.documentId
      );
      setRelatedProducts(related);
    } catch (error) {
     
    }
  };

  fetchRelated();
}, [product]);



    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    const productTotalPrice = product ? product.price * quantity : 0;

    const handleAddToCart = async () => {
        setLoading(true);

        const cartItem = {
            quantity: quantity,
            amount: productTotalPrice.toFixed(2),
            product: {
                ...product,
                id: product.id,
            }
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.product.documentId === product.documentId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].amount = cart[existingProductIndex].quantity * product.price;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        addToCart(cartItem);
        toast.success(`${product.name} je dodat u korpu!`);
        playSound();
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <motion.div 
        className='p-9 bg-white text-black mx-5 mt-5 border'
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
        
        
        >
<div className='flex flex-col md:flex-row items-center justify-between gap-8 px-4 sm:px-6 lg:px-0 max-w-screen-xl mx-auto'>
  {/* Slika proizvoda */}
  <div className='w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0'>
    {selectedImage && (
      <div className="relative w-full max-w-[400px] h-[400px] sm:h-[450px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={selectedImage}
          alt={product?.image?.[0]?.alternativeText || 'product image'}
          fill
          className='object-contain transition-transform duration-300 ease-in-out hover:scale-105'
          priority
        />
      </div>
    )}
  </div>

  {/* Detalji proizvoda */}
  <div className='w-full md:w-1/2 flex flex-col items-center md:items-start gap-6'>
    <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 text-center md:text-left leading-tight'>
      {product?.name}
    </h2>

<div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
      {product?.image?.map((image, index) => (
        <Image
          key={index}
          src={image.url}
          alt={image.alternativeText || 'image'}
          width={70}
          height={70}
          className={`h-[70px] w-[70px] object-cover cursor-pointer rounded-md transition-all
            ${selectedImage === image?.url ? 'ring-2 ring-blue-600 ring-offset-2' : 'ring-0'}
            hover:ring-2 hover:ring-blue-400 hover:ring-offset-2`}
          onClick={() => setSelectedImage(image?.url)}
        />
      ))}
    </div>
   
    <ReactMarkdown className='prose prose-sm sm:prose-base text-gray-600 max-w-full text-center md:text-left'>
      {product?.description}
    </ReactMarkdown>
      <div className="flex items-center gap-2">
      <CheckCircle2 className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-green-600 font-semibold text-base sm:text-lg">Na stanju</span>
    </div>


 
    
   

    
    <h2 className='font-bold text-2xl sm:text-4xl md:text-3xl text-gray-900 text-center md:text-left mt-4'>
      {product?.price?.toFixed(2)} KM
    </h2>

    <div className='flex flex-col items-center md:items-start gap-4 w-full max-w-xs'>
      <div className='w-full border-t border-gray-300 my-4' />

      <div className='flex gap-4 sm:gap-6 items-center w-full'>
        <div className='flex items-center gap-6 border rounded-md p-2 px-5'>
          <button
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
            className="text-lg sm:text-xl font-bold text-gray-700 disabled:text-gray-400 hover:text-blue-600 transition-colors"
          >
            −
          </button>
          <h2 className='text-xl sm:text-2xl font-semibold'>{quantity}</h2>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-lg sm:text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            +
          </button>
        </div>
        <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900 whitespace-nowrap'>
          = {(quantity * product?.price)?.toFixed(2)} KM
        </h2>
      </div>

      <Button
        className='flex gap-3 justify-center w-full bg-blue-600 hover:bg-blue-700 transition-colors text-base sm:text-lg py-3 rounded-md'
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? <LoaderCircle className='animate-spin' /> : <ShoppingCart />}
        {loading ? 'Dodavanje...' : 'Dodaj u korpu'}
      </Button>

      <audio ref={audioRef} src="/sounds/success-340660.mp3" preload="auto" />
    </div>

    <h2 className='mt-6 text-gray-700 text-sm sm:text-base'>
      <span className='font-semibold'>Kategorija:</span> {product?.kategorije?.name}
    </h2>
  </div>
</div>

            {relatedProducts.length > 0 && (
                <div className="mt-12 px-4 sm:px-6 lg:px-0 max-w-screen-xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
                        Slični proizvodi
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((item) => (
                            <Link key={item.documentId} href={`/productDetail/${item.slug}`}>
                                <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 overflow-hidden">
                                    <div className="relative w-full aspect-[4/3]">
                                        <Image
                                            src={item.image?.[0]?.url}
                                            alt={item.image?.[0]?.alternativeText || 'related product image'}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between p-4 flex-grow">
                                        <h4 className="text-center font-semibold text-base sm:text-lg text-gray-900">
                                            {item.name}
                                        </h4>
                                        <p className="font-bold text-center text-primary text-lg sm:text-xl mt-2">
                                            {item.price.toFixed(2)} KM
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ProductDetailPage;