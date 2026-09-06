'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { usePortfolioContent } from '@/app/lib/usePortfolioContent'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiGithub, FiInfo, FiX } from 'react-icons/fi'

export default function Projects() {
    const { projects } = usePortfolioContent()
    const [activeProject, setActiveProject] = useState(0)
    const [viewerProject, setViewerProject] = useState<typeof projects[number] | null>(null)

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveProject((current) => (current + 1) % projects.length)
        }, 4500)

        return () => window.clearInterval(timer)
    }, [])

    const project = projects[activeProject]

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pt-5 pb-20"
            id="projects"
        >
            <motion.div variants={textVariant()}>
                <p className="font-mono text-sm text-[#d8f36b] mb-3">02 / SELECTED WORK</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Built to be useful.</h2>
                <div className="w-20 h-1 bg-[#d8f36b] mb-8"></div>
                <p className="text-gray-400 max-w-3xl mb-12">
                    Selected academic and personal work, built around useful workflows, real data, and thoughtful interfaces.
                </p>
            </motion.div>

            <motion.div variants={fadeIn('up', 'spring', 0.15, 0.75)} className="border border-[#253331] bg-[#11191b] overflow-hidden">
                <div className="relative h-64 md:h-[30rem] overflow-hidden bg-[#162327]">
                    {projects.map((item, index) => (
                        <div key={item.name} className={`absolute inset-0 transition-opacity duration-700 ${index === activeProject ? 'opacity-100' : 'opacity-0'}`}>
                            <div data-editor-label={`${item.name} screenshot`} className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.image})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1014] via-[#0b1014]/50 to-transparent" />
                        </div>
                    ))}
                    <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10 flex items-end justify-between gap-6">
                        <div>
                            <p className="font-mono text-sm text-[#d8f36b] mb-2">{project.number} / {project.technologies.join(' + ')}</p>
                            <h3 className="text-2xl md:text-4xl font-bold">{project.name}</h3>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            <button onClick={() => setActiveProject((activeProject - 1 + projects.length) % projects.length)} className="p-3 border border-[#b8cbc3]/50 text-[#e8f0ed] hover:border-[#d8f36b] hover:text-[#d8f36b]" aria-label="Previous project"><FiChevronLeft /></button>
                            <button onClick={() => setActiveProject((activeProject + 1) % projects.length)} className="p-3 border border-[#b8cbc3]/50 text-[#e8f0ed] hover:border-[#d8f36b] hover:text-[#d8f36b]" aria-label="Next project"><FiChevronRight /></button>
                        </div>
                    </div>
                </div>
                <div className="p-5 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <p className="text-[#91aaa1] max-w-2xl leading-7">{project.description}</p>
                        <div className="flex items-center gap-4 shrink-0">
                            <button onClick={() => setViewerProject(project)} className="inline-flex items-center gap-2 text-sm text-[#d8f36b] hover:text-[#e6ff93]"><FiInfo /> View details</button>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`} className="text-[#91aaa1] hover:text-[#d8f36b]"><FiGithub size={20} /></a>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live link`} className="text-[#91aaa1] hover:text-[#d8f36b]"><FiArrowUpRight size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="scrollbar-hide flex gap-3 overflow-x-auto px-5 pb-5 md:px-8 md:pb-8 snap-x">
                    {projects.map((item, index) => (
                        <button key={item.name} onClick={() => { setActiveProject(index); setViewerProject(item) }} className={`relative shrink-0 w-32 md:w-44 aspect-video overflow-hidden border-2 snap-start ${index === activeProject ? 'border-[#d8f36b]' : 'border-transparent opacity-60 hover:opacity-100'}`} aria-label={`Open details for ${item.name}`}>
                            <span data-editor-label={`${item.name} thumbnail`} className="absolute inset-0 bg-contain bg-center bg-no-repeat bg-[#162327]" style={{ backgroundImage: `url(${item.image})` }} />
                            <span className="absolute inset-x-0 bottom-0 bg-[#0b1014]/85 px-2 py-1 text-left text-[10px] text-[#e8f0ed] truncate">{item.name}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
            {viewerProject && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#050809]/85 p-4 md:p-8" role="dialog" aria-modal="true" aria-label={`${viewerProject.name} project details`}>
                    <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-[#40534d] bg-[#11191b] shadow-2xl">
                        <button onClick={() => setViewerProject(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-[#b8cbc3]/50 bg-[#0b1014]/80 text-[#e8f0ed] hover:border-[#d8f36b] hover:text-[#d8f36b]" aria-label="Close project details"><FiX size={20} /></button>
                        <div className="grid lg:grid-cols-[1.15fr_1fr]">
                            <div className="min-h-64 bg-[#162327] p-4 md:p-8 lg:min-h-[34rem] lg:p-10">
                                <div className="relative h-full min-h-56 overflow-hidden border border-[#40534d] bg-[#0b1014]">
                                    <img data-editor-label={`${viewerProject.name} detail screenshot`} src={viewerProject.image} alt={`${viewerProject.name} project screenshot`} className="h-full min-h-56 w-full object-contain object-center" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1014] to-transparent p-5 pt-16"><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d8f36b]">Project screenshot</p></div>
                                </div>
                            </div>
                            <div className="p-6 md:p-10">
                                <p className="mb-3 font-mono text-sm text-[#d8f36b]">{viewerProject.number} / PROJECT VIEWER</p>
                                <h3 className="mb-5 text-3xl font-bold md:text-4xl">{viewerProject.name}</h3>
                                <p className="mb-8 leading-7 text-[#b8cbc3]">{viewerProject.overview}</p>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8f36b]">Key features</h4>
                                <ul className="mb-8 space-y-3 text-sm text-[#b8cbc3]">
                                    {viewerProject.features.map((feature) => <li key={feature} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#d8f36b]" />{feature}</li>)}
                                </ul>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8f36b]">Technology stack</h4>
                                <div className="mb-8 flex flex-wrap gap-2">{viewerProject.technologies.map((technology) => <span key={technology} className="border border-[#40534d] px-3 py-2 text-sm text-[#e8f0ed]">{technology}</span>)}</div>
                                <div className="flex flex-wrap gap-5 text-sm"><a href={viewerProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#d8f36b] hover:text-[#e6ff93]"><FiGithub /> Source code <FiArrowUpRight /></a><a href={viewerProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#d8f36b] hover:text-[#e6ff93]">Open project <FiArrowUpRight /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    )
}