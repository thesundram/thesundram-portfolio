'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Phone, Mail, Award, Code, Briefcase, ExternalLink } from 'lucide-react'
import Timeline from './Timeline'
import BirthdayWish from './BirthdayWish'
import { Toaster } from 'react-hot-toast'

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const [showBirthdayWish, setShowBirthdayWish] = useState(false)
  const [age, setAge] = useState('')

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
    
    setAge(calculateAge().toString()+'+ Years Old')
  }, [])

  const skillCategories = {
    frontend: [
      { name: 'React & Next.js', level: 'Expert', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
      { name: 'JavaScript & TypeScript', level: 'Expert', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
      { name: 'HTML5 & CSS3', level: 'Expert', icon: '🎨', color: 'from-pink-500 to-rose-500' },
      { name: 'Tailwind CSS', level: 'Advanced', icon: '💨', color: 'from-teal-500 to-blue-500' }
    ],
    backend: [
      { name: 'Node.js & Express', level: 'Advanced', icon: '🟢', color: 'from-green-500 to-emerald-500' },
      { name: 'Python & Django', level: 'Intermediate', icon: '🐍', color: 'from-blue-600 to-purple-600' },
      { name: 'MongoDB & SQL', level: 'Advanced', icon: '🗄️', color: 'from-orange-500 to-red-500' },
      { name: 'REST APIs', level: 'Expert', icon: '🔗', color: 'from-indigo-500 to-purple-500' }
    ],
    mobile: [
      { name: 'React Native', level: 'Advanced', icon: '📱', color: 'from-purple-500 to-pink-500' },
      { name: 'Flutter & Dart', level: 'Intermediate', icon: '🦋', color: 'from-blue-400 to-cyan-400' },
      { name: 'Firebase', level: 'Advanced', icon: '🔥', color: 'from-orange-400 to-yellow-400' }
    ],
    tools: [
      { name: 'Git & GitHub', level: 'Expert', icon: '🔧', color: 'from-gray-600 to-gray-800' },
      { name: 'Docker', level: 'Intermediate', icon: '🐳', color: 'from-blue-500 to-blue-700' },
      { name: 'AWS & Cloud', level: 'Intermediate', icon: '☁️', color: 'from-orange-500 to-yellow-500' }
    ]
  }

  const personalInfo = [
    { icon: Calendar, label: 'Birthday', value: '29 Feb', color: 'text-blue-400' },
    { icon: Award, label: 'Age', value: age, color: 'text-green-400' },
    { icon: Mail, label: 'Email', value: 'Mail Now', color: 'text-red-400', link: 'mailto:thesundram29@gmail.com' },
    { icon: Phone, label: 'Phone', value: 'Call Now', color: 'text-yellow-400', link: 'tel:+917897403349' },
    { icon: Award, label: 'Degree', value: 'B Tech (CSE)', color: 'text-purple-400' },
    { icon: MapPin, label: 'City', value: 'Locate Me', color: 'text-pink-400', link: 'http://maps.google.com/?q=Mumbai, India' },
    { icon: Briefcase, label: 'Freelance', value: 'Available', color: 'text-green-400' },
  ]

  const education = [
    {
      period: 'Nov 2021 — Jun 2025',
      title: 'Bachelor of Technology in Computer Science & Engineering',
      company: 'Chhatrapati Shivaji Maharaj University',
      location: 'Panvel, Navi Mumbai',
      description: 'Completed B.Tech in Computer Science & Engineering with solid foundation in computer science fundamentals, programming, and modern software development practices.'
    },
    {
      period: 'Jan 2024 — Jun 2024',
      title: 'Full Stack Development Course',
      company: 'LiveWire Training Institute',
      location: 'Ambernath, Maharashtra',
      description: 'Enhanced skills in both front-end and back-end development with hands-on projects and industry best practices.'
    },
    {
      period: 'Dec 2023 — Jun 2024',
      title: 'Diploma in Computer Applications (DCA)',
      company: 'STP Computer Education',
      location: 'New Delhi',
      description: 'Strengthened foundational skills in computer applications and office productivity tools.'
    },
    {
      period: 'Oct 2023 — Nov 2023',
      title: 'Advanced Excel Course',
      company: 'STP Computer Education',
      location: 'New Delhi',
      description: 'Enhanced data analysis and management skills with advanced Excel techniques and functions.'
    }
  ]

  const experience = [
    {
      period: 'Sep 2025 — Present',
      title: 'Software Developer',
      company: 'Uttam Infotech Global Ventures Pvt Ltd',
      location: 'Mumbai, India • Full-time • On-site',
      description: 'Working as a Software Developer in the Software Development team. Developing and maintaining mobile applications using React Native. Building responsive user interfaces with React.js and Next.js. Working with backend technologies like Node.js, Python, and REST APIs. Managing data with PostgreSQL, MySQL, and MongoDB.'
    },
    {
      period: 'Aug 2025 — Oct 2025',
      title: 'Software Developer Intern',
      company: 'Cognifyz Technologies',
      location: 'Remote',
      description: 'Worked on CRUD applications, file handling, and web scraping. Enhanced problem-solving skills through real-world projects.'
    },
    {
      period: 'Aug 2025 — Oct 2025',
      title: 'Full Stack Developer Intern',
      company: 'Codveda Technologies',
      location: 'Remote',
      description: 'Built scalable web applications using MERN stack, designed RESTful APIs, optimized database queries, and developed dynamic UI components.'
    },
    {
      period: 'Jul 2025 — Aug 2025',
      title: 'Full Stack Development Intern',
      company: 'SaiKet Systems',
      location: 'Remote',
      description: 'Built responsive UIs with React.js, developed REST APIs using Node.js & Express, integrated databases, and created full-stack User Management System.'
    },
    {
      period: 'Jun 2025 — Jul 2025',
      title: 'App Developer Intern | Flutter Developer',
      company: 'RCAS LLP',
      location: 'Mumbai, India',
      description: 'Developed cross-platform apps using Flutter & Dart, integrated Firebase and MongoDB, implemented business logic and native integrations.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="about" className="relative py-20 overflow-hidden lg:ml-64 xl:ml-72">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"></div>
      <motion.div 
        className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      {/* Floating particles */}
      <motion.div
        className="absolute w-4 h-4 rounded-full top-20 left-20 bg-primary/30"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bottom-32 right-32 bg-accent/40"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <Toaster position="top-right" />
      <div className="container relative z-10 px-6 mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.h2 
            className="relative mb-4 text-4xl font-bold lg:text-5xl orbitron gradient-text"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(236, 24, 57, 0.8)"
            }}
          >
            About Me
            <motion.div
              className="absolute w-3 h-3 rounded-full -top-2 -right-4 bg-primary"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.h2>
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid items-start gap-12 lg:grid-cols-2"
        >
          {/* Left Column - Personal Info & Description */}
          <div className="space-y-8">
            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h3 
                className="text-2xl font-bold text-white lg:text-3xl"
                whileHover={{ x: 5 }}
              >
                I'm Sundram Pandey & I am a{' '}
                <motion.span 
                  className="gradient-text"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Engineer & Developer
                </motion.span>
              </motion.h3>
              
              <div className="space-y-4">
                <motion.p 
                  className="relative text-lg leading-relaxed text-gray-300"
                  whileHover={{ x: 3 }}
                >
                  <span className="absolute top-0 font-serif text-4xl -left-4 text-primary/20">"</span>
                  Hello! I'm <motion.span 
                    className="font-semibold text-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sundram Pandey
                  </motion.span>, a passionate  
                   <motion.span 
                    className="ml-1 font-semibold gradient-text"
                    whileHover={{ scale: 1.05 }}
                  >
                    Software Engineer
                  </motion.span> from Mumbai, India. 
                  I specialize in creating modern web and mobile applications that solve real-world problems.
                  <span className="absolute bottom-0 font-serif text-4xl -right-2 text-primary/20">"</span>
                </motion.p>
                <p className="text-gray-300">
                  🎓 <strong>B.Tech in Computer Science</strong> from Chhatrapati Shivaji Maharaj University<br/>
                  💼 <strong>2+ years</strong> of hands-on development experience<br/>
                  🚀 <strong>20+ projects</strong> delivered across web and mobile platforms<br/>
                  ⚡ <strong>Full-stack expertise</strong> in React, Node.js, React Native & Flutter
                </p>
                <p className="text-gray-300">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community. I believe in writing clean, efficient code 
                  and creating user experiences that make a difference.
                </p>
              </div>
            </motion.div>

            {/* Personal Information Grid */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="mb-6 text-xl font-semibold text-white">Personal Information</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {personalInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center p-4 space-x-3 transition-all duration-300 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/30"
                    >
                      <Icon size={20} className={info.color} />
                      <div className="flex-1">
                        <span className="text-sm text-gray-400">{info.label}:</span>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white transition-colors duration-300 hover:text-primary group"
                          >
                            <span>{info.value}</span>
                            <ExternalLink size={14} className="transition-opacity opacity-0 group-hover:opacity-100" />
                          </a>
                        ) : info.label === 'Birthday' ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-white">{info.value}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setShowBirthdayWish(true)}
                              className="px-2 py-1 text-xs text-white transition-all duration-300 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg"
                            >
                              🎂 Wish
                            </motion.button>
                          </div>
                        ) : (
                          <span className="block text-white">{info.value}</span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Hire Me Button */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 24, 57, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 space-x-2 font-semibold text-white rounded-full bg-gradient-to-r from-primary to-accent hover-lift"
              >
                <Briefcase size={20} />
                <span>Hire Me</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="mb-6 text-xl font-semibold text-white">My Skills</h4>
            
            <div className="space-y-8">
              {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                  className="space-y-4"
                >
                  <h5 className="text-lg font-semibold capitalize text-primary">
                    {category === 'frontend' ? 'Frontend' : 
                     category === 'backend' ? 'Backend' :
                     category === 'mobile' ? 'Mobile' : 'Tools & Others'}
                  </h5>
                  
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: categoryIndex * 0.2 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="relative p-4 transition-all duration-300 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/30 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} text-white text-sm`}>
                            {skill.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white transition-colors group-hover:text-primary">
                              {skill.name}
                            </div>
                            <div className={`text-xs ${
                              skill.level === 'Expert' ? 'text-green-400' :
                              skill.level === 'Advanced' ? 'text-blue-400' :
                              'text-yellow-400'
                            }`}>
                              {skill.level}
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            skill.level === 'Expert' ? 'bg-green-400' :
                            skill.level === 'Advanced' ? 'bg-blue-400' :
                            'bg-yellow-400'
                          } opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        </div>
                        
                        {/* Hover effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3">
              {[
                { number: '5+', label: 'Internships', color: 'from-primary/20 to-accent/20', border: 'border-primary/30', icon: '🎓' },
                { number: '20+', label: 'Projects', color: 'from-accent/20 to-primary/20', border: 'border-accent/30', icon: '🚀' },
                { number: '2+', label: 'Years Experience', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.08, 
                    rotateY: index % 2 === 0 ? 5 : -5,
                    boxShadow: '0 20px 40px rgba(236, 24, 57, 0.2)'
                  }}
                  className={`p-6 text-center border bg-gradient-to-br ${stat.color} rounded-xl ${stat.border} relative overflow-hidden group cursor-pointer`}
                >
                  <motion.div
                    className="absolute text-2xl transition-opacity top-2 right-2 opacity-30 group-hover:opacity-60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold gradient-text"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-300 transition-colors group-hover:text-white">{stat.label}</div>
                  
                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary/10 to-accent/10 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Education & Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20"
        >
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Experience Section */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="flex items-center mb-6 text-2xl font-bold text-primary"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="mr-3" size={24} />
                </motion.div>
                Work Experience
              </motion.h3>
              
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      boxShadow: '0 15px 30px rgba(236, 24, 57, 0.1)'
                    }}
                    className="relative p-6 border shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl border-white/20 group"
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-xl"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                    
                    <div className="flex flex-col mb-3">
                      <h4 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-primary">
                        {exp.title}
                      </h4>
                      <p className="mb-1 text-base font-semibold text-accent">{exp.company}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{exp.location}</p>
                        <span className="px-2 py-1 text-xs font-medium rounded text-primary bg-primary/10">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Education Section */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="flex items-center mb-6 text-2xl font-bold text-primary"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="mr-3" size={24} />
                </motion.div>
                Education
              </motion.h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: -5,
                      boxShadow: '0 15px 30px rgba(243, 156, 18, 0.1)'
                    }}
                    className="relative p-6 border shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl border-white/20 group"
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary rounded-t-xl"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                    
                    <div className="flex flex-col mb-3">
                      <h4 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-accent">
                        {edu.title}
                      </h4>
                      <p className="mb-1 text-base font-semibold text-primary">{edu.company}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">{edu.location}</p>
                        <span className="px-2 py-1 text-xs font-medium rounded text-accent bg-accent/10">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <BirthdayWish 
        isOpen={showBirthdayWish} 
        onClose={() => setShowBirthdayWish(false)} 
      />
    </section>
  )
}