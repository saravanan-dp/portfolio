'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { socialLinks } from '@/app/lib/constants'
import { FiEye } from 'react-icons/fi'

export default function Footer() {
    const [visitorCount, setVisitorCount] = useState<number | null>(null)

    useEffect(() => {
        const countKey = 'saravanan-portfolio-visitors'
        const sessionKey = 'saravanan-portfolio-visited'
        const currentCount = Number(window.localStorage.getItem(countKey) ?? '0')
        const hasVisitedThisSession = window.sessionStorage.getItem(sessionKey)
        const nextCount = hasVisitedThisSession ? currentCount : currentCount + 1

        window.localStorage.setItem(countKey, String(nextCount))
        window.sessionStorage.setItem(sessionKey, 'true')
        setVisitorCount(nextCount)
    }, [])

    return (
        <footer className="border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <Link href="/" className="text-2xl font-bold text-[#d8f36b]">
                            Saravanan D
                        </Link>
                        <p className="text-[#91aaa1] mt-2">
                            Software, systems, and a habit of learning.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 md:items-end">
                        <div className="inline-flex items-center gap-3 border border-orange-500/50 bg-orange-500/10 px-4 py-3 text-left">
                            <FiEye className="text-orange-400" size={18} />
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-300">Portfolio visits</p>
                                <p className="text-lg font-bold text-orange-400">{visitorCount ?? '—'}</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#91aaa1] hover:text-[#d8f36b] transition-colors"
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Saravanan D. Built with curiosity.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}