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
    <section className="relative py-20 overflow-hidden lg:ml-72">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      
      <div className="container relative z-10 px-6 mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold lg:text-5xl orbitron gradient-text">Testimonials</h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="max-w-2xl mx-auto mt-6 text-gray-300">
            What colleagues and clients say about working with me
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div 
              className="flex items-center px-4 py-2 space-x-2 border rounded-full bg-yellow-500/20 border-yellow-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-yellow-400">5.0 Average Rating</span>
            </motion.div>
            <motion.div 
              className="flex items-center px-4 py-2 space-x-2 border rounded-full bg-green-500/20 border-green-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <ThumbsUp size={16} className="text-green-400" />
              <span className="text-sm font-medium text-green-400">100% Satisfaction</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative mb-16 overflow-hidden border shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border-white/20"
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12"
            >
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Quote className="mb-6 text-primary/40" size={48} />
                  <p className="mb-6 text-xl leading-relaxed text-gray-200 md:text-2xl">
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
                        <Star size={20} className="mr-1 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full border-2 border-primary/30 bg-gradient-to-r ${testimonials[currentIndex].bgColor} flex items-center justify-center shadow-lg`}>
                      <span className="font-bold text-white">{testimonials[currentIndex].initials}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-primary">{testimonials[currentIndex].role}</p>
                      <p className="text-sm text-gray-400">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-xl bg-white/5 border-white/10">
                    <div className="flex items-center mb-2">
                      <Award className="mr-2 text-accent" size={16} />
                      <span className="text-sm font-medium text-white">Project</span>
                    </div>
                    <p className="text-gray-300">{testimonials[currentIndex].project}</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-white/5 border-white/10">
                    <div className="flex items-center mb-2">
                      <ThumbsUp className="mr-2 text-green-400" size={16} />
                      <span className="text-sm font-medium text-white">Completed</span>
                    </div>
                    <p className="text-gray-300">{testimonials[currentIndex].date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={() => setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              className="p-2 transition-colors rounded-full bg-white/10 hover:bg-primary/20"
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
              className="p-2 transition-colors rounded-full bg-white/10 hover:bg-primary/20"
            >
              <ChevronRight className="text-white" size={20} />
            </button>
          </div>
        </motion.div>
        
        {/* All Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative p-6 transition-all duration-300 border cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-primary/30 group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
              />
              
              <Quote className="absolute transition-colors top-4 right-4 text-primary/20 group-hover:text-primary/40" size={24} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-full mr-4 border-2 border-primary/30 bg-gradient-to-r ${testimonial.bgColor} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-sm font-bold text-white">{testimonial.initials}</span>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white transition-colors group-hover:text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="mr-1 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
                
                <p className="text-sm leading-relaxed text-gray-300 transition-colors group-hover:text-gray-200">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredCard === index ? 1 : 0, 
                    height: hoveredCard === index ? 'auto' : 0 
                  }}
                  className="pt-4 mt-4 border-t border-white/10"
                >
                  <div className="flex items-center text-xs text-accent">
                    <Award size={12} className="mr-1" />
                    <span>{testimonial.project}</span>
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