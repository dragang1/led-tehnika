'use client'

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
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
import { useCart } from './CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import GlobalApi from '../_utils/GlobalApi';
import { useRouter } from 'next/navigation';

function MenuItems() {
    const router = useRouter();
    const { getTotalCartItems } = useCart();
    const totalCartItem = getTotalCartItems();
    const [categoryList, setCategoryList] = useState([]);
    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => {
            setCategoryList(res.data.data);
        });
    };

    useEffect(() => {
        getCategoryList();
    }, []);

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 md:hidden ">
            <div className="flex justify-between p-3 items-center">
                <Link href="/" className="flex flex-col items-center">
                    <Button variant="outline">Početna</Button>
                </Link>
                <div className="flex flex-col items-center">
                    <CategoryDropdown categoryList={categoryList} />
                </div>
                <div className="flex flex-col items-center">
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
                </div>
            </div>
        </footer>
    );
}

export default MenuItems;
