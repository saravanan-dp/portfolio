import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiCode,
    FiLayers,
    FiDatabase,
    FiCpu,
    FiGlobe,
    FiServer,
    FiZap
} from 'react-icons/fi'
import { FaReact, FaJava, FaPython, FaGitAlt } from 'react-icons/fa'
import { SiTypescript, SiFirebase, SiMongodb, SiMysql, SiSharp } from 'react-icons/si'

export const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Services', href: 'services' },
    { name: 'Credentials', href: 'credentials' },
    { name: 'Contact', href: 'contact' },
];

export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/saravanan-dp', icon: FiGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/saravanan-dp', icon: FiLinkedin },
    { name: 'Email', url: 'mailto:dp.saravanan4272@gmail.com', icon: FiMail },
]

export const contactEmail = 'dp.saravanan4272@gmail.com'

export const publicAssetPath = (path: string) => `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}${path}`

export const skills = [
    { name: 'React', icon: FaReact },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: FaPython },
    { name: 'Java', icon: FaJava },
    { name: 'C#', icon: SiSharp },
    { name: 'ASP.NET', icon: FiServer },
    { name: 'ADO.NET', icon: FiDatabase },
    { name: 'Spring Boot', icon: FiServer },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'MySQL', icon: SiMysql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'REST APIs', icon: FiGlobe },
    { name: 'Git & GitHub', icon: FaGitAlt },
]

export const skillIcons = Object.fromEntries(skills.map((skill) => [skill.name, skill.icon])) as Record<string, typeof FiCode>

export const projects = [
    {
        name: 'Polytechnic College Chatbot',
        number: '01',
        image: publicAssetPath('/images/p1-chatbot.png'),
        description: 'A college information assistant for admissions, courses, fees, facilities, and timings, with database-driven responses and chat history.',
        overview: 'Polytechnic College Chatbot turns common college enquiries into a searchable conversational experience. It keeps answers consistent while preserving chat history for a smoother student journey.',
        features: ['Admission and course information', 'Fees, facilities, and timing queries', 'Database-backed responses', 'Persistent chat history'],
        technologies: ['Python', 'Flask', 'MySQL'],
        githubUrl: 'https://github.com/saravanan-dp',
        liveUrl: 'https://github.com/saravanan-dp'
    },
    {
        name: 'MicroFinance',
        number: '02',
        image: publicAssetPath('/images/p2-microfinance.png'),
        description: 'A daily collection manager for customers, areas, payments, and authentication, backed by Firebase with bilingual support.',
        overview: 'MicroFinance gives collection teams a single place to organize customers, areas, and daily payments. Firebase keeps the data available across devices and supports a bilingual workflow.',
        features: ['Customer and area management', 'Daily payment tracking', 'Firebase authentication and storage', 'Bilingual interface support'],
        technologies: ['React', 'TypeScript', 'Firebase'],
        githubUrl: 'https://github.com/saravanan-dp/MicroFinance',
        liveUrl: 'https://mraccountant.web.app'
    },
    {
        name: 'FighterCore',
        number: '03',
        image: publicAssetPath('/images/p3-fightercore.png'),
        description: 'An esports tournament platform with player registration, real-time match management, payments, notifications, and admin controls.',
        overview: 'FighterCore is a tournament operations platform built for competitive gaming. It connects player registration with live match updates, payments, notifications, and administration.',
        features: ['Player registration and profiles', 'Real-time match management', 'Payments and notifications', 'Admin controls and PWA support'],
        technologies: ['React', 'TypeScript', 'Firebase', 'PWA'],
        githubUrl: 'https://github.com/saravanan-dp/FighterCore',
        liveUrl: 'https://fightercore.web.app'
    }
]

export const services = [
    {
        title: 'Full-stack applications',
        description: 'Building practical web products with React, TypeScript, Python, Java, and secure REST APIs.',
        icon: FiCode
    },
    {
        title: 'AI integration',
        description: 'Exploring AI-powered workflows, API integration, and Model Context Protocol applications.',
        icon: FiLayers
    },
    {
        title: 'Data-backed systems',
        description: 'Designing reliable data flows with MySQL, Firebase, NoSQL, and MongoDB.',
        icon: FiDatabase
    },
    {
        title: 'Problem solving',
        description: 'Breaking down real-world workflows into clear, useful software and automation.',
        icon: FiZap
    }
]

export const serviceIcons = Object.fromEntries(services.map((service) => [service.title, service.icon])) as Record<string, typeof FiCode>

export const iconSuggestions = Array.from(new Set([
    ...skills.map((skill) => skill.name),
    ...services.map((service) => service.title),
    'JavaScript', 'Node.js', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Django', 'Flask',
    'PHP', 'Laravel', 'Kotlin', 'Swift', 'Go', 'Rust', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'Google Cloud', 'GitHub', 'GitLab', 'PostgreSQL', 'Redis',
    'GraphQL', 'Tailwind CSS', 'Figma', 'Linux', 'TensorFlow', 'OpenAI',
]))
