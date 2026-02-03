'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Mobile detection and performance optimization
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency <= 4

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system with mobile optimization
    const particles: Particle[] = []
    const particleCount = isMobile ? (isLowEnd ? 30 : 50) : 100

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5)
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5)
        this.size = Math.random() * (isMobile ? 1.5 : 2) + (isMobile ? 0.5 : 1)
        this.opacity = Math.random() * 0.4 + (isMobile ? 0.1 : 0.2)
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = '#ec1839'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop with mobile optimization
    let frameCount = 0
    const animate = () => {
      frameCount++

      // Reduce frame rate on mobile for better performance
      if (isMobile && frameCount % 2 !== 0) {
        requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections with mobile optimization
      if (!isMobile || !isLowEnd) {
        const connectionDistance = isMobile ? 80 : 100
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              ctx.save()
              ctx.globalAlpha = (connectionDistance - distance) / connectionDistance * (isMobile ? 0.15 : 0.2)
              ctx.strokeStyle = '#ec1839'
              ctx.lineWidth = isMobile ? 0.5 : 1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
              ctx.restore()
            }
          })
        })
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Pause animation when page is not visible (mobile battery optimization)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animation
      } else {
        animate()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}