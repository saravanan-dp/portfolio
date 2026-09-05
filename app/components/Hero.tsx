'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fadeIn, slideIn, staggerContainer } from '@/app/lib/animations'
import { socialLinks } from '@/app/lib/constants'
import Link from 'next/link'
import { smoothScrollTo } from '@/app/utils/scroll'

const profileTitles = ['Software Developer', 'Web Developer', 'Aspiring Software Engineer']

export default function Hero() {
    const [profileImageFailed, setProfileImageFailed] = useState(false)
    const [titleIndex, setTitleIndex] = useState(0)
    const [typedTitle, setTypedTitle] = useState('')
    const [isDeletingTitle, setIsDeletingTitle] = useState(false)

    useEffect(() => {
        const currentTitle = profileTitles[titleIndex]
        const isComplete = typedTitle === currentTitle
        const timer = window.setTimeout(() => {
            if (!isDeletingTitle && !isComplete) {
                setTypedTitle(currentTitle.slice(0, typedTitle.length + 1))
                return
            }

            if (!isDeletingTitle && isComplete) {
                setIsDeletingTitle(true)
                return
            }

            if (isDeletingTitle && typedTitle.length > 0) {
                setTypedTitle(currentTitle.slice(0, typedTitle.length - 1))
                return
            }

            setIsDeletingTitle(false)
            setTitleIndex((current) => (current + 1) % profileTitles.length)
        }, isComplete ? 1600 : isDeletingTitle ? 55 : 105)

        return () => window.clearTimeout(timer)
    }, [isDeletingTitle, titleIndex, typedTitle])

    const handleScroll = (id: string) => {
        smoothScrollTo(id);
    };

    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-center pt-5 pb-28"
            id="home"
        >
            <div className="flex flex-col md:flex-row items-center gap-8 overflow-hidden justify-between min-w-0">
                <motion.div
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="md:w-1/2 min-w-0"
                >
                    <p className="mb-6 font-mono text-sm uppercase tracking-[0.25em] text-[#d8f36b]">Aspiring Software Engineer / Madurai, Tamil Nadu</p>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
                        Building useful <span className="text-[#d8f36b]">software</span> with purpose.
                    </h1>
                    <h2 className="mb-6 min-h-[2.25rem] text-2xl font-medium text-[#b8cbc3] md:text-3xl">
                        {typedTitle}<span className="ml-1 text-[#d8f36b] animate-pulse" aria-hidden="true">|</span>
                    </h2>
                    <p className="text-lg leading-8 text-[#91aaa1] max-w-xl mb-8">
                        Computer Science student and aspiring software developer working across full-stack development, AI integration, and data-backed systems.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/projects"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('projects');
                            }}
                            className="px-6 py-3 bg-[#d8f36b] text-[#0b1014] hover:bg-[#e6ff93] transition-colors font-semibold"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('contact');
                            }}
                            className="px-6 py-3 border border-[#40534d] text-[#e8f0ed] hover:border-[#d8f36b] transition-colors"
                        >
                            Contact Me
                        </Link>
                        <Link
                            href="/contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('contact');
                            }}
                            className="px-6 py-3 border border-[#40534d] text-[#e8f0ed] hover:border-[#d8f36b] transition-colors"
                        >
                            Hire Me
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    variants={slideIn('right', 'tween', 0.2, 1)}
                    className="justify-end flex w-full md:w-5/12 min-w-0"
                >
                    <div className="relative mx-auto md:ml-auto w-full max-w-sm aspect-square border border-[#40534d] bg-[#11191b] p-3">
                        <div className="relative h-full w-full overflow-hidden border border-[#d8f36b]/40 bg-[#162327]">
                            {!profileImageFailed ? (
                                <img
                                    src="/saravanan.png"
                                    alt="Saravanan D profile"
                                    className="h-full w-full object-cover object-center"
                                    onError={() => setProfileImageFailed(true)}
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center">
                                    <p className="font-mono text-center text-xs uppercase tracking-[0.2em] text-[#91aaa1]">Profile photo<br />unavailable</p>
                                </div>
                            )}
                            <div className="pointer-events-none absolute inset-5 border border-[#d8f36b]/25" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={fadeIn('up', 'tween', 0.5, 1)}
                className="mt-16 flex justify-start gap-6"
            >
                {socialLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#91aaa1] hover:text-[#d8f36b] transition-colors"
                        aria-label={link.name}
                    >
                        <link.icon className="w-6 h-6" />
                    </Link>
                ))}
            </motion.div>
        </motion.section>
    )
}