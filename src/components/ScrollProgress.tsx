'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number>(null)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Throttled scroll handler for mobile performance
    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentScroll = window.scrollY

        // Skip if scroll hasn't changed much (mobile optimization)
        if (Math.abs(currentScroll - lastScrollRef.current) < (isMobile ? 10 : 5)) {
          return
        }

        lastScrollRef.current = currentScroll
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100)
        setScrollProgress(progress)
      })
    }

    // Use passive listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Pause updates when page is not visible (mobile battery optimization)
    const handleVisibilityChange = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isMobile])

  return (
    <motion.div
      className={`fixed top-16 lg:top-0 left-0 lg:left-64 xl:left-72 right-0 bg-gradient-to-r from-primary to-accent z-50 origin-left ${isMobile ? 'h-1.5 sm:h-1' : 'h-1'
        }`}
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{
        duration: isMobile ? 0.2 : 0.1,
        ease: 'easeOut'
      }}
    />
  )
}