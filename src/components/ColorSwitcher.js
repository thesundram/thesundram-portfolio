'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Settings } from 'lucide-react'

export default function ColorSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeColor, setActiveColor] = useState('red')

  const applyTheme = (theme) => {
    // Update CSS custom properties
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-accent', theme.accent)
    
    // Update all elements that use primary/accent colors
    const primaryElements = document.querySelectorAll('.text-primary, .bg-primary, .border-primary')
    primaryElements.forEach(el => {
      if (el.classList.contains('text-primary')) el.style.color = theme.primary
      if (el.classList.contains('bg-primary')) el.style.backgroundColor = theme.primary
      if (el.classList.contains('border-primary')) el.style.borderColor = theme.primary
    })
    
    const accentElements = document.querySelectorAll('.text-accent, .bg-accent, .border-accent')
    accentElements.forEach(el => {
      if (el.classList.contains('text-accent')) el.style.color = theme.accent
      if (el.classList.contains('bg-accent')) el.style.backgroundColor = theme.accent
      if (el.classList.contains('border-accent')) el.style.borderColor = theme.accent
    })
    
    // Update gradient elements
    const gradientElements = document.querySelectorAll('.gradient-text')
    gradientElements.forEach(el => {
      el.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
      el.style.webkitBackgroundClip = 'text'
      el.style.webkitTextFillColor = 'transparent'
      el.style.backgroundClip = 'text'
    })
    
    // Update glow text elements
    const glowElements = document.querySelectorAll('.glow-text')
    glowElements.forEach(el => {
      el.style.textShadow = `0 0 10px ${theme.primary}, 0 0 20px ${theme.primary}, 0 0 30px ${theme.primary}`
    })
    
    // Update gradient buttons
    const gradientButtons = document.querySelectorAll('.bg-gradient-to-r')
    gradientButtons.forEach(el => {
      if (el.classList.contains('from-primary')) {
        el.style.background = `linear-gradient(to right, ${theme.primary}, ${theme.accent}, ${theme.primary})`
      }
    })
    
    // Update border buttons
    const borderButtons = document.querySelectorAll('.border-primary')
    borderButtons.forEach(el => {
      el.style.borderColor = theme.primary
    })
    
    // Update mouse cursor
    const mouseCursor = document.querySelector('[class*="bg-primary/30"]')
    if (mouseCursor) {
      const hex = theme.primary.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      mouseCursor.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`
    }
    
    // Update background blur elements
    const bgPrimaryElements = document.querySelectorAll('[class*="bg-primary/"]')
    bgPrimaryElements.forEach(el => {
      const hex = theme.primary.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      
      if (el.classList.toString().includes('bg-primary/10')) {
        el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`
      }
      if (el.classList.toString().includes('bg-primary/20')) {
        el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`
      }
    })
    
    const bgAccentElements = document.querySelectorAll('[class*="bg-accent/"]')
    bgAccentElements.forEach(el => {
      const hex = theme.accent.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      
      if (el.classList.toString().includes('bg-accent/10')) {
        el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`
      }
      if (el.classList.toString().includes('bg-accent/20')) {
        el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`
      }
    })
    
    // Force re-render of dynamic elements
    setTimeout(() => {
      const event = new Event('themeChanged')
      window.dispatchEvent(event)
    }, 100)
    
    localStorage.setItem('color-theme', theme.name)
    setActiveColor(theme.name)
    setIsOpen(false)
  }

  useEffect(() => {
    const colorThemes = [
      { name: 'red', primary: '#ec1839', accent: '#f39c12', label: '🔥 Red Fire' },
      { name: 'blue', primary: '#3b82f6', accent: '#06b6d4', label: '🌊 Ocean Blue' },
      { name: 'purple', primary: '#8b5cf6', accent: '#ec4899', label: '✨ Purple Magic' },
      { name: 'green', primary: '#10b981', accent: '#34d399', label: '🌿 Nature Green' },
      { name: 'orange', primary: '#f97316', accent: '#fb923c', label: '🌅 Sunset Orange' }
    ]
    
    // Load saved theme or use default
    const savedTheme = localStorage.getItem('color-theme')
    const themeToApply = savedTheme 
      ? colorThemes.find(t => t.name === savedTheme) || colorThemes[0]
      : colorThemes[0]
    
    applyTheme(themeToApply)
  }, [])

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-3 text-white transition-all duration-300 border rounded-full top-[5.5rem] right-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
      >
        <Palette size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="fixed z-50 w-auto p-3 border shadow-2xl top-48 right-6 bg-black/60 backdrop-blur-xl rounded-2xl border-white/20"
          >
            <div className="space-y-4">

              
              <div className="space-y-2">
                {[
                  { name: 'red', primary: '#ec1839', accent: '#f39c12', label: '🔥 Red Fire' },
                  { name: 'blue', primary: '#3b82f6', accent: '#06b6d4', label: '🌊 Ocean Blue' },
                  { name: 'purple', primary: '#8b5cf6', accent: '#ec4899', label: '✨ Purple Magic' },
                  { name: 'green', primary: '#10b981', accent: '#34d399', label: '🌿 Nature Green' },
                  { name: 'orange', primary: '#f97316', accent: '#fb923c', label: '🌅 Sunset Orange' }
                ].map((theme) => (
                  <motion.button
                    key={theme.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => applyTheme(theme)}
                    className={`flex items-center justify-center space-x-1 p-2 rounded-lg transition-all duration-300 ${
                      activeColor === theme.name 
                        ? 'bg-white/20 ring-2 ring-white/30' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 border rounded-full border-white/20"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div 
                      className="w-6 h-6 border rounded-full border-white/20"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}