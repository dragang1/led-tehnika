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
import Burgermenu from './Burgermenu';
import CategoryDropdown from './CategoryDropdown';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Initialize as false
    const [categoryList, setCategoryList] = useState([]);
    const { getTotalCartItems } = useCart(); // Get cart items from context
    const totalCartItem = getTotalCartItems();
    const router = useRouter();

    // Fetch category list
    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => {
            setCategoryList(res.data.data);
        });
    };

    useEffect(() => {
        // Set the isMobile state based on window width (client-side only)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check initial size on mount
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getCategoryList();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <header className="bg-white py-3 shadow-sm">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Link href={'/'}>
                    <Image src='/logo-black.png' width={200} height={100} alt='logo' />
                </Link>

                <div className="flex flex-1 items-center md:justify-between">
                    <div className='hidden sm:flex'>
                        <CategoryDropdown categoryList={categoryList} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger>
                                <h2 className='flex items-center gap-1'>
                                    <ShoppingCart className='h-5 w-5' />
                                    <span className='bg-primary rounded-full text-white px-2'>{totalCartItem}</span>
                                </h2>
                            </SheetTrigger>
                            <SheetContent className='flex flex-col h-full'>
                                <SheetHeader>
                                    <SheetTitle>Moja Korpa</SheetTitle>
                                </SheetHeader>
                                <div className='flex-grow overflow-y-auto'>
                                    <SheetDescription>


                                        <CartItemList />
                                    </SheetDescription>
                                </div>
                                {totalCartItem > 0 && (
                                    <SheetClose>
                                        <Button className='w-full' onClick={() => router.push('/orderForm')}>Naruči</Button>
                                    </SheetClose>
                                )}
                            </SheetContent>
                        </Sheet>

                        <div className="md:flex sm:gap-4 hidden">
                            <Link href={'/products'}>
                                <Button variant='outline'>Artikli</Button>
                            </Link>
                            <Link href={'/contact'}>
                                <Button>Kontakt</Button>
                            </Link>
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Render mobile menu only on the client side */}
                        {typeof window !== "undefined" && menuOpen && isMobile && (
                            <div className='fixed inset-0 bg-black bg-opacity-70 z-50 cursor-pointer' onClick={toggleMenu}>
                                <div className='min-w-full min-h-full flex items-center justify-center'>
                                    <div className='text-3xl text-white top-0 absolute left-0 p-5' onClick={toggleMenu}>X</div>
                                    <ul className='flex flex-col text-white gap-5'>
                                        <Link href={'/'}>
                                            <li className='hover:text-primary font-medium text-xl cursor-pointer'>O nama</li>
                                        </Link>
                                        <Link href={'/cartPage'}>
                                            <li className='hover:text-primary font-medium text-xl cursor-pointer'>Korpa</li>
                                        </Link>
                                        <li className='hover:text-primary font-medium text-xl cursor-pointer'>Kontakt</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;