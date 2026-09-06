import Link from 'next/link'
import { socialLinks } from '@/app/lib/constants'

export default function Footer() {
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