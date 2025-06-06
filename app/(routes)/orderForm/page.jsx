'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../_components/CartContext'; // Adjust path as needed
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const OrderForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const { cart, getTotalCartItems } = useCart();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        zip: '',
        phone: '',
        customMessage: '',
        city: ''
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    const router = useRouter();

    const totalCartItems = getTotalCartItems();
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.product.price, 0);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const zipCodePattern = /^\d{5}(-\d{4})?$/; // Regex for ZIP code validation
        const phonePattern = /^\d{7,15}$/; // Regex for phone number (minimum 7 digits, maximum 15)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

        if (
            !formData.name ||
            !formData.address ||
            !formData.zip ||
            !formData.phone ||
            !zipCodePattern.test(formData.zip) || // Invalid ZIP code
            !phonePattern.test(formData.phone) || // Invalid phone number
            (formData.email && !emailPattern.test(formData.email)) // Invalid email if provided
        ) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            toast.error('Please fill out all required fields correctly.');
            return; // Prevent the dialog from being opened if the form is invalid
        }

        if (cart.length === 0) {
            toast.error('Your cart is empty. Add products before submitting.');
            return;
        }

        // Gather order details as plain text for Formspree
        const orderDetails = `Ime kupca: ${formData.name}
        Grad: ${formData.city}
        Ulica: ${formData.address}
        Poštanski broj:${formData.zip}
        Telefon: ${formData.phone}
        Email: ${formData.email}
        Napomena: ${formData.customMessage}
        Naručeni proizvodi:
        ${cart.map(item => `${item.product.name}: ${item.quantity} Kom = ${item.product.price.toFixed(2)} KM`).join('\n')}
        Ukupno za platiti: ${totalPrice.toFixed(2)}KM`;

        const payload = {
            name: formData.name,
            email: formData.email,
            message: orderDetails,
        };

        try {
            const response = await fetch('https://formspree.io/f/xeoqjwzn', { // Ensure this is the correct endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: orderDetails, // Send order details as a message
                }),
            });

            if (response.ok) {
                toast.success('Order email sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    address: '',
                    city: '',
                    zip: '',
                    phone: '',
                    customMessage: ''
                });
                setIsDialogOpen(true); 
            } else {
                const errorData = await response.json(); 
               
                toast.error('Failed to send order details. Please try again later.');
            }
        } catch (error) {
           
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-6 max-w-6xl mx-auto bg-white rounded-lg mt-5"> {/* Increased max-width */}
            {/* Form Section with larger width */}
            <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Završite Vašu narudžbu</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ime i Prezime <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresa <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Grad</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Poštanski broj <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (opcionalno)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">Napomena</label>
                        <textarea
                            id="customMessage"
                            name="customMessage"
                            value={formData.customMessage}
                            onChange={handleInputChange}
                            rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                type="submit"
                                disabled={!totalCartItems || !isFormValid}
                            >
                                Završi narudžbu
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Hvala!</DialogTitle>
                                <DialogDescription>
                                    Vaša narudžba je uspješna.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </form>
            </div>

            {/* Larger Simple Cart Item Card Section */}
            <div className="p-8 bg-white rounded-lg shadow-md border border-gray-200 flex-1"> {/* Increased padding and flex-1 */}
                <Image src='/logo-black.png' width={200} height={100} alt='logo' className="mx-auto mb-6" />

                {cart.length > 0 ? (
                    <ul className="space-y-4">
                        {cart.map((item, index) => {
                            const imageUrl = item.product.image?.[0]?.url
                                ? item.product.image[0].url.startsWith('http')
                                    ? item.product.image[0].url
                                    : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL?.replace(/\/$/, '')}${item.product.image[0].url}`
                                : '/path/to/placeholder-image.png';

                            return (
                                <li key={index} className="flex items-center gap-4 border-b pb-4">
                                    <Image
                                        src={imageUrl}
                                        alt={item.product.name}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-md"
                                    />

                                    <div className="flex-1">
                                        <p className="text-lg font-semibold">{item.product.name || 'Nepoznat proizvod'}</p>
                                        <p className="text-sm text-gray-600">Cijena po komadu: <span className="font-medium">{item.product.price.toFixed(2)} KM</span></p>
                                        <p className="text-sm text-gray-600">Količina: <span className="font-medium">{item.quantity}</span></p>
                                    </div>

                                    <p className="text-lg font-semibold text-gray-900">
                                        {(item.quantity * item.product.price).toFixed(2)} KM
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">Vaša korpa je prazna.</p>
                )}

                {/* Total Section */}
                <div className="mt-6 flex justify-between font-semibold text-lg text-gray-900">
                    <p>Ukupno :</p>
                    <p>{totalPrice.toFixed(2)} KM</p>
                </div>
            </div>
        </div>



    );
};

export default OrderForm;
