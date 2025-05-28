


import ProductItem from './ProductItem'


function ProductList({ productList }) {

    return (
        <div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-4  '>

                {productList.map((product, index) => index < 8 && (
                    <ProductItem product={product} key={index} />



                ))}
            </div>
        </div>
    )
}

export default ProductList


