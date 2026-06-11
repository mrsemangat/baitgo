'use client'
import { useEffect } from 'react'

export function PixelViewContent({ contentName }: { contentName: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: contentName })
    }
  }, [contentName])
  return null
}
