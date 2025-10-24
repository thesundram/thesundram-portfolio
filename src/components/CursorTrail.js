'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState([])
  const [currentTheme, setCurrentTheme] = useState({ primary: '#ec1839', accent: '#f39c12' })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      setTrails(prev => [
        ...prev.slice(-20),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }

    const handleThemeChange = () => {
      const root = document.documentElement
      const primary = getComputedStyle(root).getPropertyValue('--color-primary') || '#ec1839'
      const accent = getComputedStyle(root).getPropertyValue('--color-accent') || '#f39c12'
      setCurrentTheme({ primary, accent })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('themeChanged', handleThemeChange)
    
    // Initial theme load
    handleThemeChange()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('themeChanged', handleThemeChange)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <motion.div
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute w-4 h-4 rounded-full mix-blend-difference"
        style={{ backgroundColor: currentTheme.primary }}
      />
      
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={`${trail.id}-${index}`}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            left: trail.x - 4, 
            top: trail.y - 4,
            backgroundColor: currentTheme.accent
          }}
        />
      ))}
    </div>
  )
}