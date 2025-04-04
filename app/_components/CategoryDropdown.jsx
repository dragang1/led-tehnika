import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function CategoryDropdown({ categoryList }) {
    return (
        <div className='md:flex'>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <h2 className='flex gap-2 border rounded-full px-10 p-2 my-4 cursor-pointer items-center bg-slate-200'>
                        <LayoutGrid className='h-5 w-5' />Kategorije
                    </h2>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    {categoryList?.map((cat, index) => {
                        console.log('Category:', cat); // To inspect the category data
                        const iconUrl = cat?.icon?.url;
                        const fullImageUrl = iconUrl
                            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, '')}${iconUrl}`
                            : '/path/to/placeholder-image.png'; // Fallback image

                        console.log("Generated Image URL:", fullImageUrl);  // Log the full image URL for debugging

                        return (
                            <Link href={'/kategorije/' + cat.name} key={index}>
                                <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                                    <Image
                                        src={fullImageUrl}
                                        width={25}
                                        height={25}
                                        alt={cat?.name || 'icon'} // Fallback alt text
                                    />
                                    <h2>{cat?.name}</h2>
                                </DropdownMenuItem>
                            </Link>
                        );
                    })}


                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CategoryDropdown;
