'use client'

import { useEffect } from 'react'
import { EDITOR_STORAGE_KEY, applyEditorState } from '@/app/lib/editor'

export default function PortfolioContentLoader() {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>('[data-portfolio-content]')
        const savedState = window.localStorage.getItem(EDITOR_STORAGE_KEY)
        if (!root || !savedState) return

        try {
            applyEditorState(root, JSON.parse(savedState))
        } catch {
            window.localStorage.removeItem(EDITOR_STORAGE_KEY)
        }
    }, [])

    return null
}
