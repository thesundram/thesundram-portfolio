'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export default function CursorTrail() {
  // State for cursor modes
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Particle system state
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])

  // Mouse position hooks
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for different elements
  // Main dot - instant
  const mainX = useSpring(mouseX, { damping: 40, stiffness: 400, mass: 0.5 })
  const mainY = useSpring(mouseY, { damping: 40, stiffness: 400, mass: 0.5 })

  // Outer ring - "Magical" floaty feel
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.8 })
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.8 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Add trailing particles occasionally
      if (Math.random() > 0.85) { // 15% chance per move event
        const id = Date.now() + Math.random()
        setParticles(prev => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id))
        }, 600)
      }

      // Check for hoverable elements (Buttons, Links, Inputs)
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        getComputedStyle(target).cursor === 'pointer'

      setIsHovering(!!isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {/* 1. Trailing Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.6, scale: 0.8, x: particle.x, y: particle.y }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              left: 0,
              top: 0
            }}
          />
        ))}
      </AnimatePresence>

      {/* 2. Magnetic/Laggy Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'var(--primary)' : 'rgba(var(--foreground-rgb), 0.3)',
          borderWidth: isHovering ? '2px' : '1px',
        }}
        transition={{ duration: 0.2 }}
        className="absolute w-10 h-10 border rounded-full backdrop-blur-[1px]"
      />

      {/* 3. Main Cursor Dot */}
      <motion.div
        style={{
          x: mainX,
          y: mainY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1, // Disappears into the ring on hover
        }}
        className="absolute w-2 h-2 rounded-full bg-primary"
      />

      {/* 4. Click Burst Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              x: mainX,
              y: mainY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="absolute w-8 h-8 rounded-full border-2 border-primary"
          />
        )}
      </AnimatePresence>
    </div>
  )
}