'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { serviceIcons } from '@/app/lib/constants'
import { usePortfolioContent } from '@/app/lib/usePortfolioContent'

export default function Services() {
    const { experience, experienceIntro, services } = usePortfolioContent()

    const renderServiceIcon = (icon: string) => {
        if (/^(https?:\/\/|data:image\/)/i.test(icon)) return <img src={icon} alt="" className="h-6 w-6 object-contain" />
        const Icon = serviceIcons[icon] || serviceIcons['Full-stack applications']
        return <Icon className="h-6 w-6 text-[#0b1014]" />
    }
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-5 pb-20"
            id="services"
        >
            <motion.div variants={textVariant()}>
                <p className="font-mono text-sm text-[#d8f36b] mb-3">{experienceIntro.eyebrow}</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{experienceIntro.title}</h2>
                <div className="w-20 h-1 bg-[#d8f36b] mb-8"></div>
                <p className="text-[#91aaa1] max-w-3xl mb-12">
                    {experienceIntro.description}
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
                            {renderServiceIcon(service.icon)}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-[#91aaa1]">{service.description}</p>
                    </motion.div>
                ))}
            </div>
            <div className="mt-16 border-t border-[#253331]">
                {experience.map((item, index) => <div key={`${item.title}-${index}`} className={`grid md:grid-cols-[1fr_2fr] gap-6 py-7 ${index < experience.length - 1 ? 'border-b border-[#253331]' : ''}`}>
                    <p className="font-mono text-sm text-[#d8f36b]">{item.period}</p>
                    <div><h3 className="text-xl font-semibold">{item.title}</h3><p className="text-[#d8f36b] mt-1">{item.company}</p><p className="text-[#91aaa1] mt-3">{item.description}</p>{item.technologies && <p className="mt-3 text-sm text-[#d8f36b]">Technology focus: {item.technologies}</p>}</div>
                </div>)}
            </div>
        </motion.section>
    )
}