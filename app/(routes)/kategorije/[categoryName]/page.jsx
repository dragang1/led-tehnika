import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';


async function ProductCategory({ params }) {
    const categoryName = decodeURIComponent(params.categoryName.replace(/-/g, ' '));
    const productList = await GlobalApi.getProductsByCategory(categoryName);
    const categoryList = await GlobalApi.getCategoryList();
    return (
        <div className="px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
            <h2 className="w-full text-center text-white font-semibold text-lg md:text-2xl py-3 md:py-4 px-4 
    bg-gradient-to-r from-blue-600 to-indigo-500 rounded-md shadow-md tracking-wide">
                {categoryName}
            </h2>

<div className="hidden sm:block">
    <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />
</div>

            <div className="py-5 md:py-10">
                <ProductList productList={productList} />
            </div>
        </div>

    )
}

export default ProductCategory