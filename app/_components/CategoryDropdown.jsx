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
                    {categoryList?.map((cat) => {
                        // Directly use the icon URL from Strapi (Cloudinary URL is already provided)
                        const iconUrl = cat?.icon?.url || null; // If iconUrl is falsy, use null

                        return (
                            <Link href={'/kategorije/' + cat.name} key={cat.id || cat.name}>
                                <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                                    {iconUrl ? (
                                        <Image
                                            src={iconUrl} // Cloudinary URL or any other valid URL
                                            width={25}
                                            height={25}
                                            alt={`${cat?.name || 'category'} icon`} // More descriptive alt text
                                        />
                                    ) : (
                                        // Placeholder if iconUrl is not available
                                        <div className="w-6 h-6 bg-gray-300 rounded-full" />
                                    )}
                                    <h2>{cat?.name}</h2>
                                </DropdownMenuItem>
                            </Link>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default CategoryDropdown;
