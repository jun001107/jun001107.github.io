import React, { useState } from 'react';
import NavLink from './NavLink';

export default function Header() {
    const navItems = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'] as const;
    const [activeLink, setActiveLink] = useState<typeof navItems[number]>('home');
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ko'>('en');

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur z-10">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="font-bold text-lg">JHC</div>

                    {/* Desktop Nav */}
                    <ul className="hidden space-x-6">
                        {navItems.map(id => (
                            <li key={id}>
                                <NavLink
                                    id={id}
                                    isActive={activeLink === id}
                                    onClick={() => setActiveLink(id)}
                                />
                            </li>
                        ))}
                    </ul>

                    {/* Hamburger */}
                    <button
                        className="flex flex-col space-y-1.5"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-px bg-gray-800" />
                        <span className="w-6 h-px bg-gray-800" />
                        <span className="w-6 h-px bg-gray-800" />
                    </button>
                </div>
            </header>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity duration-700 z-20"
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-700 z-40 flex flex-col`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4 flex-shrink-0">
                    <button onClick={toggleMenu} aria-label="Close menu">
                        <span className="text-white text-2xl">&times;</span>
                    </button>
                </div>

                {/* Nav Items (scrollable) */}
                <nav className="flex-1 overflow-auto px-6 space-y-4">
                    {navItems.map(id => (
                        <NavLink
                            key={id}
                            id={id}
                            isActive={activeLink === id}
                            onClick={() => {
                                setActiveLink(id);
                                toggleMenu();
                            }}
                        />
                    ))}
                </nav>

                {/* Language Selector */}
                <div className="mt-auto p-4 border-t border-gray-700 flex-shrink-0">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1 rounded ${
                                language === 'en'
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('ko')}
                            className={`px-3 py-1 rounded ${
                                language === 'ko'
                                    ? 'bg-gray-600 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            한국어
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
