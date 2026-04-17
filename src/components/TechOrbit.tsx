'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionBackground from './SectionBackground'

const techs = [
  { name: 'React', color: '#61DAFB', emoji: '⚛️', ring: 1 },
  { name: 'Next.js', color: '#ffffff', emoji: '▲', ring: 1 },
  { name: 'Node.js', color: '#68A063', emoji: '🟢', ring: 1 },
  { name: 'TypeScript', color: '#3178C6', emoji: '🔷', ring: 1 },
  { name: 'Python', color: '#FFD43B', emoji: '🐍', ring: 1 },
  { name: 'MongoDB', color: '#47A248', emoji: '🍃', ring: 1 },

  { name: 'PostgreSQL', color: '#336791', emoji: '🐘', ring: 2 },
  { name: 'React Native', color: '#61DAFB', emoji: '📱', ring: 2 },
  { name: 'Flutter', color: '#54C5F8', emoji: '💙', ring: 2 },
  { name: 'Docker', color: '#2496ED', emoji: '🐳', ring: 2 },
  { name: 'Git', color: '#F05032', emoji: '🔀', ring: 2 },
  { name: 'Tailwind', color: '#06B6D4', emoji: '🎨', ring: 2 },
  { name: 'Firebase', color: '#FFCA28', emoji: '🔥', ring: 2 },
  { name: 'GraphQL', color: '#E535AB', emoji: '◈', ring: 2 },

  { name: 'AWS', color: '#FF9900', emoji: '☁️', ring: 3 },
  { name: 'OPC UA', color: '#EC1839', emoji: '⚙️', ring: 3 },
  { name: 'SCADA', color: '#8B5CF6', emoji: '🏭', ring: 3 },
  { name: 'Prisma', color: '#818CF8', emoji: '🔺', ring: 3 },
  { name: 'Redux', color: '#764ABC', emoji: '🟣', ring: 3 },
  { name: 'Expo', color: '#9CA3AF', emoji: '📲', ring: 3 },
]

interface OrbitRingProps {
  ringNum: number
  radius: number
  duration: number
  direction?: number
  nodeSize?: number
  showLabel?: boolean
}

function OrbitRing({ ringNum, radius, duration, direction = 1, nodeSize = 32, showLabel = true }: OrbitRingProps) {
  const items = techs.filter(t => t.ring === ringNum)

  return (
    <motion.div
      className="absolute rounded-full border border-white/5"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
      animate={{ rotate: direction * 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {items.map((tech, i) => {
        const angle = (i / items.length) * 360
        const rad = (angle * Math.PI) / 180
        const x = radius + Math.cos(rad) * radius
        const y = radius + Math.sin(rad) * radius
        return (
          <motion.div
            key={tech.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: x, top: y }}
            animate={{ rotate: direction * -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="rounded-xl flex items-center justify-center shadow-lg"
              style={{
                width: nodeSize,
                height: nodeSize,
                fontSize: nodeSize * 0.5,
                background: `${tech.color}22`,
                border: `1.5px solid ${tech.color}66`,
              }}
              animate={{
                boxShadow: [`0 0 6px ${tech.color}44`, `0 0 16px ${tech.color}88`, `0 0 6px ${tech.color}44`],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            >
              {tech.emoji}
            </motion.div>
            {showLabel && (
              <div
                className="mt-0.5 px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap"
                style={{
                  fontSize: nodeSize * 0.28,
                  color: tech.color,
                  background: `${tech.color}18`,
                  border: `1px solid ${tech.color}44`,
                }}
              >
                {tech.name}
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function TechOrbit() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [size, setSize] = useState(400)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const w = window.innerWidth
      // Available width minus sidebar on desktop, minus padding
      const available = w < 1024 ? w - 32 : Math.min(w - 288 - 64, 700)
      setSize(Math.min(available, 580))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Scale radii based on available size
  const r1 = Math.floor(size * 0.19)
  const r2 = Math.floor(size * 0.32)
  const r3 = Math.floor(size * 0.45)
  const nodeSize = Math.floor(size * 0.065)
  const showLabel = size > 300

  return (
    <section id="tech-orbit" className="relative py-20 overflow-hidden lg:ml-60 xl:ml-64">
      <SectionBackground />

      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/5 border border-white/10"
          >
            <span className="text-primary text-sm font-medium">⚡ Tech Universe</span>
          </motion.div>
          <h2 className="text-4xl font-bold md:text-5xl orbitron gradient-text mb-4">
            My Tech Stack
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            A living universe of every technology I use to build production-grade software.
          </p>
        </motion.div>

        {/* Orbital Stage */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="relative w-full flex items-center justify-center select-none overflow-hidden"
            style={{ height: size }}
          >
            <OrbitRing ringNum={1} radius={r1} duration={18} direction={1} nodeSize={nodeSize} showLabel={showLabel} />
            <OrbitRing ringNum={2} radius={r2} duration={28} direction={-1} nodeSize={nodeSize} showLabel={showLabel} />
            <OrbitRing ringNum={3} radius={r3} duration={38} direction={1} nodeSize={nodeSize} showLabel={showLabel} />

            {/* Center Core */}
            <motion.div
              className="absolute z-10 flex flex-col items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="rounded-2xl flex items-center justify-center font-bold text-white shadow-2xl"
                style={{
                  width: size * 0.12,
                  height: size * 0.12,
                  fontSize: size * 0.045,
                  background: 'linear-gradient(135deg, #ec1839, #f39c12)',
                  boxShadow: '0 0 40px rgba(236,24,57,0.4)',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                SP
              </motion.div>
              <p className="mt-1.5 text-xs font-semibold text-primary">Full Stack</p>
            </motion.div>

            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(236,24,57,0.05) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}


        {/* Bottom badge list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {techs.map((t, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.03 }}
              whileHover={{ scale: 1.12, y: -3 }}
              className="px-2.5 py-1 rounded-full text-xs font-semibold border cursor-default transition-all duration-200"
              style={{
                background: `${t.color}14`,
                borderColor: `${t.color}44`,
                color: t.color,
              }}
            >
              {t.emoji} {t.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
