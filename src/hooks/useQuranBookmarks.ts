'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'umrava_quran_bookmarks'

export interface QuranBookmark {
  id: string            // `${surahNumber}:${ayahNumber}`
  surahNumber: number
  surahName: string
  surahLatin: string
  ayahNumber: number
  globalNumber: number
  arab: string
  terjemah: string
  savedAt: number
}

export function useQuranBookmarks() {
  const [bookmarks, setBookmarks] = useState<QuranBookmark[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setBookmarks(JSON.parse(raw))
    } catch {}
    setReady(true)
  }, [])

  const persist = useCallback((list: QuranBookmark[]) => {
    setBookmarks(list)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }, [])

  const toggle = useCallback((data: Omit<QuranBookmark, 'id' | 'savedAt'>) => {
    const id = `${data.surahNumber}:${data.ayahNumber}`
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === id)
      const updated = exists
        ? prev.filter(b => b.id !== id)
        : [{ ...data, id, savedAt: Date.now() }, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) =>
      bookmarks.some(b => b.id === `${surahNumber}:${ayahNumber}`),
    [bookmarks]
  )

  const remove = useCallback((id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAll = useCallback(() => persist([]), [persist])

  return { bookmarks, toggle, isBookmarked, remove, clearAll, ready }
}
