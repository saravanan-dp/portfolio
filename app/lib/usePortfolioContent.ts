'use client'

import { useEffect, useState } from 'react'
import { CONTENT_STORAGE_KEY, PortfolioContent, defaultContent, readPortfolioContent } from '@/app/lib/content'

export function usePortfolioContent() {
    const [content, setContent] = useState<PortfolioContent>(defaultContent)

    useEffect(() => {
        setContent(readPortfolioContent())

        const handleStorage = () => setContent(readPortfolioContent())
        window.addEventListener('storage', handleStorage)
        window.addEventListener('portfolio-content-updated', handleStorage)
        return () => {
            window.removeEventListener('storage', handleStorage)
            window.removeEventListener('portfolio-content-updated', handleStorage)
        }
    }, [])

    return content
}

export function savePortfolioContent(content: PortfolioContent) {
    window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content))
    window.dispatchEvent(new Event('portfolio-content-updated'))
}
