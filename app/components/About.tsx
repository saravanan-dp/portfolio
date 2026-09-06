'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { skillIcons } from '@/app/lib/constants'
import { usePortfolioContent } from '@/app/lib/usePortfolioContent'

export default function About() {
    const { skills } = usePortfolioContent()

    const renderSkillIcon = (icon: string) => {
        if (/^(https?:\/\/|data:image\/)/i.test(icon)) return <img src={icon} alt="" className="h-5 w-5 object-contain" />
        const Icon = skillIcons[icon] || skillIcons.React
        return <Icon className="h-5 w-5 text-[#d8f36b]" />
    }
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pb-20 pt-5"
            id="about"
        >
            <motion.div variants={textVariant()}>
                <p className="font-mono text-sm text-[#d8f36b] mb-3">01 / PROFILE</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">A developer in motion.</h2>
                <div className="w-20 h-1 bg-[#d8f36b] mb-8"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12">
                <motion.div
                    variants={fadeIn('right', 'spring', 0.1, 1)}
                    className="md:w-1/2"
                >
                    <p className="text-[#b8cbc3] mb-6 leading-8">
                        I&apos;m a Computer Science and Engineering student who enjoys turning messy, real-world workflows into clear and dependable software. My work spans web applications, cloud data, APIs, and early experiments with AI-assisted development.
                    </p>
                    <p className="text-[#91aaa1] mb-6 leading-8">
                        I learn by building: a college chatbot, a finance collection manager, and an esports tournament platform. I care about the small details that make systems understandable for the people who use them.
                    </p>
                    <div className="grid grid-cols-1 gap-5 border-t border-[#253331] pt-6 text-sm sm:grid-cols-3">
                        <div><span className="block text-[#d8f36b]">2024–2027</span><span className="text-[#91aaa1]">B.E. Computer Science</span></div>
                        <div><span className="block text-[#d8f36b]">7.35 CGPA</span><span className="text-[#91aaa1]">Anna University Regional Campus</span></div>
                        <div><span className="block text-[#d8f36b]">Phone</span><a href="tel:+919344314272" className="text-[#91aaa1] hover:text-[#d8f36b]">+91 93443 14272</a></div>
                    </div>
                    <div className="mt-8 border-t border-[#253331] pt-6">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Education</p>
                        <div className="space-y-5 text-sm">
                            <div>
                                <p className="font-semibold text-[#e8f0ed]">B.E. Computer Science and Engineering <span className="font-normal text-[#91aaa1]">/ 2024–2027</span></p>
                                <p className="mt-1 text-[#91aaa1]">Anna University Regional Campus, Madurai · CGPA 7.35</p>
                            </div>
                            <div>
                                <p className="font-semibold text-[#e8f0ed]">Diploma in Computer Engineering <span className="font-normal text-[#91aaa1]">/ 2021–2024</span></p>
                                <p className="mt-1 text-[#91aaa1]">Tamil Nadu Government Polytechnic College, Madurai · 80%</p>
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[#91aaa1]">Relevant coursework: Database Management Systems, Object-Oriented Programming, Operating Systems, and Web Technologies.</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeIn('left', 'spring', 0.1, 1)}
                    className="md:w-1/2"
                >
                    <h3 className="text-xl font-semibold mb-6">Tools & languages I work with</h3>
                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                className="px-4 py-2 bg-[#11191b] border border-[#253331] flex items-center gap-2 text-sm"
                            >
                                {renderSkillIcon(skill.icon)}
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}