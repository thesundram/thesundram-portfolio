'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Mobile & Performance Detection
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency <= 4

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Configuration
    const particleCount = isMobile ? (isLowEnd ? 30 : 50) : 100
    const connectionDistance = isMobile ? 80 : 120
    const mouseRadius = 150

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseX: number
      baseY: number
      density: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.5 : 1)
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.5 : 1)
        this.size = Math.random() * 2 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
      }

      update() {
        // Regular movement
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

        // Mouse Interaction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          // Gentle repulsion/attraction mix for fluid feel
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouseRadius
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          // "Swarm" effect behaves differently
          if (distance < 50) {
            // Push away if too close
            this.x -= directionX * 0.5
            this.y -= directionY * 0.5
          } else {
            // Gently float around
            this.x += directionX * 0.1
            this.y += directionY * 0.1
          }
        }
      }

      draw() {
        ctx!.fillStyle = '#ec1839' // Primary brand color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    const particles: Particle[] = []

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }
    init()

    // Animation Loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw lines
      connect()

      animationId = requestAnimationFrame(animate)
    }

    const connect = () => {
      let opacityValue = 1
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            opacityValue = 1 - (distance / connectionDistance)
            ctx.strokeStyle = `rgba(236, 24, 57, ${opacityValue * 0.5})` // Brand color with opacity
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }

        // Connect to mouse
        const dxMouse = particles[a].x - mouseRef.current.x
        const dyMouse = particles[a].y - mouseRef.current.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < mouseRadius) {
          opacityValue = 1 - (distMouse / mouseRadius)
          ctx.strokeStyle = `rgba(236, 24, 57, ${opacityValue})` // Stronger connection to mouse
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
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