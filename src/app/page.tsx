'use client'

import { useState, useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import Sidebar from '../components/Sidebar'
import Hero from '../components/Hero'
import About from '../components/About'

import ChatBot from '../components/ChatBot'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import GitHubStats from '../components/GitHubStats'
import Achievements from '../components/Achievements'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import ThemeToggle from '../components/ThemeToggle'
import CursorTrail from '../components/CursorTrail'
import LoadingScreen from '../components/LoadingScreen'
import FloatingElements from '../components/FloatingElements'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import CodeRain from '../components/CodeRain'
import EasterEgg from '../components/EasterEgg'
import VisitorCounter from '../components/VisitorCounter'
import ColorSwitcher from '../components/ColorSwitcher'
import TechMarquee from '../components/TechMarquee'
import MusicPlayer from '../components/MusicPlayer'
import WelcomeModal from '../components/WelcomeModal'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

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
        <Achievements />
        <Blog />
        <Contact />
      </div>

      {/* ChatBot & Music Player */}
      <ChatBot />
      <MusicPlayer />

      {/* Post-Load Popups */}
      <WelcomeModal />
    </main>
  )
}