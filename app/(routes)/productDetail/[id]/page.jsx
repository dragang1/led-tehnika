'use client';

import GlobalApi from '@/app/_utils/GlobalApi';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";
import { useCart } from '../../../_components/CartContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            console.log("Current product ID:", id);

            try {
                const productData = await GlobalApi.getProductById(id);
                setProduct(productData);
                setSelectedImage(productData.image?.[0]?.url || '');  // Handling case when image array is empty

                if (productData?.kategorije?.name) {
                    fetchRelatedProducts(productData.kategorije.name, productData.documentId);
                }

                if (productData?.name) {
                    document.title = productData.name;
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }

            return () => { document.title = 'Led Tehnika'; };
        };

        console.log("Fetching product with documentId:", id);
        fetchProduct();
    }, [id]);

    const fetchRelatedProducts = async (categoryName, productDocumentId) => {
        try {
            console.log("Fetching related products for category:", categoryName);

            const relatedProductsData = await GlobalApi.getProductsByCategory(categoryName);
            console.log("Fetched related products:", relatedProductsData);

            const filteredRelatedProducts = relatedProductsData.filter(product => product.documentId !== productDocumentId);
            console.log("Filtered Related Products:", filteredRelatedProducts);

            setRelatedProducts(filteredRelatedProducts);
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    const productTotalPrice = product ? product.price * quantity : 0;

    const handleAddToCart = async () => {
        setLoading(true);

        const cartItem = {
            quantity: quantity,
            amount: productTotalPrice.toFixed(2),
            product: product
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].amount = cart[existingProductIndex].quantity * product.price;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        addToCart(cartItem);
        toast.success('Dodano u korpu');
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className='p-9 bg-white text-black mx-5 mt-5 border'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                {/* Product Image */}
                <div className='w-full md:w-1/2 flex justify-center mb-5 md:mb-0'>
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt={product?.image?.[0]?.alternativeText || 'product image'}
                            width={500}
                            height={400}
                            className='object-contain w-full h-full rounded-md hover:scale-105 transition-all ease-in-out'
                        />
                    )}
                </div>

                {/* Product Details */}
                <div className='w-full md:w-1/2 flex flex-col items-center md:items-start gap-4'>
                    <h2 className='text-2xl font-bold text-center md:text-left'>{product?.name}</h2>
                    <ReactMarkdown className='text-sm text-gray-500 text-center md:text-left'>
                        {product?.description}
                    </ReactMarkdown>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                        {product?.image?.map((image, index) => (
                            <Image
                                key={index}
                                src={image.url}
                                alt={image.alternativeText || 'image'}
                                width={70}
                                height={70}
                                className={`h-[70px] w-[70px] object-cover cursor-pointer rounded-md transition-all 
                                    ${selectedImage === image?.url ? 'border-2 border-blue-500' : 'border-2 border-transparent'}
                                    hover:border-blue-300`}
                                onClick={() => setSelectedImage(image?.url)}
                            />
                        ))}
                    </div>

                    {/* Price & Cart */}
                    <h2 className='font-bold text-3xl text-center md:text-left'>{product?.price?.toFixed(2)} KM</h2>
                    <div className='flex flex-col items-center md:items-start gap-3'>
                        <div className='mt-4 border-t border-gray-300 w-full' />
                        <div className='flex gap-3 items-center'>
                            <div className='flex items-center gap-6 border p-2 px-5'>
                                <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                                <h2>{quantity}</h2>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <h2 className='text-2xl font-bold'>= {(quantity * product?.price)?.toFixed(2)} KM</h2>
                        </div>
                        <Button className='flex gap-3' onClick={handleAddToCart} disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : <ShoppingCart />}
                            {loading ? 'Dodavanje...' : 'Dodaj u korpu'}
                        </Button>
                    </div>
                    <h2 className='mt-3'><span className='font-bold'>Kategorija: </span>{product?.kategorije?.name}</h2>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className='mt-12 '>
                    <h3 className='text-2xl font-semibold text-gray-800 mb-6'>Slični proizvodi</h3>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6'>
                        {relatedProducts.map((item) => (
                            <Link key={item.documentId} href={`/productDetail/${item.documentId}`}>
                                <div className='block overflow-hidden rounded-lg bg-white border border-gray-200 hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105'>
                                    <div className='relative w-full h-[250px]'>
                                        <Image
                                            src={item.image?.[0]?.url}
                                            alt={item.image?.[0]?.alternativeText || 'related product image'}
                                            width={250}
                                            height={250}
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-between p-4 h-full'>
                                        <h4 className='text-center font-semibold text-lg text-gray-900'>{item.name}</h4>
                                        <p className='font-bold text-xl text-center text-primary'>{item.price.toFixed(2)} KM</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
