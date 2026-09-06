import { projects as defaultProjects, services as defaultServices, skills as defaultSkills } from '@/app/lib/constants'

export type EditableSkill = {
    name: string
    icon: string
}

export type EditableProject = {
    name: string
    number: string
    image: string
    description: string
    overview: string
    features: string[]
    technologies: string[]
    githubUrl: string
    liveUrl: string
}

export type EditableExperience = {
    period: string
    title: string
    company: string
    description: string
    technologies: string
}

export type EditableService = {
    title: string
    description: string
    icon: string
}

export type PortfolioContent = {
    skills: EditableSkill[]
    projects: EditableProject[]
    experience: EditableExperience[]
    services: EditableService[]
    experienceIntro: {
        eyebrow: string
        title: string
        description: string
    }
}

export const CONTENT_STORAGE_KEY = 'saravanan-portfolio-content-v1'

export const defaultContent: PortfolioContent = {
    skills: defaultSkills.map((skill) => ({ name: skill.name, icon: skill.name })),
    projects: defaultProjects,
    experience: [
        {
            period: 'JUN 2026 — JUL 2026',
            title: 'Full Stack with AI Intern',
            company: 'Mist Software Solutions Pvt. Ltd. / Madurai',
            description: 'Worked with full-stack application development, API communication, development workflows, and AI-integrated web applications.',
            technologies: 'C# · ASP.NET · ADO.NET',
        },
        {
            period: 'MAY 2023 — JUN 2023',
            title: 'Technical Intern',
            company: 'Bharat Sanchar Nigam Limited / Madurai',
            description: 'Studied next-generation networking, IP routing, switching, TCP/IP, DNS, DHCP, QoS, and network monitoring.',
            technologies: '',
        },
    ],
    experienceIntro: {
        eyebrow: '03 / EXPERIENCE',
        title: "Where I've been learning.",
        description: 'Every role has added a different layer: application development, AI workflows, and the infrastructure that keeps connected systems moving.',
    },
    services: defaultServices.map((service) => ({ title: service.title, description: service.description, icon: service.title })),
}

export function readPortfolioContent(): PortfolioContent {
    if (typeof window === 'undefined') return defaultContent
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY)
    if (!saved) return defaultContent
    try {
        const parsed = JSON.parse(saved) as Partial<PortfolioContent>
        return {
            skills: Array.isArray(parsed.skills) ? parsed.skills : defaultContent.skills,
            projects: Array.isArray(parsed.projects) ? parsed.projects : defaultContent.projects,
            experience: Array.isArray(parsed.experience) ? parsed.experience : defaultContent.experience,
            experienceIntro: parsed.experienceIntro || defaultContent.experienceIntro,
            services: Array.isArray(parsed.services) ? parsed.services.map((service) => ({
                ...service,
                icon: service.icon || service.title || 'Full-stack applications',
            })) : defaultContent.services,
        }
    } catch {
        return defaultContent
    }
}
