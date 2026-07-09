'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/_components/CartContext';
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getImageUrl as resolveImageUrl } from '@/lib/getImageUrl';
import { LoaderCircle, CheckCircle2, ShoppingCart, User, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import Breadcrumbs from '@/app/_components/Breadcrumbs';
import { motion } from 'framer-motion';

const OrderForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
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

    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        const errors = {};
        const zipCodePattern = /^\d{5}$/; // Bosnia ZIP code: 5 digits
        const phonePattern = /^(\+387|0)?[1-9]\d{7,8}$/; // Bosnian phone number pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = 'Ime i prezime mora imati najmanje 2 karaktera';
        }

        if (!formData.address || formData.address.trim().length < 5) {
            errors.address = 'Adresa mora imati najmanje 5 karaktera';
        }

        if (!formData.city || formData.city.trim().length < 2) {
            errors.city = 'Grad je obavezan i mora imati najmanje 2 karaktera';
        }

        if (!formData.zip || !zipCodePattern.test(formData.zip)) {
            errors.zip = 'Poštanski broj mora imati tačno 5 cifara';
        }

        if (!formData.phone || !phonePattern.test(formData.phone.replace(/\s+/g, ''))) {
            errors.phone = 'Unesite validan broj telefona';
        }

        if (formData.email && !emailPattern.test(formData.email)) {
            errors.email = 'Unesite validnu email adresu';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        // Only validate silently for button state, don't show errors until submit
        const zipCodePattern = /^\d{5}$/;
        const phonePattern = /^(\+387|0)?[1-9]\d{7,8}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValid = 
            formData.name && formData.name.trim().length >= 2 &&
            formData.address && formData.address.trim().length >= 5 &&
            formData.city && formData.city.trim().length >= 2 &&
            formData.zip && zipCodePattern.test(formData.zip) &&
            formData.phone && phonePattern.test(formData.phone.replace(/\s+/g, '')) &&
            (!formData.email || emailPattern.test(formData.email));

        setIsFormValid(isValid);
    }, [formData]);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            toast.error('Vaša korpa je prazna. Dodajte proizvode prije narudžbe.');
            setTimeout(() => {
                router.push('/proizvodi');
            }, 2000);
        }
    }, [cart.length, router]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true); // Show errors only on submit attempt
        
        if (!validateForm()) {
            toast.error('Molimo popunite sva obavezna polja ispravno.');
            return;
        }

        if (cart.length === 0) {
            toast.error('Vaša korpa je prazna. Dodajte proizvode prije narudžbe.');
            router.push('/proizvodi');
            return;
        }

        setIsSubmitting(true);

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
            const response = await fetch('https://formspree.io/f/xeoqjwzn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: orderDetails,
                }),
            });

            if (response.ok) {
                toast.success('Narudžba je uspješno poslana!');
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
                // Clear cart after successful order
                localStorage.setItem('cart', JSON.stringify([]));
            } else {
                const errorData = await response.json();
                toast.error('Greška pri slanju narudžbe. Molimo pokušajte ponovo.');
            }
        } catch (error) {
            console.error('Order submission error:', error);
            toast.error('Došlo je do greške. Molimo pokušajte ponovo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const breadcrumbItems = [
        { label: 'Korpa', href: '/cartPage' },
        { label: 'Narudžba', href: '#' }
    ];

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="text-center py-12 bg-white rounded-xl shadow-lg mt-5">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Vaša korpa je prazna</h2>
                    <p className="text-gray-600 mb-6">Dodajte proizvode u korpu prije narudžbe.</p>
                    <Button onClick={() => router.push('/proizvodi')} className="bg-blue-600 hover:bg-blue-700">
                        Pregledaj proizvode
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <motion.div 
                className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 sm:p-6 max-w-7xl mx-auto mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Form Section */}
                <div className="flex-1 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Završite Vašu narudžbu</h1>
                        <p className="text-gray-600">Molimo popunite sve podatke za dostavu</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4" />
                                Ime i Prezime <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                    fieldErrors.name 
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2`}
                                placeholder="Unesite ime i prezime"
                            />
                            {showErrors && fieldErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                            )}
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4" />
                                Adresa <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                    fieldErrors.address 
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2`}
                                placeholder="Unesite adresu"
                            />
                            {showErrors && fieldErrors.address && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                            )}
                        </div>

                        {/* City and ZIP Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    Grad <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                        showErrors && fieldErrors.city 
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2`}
                                    placeholder="Unesite grad"
                                />
                                {showErrors && fieldErrors.city && (
                                    <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="zip" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    Poštanski broj <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    maxLength={5}
                                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                        fieldErrors.zip 
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    } focus:outline-none focus:ring-2`}
                                    placeholder="71000"
                                />
                                {showErrors && fieldErrors.zip && (
                                    <p className="mt-1 text-sm text-red-600">{fieldErrors.zip}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Phone className="w-4 h-4" />
                                Telefon <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                    fieldErrors.phone 
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2`}
                                placeholder="+387 61 123 456"
                            />
                            {showErrors && fieldErrors.phone && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Mail className="w-4 h-4" />
                                Email (opcionalno)
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                                    fieldErrors.email 
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2`}
                                placeholder="vas.email@primjer.com"
                            />
                            {showErrors && fieldErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="customMessage" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <MessageSquare className="w-4 h-4" />
                                Napomena
                            </label>
                            <textarea
                                id="customMessage"
                                name="customMessage"
                                value={formData.customMessage}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                placeholder="Dodatne napomene ili upute za dostavu..."
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!totalCartItems || !isFormValid || isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                                    Slanje narudžbe...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Završi narudžbu
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Success Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <DialogTitle className="text-2xl text-center">Hvala Vam!</DialogTitle>
                                <DialogDescription className="text-center text-base mt-2">
                                    Vaša narudžba je uspješno poslana. Kontaktiraćemo Vas uskoro.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-6 flex gap-3">
                                <Button
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        router.push('/proizvodi');
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    Nastavite kupovinu
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        router.push('/');
                                    }}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Početna
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Cart Summary Section */}
                <div className="w-full lg:w-96 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 sticky top-24 h-fit">
                    <div className="mb-6">
                        <Image 
                            src='/logo-black.png' 
                            width={180} 
                            height={90} 
                            alt='Led Tehnika logo' 
                            className="mx-auto"
                        />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-300">
                        Pregled narudžbe
                    </h3>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {cart.map((item, index) => {
                            const imageUrl = item.product.image?.[0]
                                ? resolveImageUrl(item.product.image[0])
                                : '/placeholder.png';

                            return (
                                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                        <Image
                                            src={imageUrl}
                                            alt={item.product.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                                            {item.product.name || 'Nepoznat proizvod'}
                                        </p>
                                        <p className="text-xs text-gray-600 mb-1">
                                            {item.product.price.toFixed(2)} KM × {item.quantity}
                                        </p>
                                        <p className="text-sm font-bold text-blue-600">
                                            {(item.quantity * item.product.price).toFixed(2)} KM
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Total Section */}
                    <div className="mt-6 pt-6 border-t-2 border-gray-300">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold text-gray-700">Ukupno:</span>
                            <span className="text-2xl font-bold text-blue-600">
                                {totalPrice.toFixed(2)} KM
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-4">
                            * Cijene su u konvertibilnim markama (KM)
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default OrderForm;
