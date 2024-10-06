import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function TopCategoryList({ categoryList, selectedCategory }) {
    return (
        <div className='flex justify-center gap-5 mt-2 overflow-auto items-center mx-7 md:mx-20'>
            {categoryList.map((cat, index) => (
                <Link href={'/kategorijes/' + cat.name} className={`flex flex-col items-center justify-center
         bg-blue-100 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-blue-300 w-[150px] min-w-[100px] ${selectedCategory === cat.name && ' bg-primary'} `} key={index}>
                    <Image
                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            cat?.icon[0]?.url} width={25} height={25} alt='icon'
                        className='group-hover:scale-125 transition-all ease-in-out '
                    />
                    <h2 className='text-blue-800' >{cat?.name}</h2>
                </Link>
            ))
            }
        </div >

    )
}

export default TopCategoryList