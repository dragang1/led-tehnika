"use client";

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import GlobalApi from '../_utils/GlobalApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from './CartItemList';
import { useRouter } from 'next/navigation';
import CategoryDropdown from './CategoryDropdown';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const { getTotalCartItems } = useCart();
    const totalCartItem = getTotalCartItems();
    const router = useRouter();

    useEffect(() => {
        GlobalApi.getCategory().then(res => {
            setCategoryList(res.data.data);
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <header className="bg-white py-4 shadow-md fixed top-0 left-0 right-0 z-50 ">
            <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 ">
                {/* Logo */}
                <Link href="/">
                    <Image src="/logo-black.png" width={250} height={120} alt="Logo" className='object-contain' />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <CategoryDropdown categoryList={categoryList} />
                    <Link href="/products" className="text-gray-700 hover:text-primary transition font-medium">
                        Artikli
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-primary transition font-medium">
                        Kontakt
                    </Link>
                </div>

                {/* Cart and Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger>
                            <div className="relative cursor-pointer text-gray-700 hover:text-primary transition">
                                <ShoppingCart className="w-6 h-6" />
                                {totalCartItem > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {totalCartItem}
                                    </span>
                                )}
                            </div>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col h-full">
                            <SheetHeader>
                                <SheetTitle>Moja Korpa</SheetTitle>
                            </SheetHeader>
                            <div className="flex-grow overflow-y-auto mt-4">
                                <SheetDescription>
                                    <CartItemList />
                                </SheetDescription>
                            </div>
                            {totalCartItem > 0 && (
                                <SheetClose>
                                    <Button className="w-full mt-4" onClick={() => router.push('/orderForm')}>
                                        Naruči
                                    </Button>
                                </SheetClose>
                            )}
                        </SheetContent>
                    </Sheet>

                    {/* Burger */}
                    <button
                        className="block md:hidden text-gray-700 hover:text-primary p-2 transition"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && isMobile && (
                    <>
                        {/* Dark Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                        />

                        {/* Slide-in Panel */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-3/4 bg-white z-50 p-6 shadow-lg"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <div className="flex justify-end mb-4">
                                <button
                                    className="text-gray-600 hover:text-primary text-3xl"
                                    onClick={toggleMenu}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col gap-6 text-lg font-semibold text-gray-700">
                                <Link href="/" onClick={toggleMenu}>
                                    O nama
                                </Link>
                                <Link href="/products" onClick={toggleMenu}>
                                    Artikli
                                </Link>
                                <Link href="/contact" onClick={toggleMenu}>
                                    Kontakt
                                </Link>
                                <Link href="/cartPage" onClick={toggleMenu}>
                                    Korpa
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
