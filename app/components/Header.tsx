'use client'

import { motion } from 'framer-motion'
import { navLinks, publicAssetPath } from '@/app/lib/constants'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const handleNavClick = (id: string) => {
        smoothScrollTo(id);
        setIsOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-0 z-50 border-b border-[#253331] bg-[#0b1014]/95 text-[#e8f0ed] backdrop-blur-md"
        >
            <nav className="relative max-w-7xl mx-auto flex min-h-[76px] justify-between items-center py-5 px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={() => smoothScrollTo('home')}
                    className="whitespace-nowrap text-lg font-bold tracking-tight text-[#d8f36b] sm:text-xl"
                >
                    Saravanan <span className="text-[#e8f0ed]">D.</span>
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => handleNavClick(link.href)}
                                className="text-[#b8cbc3] hover:text-[#d8f36b] transition-colors"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <a
                        href={publicAssetPath('/Saravana.pdf')}
                        download="Saravanan-D-Resume.pdf"
                        className="hidden sm:inline-block px-4 py-2 border border-[#d8f36b] text-[#d8f36b] hover:bg-[#d8f36b] hover:text-[#0b1014] transition-colors"
                    >
                        Download Resume
                    </a>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-[#b8cbc3] hover:text-[#d8f36b] focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ y: -300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -300, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed top-[76px] left-0 right-0 bg-[#0b1014] z-50 shadow-2xl md:hidden border-b border-[#253331]"
                    >
                        <div className="flex flex-col p-6">
                            <ul className="flex flex-col space-y-6">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => handleNavClick(link.href)}
                                            className="text-[#b8cbc3] hover:text-[#d8f36b] text-lg transition-colors"
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-4 border-t border-gray-800">
                                <a
                                    href={publicAssetPath('/Saravana.pdf')}
                                    download="Saravanan-D-Resume.pdf"
                                    className="block w-full text-center px-4 py-3 border border-[#d8f36b] bg-[#d8f36b] font-bold text-[#0b1014] hover:bg-[#e6ff93] transition-colors"
                                >
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    )
}