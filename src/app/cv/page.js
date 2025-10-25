'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Briefcase, User, Code, GraduationCap, Trophy, Star, Eye, Share2, Linkedin, Github, BarChart3, Clock, Zap, MessageSquare, Copy } from 'lucide-react'
import Link from 'next/link'

export default function CVPage() {
  const [age, setAge] = useState('21')
  const [activeSection, setActiveSection] = useState('summary')
  const [isVisible, setIsVisible] = useState({})
  const [toast, setToast] = useState({ show: false, message: '' })


  const [stats, setStats] = useState({
    experience: 2,
    projects: 35,
    clients: 15,
    commits: 1200
  })
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    commits: 0
  })

  // Calculate age automatically and update time/availability
  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2004-02-29')
      const today = new Date()
      let calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--
      }
      
      return calculatedAge
    }
    
    setAge(calculateAge().toString())
    
    // Animate stats counters
    const animateCounters = () => {
      Object.keys(stats).forEach(key => {
        let current = 0
        const target = stats[key]
        const increment = target / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }))
        }, 30)
      })
    }
    
    const timer = setTimeout(animateCounters, 1000)
    return () => clearTimeout(timer)
  }, [stats])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const personalInfo = {
    name: 'Sundram Pandey',
    title: 'Software Engineer | Full Stack Developer',
    email: 'thesundram29@gmail.com',
    phone: '+91 7897403349',
    location: 'Mumbai, India',
    birthday: '29 Feb',
    age: age
  }

  const skills = [
    { 
      category: 'Programming Languages', 
      items: [
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'HTML/CSS', level: 98 },
        { name: 'Node.js', level: 90 }
      ]
    },
    { 
      category: 'Frameworks/Libraries', 
      items: [
        { name: 'React', level: 95 },
        { name: 'React Native', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Flutter', level: 85 },
        { name: 'Express.js', level: 92 }
      ]
    },
    { 
      category: 'Database & Cloud', 
      items: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Firebase', level: 88 },
        { name: 'AWS', level: 75 }
      ]
    }
  ]

  const experience = [
    {
      title: 'Software Developer',
      company: 'Uttam Infotech Global Ventures Pvt Ltd',
      period: 'Sep 2025 — Present',
      location: 'Mumbai, India',
      type: 'Full-time • On-site',
      description: 'Working as a Software Developer in the Software Development team. Developing and maintaining mobile applications using React Native. Building responsive user interfaces with React.js and Next.js. Working with backend technologies like Node.js, Python, and REST APIs. Managing data with PostgreSQL, MySQL, and MongoDB.'
    },
    {
      title: 'Software Development Intern',
      company: 'Cognifyz Technologies',
      period: 'Aug 2025 — Sep 2025',
      location: 'Remote',
      type: 'Internship',
      description: 'Worked on software development tasks including CRUD applications, file handling, and web scraping. Implemented coding logic, testing, and debugging; enhanced problem-solving skills through level-based projects.'
    },
    {
      title: 'Full Stack Development Intern',
      company: 'SaiKet Systems',
      period: 'Jul 2025 — Aug 2025',
      location: 'Remote',
      type: 'Internship',
      description: 'Built responsive UIs using HTML, CSS, Bootstrap/Tailwind, and React.js. Developed REST APIs using Node.js & Express, integrated MySQL/PostgreSQL, and created a full-stack User Management System. Used GitHub for version control and task tracking.'
    },
    {
      title: 'App Developer Intern | Flutter Developer',
      company: 'RCAS LLP',
      period: 'Jun 2025 — Jul 2025',
      location: 'Mumbai, India',
      type: 'Internship • On-site',
      description: 'Developed cross-platform apps with Flutter & Dart, integrating Firebase, Firestore, and MongoDB. Implemented business logic, backend connectivity, and native integrations via Android Studio & SDK/NDK. Collaborated with UI/UX team for smooth, intuitive designs.'
    }
  ]

  const education = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Chhatrapati Shivaji Maharaj University',
      period: 'Nov 2021 — Jun 2025',
      location: 'Panvel, Navi Mumbai, Maharashtra'
    },
    {
      degree: 'Full Stack Development',
      institution: 'LiveWire Training Institute',
      period: 'Jan 2024 — Jun 2024',
      location: 'Maharashtra'
    },
    {
      degree: 'Diploma in Computer Applications',
      institution: 'STP Computer Education',
      period: 'Dec 2023 — Jun 2024',
      location: 'New Delhi'
    },
    {
      degree: 'Advanced Excel Course',
      institution: 'STP Computer Education',
      period: 'Oct 2023 — Nov 2023',
      location: 'New Delhi'
    }
  ]

  const projects = [
    {
      title: 'Threads – Real-Time Chat App',
      tech: 'MERN, Socket.io, Chakra UI, JWT',
      role: 'Full Stack Developer',
      description: 'Built a social app with post creation, real-time chat, notifications, and dark/light mode. Integrated JWT for authentication and Socket.io for live messaging.'
    },
    {
      title: 'Socially – Social Media Platform',
      tech: 'Next.js, PostgreSQL, Prisma, Clerk',
      role: 'Full Stack Developer',
      description: 'Developed a scalable social media app with API integration, file uploads, and caching. Used Prisma ORM and Clerk for authentication and optimized UI performance.'
    },
    {
      title: 'Bookstore – React Native App',
      tech: 'React Native, Node.js, Express.js, MongoDB, JWT',
      role: 'Full Stack Developer',
      description: 'Built a mobile/web bookstore app with auth, CRUD, media uploads, infinite loading, and theme support. Deployed secure backend with CRON jobs and free API hosting.'
    }
  ]

  const achievements = [
    {
      title: 'Senior Volunteer',
      organization: 'National Service Scheme, CSMU',
      period: 'Sep 2022 — Jun 2025'
    }
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-4 left-1/2 z-[100] px-4 py-2 bg-green-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg border border-green-400/20"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                ✓
              </motion.div>
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full top-20 left-20 w-96 h-96 bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full bottom-20 right-20 w-80 h-80 bg-accent/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b shadow-2xl bg-black/90 backdrop-blur-xl border-white/10"
      >
        <div className="container flex items-center justify-between px-4 py-3 mx-auto sm:px-6 sm:py-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -8 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-2 py-2 space-x-2 text-gray-300 transition-all rounded-lg hover:text-white hover:bg-white/10 sm:px-4 sm:space-x-3"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Sundram Pandey - CV',
                    text: 'Check out my CV - Software Engineer | Full Stack Developer',
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  setToast({ show: true, message: 'CV link copied!' })
                  setTimeout(() => setToast({ show: false, message: '' }), 3000)
                }
              }}
              className="p-2 transition-all rounded-full bg-white/10 hover:bg-white/20 sm:p-3"
              title="Share CV"
            >
              <Share2 size={16} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
            </motion.button>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/images/Sundram_CV.pdf', '_blank')}
                className="flex items-center px-3 py-2 space-x-1 text-sm font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 sm:px-6 sm:py-3 sm:space-x-2"
                title="View PDF"
              >
                <Eye size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View</span>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 15px 40px rgba(236, 24, 57, 0.4)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/images/Sundram_CV.pdf'
                  link.download = 'Sundram_Pandey_CV.pdf'
                  link.click()
                }}
                className="flex items-center px-3 py-2 space-x-1 text-sm font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-primary to-accent sm:px-6 sm:py-3 sm:space-x-2"
                title="Download PDF"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Download</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container max-w-4xl px-3 py-4 mx-auto sm:px-6 sm:py-12">
        {/* Enhanced Personal Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8 text-center sm:mb-16"
        >
          <motion.div
            className="absolute top-0 w-32 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.h1 
            className="relative mb-3 text-2xl font-bold uppercase orbitron gradient-text sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {personalInfo.name}
            <motion.div
              className="absolute w-4 h-4 rounded-full -top-2 -right-4 bg-primary"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.h1>
          
          <motion.p 
            className="mb-4 text-base font-medium text-gray-300 uppercase sm:mb-8 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personalInfo.title}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-2 text-xs sm:gap-6 sm:text-sm md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { 
                icon: Mail, 
                text: personalInfo.email, 
                color: 'text-red-400',
                href: `mailto:${personalInfo.email}`,
                label: 'Send Email',
                copyText: personalInfo.email
              },
              { 
                icon: Phone, 
                text: personalInfo.phone, 
                color: 'text-green-400',
                href: `tel:${personalInfo.phone}`,
                label: 'Call Now',
                copyText: personalInfo.phone
              },
              { 
                icon: MapPin, 
                text: personalInfo.location, 
                color: 'text-blue-400',
                href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
                label: 'View Location',
                copyText: personalInfo.location
              },
              { 
                icon: Linkedin, 
                text: 'LinkedIn', 
                color: 'text-blue-500',
                href: 'https://linkedin.com/in/thesundram',
                label: 'LinkedIn Profile',
                copyText: 'https://linkedin.com/in/thesundram'
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="relative group">
                  <motion.a
                    href={item.href}
                    target={item.icon === MapPin || item.icon === Linkedin ? '_blank' : '_self'}
                    rel={item.icon === MapPin || item.icon === Linkedin ? 'noopener noreferrer' : undefined}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-2 py-1.5 space-x-1.5 transition-all border rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/15 hover:border-white/20 group sm:px-5 sm:py-3 sm:space-x-3"
                    title={item.label}
                  >
                    <Icon size={14} className={`${item.color} group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]`} />
                    <span className="text-xs font-medium text-gray-300 transition-colors group-hover:text-white sm:text-sm truncate max-w-[120px] sm:max-w-none">{item.text}</span>
                  </motion.a>
                  
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText(item.copyText)
                      setToast({ show: true, message: `${item.text} copied!` })
                      setTimeout(() => setToast({ show: false, message: '' }), 3000)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-0 right-0 p-1.5 transition-all opacity-0 bg-white/10 rounded-full group-hover:opacity-100 hover:bg-white/20 sm:-top-1 sm:-right-1 sm:p-2"
                    title="Copy"
                  >
                    <Copy size={12} className="text-gray-400 hover:text-white sm:w-3 sm:h-3" />
                  </motion.button>
                </div>
              )
            })}
          </motion.div>
          

        </motion.div>

        {/* Animated Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 sm:mb-16"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {[
              { key: 'experience', label: 'Years Experience', icon: Clock, color: 'from-blue-500 to-cyan-500', suffix: '+' },
              { key: 'projects', label: 'Projects Built', icon: Code, color: 'from-green-500 to-emerald-500', suffix: '+' },
              { key: 'clients', label: 'Happy Clients', icon: Star, color: 'from-yellow-500 to-orange-500', suffix: '+' },
              { key: 'commits', label: 'GitHub Commits', icon: Github, color: 'from-purple-500 to-pink-500', suffix: '+' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative p-3 text-center border shadow-xl bg-gradient-to-br ${stat.color} bg-opacity-10 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={20} className="mx-auto mb-2 text-white transition-transform group-hover:scale-110 sm:w-8 sm:h-8 sm:mb-3" />
                  </motion.div>
                  <motion.div 
                    className="mb-1 text-xl font-bold gradient-text sm:mb-2 sm:text-3xl lg:text-4xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {animatedStats[stat.key]}{stat.suffix}
                  </motion.div>
                  <div className="text-xs text-gray-400 leading-tight sm:text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Enhanced Summary */}
        <motion.section
          id="summary"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.summary ? "visible" : "hidden"}
          className="mb-6 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-3 text-xl font-bold text-primary sm:mb-6 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <User className="mr-2 sm:mr-3" size={20} />
            </motion.div>
            Professional Summary
          </motion.h2>
          <motion.div 
            className="relative p-3 border shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 sm:p-8"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 25px 50px rgba(236, 24, 57, 0.1)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <p className="relative z-10 text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
              <span className="absolute font-serif text-xl opacity-50 text-primary -top-1 -left-1 sm:text-2xl sm:-top-2 sm:-left-2">&ldquo;</span>
              Versatile and results-driven <span className="font-semibold text-primary">Software Developer</span> | 
              <span className="font-semibold text-accent">Full Stack Developer</span> with experience building scalable web and 
              mobile applications using technologies like <span className="text-primary">React</span>, 
              <span className="text-accent">React Native</span>, <span className="text-primary">Next.js</span>, 
              <span className="text-accent">Node.js</span>, <span className="text-primary">Flutter</span>, and 
              <span className="text-accent">MongoDB</span>. Skilled in developing responsive UIs, RESTful APIs, and real-time features 
              with strong problem-solving and optimization abilities. Proficient in mobile and web development with a focus on 
              <span className="font-semibold text-primary">clean code</span>, <span className="font-semibold text-accent">security</span>, 
              and <span className="font-semibold text-primary">performance</span>.
              <span className="absolute font-serif text-xl opacity-50 text-primary -bottom-3 -right-1 sm:text-2xl sm:-bottom-4 sm:-right-2">&rdquo;</span>
            </p>
          </motion.div>
        </motion.section>

        {/* Enhanced Skills */}
        <motion.section
          id="skills"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.skills ? "visible" : "hidden"}
          className="mb-8 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-4 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code className="mr-2 sm:mr-3" size={24} />
            </motion.div>
            Technical Skills
          </motion.h2>
          <motion.div 
            className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.skills ? "visible" : "hidden"}
          >
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(236, 24, 57, 0.1)'
                }}
                className="relative p-4 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                />
                <h3 className="mb-4 text-lg font-bold transition-colors text-accent group-hover:text-primary sm:text-xl">
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      className="space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white sm:text-base">{skill.name}</span>
                        <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden bg-gray-700 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ delay: (index * 0.1) + (i * 0.05) + 0.2, duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Experience */}
        <motion.section
          id="experience"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.experience ? "visible" : "hidden"}
          className="mb-8 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-4 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="mr-2 sm:mr-3" size={24} />
            </motion.div>
            Work Experience
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 sm:left-8"></div>
            
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible.experience ? "visible" : "hidden"}
            >
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    boxShadow: '0 20px 40px rgba(236, 24, 57, 0.1)'
                  }}
                  className="relative p-4 ml-8 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6 sm:ml-16 md:p-8"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute w-3 h-3 border-2 border-black rounded-full -left-12 top-6 bg-primary sm:w-4 sm:h-4 sm:border-4 sm:-left-20 sm:top-8"
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(236, 24, 57, 0.4)',
                        '0 0 0 10px rgba(236, 24, 57, 0)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  />
                  
                  <div className="flex flex-col mb-3 sm:mb-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-primary sm:mb-2 sm:text-xl md:text-2xl">
                        {exp.title}
                      </h3>
                      <p className="mb-1 text-base font-semibold text-accent sm:text-lg md:text-xl">{exp.company}</p>
                      <p className="text-xs text-gray-400 sm:text-sm">{exp.location} • {exp.type}</p>
                    </div>
                    <motion.div 
                      className="flex items-center px-3 py-1 mt-2 space-x-1 border rounded-lg lg:mt-0 bg-primary/10 border-primary/20 sm:px-4 sm:py-2 sm:space-x-2 sm:mt-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar size={14} className="text-primary sm:w-4 sm:h-4" />
                      <span className="text-xs font-medium text-primary sm:text-sm">{exp.period}</span>
                    </motion.div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Projects */}
        <motion.section
          id="projects"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.projects ? "visible" : "hidden"}
          className="mb-8 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-4 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code className="mr-2 sm:mr-3" size={24} />
            </motion.div>
            Featured Projects
          </motion.h2>
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.projects ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 25px 50px rgba(236, 24, 57, 0.15)'
                }}
                className="relative p-4 overflow-hidden border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6 md:p-8"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
                
                {/* Project number */}
                <motion.div
                  className="absolute flex items-center justify-center w-8 h-8 border rounded-full top-3 right-3 bg-primary/20 border-primary/30 sm:w-10 sm:h-10 sm:top-4 sm:right-4 md:w-12 md:h-12"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <span className="text-sm font-bold text-primary sm:text-base md:text-lg">{index + 1}</span>
                </motion.div>
                
                <div className="mb-3 sm:mb-4">
                  <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-primary sm:mb-3 sm:text-xl md:text-2xl">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2 sm:gap-3 sm:mb-3 md:gap-4">
                    <motion.span 
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-accent/20 text-accent border-accent/30 sm:px-4 sm:py-2 sm:text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      Tech: {project.tech}
                    </motion.span>
                    <motion.span 
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-primary/20 text-primary border-primary/30 sm:px-4 sm:py-2 sm:text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      Role: {project.role}
                    </motion.span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">{project.description}</p>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/5 to-accent/5 group-hover:opacity-100 rounded-2xl"
                />
              </motion.div>
            ))}
            
            <motion.div 
              className="mt-8 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.a
                href="https://github.com/thesundram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 space-x-2 font-semibold transition-all border rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary/30 hover:to-accent/30 sm:px-8 sm:py-4 sm:space-x-3"
                whileHover={{ y: -3, boxShadow: '0 15px 30px rgba(236, 24, 57, 0.3)' }}
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">View More on GitHub</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Education */}
        <motion.section
          id="education"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.education ? "visible" : "hidden"}
          className="mb-8 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-4 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="mr-2 sm:mr-3" size={24} />
            </motion.div>
            Education & Certifications
          </motion.h2>
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.education ? "visible" : "hidden"}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 8,
                  boxShadow: '0 20px 40px rgba(236, 24, 57, 0.1)'
                }}
                className="relative p-4 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6 md:p-8"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-primary sm:mb-2 sm:text-xl">
                      {edu.degree}
                    </h3>
                    <p className="mb-1 text-base font-semibold text-accent sm:text-lg">{edu.institution}</p>
                    <p className="text-xs text-gray-400 sm:text-sm">{edu.location}</p>
                  </div>
                  <motion.div 
                    className="flex items-center px-3 py-1 mt-2 space-x-1 border rounded-lg sm:mt-3 sm:px-4 sm:py-2 sm:space-x-2 lg:mt-0 bg-accent/10 border-accent/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={14} className="text-accent sm:w-4 sm:h-4" />
                    <span className="text-xs font-medium text-accent sm:text-sm">{edu.period}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Achievements */}
        <motion.section
          id="achievements"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.achievements ? "visible" : "hidden"}
          className="mb-8 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center mb-4 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Trophy className="mr-2 sm:mr-3" size={24} />
            </motion.div>
            Achievements & Activities
          </motion.h2>
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible.achievements ? "visible" : "hidden"}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(243, 156, 18, 0.2)'
                }}
                className="relative p-4 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group sm:p-6 md:p-8"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
                
                <motion.div
                  className="absolute p-1 border rounded-full top-3 right-3 bg-accent/20 border-accent/30 sm:p-2 sm:top-4 sm:right-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Star size={16} className="text-accent sm:w-5 sm:h-5" />
                </motion.div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-accent sm:mb-2 sm:text-xl">
                      {achievement.title}
                    </h3>
                    <p className="text-base font-semibold text-primary sm:text-lg">{achievement.organization}</p>
                  </div>
                  <motion.div 
                    className="flex items-center px-3 py-1 mt-2 space-x-1 border rounded-lg sm:mt-3 sm:px-4 sm:py-2 sm:space-x-2 lg:mt-0 bg-primary/10 border-primary/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={14} className="text-primary sm:w-4 sm:h-4" />
                    <span className="text-xs font-medium text-primary sm:text-sm">{achievement.period}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Quick Contact Actions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-12 sm:mb-16"
        >
          <motion.h2 
            className="flex items-center justify-center mb-6 text-2xl font-bold text-primary sm:mb-8 sm:text-3xl"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="mr-2 sm:mr-3" size={24} />
            Let's Connect
          </motion.h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              {
                title: 'Email Me',
                subtitle: 'Quick Response',
                icon: Mail,
                color: 'from-red-500 to-pink-500',
                action: () => window.open(`mailto:${personalInfo.email}?subject=Let's Work Together&body=Hi Sundram, I would like to discuss a project with you.`)
              },
              {
                title: 'Call Now',
                subtitle: 'Direct Contact',
                icon: Phone,
                color: 'from-green-500 to-emerald-500',
                action: () => window.open(`tel:${personalInfo.phone}`)
              },
              {
                title: 'WhatsApp',
                subtitle: 'Instant Chat',
                icon: MessageSquare,
                color: 'from-green-400 to-green-600',
                action: () => window.open(`https://wa.me/917897403349?text=Hi Sundram! I found your CV and would like to discuss a project.`)
              }
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.button
                  key={index}
                  onClick={contact.action}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 text-center border shadow-xl bg-gradient-to-br ${contact.color} bg-opacity-10 backdrop-blur-lg rounded-2xl border-white/20 group transition-all duration-300 sm:p-6`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} className="mx-auto mb-3 text-white transition-transform group-hover:scale-110" />
                  </motion.div>
                  <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-primary">{contact.title}</h3>
                  <p className="text-sm text-gray-400">{contact.subtitle}</p>
                </motion.button>
              )
            })}
          </div>
        </motion.section>

        {/* QR Code Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-6 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20"
          >
            <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">Scan to View Portfolio</h3>
            <motion.div
              className="p-4 bg-white rounded-xl"
              whileHover={{ rotate: 5 }}
            >
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent('https://thesundram.vercel.app')}`}
                alt="Portfolio QR Code"
                className="w-24 h-24 mx-auto sm:w-32 sm:h-32"
              />
            </motion.div>
            <p className="mt-3 text-xs text-gray-400 sm:text-sm">Scan with your phone camera</p>
          </motion.div>
        </motion.section>

        {/* Enhanced Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative text-center"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/images/Sundram_CV.pdf', '_blank')}
              className="flex items-center px-6 py-3 space-x-2 text-base font-bold text-white transition-all duration-500 border rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-500 border-white/20 sm:px-8 sm:py-4 sm:text-lg"
            >
              <Eye size={18} className="sm:w-5 sm:h-5" />
              <span>View CV</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(236, 24, 57, 0.4)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/images/Sundram_CV.pdf'
                link.download = 'Sundram_Pandey_CV.pdf'
                link.click()
              }}
              className="flex items-center px-6 py-3 space-x-2 text-base font-bold text-white transition-all duration-500 border rounded-full shadow-2xl bg-gradient-to-r from-primary via-accent to-primary border-white/20 sm:px-8 sm:py-4 sm:text-lg"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              <span>Download CV</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}