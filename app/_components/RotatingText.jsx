'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobalApi from '@/app/_utils/GlobalApi';

const RotatingText = () => {
    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await GlobalApi.getCategoryList();

                // Pošto nema attributes, idemo direktno na name
                const categoryNames = res
                    .filter(cat => cat?.name)
                    .map(cat => cat.name);

                setCategories(categoryNames);
            } catch (error) {
                console.error("❌ Greška pri dohvaćanju kategorija:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length === 0) return;

        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % categories.length);
        }, 3500);  // Duže trajanje (3.5 sekundi)

        return () => clearInterval(interval);
    }, [categories]);

    return (
        <motion.strong
            key={categories[index]}  // Dodajemo key kako bi se animacija pravilno pokrenula na promjenu
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-600 transition-all duration-500 ease-in-out"
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}  // Početni skaliranje i rotacija
            animate={{
                opacity: 1,
                scale: 1.1, // Lagano povećanje za naglašeni efekt
                rotate: 0,   // Završna rotacija
                x: 0,        // Pomak duž X osi
                y: 0,        // Pomak duž Y osi
                textShadow: "0 0 15px rgba(255, 255, 255, 0.7)", // Efekt svjetlosnog sjaja
                color: "#3498db" // Animacija boje za dodatni vizualni naglasak
            }}
            exit={{
                opacity: 0,
                scale: 0.8,
                rotate: 30,   // Rotacija pri izlasku
                x: 30,        // Pomak na desno
                y: 30,        // Pomak prema dolje
                textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" // Jači sjaj pri izlasku
            }}
            transition={{
                duration: 1.2,   // Duže trajanje animacije
                ease: "easeInOut",
            }}
        >
            {categories.length > 0 ? categories[index] : 'Učitavanje...'}
        </motion.strong>
    );
};

export default RotatingText;
