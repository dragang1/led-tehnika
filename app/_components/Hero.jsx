'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';
import ProductShowcase from './ProductShowcase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Hero() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await GlobalApi.getSliders();

                if (!response || !Array.isArray(response) || response.length === 0) {
                    return;
                }

                const sliders = response[0]?.sliders || [];

                // Map slider URLs to Cloudinary URLs
                const imageUrls = sliders.map(slider => {
                    const imageUrl = slider?.url?.replace(/^\//, '');
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
        if (images.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images, isPaused]);

    const goToSlide = (index) => {
        setCurrentImageIndex(index);
    };

    const goToPrevious = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    return (
        <section 
            className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Images Slideshow */}
            <AnimatePresence mode="wait">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        currentImageIndex === index && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            />
                        )
                    ))
                ) : (
                    // Fallback gradient when no images
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
                )}
            </AnimatePresence>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />

            {/* Slide Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                        aria-label="Prethodna slika"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                        aria-label="Sljedeća slika"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </>
            )}

            {/* Slide Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentImageIndex === index
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Prikaži sliku ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-20 w-full h-full px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row justify-center items-center">
                {/* Left Content (Text and Button Section) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center lg:text-left w-full lg:w-[50%] mb-8 lg:mb-0 flex flex-col justify-center z-20"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                        Potrebna ti je
                        <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            LED Rasvjeta?
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-white/95 text-lg sm:text-xl leading-relaxed drop-shadow-lg">
                        Ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Link 
                            href="/proizvodi" 
                            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Pregledaj proizvode</span>
                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link 
                            href="/ledTehnika" 
                            className="inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm px-8 py-4 text-base font-semibold text-gray-800 shadow-xl hover:shadow-2xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                        >
                            O nama
                        </Link>
                    </div>
                </motion.div>

                {/* Right Content (Product Showcase Component) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-20 w-full lg:w-[50%]"
                >
                    <ProductShowcase />
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
