'use client'

import { motion } from 'framer-motion'
import { FiArrowUpRight, FiAward, FiLinkedin } from 'react-icons/fi'
import { fadeIn, textVariant } from '@/app/lib/animations'

const highlights = [
    {
        number: '01',
        title: 'Project achievements',
        detail: 'Chatbot · MicroFinance · FighterCore',
        description: 'Built and documented three practical products across conversational systems, finance operations, and esports tournament management.',
    },
]

export default function Credentials() {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-5 pb-20"
            id="credentials"
        >
            <motion.div variants={textVariant()}>
                <p className="mb-3 font-mono text-sm text-[#d8f36b]">04 / CREDENTIALS</p>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Learning, applied.</h2>
                <div className="mb-8 h-1 w-20 bg-[#d8f36b]" />
                <p className="mb-12 max-w-3xl text-[#91aaa1]">Selected project achievements and certifications supporting my software development journey. Work history is kept in the Experience section.</p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
                {highlights.map((highlight, index) => (
                    <motion.article
                        key={highlight.number}
                        variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
                        className="border border-[#253331] bg-[#11191b] p-6 transition-colors hover:border-[#d8f36b]/60"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <FiAward className="text-[#d8f36b]" size={24} />
                            <span className="font-mono text-sm text-[#91aaa1]">{highlight.number}</span>
                        </div>
                        <h3 className="mb-3 text-xl font-semibold">{highlight.title}</h3>
                        <p className="mb-4 text-sm text-[#d8f36b]">{highlight.detail}</p>
                        <p className="text-sm leading-7 text-[#91aaa1]">{highlight.description}</p>
                    </motion.article>
                ))}
            </div>

            <motion.a
                variants={fadeIn('up', 'spring', 0.35, 0.75)}
                href="https://www.linkedin.com/in/saravanan-dp"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-[#d8f36b] bg-[#d8f36b] px-5 py-3 font-semibold text-[#0b1014] transition-colors hover:bg-[#e6ff93]"
            >
                <FiLinkedin size={19} />
                View certifications on LinkedIn
                <FiArrowUpRight size={18} />
            </motion.a>
        </motion.section>
    )
}