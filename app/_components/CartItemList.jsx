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
                              <div key={item.product.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 gap-3">
    {/* Left: Image + Details */}
    <div className="flex items-center gap-4">
      <Image
        src={imageUrl}
        alt={
          item?.product?.image?.[0]?.alternativeText ||
          item?.product?.name ||
          "Nepoznat proizvod"
        }
        width={50}
        height={50}
        className="object-cover rounded-md"
      />

      <div>
        <h2 className="font-bold">{item?.product?.name || "Nepoznat proizvod"}</h2>
        <p>
          {item?.quantity || 1} x {(item?.product?.price || 0).toFixed(2)} KM
        </p>
      </div>
    </div>

    {/* Right: Price + Remove Button */}
    <div className="flex justify-between sm:justify-end items-center gap-4 mt-2 sm:mt-0">
      <div className="font-bold whitespace-nowrap min-w-[70px] text-right">
        {(item?.quantity * (item?.product?.price || 0)).toFixed(2)} KM
      </div>
      <button
        className="p-2 rounded-full hover:bg-red-100"
        onClick={() => removeFromCart(item?.product?.id)}
      >
        <Trash className="h-5 w-5 text-red-500" />
      </button>
    </div>
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
