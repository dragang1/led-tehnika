'use client'; // Directive to indicate this component is a client component

import { Button } from '@/components/ui/button';
import { LoaderCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from "sonner";
import { useCart } from './CartContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useRef } from 'react';


function ProductItemDetail({ product }) {





    const { addToCart } = useCart();
    const [productTotalPrice, setProductTotalPrice] = useState(product?.price);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product?.image[0]?.url); // State for the currently selected image



    const handleAddToCart = () => {
        setLoading(true);

        const cartItem = {
            quantity: quantity,
            amount: (quantity * productTotalPrice).toFixed(2),
            product: product // store full product data locally
        };

        // Retrieve existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingProductIndex > -1) {
            // Update quantity and amount if product already exists
            cart[existingProductIndex].quantity += quantity; // Increase the quantity
            cart[existingProductIndex].amount = cart[existingProductIndex].quantity * productTotalPrice; // Update the amount
        } else {
            // Add new product to the cart
            cart.push(cartItem);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        addToCart(cartItem);

        // Feedback to user
toast.success('Dodano u korpu'),
playSound();


setTimeout(() => {
  setLoading(false);
}, 500);

    };
    const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // resetuj na početak
      audioRef.current.play();
    }
  };



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black mx-5'>
            {/* Display the selected image */}
            <Image
                src={image.url}
                alt={image.alternativeText || 'image'}
                width={300}
                height={300}

                className='h-[200px] w-[300px] object-contain md:h-[320px] md:w-[300px]' // Smaller height on mobile
            />

            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product?.name}</h2>
                <ReactMarkdown className='text-sm text-gray-500'>{product?.description}</ReactMarkdown>
                <h2 className='font-bold text-3xl'>{product?.price}KM</h2>

                {/* Thumbnails for additional images */}
                <div className='flex gap-2 mt-4 overflow-x-auto scrollbar-hide'>
                    {product?.im?.map((image, index) => (
                        <Image
                            key={index}
                            src={image.url}
                            alt={image.alternativeText || 'image'}
                            width={80}
                            height={80}

                            className={`h-[60px] w-[60px] object-cover cursor-pointer ${selectedImage === image.url ? 'border-2 border-blue-500' : ''}`} // Smaller thumbnail size on mobile
                            onClick={() => setSelectedImage(image.url)} // Update selected image on click
                        />
                    ))}
                </div>

                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='flex items-center gap-10 border p-2 px-5'>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'>= {quantity * productTotalPrice}KM</h2>
                    </div>
                    <Button className='flex gap-3' onClick={handleAddToCart} disabled={loading} >
                        <ShoppingCart />
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Dodaj u korpu'}
                    </Button>
            <audio ref={audioRef} src="/sounds/success-340660.mp3" preload="auto" />
                    <Link href={`/productDetail/${product?.documentId}`}>
                        <Button>Pogledaj</Button>
                    </Link>

                </div>
                <h2><span className='font-bold'>Kategorija: </span>{product?.kategorije?.name}</h2>
            </div>
        </div>
    );
}

export default ProductItemDetail;
