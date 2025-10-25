'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, ChevronLeft, ChevronRight, Award, ThumbsUp } from 'lucide-react'

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)

  const testimonials = [
    {
      name: 'Mahesh RajGuru',
      role: 'Project Manager',
      company: 'Uttam Infotech Global Ventures',
      initials: 'MR',
      bgColor: 'from-blue-500 to-cyan-500',
      rating: 5,
      text: 'Sundram is an exceptional developer. His React Native skills and problem-solving abilities are outstanding. Always delivers quality work on time.',
      project: 'Mobile App Development',
      date: 'Dec 2025'
    },
    {
      name: 'Akash More',
      role: 'Full Stack Developer',
      company: 'GlobalShala',
      initials: 'NG',
      bgColor: 'from-teal-500 to-blue-500',
      rating: 5,
      text: 'Sundram is a brilliant full stack developer. His expertise in both frontend and backend technologies is remarkable. Great team player and mentor.',
      project: 'E-commerce Platform',
      date: 'Nov 2024'
    },
    {
      name: 'Hema Singh',
      role: 'Web Developer',
      company: 'TechNova Solutions',
      initials: 'HS',
      bgColor: 'from-pink-500 to-purple-500',
      rating: 5,
      text: 'Working with Sundram was amazing. His full-stack development skills and attention to detail made our project a huge success.',
      project: 'Full Stack Web App',
      date: 'Aug 2024'
    },
    {
      name: 'Amit Kumar',
      role: 'Senior Developer',
      company: 'RCAS LLP',
      initials: 'AK',
      bgColor: 'from-green-500 to-emerald-500',
      rating: 5,
      text: 'Sundram\'s Flutter development expertise is impressive. He delivered a high-quality cross-platform app with excellent UI/UX design.',
      project: 'Flutter Mobile App',
      date: 'Jul 2024'
    },
    {
      name: 'Priya Singh',
      role: 'Product Manager',
      company: 'Codveda Technologies',
      initials: 'PS',
      bgColor: 'from-purple-500 to-indigo-500',
      rating: 5,
      text: 'Sundram delivered exceptional work on our MERN stack project. His code quality and problem-solving skills are top-notch.',
      project: 'MERN Stack Platform',
      date: 'Sep 2024'
    },
    {
      name: 'Rahul Verma',
      role: 'CTO',
      company: 'Cognifyz Technologies',
      initials: 'RV',
      bgColor: 'from-orange-500 to-red-500',
      rating: 5,
      text: 'Outstanding intern! Sundram\'s dedication and technical skills impressed our entire team. Highly recommended for any development work.',
      project: 'Web Development Internship',
      date: 'Oct 2024'
    }
  ]

  return (
    <section className="relative py-12 overflow-hidden sm:py-16 lg:py-20 lg:ml-72">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      
      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl xl:text-5xl orbitron gradient-text">Testimonials</h2>
          <div className="w-16 h-1 mx-auto rounded-full sm:w-24 bg-gradient-to-r from-primary to-accent"></div>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-gray-300 sm:mt-6 sm:text-base">
            What colleagues and clients say about working with me
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:gap-4 sm:mt-8">
            <motion.div 
              className="flex items-center px-3 py-2 space-x-2 border rounded-full sm:px-4 bg-yellow-500/20 border-yellow-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star size={14} className="text-yellow-400 fill-current sm:w-4 sm:h-4" />
              <span className="text-xs font-medium text-yellow-400 sm:text-sm">5.0 Rating</span>
            </motion.div>
            <motion.div 
              className="flex items-center px-3 py-2 space-x-2 border rounded-full sm:px-4 bg-green-500/20 border-green-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ThumbsUp size={14} className="text-green-400 sm:w-4 sm:h-4" />
              <span className="text-xs font-medium text-green-400 sm:text-sm">100% Satisfaction</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative mb-8 overflow-hidden border shadow-2xl sm:mb-12 lg:mb-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-white/20"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1 }}
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 lg:p-8 xl:p-12"
            >
              <div className="space-y-6 lg:grid lg:items-center lg:gap-8 lg:grid-cols-2 lg:space-y-0">
                <div>
                  <Quote className="mb-4 text-primary/40 sm:mb-6" size={32} />
                  <p className="mb-4 text-base leading-relaxed text-gray-200 sm:mb-6 sm:text-lg lg:text-xl xl:text-2xl">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </p>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star size={16} className="mr-1 text-yellow-400 fill-current sm:w-5 sm:h-5" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-primary/30 bg-gradient-to-r ${testimonials[currentIndex].bgColor} flex items-center justify-center shadow-lg`}>
                      <span className="text-sm font-bold text-white sm:text-base">{testimonials[currentIndex].initials}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white sm:text-xl">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-primary sm:text-base">{testimonials[currentIndex].role}</p>
                      <p className="text-xs text-gray-400 sm:text-sm">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 border sm:p-4 rounded-xl bg-white/5 border-white/10">
                    <div className="flex items-center mb-2">
                      <Award className="mr-2 text-accent" size={14} />
                      <span className="text-xs font-medium text-white sm:text-sm">Project</span>
                    </div>
                    <p className="text-sm text-gray-300 sm:text-base">{testimonials[currentIndex].project}</p>
                  </div>
                  <div className="p-3 border sm:p-4 rounded-xl bg-white/5 border-white/10">
                    <div className="flex items-center mb-2">
                      <ThumbsUp className="mr-2 text-green-400" size={14} />
                      <span className="text-xs font-medium text-white sm:text-sm">Completed</span>
                    </div>
                    <p className="text-sm text-gray-300 sm:text-base">{testimonials[currentIndex].date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-4 border-t sm:p-6 border-white/10">
            <button
              onClick={() => setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              className="p-2 transition-colors rounded-full sm:p-3 bg-white/10 hover:bg-primary/20 active:bg-primary/30"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
            
            <div className="flex space-x-1.5 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/50 active:bg-white/70'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
              className="p-2 transition-colors rounded-full sm:p-3 bg-white/10 hover:bg-primary/20 active:bg-primary/30"
            >
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>
        </motion.div>
        
        {/* All Testimonials Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative p-4 transition-all duration-300 border cursor-pointer sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-primary/30 group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
              />
              
              <Quote className="absolute transition-colors top-3 right-3 sm:top-4 sm:right-4 text-primary/20 group-hover:text-primary/40" size={20} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-3 sm:mb-4">
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-primary/30 bg-gradient-to-r ${testimonial.bgColor} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xs font-bold text-white sm:text-sm">{testimonial.initials}</span>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white transition-colors truncate sm:text-base group-hover:text-primary">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400 truncate sm:text-sm">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 truncate">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="mr-1 text-yellow-400 fill-current sm:w-3.5 sm:h-3.5" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
                
                <p className="text-xs leading-relaxed text-gray-300 transition-colors sm:text-sm group-hover:text-gray-200">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredCard === index ? 1 : 0, 
                    height: hoveredCard === index ? 'auto' : 0 
                  }}
                  className="pt-3 mt-3 border-t sm:pt-4 sm:mt-4 border-white/10"
                >
                  <div className="flex items-center text-xs text-accent sm:text-sm">
                    <Award size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{testimonial.project}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}