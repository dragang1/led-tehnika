"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isMounted, setIsMounted] = useState(false); 

    useEffect(() => {
       
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        setIsMounted(true); 
    }, []);

    useEffect(() => {
        
        if (isMounted) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isMounted]);

    const addToCart = (item) => {
        // Check if the item already exists in the cart
        const existingProductIndex = cart.findIndex(cartItem => cartItem.product.id === item.product.id);
        if (existingProductIndex > -1) {
            // Update quantity if product already exists
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += item.quantity;
            updatedCart[existingProductIndex].amount = (updatedCart[existingProductIndex].quantity * item.product.price).toFixed(2);
            setCart(updatedCart);
        } else {
            // Add new product to the cart
            setCart([...cart, item]);
        }
    };

    const getTotalCartItems = () => {
        // Count distinct products in the cart
        return cart.length;
    };

    const getTotalQuantity = () => {
        // Sum up the quantities of all products in the cart
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.product.id !== productId);
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getTotalCartItems, removeFromCart, getTotalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};