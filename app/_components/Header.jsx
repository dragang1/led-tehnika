"use client";

import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
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
                    <Link href="/ledTehnika" className="text-gray-700 hover:text-primary transition font-medium">
                        Ko smo mi?
                    </Link>
                    <Link href="/proizvodi" className="text-gray-700 hover:text-primary transition font-medium">
                        Artikli
                    </Link>
                    <Link href="/kontakt" className="text-gray-700 hover:text-primary transition font-medium">
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
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleMenu}
      />

      {/* Slide-in Panel */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleMenu}
      />

      {/* Slide-in Panel */}
      <motion.div
        className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 p-6 shadow-2xl rounded-l-3xl border-l border-gray-200 bg-gradient-to-b from-white to-blue-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-blue-100 transition focus:outline-none"
            aria-label="Zatvori meni"
          >
            <X size={28} className="text-blue-600 hover:text-blue-800 transition" />
          </button>
        </div>

        {/* Logo & Opis */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Led Tehnika</h2>
          <p className="text-sm text-gray-600 mt-1">
            Stručnjaci za rasvjetu, automatiku i grijanje.
          </p>
          <hr className="my-4 border-blue-100" />
        </div>

        {/* Navigation Links */}
        <motion.nav
          className="flex flex-col gap-5 text-lg font-medium text-gray-800"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Link
              href="/ledTehnika"
              onClick={toggleMenu}
              className="hover:text-blue-600 transition"
            >
              O nama
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Link
              href="/proizvodi"
              onClick={toggleMenu}
              className="hover:text-blue-600 transition"
            >
              Artikli
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Link
              href="/kontakt"
              onClick={toggleMenu}
              className="hover:text-blue-600 transition"
            >
              Kontakt
            </Link>
          </motion.div>
        </motion.nav>

        {/* Footer (optional) */}
        <div className="mt-10 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Led Tehnika
        </div>
      </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
