'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Globe, Send, Loader, Clock, CheckCircle, Star, Zap, ArrowRight, Sparkles, MessageSquare } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { toast } from 'sonner'

// 3D Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXFromCenter = e.clientX - rect.left - width / 2
    const mouseYFromCenter = e.clientY - rect.top - height / 2
    x.set(mouseXFromCenter / width)
    y.set(mouseYFromCenter / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-10 transition-all duration-200 ease-linear ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Me',
      value: '+91 78974 03349',
      link: 'tel:+917897403349',
      color: 'from-green-500 to-emerald-500',
      delay: 0
    },
    {
      icon: Mail,
      title: 'Email Me',
      value: 'thesundram29@gmail.com',
      link: 'mailto:thesundram29@gmail.com',
      color: 'from-red-500 to-pink-500',
      delay: 0.1
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Mumbai, India',
      link: 'http://maps.google.com/?q=Mumbai, India',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: Globe,
      title: 'Socials',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/thesundram',
      color: 'from-purple-500 to-indigo-500',
      delay: 0.3
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      setIsSubmitting(false)
      return
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email')
      setIsSubmitting(false)
      return
    }

    // Send email via API
    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Message sent successfully! 🚀')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Failed to send message')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden lg:ml-64 xl:ml-72">

      {/* Dynamic Background */}
      {/* Dynamic Background */}
      <SectionBackground />

      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            className="inline-flex items-center px-4 py-2 mb-4 space-x-2 border rounded-full bg-white/5 border-white/10"
          >
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex w-3 h-3 rounded-full bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Open to Opportunities</span>
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl orbitron gradient-text">
            Let&apos;s Create Magic
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Have an ambitious idea? Let's bridge the gap between imagination and reality. I'm ready to bring your vision to life.
          </p>
        </motion.div>

        {/* 3D Contact Cards */}
        <div className="grid grid-cols-1 gap-6 mb-20 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <TiltCard key={index} className="h-full">
                <motion.a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: info.delay }}
                  className="group relative flex flex-col items-center justify-center p-8 h-full overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-primary/50 transition-colors"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className={`p-4 mb-6 rounded-2xl bg-gradient-to-br ${info.color} shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">{info.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-primary transition-colors">{info.value}</p>
                </motion.a>
              </TiltCard>
            )
          })}
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Info & Time */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="p-8 border bg-white/5 backdrop-blur-sm rounded-3xl border-white/10">
              <h3 className="mb-6 text-2xl font-bold text-white">Why Collaboration Matters</h3>
              <div className="space-y-6">
                {[
                  { title: 'Innovation', desc: 'Pushing boundaries with modern tech stacks' },
                  { title: 'Performance', desc: 'Blazing fast load times & smooth interactions' },
                  { title: 'Scalability', desc: 'Architecture built to grow with your success' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Time Widget */}
            <div className="p-6 text-center border bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl border-white/10 shadow-lg dark:shadow-none">
              <p className="mb-2 text-sm text-gray-400">Current Local Time</p>
              <div className="flex items-center justify-center space-x-3 text-3xl font-bold text-white font-mono">
                <Clock className="w-8 h-8 text-primary" />
                <span>
                  {currentTime.toLocaleTimeString('en-US', {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-6 border shadow-2xl bg-white/5 backdrop-blur-xl rounded-3xl border-white/10">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 text-white transition-all bg-black/40 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none placeholder-transparent peer"
                    placeholder="Name"
                  />
                  <label className={`absolute left-5 transition-all pointer-events-none text-gray-500
                                ${focusedField === 'name' || formData.name ? '-top-3 text-xs bg-black px-1 text-primary' : 'top-4 text-base'}
                            `}>
                    Your Name
                  </label>
                  <Zap className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-gray-600'}`} />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 text-white transition-all bg-black/40 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none placeholder-transparent peer"
                    placeholder="Email"
                  />
                  <label className={`absolute left-5 transition-all pointer-events-none text-gray-500
                                ${focusedField === 'email' || formData.email ? '-top-3 text-xs bg-black px-1 text-primary' : 'top-4 text-base'}
                            `}>
                    Email Address
                  </label>
                  <Mail className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-gray-600'}`} />
                </div>
              </div>


              {/* Subject Input */}
              <div className="relative group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 text-white transition-all bg-black/40 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none placeholder-transparent peer"
                  placeholder="Subject"
                />
                <label className={`absolute left-5 transition-all pointer-events-none text-gray-500
                                ${focusedField === 'subject' || formData.subject ? '-top-3 text-xs bg-black px-1 text-primary' : 'top-4 text-base'}
                            `}>
                  Subject
                </label>
                <MessageSquare className={`absolute right-4 top-4 w-5 h-5 transition-colors ${focusedField === 'subject' ? 'text-primary' : 'text-gray-600'}`} />
              </div>

              {/* Message Input */}
              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full px-5 py-4 text-white transition-all bg-black/40 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none placeholder-transparent peer resize-none"
                  placeholder="Message"
                />
                <label className={`absolute left-5 transition-all pointer-events-none text-gray-500
                            ${focusedField === 'message' || formData.message ? '-top-3 text-xs bg-black px-1 text-primary' : 'top-4 text-base'}
                        `}>
                  Tell me about your project
                </label>
              </div>

              {/* Magnetic Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full overflow-hidden text-lg font-bold text-white transition-all duration-300 rounded-xl group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
                <div className="relative flex items-center justify-center px-8 py-4 space-x-2 bg-black/10 backdrop-blur-sm group-hover:bg-transparent transition-colors">
                  {isSubmitting ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section >
  )
}