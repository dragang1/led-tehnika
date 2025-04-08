'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';

function Hero() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await GlobalApi.getSliders();
                console.log('Full API Response:', response);

                if (!response || !Array.isArray(response) || response.length === 0) {
                    console.error('API response is empty or invalid');
                    return;
                }

                const sliders = response[0]?.sliders || [];
                console.log('Sliders:', sliders);

                // Map slider URLs to Cloudinary URLs (no need to hardcode Cloudinary base URL)
                const imageUrls = sliders.map(slider => {
                    const imageUrl = slider?.url?.replace(/^\//, ''); // Remove leading slash
                    return imageUrl ? imageUrl : null;
                }).filter(Boolean);

                console.log('Extracted Images:', imageUrls);
                setImages(imageUrls);

                if (imageUrls.length > 0) {
                    setCurrentImageIndex(0);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
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
        <section className="relative w-full h-screen overflow-hidden">
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
                        zIndex: -1
                    }}
                ></div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>

            <div className="relative mx-auto flex flex-col justify-center items-center h-full px-4 sm:px-8 lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-20 z-20">
                <div className="text-center lg:text-left lg:max-w-[70vw]">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                        Potrebna ti je
                        <strong className="block font-extrabold text-primary"> Led Rasvjeta? </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Link href={'/products'} className="block w-full rounded bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                            Shop
                        </Link>

                        <Link href="#" className="block w-full rounded bg-white px-8 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                            O nama
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
