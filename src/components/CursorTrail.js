'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState([])
  const [currentTheme, setCurrentTheme] = useState({ primary: '#ec1839', accent: '#f39c12' })
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    
    checkTouchDevice()
    
    const handleMouseMove = (e) => {
      if (isTouchDevice) return
      
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      setTrails(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }

    const handleThemeChange = () => {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--color-primary') || '#ec1839'
      const accent = getComputedStyle(root).getPropertyValue('--color-accent') || '#f39c12'
      setCurrentTheme({ primary, accent })
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('themeChanged', handleThemeChange)
    window.addEventListener('resize', checkTouchDevice)
    
    // Initial theme load
    handleThemeChange()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('themeChanged', handleThemeChange)
      window.removeEventListener('resize', checkTouchDevice)
    }
  }, [])

  // Don't render on touch devices
  if (isTouchDevice) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden sm:block">
      {/* Main cursor */}
      <motion.div
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute w-3 h-3 rounded-full mix-blend-difference sm:w-4 sm:h-4"
        style={{ backgroundColor: currentTheme.primary }}
      />
      
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={`${trail.id}-${index}`}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-1.5 h-1.5 rounded-full sm:w-2 sm:h-2"
          style={{ 
            left: trail.x - 3, 
            top: trail.y - 3,
            backgroundColor: currentTheme.accent
          }}
        />
      ))}
    </div>
  )
}