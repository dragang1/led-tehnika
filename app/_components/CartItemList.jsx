'use client';
import React, { useMemo } from 'react';
import { useCart } from '../_components/CartContext';
import Image from 'next/image';
import { Trash } from 'lucide-react';

const CartItemList = () => {
    const { cart, removeFromCart } = useCart();

    const getImageUrl = (url) => {
        if (!url) return '/default-image.jpg';
        return url.startsWith('http') ? url : '/default-image.jpg';
    };


    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity * (item.product.price || 0), 0);
    }, [cart]);

    return (
        <div>
            {cart?.length > 0 ? (
                <>
                    {cart.map((item) => {
                        const imageUrl = getImageUrl(item?.product?.image?.[0]?.url); // <-- OVO PROMIJENJENO

                        return (
                            <div key={item.product.id} className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-4">
                                    {/* Product Image */}
                                    <Image
                                        src={imageUrl}
                                        alt={item?.product?.image?.[0]?.alternativeText || item?.product?.name || "Nepoznat proizvod"}
                                        width={50}
                                        height={50}
                                        className="object-cover rounded-md"
                                    />

                                    {/* Product Details */}
                                    <div>
                                        <h2 className="font-bold">{item?.product?.name || "Nepoznat proizvod"}</h2>
                                        <p>{item?.quantity || 1} x {(item?.product?.price || 0).toFixed(2)} KM</p>
                                    </div>
                                </div>

                                {/* Price Section */}
                                <div className="font-bold">
                                    {(item?.quantity * (item?.product?.price || 0)).toFixed(2)} KM
                                </div>

                                {/* Remove Button */}
                                <button
                                    className="ml-4 p-2 rounded-full hover:bg-red-100"
                                    onClick={() => removeFromCart(item?.product?.id)}
                                >
                                    <Trash className="h-5 w-5 text-red-500" />
                                </button>
                            </div>
                        );
                    })}

                    {/* Total Price Section */}
                    <div className="flex justify-between p-4 border-t font-bold text-xl">
                        <span>Ukupno:</span>
                        <span>{totalPrice.toFixed(2)} KM</span>
                    </div>
                </>
            ) : (
                <p>Korpa je prazna.</p>
            )}
        </div>
    );
};

export default CartItemList;
