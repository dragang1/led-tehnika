import React from 'react'

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);



    function toggleMenu() {
        setIsOpen(!isOpen);

    }

    function handleClick() {
        if (isOpen) {
            setIsOpen(false)

        }
    }


    return (
        <div className='flex items-center justify-center flex-col p-5 bg-white'>

            <div className={`absolute top-0 left-0 cursor-pointer p-5 ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
                <div className='w-5 h-1 bg-black rounded-full mb-1'></div>
                <div className='w-5 h-1 bg-black rounded-full mb-1'></div>
                <div className='w-5 h-1 bg-black rounded-full mb-1'></div>
            </div>
            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-70 z-50 cursor-pointer ' onClick={toggleMenu}>
                    <div className=' min-w-full min-h-full flex  items-center justify-center '>
                        <div className='text-3xl text-white top-0 absolute left-0 p-5' onClick={toggleMenu}>X</div>




                        <ul className=' flex flex-col text-white gap-5  '>
                            <Link href={'/'}>
                                <li className={`hover:text-primary font-medium text-xl cursor-pointer `}>O nama</li>
                            </Link>
                            <Link href={'/cartPage'}>
                                <li className={`hover:text-primary font-medium text-xl cursor-pointer `} >Korpa</li>
                            </Link>
                            <li className='hover:text-primary font-medium text-xl cursor-pointer'>Kontakt</li>
                        </ul>
                    </div>


                </div>


            )}




        </div>
    )
}

export default BurgerMenu
