'use client'

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    // Google Analytics
    if (typeof window !== 'undefined') {
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', 'GA_MEASUREMENT_ID')
    }
  }, [])

  return null
}