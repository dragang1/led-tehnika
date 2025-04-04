import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';


async function ProductCategory({ params }) {
    const categoryName = decodeURIComponent(params.categoryName.replace(/-/g, ' '));
    const productList = await GlobalApi.getProductsByCategory(categoryName);
    const categoryList = await GlobalApi.getCategoryList();
    return (
        <div>
            <h2 className="w-full text-center text-white font-bold text-xl md:text-3xl p-4 md:p-6 
               bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                {categoryName}
            </h2>





            <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />
            <div className='p-5 md:p-10'>

                <ProductList productList={productList} />
            </div>
        </div>
    )
}

export default ProductCategory