'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { services } from '@/app/lib/constants'

export default function Services() {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-5 pb-20"
            id="services"
        >
            <motion.div variants={textVariant()}>
                <p className="font-mono text-sm text-[#d8f36b] mb-3">03 / EXPERIENCE</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Where I&apos;ve been learning.</h2>
                <div className="w-20 h-1 bg-[#d8f36b] mb-8"></div>
                <p className="text-[#91aaa1] max-w-3xl mb-12">
                    Every role has added a different layer: application development, AI workflows, and the infrastructure that keeps connected systems moving.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
                        className="bg-[#11191b] p-8 border border-[#253331] hover:border-[#d8f36b]/50 transition-colors"
                    >
                        <div className="w-12 h-12 bg-[#d8f36b] flex items-center justify-center mb-6">
                            <service.icon className="w-6 h-6 text-[#0b1014]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-[#91aaa1]">{service.description}</p>
                    </motion.div>
                ))}
            </div>
            <div className="mt-16 border-t border-[#253331]">
                <div className="grid md:grid-cols-[1fr_2fr] gap-6 py-7 border-b border-[#253331]">
                    <p className="font-mono text-sm text-[#d8f36b]">JUN 2026 — JUL 2026</p>
                    <div><h3 className="text-xl font-semibold">Full Stack with AI Intern</h3><p className="text-[#d8f36b] mt-1">Mist Software Solutions Pvt. Ltd. / Madurai</p><p className="text-[#91aaa1] mt-3">Worked with full-stack application development, API communication, development workflows, and AI-integrated web applications.</p><p className="mt-3 text-sm text-[#d8f36b]">Technology focus: C# · ASP.NET · ADO.NET</p></div>
                </div>
                <div className="grid md:grid-cols-[1fr_2fr] gap-6 py-7">
                    <p className="font-mono text-sm text-[#d8f36b]">MAY 2023 — JUN 2023</p>
                    <div><h3 className="text-xl font-semibold">Technical Intern</h3><p className="text-[#d8f36b] mt-1">Bharat Sanchar Nigam Limited / Madurai</p><p className="text-[#91aaa1] mt-3">Studied next-generation networking, IP routing, switching, TCP/IP, DNS, DHCP, QoS, and network monitoring.</p></div>
                </div>
            </div>
        </motion.section>
    )
}