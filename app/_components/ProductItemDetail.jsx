// 'use client';

// import { Button } from '@/components/ui/button';
// import { LoaderCircle, ShoppingCart } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState, useRef } from 'react';
// import { toast } from "sonner";
// import { useCart } from './CartContext';
// import Link from 'next/link';
// import ReactMarkdown from 'react-markdown';
// import { motion } from 'framer-motion';

// function ProductItemDetail({ product }) {
//     const { addToCart } = useCart();
//     const [productTotalPrice, setProductTotalPrice] = useState(product?.price);
//     const [quantity, setQuantity] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(product?.image[0]?.url);

//     const audioRef = useRef(null);

//     const playSound = () => {
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(() => {});
//       }
//     };

//     const handleAddToCart = () => {
//         setLoading(true);
//         const cartItem = {
//             quantity: quantity,
//             amount: (quantity * productTotalPrice).toFixed(2),
//             product: product
//         };

//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

//         if (existingProductIndex > -1) {
//             cart[existingProductIndex].quantity += quantity;
//             cart[existingProductIndex].amount = cart[existingProductIndex].quantity * productTotalPrice;
//         } else {
//             cart.push(cartItem);
//         }

//         localStorage.setItem('cart', JSON.stringify(cart));
//         addToCart(cartItem);

//         toast.success('Dodano u korpu');
//         playSound();

//         setTimeout(() => {
//           setLoading(false);
//         }, 500);
//     };

//     return (
//         <motion.div
//           className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black mx-5'
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//         >
//             {/* Display the selected image */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//                 <Image
//                     src={selectedImage}
//                     alt={product?.image?.[0]?.alternativeText || 'image'}
//                     width={300}
//                     height={300}
//                     className='h-[200px] w-[300px] object-contain md:h-[320px] md:w-[300px]'
//                 />
//             </motion.div>

//             <motion.div
//               className='flex flex-col gap-3'
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//             >
//                 <h2 className='text-2xl font-bold'>{product?.name}</h2>
//                 <ReactMarkdown className='text-sm text-gray-500'>{product?.description}</ReactMarkdown>
//                 <h2 className='font-bold text-3xl'>{product?.price}KM</h2>

//                 {/* Thumbnails for additional images */}
//                 <div className='flex gap-2 mt-4 overflow-x-auto scrollbar-hide'>
//                     {product?.im?.map((image, index) => (
//                         <Image
//                             key={index}
//                             src={image.url}
//                             alt={image.alternativeText || 'image'}
//                             width={80}
//                             height={80}
//                             className={`h-[60px] w-[60px] object-cover cursor-pointer ${selectedImage === image.url ? 'border-2 border-blue-500' : ''}`}
//                             onClick={() => setSelectedImage(image.url)}
//                         />
//                     ))}
//                 </div>

//                 <div className='flex flex-col items-baseline gap-3'>
//                     <div className='flex gap-3 items-center'>
//                         <div className='flex items-center gap-10 border p-2 px-5'>
//                             <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>-</button>
//                             <h2>{quantity}</h2>
//                             <button onClick={() => setQuantity(quantity + 1)}>+</button>
//                         </div>
//                         <h2 className='text-2xl font-bold'>= {quantity * productTotalPrice}KM</h2>
//                     </div>
//                     <Button className='flex gap-3' onClick={handleAddToCart} disabled={loading} >
//                         <ShoppingCart />
//                         {loading ? <LoaderCircle className='animate-spin' /> : 'Dodaj u korpu'}
//                     </Button>
//                     <audio ref={audioRef} src="/sounds/success-340660.mp3" preload="auto" />
//                     <Link href={`/productDetail/${product?.documentId}`}>
//                         <Button>Pogledaj</Button>
//                     </Link>
//                 </div>

//                 <h2><span className='font-bold'>Kategorija: </span>{product?.kategorije?.name}</h2>
//             </motion.div>
//         </motion.div>
//     );
// }

// export default ProductItemDetail;
