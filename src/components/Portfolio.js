'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { ExternalLink, Github, Eye, Search, Star, Calendar, Users, Code2, Zap, Award } from 'lucide-react'

export default function Portfolio() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  
  const categories = ['All', 'Web Development', 'Mobile Development']

  const projects = [
    {
      id: 1,
      title: 'Threads – Real-Time Chat App',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      description: 'Social app with post creation, real-time chat, notifications, and dark/light mode',
      longDescription: 'A comprehensive social media platform built with the MERN stack featuring real-time messaging, post creation with media uploads, user authentication, push notifications, and seamless dark/light mode switching. Implemented Socket.io for instant messaging and JWT for secure authentication.',
      tech: ['MERN', 'Socket.io', 'Chakra UI', 'JWT'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app',
      status: 'Completed',
      year: '2024',
      duration: '3 months',
      team: '2 developers',
      rating: 4.8,
      features: ['Real-time Chat', 'Post Creation', 'Dark/Light Mode', 'Push Notifications']
    },
    {
      id: 2,
      title: 'Socially – Social Media Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop',
      description: 'Scalable social media app with API integration, file uploads, and caching',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Clerk'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 3,
      title: 'Bookstore – React Native App',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop',
      description: 'Mobile/web bookstore app with auth, CRUD, media uploads, and theme support',
      tech: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      description: 'Full-stack e-commerce platform with payment integration and admin dashboard',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
      description: 'Real-time weather dashboard with location-based forecasts and analytics',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 6,
      title: 'Task Management System',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      description: 'Collaborative task management with real-time updates and team collaboration',
      tech: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 7,
      title: 'Fitness Tracker App',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      description: 'Cross-platform fitness tracking app with workout plans and progress analytics',
      tech: ['Flutter', 'Firebase', 'Health APIs', 'Charts'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 8,
      title: 'AI Image Generator',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      description: 'AI-powered image generation platform with custom prompts and styles',
      tech: ['Next.js', 'OpenAI API', 'Tailwind', 'Vercel'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    },
    {
      id: 9,
      title: 'Crypto Portfolio Tracker',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop',
      description: 'Real-time cryptocurrency portfolio tracking with market analysis',
      tech: ['React', 'CoinGecko API', 'Chart.js', 'Redux'],
      github: 'https://github.com/thesundram',
      live: 'https://thesundram.netlify.app'
    }
  ]
  
  const filteredProjects = projects
    .filter(project => activeFilter === 'All' || project.category === activeFilter)
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 lg:ml-72 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold orbitron gradient-text mb-3 sm:mb-4">My Work</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full sm:w-20 sm:h-1 md:w-24"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
            Explore my latest projects showcasing modern web and mobile development
          </p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mt-6 mb-4 sm:mt-8 sm:mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:left-4" size={16} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-all sm:pl-12 sm:pr-4 sm:py-3 sm:text-base"
              />
            </div>
          </motion.div>
          
          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:gap-4 sm:mt-8">
            <div className="flex space-x-1 p-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 sm:space-x-2 sm:p-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 sm:px-6 sm:py-2 sm:text-sm ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                  <span className="ml-1 text-xs opacity-70 sm:ml-2">
                    ({category === 'All' ? projects.length : projects.filter(p => p.category === category).length})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Results Count */}
          <motion.p 
            className="text-center text-gray-400 mt-3 text-sm sm:mt-4"
            key={filteredProjects.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </motion.p>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(236, 24, 57, 0.2)'
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 shadow-xl"
            >
              <div className="relative overflow-hidden">
                <motion.div whileHover={{ scale: 1.15 }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover transition-transform duration-700 sm:h-48"
                  />
                </motion.div>
                
                {/* Status Badge */}
                <motion.div
                  className="absolute top-3 left-3 px-2 py-0.5 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 sm:top-4 sm:left-4 sm:px-3 sm:py-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <span className="text-green-400 text-xs font-medium flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse sm:w-2 sm:h-2 sm:mr-2"></div>
                    {project.status || 'Completed'}
                  </span>
                </motion.div>
                
                {/* Rating */}
                <motion.div
                  className="absolute top-3 right-3 flex items-center space-x-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-full sm:top-4 sm:right-4 sm:px-2 sm:py-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Star size={10} className="text-yellow-400 fill-current sm:w-3 sm:h-3" />
                  <span className="text-white text-xs font-medium">{project.rating || '4.5'}</span>
                </motion.div>
                
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between p-3 sm:p-4"
                    >
                      <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(project)}
                        className="p-2 bg-primary/80 backdrop-blur-sm rounded-full text-white hover:bg-primary transition-colors shadow-lg sm:p-3"
                      >
                        <Eye size={16} className="sm:w-5 sm:h-5" />
                      </motion.button>
                      <div className="flex space-x-2 sm:space-x-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors shadow-lg sm:p-3"
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ scale: 1.1, rotate: -360 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-accent/80 backdrop-blur-sm rounded-full text-white hover:bg-accent transition-colors shadow-lg sm:p-3"
                        >
                          <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full sm:py-1">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400 sm:space-x-2">
                    <Calendar size={10} className="sm:w-3 sm:h-3" />
                    <span>{project.year || '2024'}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 sm:text-xl sm:mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2 sm:text-sm sm:mb-4">
                  {project.description}
                </p>
                
                {/* Project Stats */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-400 sm:mb-4">
                  <div className="flex items-center space-x-1">
                    <Users size={10} className="sm:w-3 sm:h-3" />
                    <span>{project.team || 'Solo'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap size={10} className="sm:w-3 sm:h-3" />
                    <span>{project.duration || '2 months'}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full border border-primary/30 hover:bg-primary/30 transition-colors cursor-pointer sm:px-3 sm:py-1"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.tech.length > 3 && (
                    <motion.span 
                      className="px-2 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600 hover:bg-gray-600/50 transition-colors cursor-pointer sm:px-3 sm:py-1"
                      whileHover={{ scale: 1.1 }}
                      title={project.tech.slice(3).join(', ')}
                    >
                      +{project.tech.length - 3} more
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.a
            href="https://github.com/thesundram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 24, 57, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-full text-sm text-white font-semibold hover-lift sm:px-8 sm:py-4 sm:text-base"
          >
            <Github size={16} className="sm:w-5 sm:h-5" />
            <span>View All Projects</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-primary mb-4">{selectedProject.category}</p>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Github size={20} />
                  <span>Code</span>
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-primary px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}