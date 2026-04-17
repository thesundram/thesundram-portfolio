'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Facebook, Mail, Phone, MapPin, Heart, ExternalLink, Zap, Target, Home, User, Briefcase, LayoutGrid, BookOpen, MessageSquare } from 'lucide-react'
import SectionBackground from './SectionBackground'

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Services', href: '#services', icon: Briefcase },
  { name: 'Portfolio', href: '#portfolio', icon: LayoutGrid },
  { name: 'GitHub', href: '#github-stats', icon: Github },
  { name: 'Blog', href: '#blog', icon: BookOpen },
  { name: 'Contact', href: '#contact', icon: MessageSquare },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/thesundram', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Github, href: 'https://github.com/thesundram', label: 'GitHub', color: '#24292e', darkColor: true },
  { icon: Instagram, href: 'https://www.instagram.com/its.sun29/', label: 'Instagram', color: '#E1306C' },
  { icon: Facebook, href: 'https://www.facebook.com/thesundram29', label: 'Facebook', color: '#1877F2' },
  { icon: Mail, href: 'mailto:thesundram29@gmail.com', label: 'Email', color: '#EC1839' },
]



export default function Footer() {
  const [year] = useState(new Date().getFullYear())

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t lg:ml-60 xl:ml-64 border-gray-200 dark:border-white/10 transition-colors duration-500">
      {/* Premium Glow Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_0_15px_rgba(236,24,57,0.5)]" />

      {/* Shared Global Background */}
      <SectionBackground />

      <div className="container relative z-10 px-4 mx-auto sm:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">

          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-2xl transition-transform group-hover:rotate-6"
                  style={{ background: 'linear-gradient(135deg, #ec1839, #f39c12)' }}
                >
                  SP
                </div>
                <div>
                  <h3 className="text-xl font-bold orbitron gradient-text tracking-tight">Sundram Pandey</h3>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 tracking-[0.2em] font-bold uppercase">Software Engineer</p>
                </div>
              </div>
            </motion.div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              MERN Stack specialist & Mobile Dev enthusiast designing high-performance digital ecosystems.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-col gap-3 pt-2">
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide w-fit"
              >
                <div className="relative w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                  <span className="relative block w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                Available for Projects
              </motion.div>

              <div className="flex gap-2">
                <div className="px-2.5 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-bold flex items-center gap-1.5">
                  <Zap size={12} className="fill-blue-500/20" />
                  RESPONDS IN &lt; 4H
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-orange-500/5 border border-orange-500/10 text-orange-500 text-[10px] font-bold flex items-center gap-1.5">
                  <Target size={12} className="fill-orange-500/20" />
                  FOCUS: FULL STACK
                </div>
              </div>
            </div>
          </div>

          {/* Social Icons Integrated */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-l-2 border-primary pl-3">Digital Presence</h4>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      backgroundColor: social.color + '22',
                      borderColor: social.color + '44',
                      boxShadow: `0 10px 20px ${social.color}22`
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 transition-all duration-300 group"
                  >
                    <Icon
                      size={18}
                      className="transition-colors duration-300 group-hover:text-[var(--social-color)]"
                      style={{ '--social-color': social.color } as React.CSSProperties}
                    />
                  </motion.a>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 font-medium italic">"Designing the future, one commit at a time."</p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-l-2 border-primary pl-3">Site Directory</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-all duration-200 flex items-center gap-2.5 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
                    <link.icon size={14} className="opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-l-2 border-primary pl-3">Current Location</h4>
            <div className="relative group">
              <motion.div
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl shadow-black/5"
              >
                <iframe
                  width="100%"
                  height="160"
                  frameBorder="0"
                  scrolling="no"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.775%2C18.892%2C73.003%2C19.271&amp;layer=mapnik&amp;marker=19.076%2C72.877"
                  className="grayscale hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-105 group-hover:scale-100 h-40 sm:h-auto"
                ></iframe>

                {/* Floating Map Label */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-[9px] font-bold text-primary flex items-center gap-1 shadow-lg pointer-events-none">
                  <MapPin size={10} className="fill-primary/20" />
                  MUMBAI, IND
                </div>

                {/* Hover Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="https://www.google.com/maps/place/Mumbai,+Maharashtra/@19.0760,72.8777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-black text-[10px] font-bold rounded-xl shadow-xl hover:scale-110 transition-transform flex items-center gap-2"
                  >
                    View on Google Maps
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="flex gap-4">
              <a href="mailto:thesundram29@gmail.com" className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                <Mail size={14} /> Email Me
              </a>
              <a href="tel:+917897403349" className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>

        </div>

        {/* Global Divider */}
        <div className="mt-16 mb-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p>© {year} Sundram Pandey</p>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary/20" />
            <p>Crafted with Purpose</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary my-2 md:my-0"
          >
            <Heart size={14} className="fill-primary animate-pulse" />
            <span>Built in the Heart of India</span>
          </motion.div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/thesundram" className="hover:text-primary transition-colors flex items-center gap-1.5">
              Repository <Github size={12} />
            </a>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary/20" />
            <p className="flex items-center gap-1">Status: <span className="text-green-500">Optimized</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
