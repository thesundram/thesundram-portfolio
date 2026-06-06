'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ParticleBackground from '../components/ParticleBackground'
import Sidebar from '../components/Sidebar'
import Hero from '../components/Hero'
import About from '../components/About'

import ThemeToggle from '../components/ThemeToggle'
import CursorTrail from '../components/CursorTrail'
import LoadingScreen from '../components/LoadingScreen'
import FloatingElements from '../components/FloatingElements'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import CodeRain from '../components/CodeRain'
import TechMarquee from '../components/TechMarquee'

// Dynamically load below-the-fold/heavy components to reduce initial bundle size
const ChatBot = dynamic(() => import('../components/ChatBot'), { ssr: false })
const Services = dynamic(() => import('../components/Services'), { ssr: false })
const Portfolio = dynamic(() => import('../components/Portfolio'), { ssr: false })
const GitHubStats = dynamic(() => import('../components/GitHubStats'), { ssr: false })
const Achievements = dynamic(() => import('../components/Achievements'), { ssr: false })
const Blog = dynamic(() => import('../components/Blog'), { ssr: false })
const Contact = dynamic(() => import('../components/Contact'), { ssr: false })
const VisitorCounter = dynamic(() => import('../components/VisitorCounter'), { ssr: false })
const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false })
const TechOrbit = dynamic(() => import('../components/TechOrbit'), { ssr: false })
const Footer = dynamic(() => import('../components/Footer'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400) // 400ms loading time


    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative min-h-screen">
      <CursorTrail />
      <ThemeToggle />
      <ScrollProgress />
      <BackToTop />
      <FloatingElements />
      <CodeRain />

      <VisitorCounter />
      <ColorSwitcher />

      {/* Background Elements */}
      <ParticleBackground />

      {/* Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />

        <Services />
        <Portfolio />
        <GitHubStats />
        <TechOrbit />
        <Achievements />
        <Blog />
        <Contact />
        <Footer />
      </div>

      {/* ChatBot */}
      <ChatBot />
    </main>
  )
}