'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CmsApi from '@/lib/cmsClient';
import { getCategorySlug } from '@/lib/cms/utils';
import { getImageUrl } from '@/lib/getImageUrl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';

function Hero({ children, initialFeaturedProduct = null, initialSliderData = [] }) {
    const [featuredProduct, setFeaturedProduct] = useState(initialFeaturedProduct);
    const [sliderData, setSliderData] = useState(initialSliderData);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // E-commerce messages for slider slides
    const sliderMessages = [
        {
            title: "Potrebna ti je",
            highlight: "LED Rasvjeta?",
            description: "Ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama."
        },
        {
            title: "Dostava",
            highlight: "na sve proizvode",
            description: "Dostava na teritoriji cijele Bosne i Hercegovine. Brza i sigurna dostava direktno na vašu adresu. Naručite danas!"
        },
        {
            title: "Garancija kvalitete",
            highlight: "i podrška",
            description: "Svi proizvodi sa garancijom. Profesionalna instalacija i tehnička podrška. Vaše zadovoljstvo je naš prioritet."
        },
        {
            title: "Najbolje cijene",
            highlight: "u BiH",
            description: "Kvalitetni proizvodi po najboljim cijenama. Specijalne ponude i popusti za veće narudžbe. Kontaktirajte nas!"
        },
        {
            title: "Moderna rješenja",
            highlight: "za vaš dom",
            description: "LED rasvjeta, automatski motori za kapije, bazenska rasvjeta i grijanje. Sve što vam treba na jednom mjestu."
        }
    ];

    // Only fetch client-side when no initial data (e.g. direct nav to page without server data)
    useEffect(() => {
        if (initialFeaturedProduct != null && initialSliderData?.length > 0) return;
        const fetchData = async () => {
            try {
                if (initialFeaturedProduct == null) {
                    const product = await CmsApi.getProductBySlug('motor-za-kapiju-set');
                    if (product?.image?.[0]?.url) {
                        const category = product.kategorije || {};
                        const categorySlug = getCategorySlug(category) || 'automatizacija';
                        const productImage = product.image[0].url;
                        let imageUrl = getImageUrl(productImage);
                        setFeaturedProduct({ ...product, categorySlug, imageUrl });
                    }
                }
                if (!initialSliderData?.length) {
                    const response = await CmsApi.getSliders();
                    if (response?.[0]?.sliders) {
                        const sliderItems = response[0].sliders
                            .map((slider, index) => {
                                const url = slider?.url?.replace(/^\//, '');
                                if (!url) return null;
                                const imageUrl = getImageUrl(url);
                                return { imageUrl, title: slider?.title || sliderMessages[index % sliderMessages.length].title, description: slider?.description || sliderMessages[index % sliderMessages.length].description, highlight: sliderMessages[index % sliderMessages.length].highlight };
                            })
                            .filter(Boolean);
                        setSliderData(sliderItems);
                    }
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };
        fetchData();
    }, [initialFeaturedProduct, initialSliderData]);

    // Auto-slide effect
    useEffect(() => {
        if (sliderData.length <= 1 || isPaused) return;
        const interval = setInterval(() => {
            setCurrentSlideIndex(prevIndex => (prevIndex + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [sliderData, isPaused]);

    const goToSlide = (index) => setCurrentSlideIndex(index);
    const goToPrevious = () => setCurrentSlideIndex(prevIndex => (prevIndex - 1 + sliderData.length) % sliderData.length);
    const goToNext = () => setCurrentSlideIndex(prevIndex => (prevIndex + 1) % sliderData.length);

    const currentSlide = sliderData[currentSlideIndex];
    const currentMessage = currentSlide 
        ? { 
            title: currentSlide.title, 
            highlight: currentSlide.highlight, 
            description: currentSlide.description 
          }
        : sliderMessages[0];

    const firstSliderImage = sliderData.length > 0 ? sliderData[0].imageUrl : null;

    return (
        <div className="w-full">
            {/* Featured Product Section - E-commerce Style */}
            {featuredProduct && (
                <section className="relative py-10 sm:py-14 overflow-hidden min-h-[320px] sm:min-h-[400px]" aria-hidden="false">
                    {/* E-commerce gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href={`/kategorije/${featuredProduct.categorySlug}/${featuredProduct.slug}`} className="block">
                            <div className="cursor-pointer group">
                                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                    {/* Product Image Side */}
                                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                                        <div className="relative w-full max-w-lg">
                                            {/* Glow effect behind image */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-3xl blur-2xl scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
                                                <div className="relative h-[260px] sm:h-[320px] lg:h-[380px]">
                                                    <Image
                                                        src={featuredProduct.imageUrl}
                                                        alt={featuredProduct.name}
                                                        fill
                                                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                                                        priority
                                                        fetchPriority="high"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Info Side */}
                                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-full mb-5">
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                            IZDVOJENO
                                        </div>
                                        
                                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                                            {featuredProduct.name}
                                        </h1>
                                        
                                        <p className="text-slate-400 text-base lg:text-lg mb-6 leading-relaxed line-clamp-2 max-w-xl mx-auto lg:mx-0">
                                            {featuredProduct.description?.slice(0, 120)}...
                                        </p>
                                        
                                        <div className="mb-6">
                                            <span className="text-slate-500 text-sm block mb-1">Cijena</span>
                                            <span className="text-4xl sm:text-5xl font-bold text-primary">
                                                {featuredProduct.price?.toFixed(2) || '0.00'} KM
                                            </span>
                                        </div>
                                        
                                        <div className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 lg:px-7 lg:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-blue-500/25 group/btn">
                                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                            <span className="line-clamp-2 text-left sm:text-center">{featuredProduct.name}</span>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Children content (e.g., Categories) inserted between Izdvojeno and Slider */}
            {children}

            {/* Simple Slider Section */}
            {sliderData.length > 0 && (
                <section 
                    className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlideIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={currentSlide.imageUrl}
                                alt={`Slider ${currentSlideIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                quality={80}
                                priority={currentSlideIndex === 0}
                                fetchPriority={currentSlideIndex === 0 ? "high" : "auto"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {sliderData.length > 1 && (
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
                    {sliderData.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                            {sliderData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentSlideIndex === index
                                            ? 'w-8 bg-white'
                                            : 'w-2 bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Prikaži sliku ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Overlay Content - Changes with each slide */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlideIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-20 w-full h-full flex items-center justify-center px-4 sm:px-8"
                        >
                            <div className="text-center max-w-3xl">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl mb-4">
                                    {currentMessage.title}
                                    <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                        {currentMessage.highlight}
                                    </span>
                                </h2>
                                <p className="text-white/95 text-lg sm:text-xl lg:text-2xl mb-8 drop-shadow-lg">
                                    {currentMessage.description}
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Link 
                                        href="/proizvodi" 
                                        className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span>Pregledaj proizvode</span>
                                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link 
                                        href="/ledTehnika" 
                                        className="inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm px-8 py-4 text-base font-semibold text-gray-800 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 transform hover:scale-105"
                                    >
                                        O nama
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}
        </div>
    );
}

export default Hero;
