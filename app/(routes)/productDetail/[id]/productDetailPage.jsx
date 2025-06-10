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

            try {
                const productData = await GlobalApi.getProductById(id);
                setProduct(productData);
                setSelectedImage(productData.image?.[0]?.url || '');

                if (productData?.kategorije?.name) {
                    await fetchRelatedProducts(productData.kategorije.name, productData.documentId);
                }

                if (productData?.name) {
                    document.title = productData.name;
                }
            } catch (error) {
                return null;
            } finally {
                setLoading(false);
            }

            return () => {
                document.title = 'Led Tehnika';
            };
        };

        fetchProduct();
    }, [id]);

    const fetchRelatedProducts = async (categoryName, productDocumentId) => {
        try {
            const relatedProductsData = await GlobalApi.getProductsByCategory(categoryName);

            const filteredRelatedProducts = relatedProductsData.filter(product => product.documentId !== productDocumentId);

            setRelatedProducts(filteredRelatedProducts);
        } catch (error) {
            return null;
        }
    };

    const productTotalPrice = product ? product.price * quantity : 0;

    const handleAddToCart = async () => {
        setLoading(true);

        const cartItem = {
            quantity: quantity,
            amount: productTotalPrice.toFixed(2),
            product: {
                ...product,
                documentId: product.documentId,
            }
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.product.documentId === product.documentId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
            cart[existingProductIndex].amount = cart[existingProductIndex].quantity * product.price;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        addToCart(cartItem);
        toast.success(`${product.name} je dodat u korpu!`)
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className='p-9 bg-white text-black mx-5 mt-5 border'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <div className='w-full md:w-1/2 flex justify-center items-center mb-5 md:mb-0'>
                    {selectedImage && (
                        <div className="relative w-[400px] h-[400px] max-w-full">
                            <Image
                                src={selectedImage}
                                alt={product?.image?.[0]?.alternativeText || 'product image'}
                                fill
                                className='object-contain rounded-md hover:scale-105 transition-all ease-in-out'
                            />
                        </div>
                    )}
                </div>

                <div className='w-full md:w-1/2 flex flex-col items-center md:items-start gap-4'>
                    <h2 className='text-2xl font-bold text-center md:text-left'>{product?.name}</h2>
                    <ReactMarkdown className='text-sm text-gray-500 text-center md:text-left'>
                        {product?.description}
                    </ReactMarkdown>

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

            {relatedProducts.length > 0 && (
                <div className="mt-12 px-4 sm:px-6 lg:px-0 max-w-screen-xl mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
                        Slični proizvodi
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((item) => (
                            <Link key={item.documentId} href={`/productDetail/${item.documentId}`}>
                                <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 overflow-hidden">
                                    <div className="relative w-full aspect-[4/3]">
                                        <Image
                                            src={item.image?.[0]?.url}
                                            alt={item.image?.[0]?.alternativeText || 'related product image'}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between p-4 flex-grow">
                                        <h4 className="text-center font-semibold text-base sm:text-lg text-gray-900">
                                            {item.name}
                                        </h4>
                                        <p className="font-bold text-center text-primary text-lg sm:text-xl mt-2">
                                            {item.price.toFixed(2)} KM
                                        </p>
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