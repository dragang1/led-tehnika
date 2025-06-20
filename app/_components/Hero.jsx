'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';
import ProductShowcase from './ProductShowcase';

function Hero() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await GlobalApi.getSliders();
             

                if (!response || !Array.isArray(response) || response.length === 0) {
                   
                    return;
                }

                const sliders = response[0]?.sliders || [];
              

                // Map slider URLs to Cloudinary URLs (no need to hardcode Cloudinary base URL)
                const imageUrls = sliders.map(slider => {
                    const imageUrl = slider?.url?.replace(/^\//, ''); // Remove leading slash
                    return imageUrl ? imageUrl : null;
                }).filter(Boolean);

               
                setImages(imageUrls);

                if (imageUrls.length > 0) {
                    setCurrentImageIndex(0);
                }
            } catch (error) {
               return;
            }
        };

        fetchImages();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (


        <section className="relative w-full h-[80vh] overflow-hidden">
            {/* Background Images Slideshow */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '100%',
                        width: '100%',
                        zIndex: -1,
                    }}
                ></div>
            ))}

            {/* Product Showcase */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 z-10"></div>
            <div className="relative z-20 w-full h-full px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row justify-center items-center">
                {/* Left Content (Text and Button Section) */}
                <div className="text-center sm:text-left w-full sm:w-[50%] mb-8 sm:mb-0 flex flex-col justify-center z-20">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl leading-tight">
                        Potrebna ti je
                        <strong className="block font-extrabold text-primary"> Led Rasvjeta? </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
                        <Link href={'/products'} className="block w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-xl hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                            Shop
                        </Link>

                        <Link href="#" className="block w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-rose-600 shadow-xl hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                            O nama
                        </Link>
                    </div>
                </div>

                {/* Right Content (Product Showcase Component) */}
                <div className="relative z-20 w-full sm:w-[50%]">
                    <ProductShowcase />
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 z-10"></div>
        </section>


    );
}

export default Hero;
