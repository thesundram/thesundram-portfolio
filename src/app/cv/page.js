'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Briefcase, User, Code, GraduationCap, Trophy, Star, Eye, Share2, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function CVPage() {
  const [age, setAge] = useState('21')
  const [activeSection, setActiveSection] = useState('summary')
  const [isVisible, setIsVisible] = useState({})

  // Calculate age automatically on client side
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
  }, [])

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
    { category: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS', 'Node.js'] },
    { category: 'Frameworks/Libraries', items: ['React', 'React Native', 'Next.js', 'Flutter', 'Express.js', 'Angular', 'Bootstrap'] },
    { category: 'Database Technologies', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
    { category: 'Tools & Platforms', items: ['Git', 'Docker', 'Postman', 'VS Code'] },
    { category: 'Technologies & Concepts', items: ['REST APIs', 'JWT Auth', 'CRON Jobs', 'Responsive Design'] },
    { category: 'Other', items: ['MS Office', 'Data Analysis'] }
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
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -8 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 space-x-3 text-gray-300 transition-all rounded-lg hover:text-white hover:bg-white/10"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portfolio</span>
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-4">
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
                  alert('CV link copied to clipboard!')
                }
              }}
              className="p-3 transition-all rounded-full bg-white/10 hover:bg-white/20"
              title="Share CV"
            >
              <Share2 size={18} className="text-gray-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 15px 40px rgba(236, 24, 57, 0.4)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/images/Sundram_CV.pdf', '_blank')}
              className="flex items-center px-8 py-3 space-x-2 font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-primary to-accent"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="container max-w-4xl px-6 py-12 mx-auto">
        {/* Enhanced Personal Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 text-center"
        >
          <motion.div
            className="absolute top-0 w-32 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.h1 
            className="relative mb-6 text-6xl font-bold uppercase orbitron gradient-text"
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
            className="mb-8 text-2xl font-medium text-gray-300 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personalInfo.title}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-sm"
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
                label: 'Send Email'
              },
              { 
                icon: Phone, 
                text: personalInfo.phone, 
                color: 'text-green-400',
                href: `tel:${personalInfo.phone}`,
                label: 'Call Now'
              },
              { 
                icon: MapPin, 
                text: personalInfo.location, 
                color: 'text-blue-400',
                href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
                label: 'View Location'
              },
              { 
                icon: Linkedin, 
                text: 'LinkedIn', 
                color: 'text-blue-500',
                href: 'https://linkedin.com/in/thesundram',
                label: 'LinkedIn Profile'
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.icon === MapPin || item.icon === Linkedin ? '_blank' : '_self'}
                  rel={item.icon === MapPin || item.icon === Linkedin ? 'noopener noreferrer' : undefined}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-5 py-3 space-x-3 transition-all border rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/15 hover:border-white/20 group"
                  title={item.label}
                >
                  <Icon size={18} className={`${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium text-gray-300 transition-colors group-hover:text-white">{item.text}</span>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Enhanced Summary */}
        <motion.section
          id="summary"
          data-section
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible.summary ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-6 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <User className="mr-3" size={28} />
            </motion.div>
            Professional Summary
          </motion.h2>
          <motion.div 
            className="relative p-8 border shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20"
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
            <p className="relative z-10 text-lg leading-relaxed text-gray-200">
              <span className="absolute font-serif text-2xl opacity-50 text-primary -top-2 -left-2">"</span>
              Versatile and results-driven <span className="font-semibold text-primary">Software Developer</span> | 
              <span className="font-semibold text-accent">Full Stack Developer</span> with experience building scalable web and 
              mobile applications using technologies like <span className="text-primary">React</span>, 
              <span className="text-accent">React Native</span>, <span className="text-primary">Next.js</span>, 
              <span className="text-accent">Node.js</span>, <span className="text-primary">Flutter</span>, and 
              <span className="text-accent">MongoDB</span>. Skilled in developing responsive UIs, RESTful APIs, and real-time features 
              with strong problem-solving and optimization abilities. Proficient in mobile and web development with a focus on 
              <span className="font-semibold text-primary">clean code</span>, <span className="font-semibold text-accent">security</span>, 
              and <span className="font-semibold text-primary">performance</span>.
              <span className="absolute font-serif text-2xl opacity-50 text-primary -bottom-4 -right-2">"</span>
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
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code className="mr-3" size={28} />
            </motion.div>
            Technical Skills
          </motion.h2>
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                  scale: 1.05, 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(236, 24, 57, 0.1)'
                }}
                className="relative p-8 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                />
                <h3 className="mb-4 text-xl font-bold transition-colors text-accent group-hover:text-primary">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 text-sm font-medium transition-all border rounded-full cursor-pointer bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                    >
                      {skill}
                    </motion.span>
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
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="mr-3" size={28} />
            </motion.div>
            Work Experience
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
            
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
                  className="relative p-8 ml-16 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute w-4 h-4 border-4 border-black rounded-full -left-20 top-8 bg-primary"
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
                  
                  <div className="flex flex-col mb-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-primary">
                        {exp.title}
                      </h3>
                      <p className="mb-1 text-xl font-semibold text-accent">{exp.company}</p>
                      <p className="text-sm text-gray-400">{exp.location} • {exp.type}</p>
                    </div>
                    <motion.div 
                      className="flex items-center px-4 py-2 mt-3 space-x-2 border rounded-lg lg:mt-0 bg-primary/10 border-primary/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm font-medium text-primary">{exp.period}</span>
                    </motion.div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-200">{exp.description}</p>
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
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code className="mr-3" size={28} />
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
                className="relative p-8 overflow-hidden border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
                
                {/* Project number */}
                <motion.div
                  className="absolute flex items-center justify-center w-12 h-12 border rounded-full top-4 right-4 bg-primary/20 border-primary/30"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <span className="text-lg font-bold text-primary">{index + 1}</span>
                </motion.div>
                
                <div className="mb-4">
                  <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <motion.span 
                      className="px-4 py-2 text-sm font-medium border rounded-full bg-accent/20 text-accent border-accent/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      Tech: {project.tech}
                    </motion.span>
                    <motion.span 
                      className="px-4 py-2 text-sm font-medium border rounded-full bg-primary/20 text-primary border-primary/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      Role: {project.role}
                    </motion.span>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-gray-200">{project.description}</p>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/5 to-accent/5 group-hover:opacity-100 rounded-2xl"
                />
              </motion.div>
            ))}
            
            <motion.div 
              className="mt-8 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.a
                href="https://github.com/thesundram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 space-x-3 font-semibold transition-all border rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary/30 hover:to-accent/30"
                whileHover={{ y: -2 }}
              >
                <Eye size={20} />
                <span>View More Projects on GitHub</span>
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
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="mr-3" size={28} />
            </motion.div>
            Education & Certifications
          </motion.h2>
          <motion.div 
            className="space-y-6"
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
                className="relative p-8 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                />
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary">
                      {edu.degree}
                    </h3>
                    <p className="mb-1 text-lg font-semibold text-accent">{edu.institution}</p>
                    <p className="text-sm text-gray-400">{edu.location}</p>
                  </div>
                  <motion.div 
                    className="flex items-center px-4 py-2 mt-3 space-x-2 border rounded-lg lg:mt-0 bg-accent/10 border-accent/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">{edu.period}</span>
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
          className="mb-16"
        >
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-primary"
            whileHover={{ x: 5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Trophy className="mr-3" size={28} />
            </motion.div>
            Achievements & Activities
          </motion.h2>
          <motion.div 
            className="space-y-6"
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
                className="relative p-8 border shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border-white/20 group"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary rounded-t-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
                
                <motion.div
                  className="absolute p-2 border rounded-full top-4 right-4 bg-accent/20 border-accent/30"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <Star size={20} className="text-accent" />
                </motion.div>
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-accent">
                      {achievement.title}
                    </h3>
                    <p className="text-lg font-semibold text-primary">{achievement.organization}</p>
                  </div>
                  <motion.div 
                    className="flex items-center px-4 py-2 mt-3 space-x-2 border rounded-lg lg:mt-0 bg-primary/10 border-primary/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{achievement.period}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
          
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: '0 25px 50px rgba(236, 24, 57, 0.4)',
              y: -5
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.open('/images/Sundram_CV.pdf', '_blank')}
            className="relative px-16 py-6 text-xl font-bold text-white transition-all duration-500 border rounded-full shadow-2xl bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-100 border-white/20"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-block mr-4"
            >
              <Download size={28} />
            </motion.div>
            Download Complete CV
            
            <motion.div
              className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-white/10 hover:opacity-100"
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}