'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/app/lib/animations'
import { contactEmail } from '@/app/lib/constants'
import Link from 'next/link'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function CTA() {
    const handleScroll = (id: string) => {
        smoothScrollTo(id);
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-5 pb-20"
            id="contact"
        >
            <motion.div
                variants={fadeIn('up', 'spring', 0.1, 1)}
                className="bg-[#d8f36b] p-8 md:p-12 border border-[#d8f36b]"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0b1014]">Have a problem worth solving?</h2>
                    <p className="text-[#24332d] mb-8 text-lg">
                        I&apos;m open to internships, collaborations, and opportunities to build thoughtful software with a strong team.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href={`mailto:${contactEmail}`}
                            className="px-8 py-4 bg-[#0b1014] text-[#d8f36b] hover:bg-[#24332d] transition-colors font-medium"
                        >
                            Get In Touch
                        </Link>
                        <Link
                            href="/projects"
                            onClick={(e) => {
                                e.preventDefault();
                                handleScroll('projects');
                            }}
                            className="px-8 py-4 border border-[#0b1014] text-[#0b1014] hover:bg-[#e6ff93] transition-colors font-medium"
                        >
                            View My Work
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}