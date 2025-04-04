'use client'; // Ensure this is a client component

import React from 'react';
import { useCart } from '../../_components/CartContext'; // Adjust this path based on your folder structure

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function CartPage() {
    const { cart, removeFromCart } = useCart();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        toast('Item removed from the cart');
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
    };

    if (cart.length === 0) {
        return <div>Tvoja korpa je prazna.</div>;
    }

    return (
        <div className='p-7 bg-white text-black'>
            <h1 className='text-3xl font-bold mb-5'>Your Cart</h1>
            <div className='grid grid-cols-1 gap-5'>
                {cart.map((item) => (
                    <div key={item.product.id} className='flex items-center gap-5 border p-5'>
                        <Image
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.product.images[0]?.url}
                            width={100}
                            height={100}
                            alt={item.product.name}
                            className='object-contain'
                        />
                        <div className='flex flex-col'>
                            <h2 className='text-xl font-bold'>{item.product.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {item.product.price.toFixed(2)} KM</p>
                            <p>Total: {item.amount} KM</p>
                        </div>
                        <Button className='ml-auto' onClick={() => handleRemoveFromCart(item.product.id)}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <h2 className='text-2xl font-bold mt-5'>Total: {getTotalPrice()} KM</h2>
        </div>
    );
}

export default CartPage;
