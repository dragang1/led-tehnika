


import ProductItem from './ProductItem'


function ProductList({ productList }) {

    return (
        <div>
            <h2 className='text-primary font-bold text-2xl mt-5' >Popularni Proizvodi</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-4  '>

                {productList.map((product, index) => index < 4 && (
                    <ProductItem product={product} />



                ))}
            </div>
        </div>
    )
}

export default ProductList