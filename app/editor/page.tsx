'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiDownload, FiExternalLink, FiImage, FiLogOut, FiRefreshCw, FiSave, FiUpload } from 'react-icons/fi'
import { iconSuggestions, publicAssetPath, serviceIcons, skillIcons } from '@/app/lib/constants'
import { EditableExperience, EditableProject, EditableService, EditableSkill, PortfolioContent, defaultContent, readPortfolioContent } from '@/app/lib/content'
import { savePortfolioContent } from '@/app/lib/usePortfolioContent'
import { EDITOR_SESSION_KEY, EDITOR_STORAGE_KEY, EditorSection, EditorState, applyEditorState, editableImageElements, editableTextElements, inspectSections, stateFromSections } from '@/app/lib/editor'

const editorPassword = process.env.NEXT_PUBLIC_EDITOR_PASSWORD || 'portfolio-editor'

function Login({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submit = (event: React.FormEvent) => {
        event.preventDefault()
        if (password !== editorPassword) {
            setError('Incorrect editor password.')
            return
        }
        window.sessionStorage.setItem(EDITOR_SESSION_KEY, 'true')
        onLogin()
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b1014] px-5 text-[#e8f0ed]">
            <form onSubmit={submit} className="w-full max-w-md border border-[#40534d] bg-[#11191b] p-8 shadow-2xl">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#d8f36b]">Portfolio editor</p>
                <h1 className="mb-3 text-3xl font-bold">Sign in to edit</h1>
                <p className="mb-8 text-sm leading-6 text-[#91aaa1]">This static-site editor uses a browser access gate. Configure `NEXT_PUBLIC_EDITOR_PASSWORD` before deployment.</p>
                <label className="mb-2 block text-sm text-[#b8cbc3]" htmlFor="editor-password">Editor password</label>
                <input id="editor-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mb-3 w-full border border-[#40534d] bg-[#0b1014] px-4 py-3 text-[#e8f0ed] outline-none focus:border-[#d8f36b]" autoFocus />
                {error && <p className="mb-4 text-sm text-[#ff9d8d]">{error}</p>}
                <button className="w-full bg-[#d8f36b] px-4 py-3 font-semibold text-[#0b1014] hover:bg-[#e6ff93]">Open editor</button>
                <Link href={publicAssetPath('/')} className="mt-5 inline-flex items-center gap-2 text-sm text-[#91aaa1] hover:text-[#d8f36b]"><FiExternalLink /> View portfolio</Link>
            </form>
        </main>
    )
}

export default function EditorPage() {
    const [authenticated, setAuthenticated] = useState(false)
    const [sections, setSections] = useState<EditorSection[]>([])
    const [activeSection, setActiveSection] = useState('')
    const [message, setMessage] = useState('')
    const [content, setContent] = useState<PortfolioContent>(defaultContent)
    const frameRef = useRef<HTMLIFrameElement>(null)
    const importRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setAuthenticated(window.sessionStorage.getItem(EDITOR_SESSION_KEY) === 'true')
        setContent(readPortfolioContent())
    }, [])

    const loadSections = () => {
        const documentRoot = frameRef.current?.contentDocument
        if (!documentRoot) return
        const root = documentRoot.querySelector<HTMLElement>('[data-portfolio-content]')
        if (!root) return

        const saved = window.localStorage.getItem(EDITOR_STORAGE_KEY)
        if (saved) {
            try { applyEditorState(root, JSON.parse(saved) as EditorState) } catch { window.localStorage.removeItem(EDITOR_STORAGE_KEY) }
        }
        const nextSections = inspectSections(root)
        setSections(nextSections)
        setActiveSection((current) => current || nextSections[0]?.id || '')
    }

    const updateField = (sectionId: string, key: string, value: string, type: 'text' | 'image') => {
        setSections((current) => current.map((section) => section.id !== sectionId ? section : {
            ...section,
            fields: type === 'text' ? section.fields.map((field) => field.key === key ? { ...field, value } : field) : section.fields,
            images: type === 'image' ? section.images.map((image) => image.key === key ? { ...image, value } : image) : section.images,
        }))

        const documentRoot = frameRef.current?.contentDocument
        const root = documentRoot?.querySelector<HTMLElement>('[data-portfolio-content]')
        const section = root?.querySelector<HTMLElement>(`#${CSS.escape(sectionId)}`)
        if (!section) return
        const index = Number(key.split(':').pop())
        if (type === 'text') {
            const element = editableTextElements(section)[index]
            if (element) element.textContent = value
        } else {
            const element = editableImageElements(section)[index]
            if (element instanceof HTMLImageElement) element.src = value
            else if (element) element.style.backgroundImage = value.startsWith('url(') ? value : `url("${value}")`
        }
    }

    const save = () => {
        const currentState = stateFromSections(sections, content)
        window.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(currentState))
        savePortfolioContent(content)
        setMessage('Saved locally in this browser.')
        window.setTimeout(() => setMessage(''), 2500)
    }

    const reset = () => {
        if (!window.confirm('Reset all portfolio edits?')) return
        window.localStorage.removeItem(EDITOR_STORAGE_KEY)
        window.localStorage.removeItem('saravanan-portfolio-content-v1')
        frameRef.current?.contentWindow?.location.reload()
        setContent(defaultContent)
        setMessage('Edits reset.')
    }

    const exportFile = () => {
        const blob = new Blob([JSON.stringify(stateFromSections(sections, content), null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'portfolio-content.json'
        link.click()
        URL.revokeObjectURL(url)
    }

    const importFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            try {
                const state = JSON.parse(String(reader.result)) as EditorState
                const documentRoot = frameRef.current?.contentDocument
                const root = documentRoot?.querySelector<HTMLElement>('[data-portfolio-content]')
                if (!root || !state.text || !state.images) throw new Error('Invalid file')
                applyEditorState(root, state)
                if (state.content) {
                    setContent(state.content)
                    savePortfolioContent(state.content)
                }
                const nextSections = inspectSections(root)
                setSections(nextSections)
                window.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(state))
                setMessage('Imported and saved.')
            } catch { window.alert('That file is not a valid portfolio export.') }
        }
        reader.readAsText(file)
        event.target.value = ''
    }

    const updateSkill = (index: number, value: Partial<EditableSkill>) => setContent((current) => ({ ...current, skills: current.skills.map((skill, itemIndex) => itemIndex === index ? { ...skill, ...value } : skill) }))
    const updateProject = (index: number, value: Partial<EditableProject>) => setContent((current) => ({ ...current, projects: current.projects.map((project, itemIndex) => itemIndex === index ? { ...project, ...value } : project) }))
    const updateExperience = (index: number, value: Partial<EditableExperience>) => setContent((current) => ({ ...current, experience: current.experience.map((item, itemIndex) => itemIndex === index ? { ...item, ...value } : item) }))
    const updateService = (index: number, value: Partial<EditableService>) => setContent((current) => ({ ...current, services: current.services.map((service, itemIndex) => itemIndex === index ? { ...service, ...value } : service) }))
    const addSkill = () => setContent((current) => ({ ...current, skills: [...current.skills, { name: 'New skill', icon: 'React' }] }))
    const addProject = () => setContent((current) => ({ ...current, projects: [...current.projects, { name: 'New project', number: String(current.projects.length + 1).padStart(2, '0'), image: '', description: '', overview: '', features: [], technologies: [], githubUrl: '', liveUrl: '' }] }))
    const addExperience = () => setContent((current) => ({ ...current, experience: [...current.experience, { period: 'NEW PERIOD', title: 'New experience', company: '', description: '', technologies: '' }] }))
    const addService = () => setContent((current) => ({ ...current, services: [...current.services, { title: 'New service', description: '', icon: 'Full-stack applications' }] }))
    const removeItem = (type: 'skills' | 'projects' | 'experience' | 'services', index: number) => setContent((current) => {
        if (type === 'projects' && current.projects.length === 1) {
            window.alert('Keep at least one project in the portfolio.')
            return current
        }
        return { ...current, [type]: current[type].filter((_, itemIndex) => itemIndex !== index) }
    })
    const inputClass = 'w-full border border-[#40534d] bg-[#0b1014] px-3 py-2 text-sm text-[#e8f0ed] outline-none focus:border-[#d8f36b]'
    const smallField = (label: string, value: string, onChange: (value: string) => void) => <label className="block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} /></label>
    const iconField = (label: string, value: string, onChange: (value: string) => void, iconMap: Record<string, typeof serviceIcons[string]>) => {
        const Icon = iconMap[value]
        const isImage = /^(https?:\/\/|data:image\/)/i.test(value)
        return <label className="mt-4 block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">{label}</span><div className="flex items-center gap-2"><input list="portfolio-icon-suggestions" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Type a name or paste logo URL" className={inputClass} />{isImage ? <img src={value} alt="Logo preview" className="h-5 w-5 shrink-0 object-contain" /> : Icon && <Icon className="h-5 w-5 shrink-0 text-[#d8f36b]" />}</div><span className="mt-1 block text-[10px] text-[#91aaa1]">Use a suggested name or paste an SVG/image URL.</span></label>
    }

    if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />

    const currentSection = sections.find((section) => section.id === activeSection)

    return (
        <main className="min-h-screen bg-[#0b1014] text-[#e8f0ed]">
            <header className="sticky top-0 z-20 border-b border-[#253331] bg-[#0b1014]/95 px-5 py-4 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
                    <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d8f36b]">Portfolio editor</p><h1 className="text-xl font-bold">Manage your portfolio</h1></div>
                    <div className="flex flex-wrap items-center gap-2">
                        {message && <span className="inline-flex items-center gap-2 px-2 text-xs text-[#d8f36b]"><FiCheck /> {message}</span>}
                        <button onClick={save} className="inline-flex items-center gap-2 bg-[#d8f36b] px-3 py-2 text-sm font-semibold text-[#0b1014] hover:bg-[#e6ff93]"><FiSave /> Save</button>
                        <button onClick={exportFile} className="inline-flex items-center gap-2 border border-[#40534d] px-3 py-2 text-sm hover:border-[#d8f36b]"><FiDownload /> Export</button>
                        <button onClick={() => importRef.current?.click()} className="inline-flex items-center gap-2 border border-[#40534d] px-3 py-2 text-sm hover:border-[#d8f36b]"><FiUpload /> Import</button>
                        <button onClick={reset} className="inline-flex items-center gap-2 border border-[#40534d] px-3 py-2 text-sm hover:border-[#d8f36b]"><FiRefreshCw /> Reset</button>
                        <button onClick={() => { window.sessionStorage.removeItem(EDITOR_SESSION_KEY); setAuthenticated(false) }} className="inline-flex items-center gap-2 border border-[#40534d] px-3 py-2 text-sm hover:border-[#d8f36b]" aria-label="Log out"><FiLogOut /></button>
                        <input ref={importRef} type="file" accept="application/json" onChange={importFile} className="hidden" />
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-[1600px] space-y-6 px-5 pt-5">
                <datalist id="portfolio-icon-suggestions">{iconSuggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist>
                <section className="border border-[#253331] bg-[#11191b] p-5">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Repeatable content</p><h2 className="text-xl font-bold">Services</h2></div><button onClick={addService} className="border border-[#d8f36b] px-3 py-2 text-sm text-[#d8f36b]">+ Add service</button></div>
                    <div className="grid gap-5 md:grid-cols-2">{content.services.map((service, index) => <div key={`${service.title}-${index}`} className="border border-[#253331] p-4">{smallField('Service title', service.title, (value) => updateService(index, { title: value }))}{iconField('Icon name', service.icon, (value) => updateService(index, { icon: value }), serviceIcons)}<label className="mt-4 block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Description</span><textarea value={service.description} onChange={(event) => updateService(index, { description: event.target.value })} className={inputClass} rows={3} /></label><button onClick={() => removeItem('services', index)} className="mt-3 text-xs text-[#ff9d8d]">Remove service</button></div>)}</div>
                </section>

                <section className="border border-[#253331] bg-[#11191b] p-5">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Repeatable content</p><h2 className="text-xl font-bold">Skills and languages</h2></div><button onClick={addSkill} className="border border-[#d8f36b] px-3 py-2 text-sm text-[#d8f36b]">+ Add skill</button></div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{content.skills.map((skill, index) => <div key={`${skill.name}-${index}`} className="border border-[#253331] p-3">{smallField('Skill name', skill.name, (value) => updateSkill(index, { name: value }))}{iconField('Icon name', skill.icon, (value) => updateSkill(index, { icon: value }), skillIcons)}<button onClick={() => removeItem('skills', index)} className="mt-3 text-xs text-[#ff9d8d]">Remove skill</button></div>)}</div>
                </section>

                <section className="border border-[#253331] bg-[#11191b] p-5">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Repeatable content</p><h2 className="text-xl font-bold">Projects and screenshots</h2></div><button onClick={addProject} className="border border-[#d8f36b] px-3 py-2 text-sm text-[#d8f36b]">+ Add project</button></div>
                    <div className="space-y-5">{content.projects.map((project, index) => <div key={`${project.name}-${index}`} className="grid gap-4 border border-[#253331] p-4 lg:grid-cols-2">{smallField('Project name', project.name, (value) => updateProject(index, { name: value }))}{smallField('Project number', project.number, (value) => updateProject(index, { number: value }))}{smallField('Screenshot URL', project.image, (value) => updateProject(index, { image: value }))}{smallField('GitHub URL', project.githubUrl, (value) => updateProject(index, { githubUrl: value }))}{smallField('Live URL', project.liveUrl, (value) => updateProject(index, { liveUrl: value }))}<label className="block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Description</span><textarea value={project.description} onChange={(event) => updateProject(index, { description: event.target.value })} className={inputClass} rows={2} /></label><label className="block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Overview</span><textarea value={project.overview} onChange={(event) => updateProject(index, { overview: event.target.value })} className={inputClass} rows={2} /></label><label className="block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Features (one per line)</span><textarea value={project.features.join('\n')} onChange={(event) => updateProject(index, { features: event.target.value.split('\n').filter(Boolean) })} className={inputClass} rows={3} /></label><label className="block"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Technologies (one per line)</span><textarea value={project.technologies.join('\n')} onChange={(event) => updateProject(index, { technologies: event.target.value.split('\n').filter(Boolean) })} className={inputClass} rows={3} /></label><button onClick={() => removeItem('projects', index)} className="text-left text-xs text-[#ff9d8d]">Remove project</button></div>)}</div>
                </section>

                <section className="border border-[#253331] bg-[#11191b] p-5">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Repeatable content</p><h2 className="text-xl font-bold">Experience</h2></div><button onClick={addExperience} className="border border-[#d8f36b] px-3 py-2 text-sm text-[#d8f36b]">+ Add experience</button></div>
                    <div className="mb-5 grid gap-4 border border-[#40534d] p-4 lg:grid-cols-3">{smallField('Section label', content.experienceIntro.eyebrow, (value) => setContent((current) => ({ ...current, experienceIntro: { ...current.experienceIntro, eyebrow: value } })))}{smallField('Section heading', content.experienceIntro.title, (value) => setContent((current) => ({ ...current, experienceIntro: { ...current.experienceIntro, title: value } })))}<label className="block lg:col-span-3"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Section description</span><textarea value={content.experienceIntro.description} onChange={(event) => setContent((current) => ({ ...current, experienceIntro: { ...current.experienceIntro, description: event.target.value } }))} className={inputClass} rows={2} /></label></div>
                    <div className="space-y-5">{content.experience.map((item, index) => <div key={`${item.title}-${index}`} className="grid gap-4 border border-[#253331] p-4 lg:grid-cols-2">{smallField('Period', item.period, (value) => updateExperience(index, { period: value }))}{smallField('Role title', item.title, (value) => updateExperience(index, { title: value }))}{smallField('Company / location', item.company, (value) => updateExperience(index, { company: value }))}{smallField('Technology focus', item.technologies, (value) => updateExperience(index, { technologies: value }))}<label className="block lg:col-span-2"><span className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[#91aaa1]">Description</span><textarea value={item.description} onChange={(event) => updateExperience(index, { description: event.target.value })} className={inputClass} rows={3} /></label><button onClick={() => removeItem('experience', index)} className="text-left text-xs text-[#ff9d8d]">Remove experience</button></div>)}</div>
                </section>
            </div>

            <div className="mx-auto grid max-w-[1600px] gap-6 p-5 lg:grid-cols-[220px_minmax(0,1fr)_minmax(320px,440px)]">
                <aside className="border border-[#253331] bg-[#11191b] p-3 lg:sticky lg:top-24 lg:h-fit">
                    <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#91aaa1]">Sections</p>
                    <div className="space-y-1">{sections.map((section) => <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full px-3 py-2 text-left text-sm ${activeSection === section.id ? 'bg-[#d8f36b] font-semibold text-[#0b1014]' : 'text-[#b8cbc3] hover:bg-[#162327]'}`}>{section.title}</button>)}</div>
                </aside>

                <section className="space-y-5">
                    <div className="border border-[#253331] bg-[#11191b] p-5"><p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[#d8f36b]">Template fields</p><p className="text-sm leading-6 text-[#91aaa1]">Edit one section at a time. Save when you are ready to apply the changes to the portfolio in this browser.</p></div>
                    {currentSection && <div className="space-y-5 border border-[#253331] bg-[#11191b] p-5"><h2 className="text-2xl font-bold">{currentSection.title}</h2><div className="space-y-4">{currentSection.fields.map((field) => <label key={field.key} className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#91aaa1]">{field.label}</span><textarea value={field.value} onChange={(event) => updateField(currentSection.id, field.key, event.target.value, 'text')} rows={field.value.length > 100 ? 4 : 2} className="w-full resize-y border border-[#40534d] bg-[#0b1014] px-3 py-2 text-sm leading-6 text-[#e8f0ed] outline-none focus:border-[#d8f36b]" /></label>)}</div>{currentSection.images.length > 0 && <div className="border-t border-[#253331] pt-5"><p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-[#d8f36b]">Images</p>{currentSection.images.map((image) => <label key={image.key} className="mb-4 block"><span className="mb-2 block text-xs text-[#91aaa1]"><FiImage className="mr-2 inline" />{image.label}</span><input value={image.value} onChange={(event) => updateField(currentSection.id, image.key, event.target.value, 'image')} className="w-full border border-[#40534d] bg-[#0b1014] px-3 py-2 text-xs text-[#e8f0ed] outline-none focus:border-[#d8f36b]" /></label>)}</div>}</div>}
                </section>

                <section className="border border-[#253331] bg-[#11191b] p-3 lg:sticky lg:top-24 lg:h-fit"><div className="mb-3 flex items-center justify-between px-2"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#91aaa1]">Preview</p><Link href={publicAssetPath('/')} target="_blank" className="text-[#91aaa1] hover:text-[#d8f36b]" aria-label="Open portfolio"><FiExternalLink /></Link></div><iframe ref={frameRef} title="Portfolio preview" src={publicAssetPath('/')} onLoad={loadSections} className="h-[70vh] min-h-[520px] w-full border border-[#40534d] bg-[#0b1014]" /></section>
            </div>
        </main>
    )
}
