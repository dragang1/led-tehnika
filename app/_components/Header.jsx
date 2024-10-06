'use client'

import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import { useEffect, useState } from 'react'
import Link from 'next/link'


function Header() {
    const [categoryList, setCategoryList] = useState([]);




    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => {

            setCategoryList(res.data.data)
        })
    }

    useEffect(() => {
        getCategoryList()
    }, [])

    return (
        <div className='flex justify-between px-8 mb-2 p-3 '>

            <div className='flex gap-3'>
                <Link href={'/'}>

                    <Image src='/logo-black.png' width={200} height={100} alt='logo' />
                </Link>




                <DropdownMenu>
                    <DropdownMenuTrigger asChild><h2 className='md:flex hidden  gap-2 border rounded-full px-10 my-4 cursor-pointer  items-center  bg-slate-200'>
                        <LayoutGrid className='h-5 w-5' />Kategorije
                    </h2></DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuSeparator />
                        {categoryList.map((cat, index) => (
                            <Link href={'/kategorijes/' + cat.name}>

                                <DropdownMenuItem className='flex gap-2 items-center cursor-pointer' key={index}>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                                            cat?.icon[0]?.url} width={25} height={25} alt='icon' />
                                    <h2 >{cat?.name}</h2>
                                </DropdownMenuItem>
                            </Link>

                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex hidden gap-2 items-center border  px-10 rounded-full my-4'>
                    <Search />
                    <input type='text' placeholder='Search..' className='outline-none' />
                </div>
            </div>



            <div className='flex items-center gap-5'>
                <h2 className='flex items-center gap-1'>
                    <ShoppingCart className='h-5 w-5' />
                    0
                </h2>
                <Button variant='outline'>Proizvodi</Button>
                <Button>Kontakt</Button>

            </div>
        </div>

    )
}

export default Header