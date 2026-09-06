export type EditorState = {
    text: Record<string, string>
    images: Record<string, string>
    content?: import('@/app/lib/content').PortfolioContent
}

export type EditorField = {
    key: string
    label: string
    value: string
}

export type EditorImage = {
    key: string
    label: string
    value: string
}

export type EditorSection = {
    id: string
    title: string
    fields: EditorField[]
    images: EditorImage[]
}

export const EDITOR_STORAGE_KEY = 'saravanan-portfolio-editor-v2'
export const EDITOR_SESSION_KEY = 'saravanan-portfolio-editor-authenticated'
const TEXT_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,a'
const IMAGE_SELECTOR = 'img,[style*="background-image"]'
const TEMPLATE_SECTION_IDS = new Set(['home', 'about', 'contact'])

export function editableTextElements(section: HTMLElement) {
    return Array.from(section.querySelectorAll<HTMLElement>(TEXT_SELECTOR)).filter((element) => {
        const parent = element.parentElement
        return !parent || !parent.matches(TEXT_SELECTOR)
    })
}

export function editableImageElements(section: HTMLElement) {
    return Array.from(section.querySelectorAll<HTMLElement>(IMAGE_SELECTOR))
}

export function inspectSections(root: HTMLElement): EditorSection[] {
    return Array.from(root.querySelectorAll<HTMLElement>('section[id]')).filter((section) => TEMPLATE_SECTION_IDS.has(section.id)).map((section) => {
        const sectionId = section.id
        const fields = editableTextElements(section).map((element, index) => ({
            key: `${sectionId}:text:${index}`,
            label: fieldLabel(element, index),
            value: element.textContent ?? '',
        }))
        const images = editableImageElements(section).map((element, index) => ({
            key: `${sectionId}:image:${index}`,
            label: element.dataset.editorLabel || `${element.tagName.toLowerCase()} image ${index + 1}`,
            value: element instanceof HTMLImageElement ? element.src : element.style.backgroundImage,
        }))

        return {
            id: sectionId,
            title: sectionTitle(sectionId, section),
            fields,
            images,
        }
    })
}

function sectionTitle(sectionId: string, section: HTMLElement) {
    const names: Record<string, string> = {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        services: 'Experience',
        credentials: 'Credentials',
        contact: 'Contact',
    }
    return names[sectionId] || section.querySelector('h1,h2')?.textContent?.trim() || sectionId
}

function fieldLabel(element: HTMLElement, index: number) {
    const text = element.textContent?.replace(/\s+/g, ' ').trim() || ''
    const preview = text.length > 48 ? `${text.slice(0, 48)}...` : text
    if (/^H[1-6]$/.test(element.tagName)) return `Heading: ${preview || index + 1}`
    if (element.tagName === 'A') return `Link: ${preview || index + 1}`
    return `Text block: ${preview || index + 1}`
}

export function applyEditorState(root: HTMLElement, state: EditorState) {
    inspectSections(root).forEach((section) => {
        const sectionElement = root.querySelector<HTMLElement>(`#${CSS.escape(section.id)}`)
        if (!sectionElement) return

        editableTextElements(sectionElement).forEach((element, index) => {
            const value = state.text[`${section.id}:text:${index}`]
            if (value !== undefined) element.textContent = value
        })
        editableImageElements(sectionElement).forEach((element, index) => {
            const value = state.images[`${section.id}:image:${index}`]
            if (!value) return
            if (element instanceof HTMLImageElement) element.src = value
            else element.style.backgroundImage = value.startsWith('url(') ? value : `url("${value}")`
        })
    })
}

export function stateFromSections(sections: EditorSection[], content?: import('@/app/lib/content').PortfolioContent): EditorState {
    const state: EditorState = { text: {}, images: {}, content }
    sections.forEach((section) => {
        section.fields.forEach((field) => { state.text[field.key] = field.value })
        section.images.forEach((image) => { state.images[image.key] = image.value })
    })
    return state
}
