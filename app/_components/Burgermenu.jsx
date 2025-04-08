'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Hamburger Icon */}
            {!isOpen && (
                <div
                    className="absolute top-5 left-5 cursor-pointer z-50"
                    onClick={toggleMenu}
                >
                    <div className="w-6 h-0.5 bg-black rounded-full mb-1"></div>
                    <div className="w-6 h-0.5 bg-black rounded-full mb-1"></div>
                    <div className="w-6 h-0.5 bg-black rounded-full"></div>
                </div>
            )}

            {/* Overlay Menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
                    onClick={toggleMenu} // clicking the background closes it
                >
                    <div
                        className="relative bg-white rounded-lg p-8 w-4/5 max-w-sm mx-auto text-center"
                        onClick={(e) => e.stopPropagation()} // stops background click
                    >
                        {/* X Close Button */}
                        <button
                            className="absolute top-3 right-3 text-2xl text-black font-bold"
                            onClick={toggleMenu}
                            aria-label="Close Menu"
                        >
                            &times;
                        </button>

                        {/* Menu Links */}
                        <ul className="flex flex-col gap-6 text-black text-lg font-medium">
                            <Link href="/" onClick={toggleMenu}>
                                <li className="hover:text-primary cursor-pointer">O nama</li>
                            </Link>
                            <Link href="/cartPage" onClick={toggleMenu}>
                                <li className="hover:text-primary cursor-pointer">sdf</li>
                            </Link>
                            <li className="hover:text-primary cursor-pointer">Kontakt</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
