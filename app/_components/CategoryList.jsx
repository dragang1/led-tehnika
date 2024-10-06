
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({ categoryList }) {
    return (
        <div>
            <h2 className='text-primary font-bold text-2xl mt-5'>Pretraži po kategoriji</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-2'>
                {categoryList.map((cat, index) => (
                    <Link href={'/kategorijes/' + cat.name} className='flex flex-col items-center justify-center
                     bg-blue-100 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-blue-300  ' key={index}>
                        <Image
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                                cat?.icon[0]?.url} width={25} height={25} alt='icon'
                            className='group-hover:scale-125 transition-all ease-in-out '
                        />
                        <h2 className='text-blue-800' >{cat?.name}</h2>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export default CategoryList