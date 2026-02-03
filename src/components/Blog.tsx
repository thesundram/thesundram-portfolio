'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, Tag, BookOpen, ChevronRight, Star, Quote, ChevronLeft, Award, ThumbsUp } from 'lucide-react'
import SectionBackground from './SectionBackground'

export default function Blog() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development',
      excerpt: 'Exploring the next generation of web technologies, from AI-driven coding to 3D interfaces.',
      image: '/images/blog/webdev.png',
      date: 'Feb 1, 2026',
      readTime: '5 min read',
      category: 'Technology',
      tags: ['Web3', 'AI', 'Future']
    },
    {
      id: 2,
      title: 'My Coding Journey: From Zero to Hero',
      excerpt: 'A personal reflection on the milestones, challenges, and victories in my software engineering career.',
      image: '/images/blog/journey.png',
      date: 'Jan 28, 2026',
      readTime: '8 min read',
      category: 'Personal',
      tags: ['Career', 'Growth', 'Learning']
    },
    {
      id: 3,
      title: 'React vs Flutter: Which One to Choose?',
      excerpt: 'A comprehensive comparison of the two most popular frameworks for modern app development.',
      image: '/images/blog/tech.png',
      date: 'Jan 20, 2026',
      readTime: '6 min read',
      category: 'Tech Review',
      tags: ['Mobile', 'Comparison', 'Dev']
    }
  ]

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
      text: 'Sundrams Flutter development expertise is impressive. He delivered a high-quality cross-platform app with excellent UI/UX design.',
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
      text: 'Outstanding intern! Sundrams dedication and technical skills impressed our entire team. Highly recommended for any development work.',
      project: 'Web Development Internship',
      date: 'Oct 2024'
    }
  ]

  return (
    <section id="blog" className="relative py-20 overflow-hidden lg:ml-72">
      {/* Background Elements */}
      {/* Background Elements */}
      <SectionBackground />

      <div className="container px-4 mx-auto sm:px-6" ref={ref}>
        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center mb-4 space-x-2">
            <BookOpen className="text-primary" size={24} />
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl orbitron gradient-text">Latest Insights</h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Thoughts on technology, coding adventures, and industry trends.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 mb-24 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
              className="relative group h-full"
            >
              <div className="h-full overflow-hidden transition-all duration-500 border shadow-2xl bg-white/5 backdrop-blur-xl rounded-2xl border-white/10 hover:border-primary/50 hover:shadow-primary/20 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-primary/80 backdrop-blur-md">{post.category}</span>
                  </div>
                </div>
                <div className="relative p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1"><Calendar size={12} /><span>{post.date}</span></div>
                    <div className="flex items-center space-x-1"><Clock size={12} /><span>{post.readTime}</span></div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-primary line-clamp-2">{post.title}</h3>
                  <p className="mb-6 text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex space-x-2">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="flex items-center text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md"><Tag size={10} className="mr-1" />{tag}</span>
                      ))}
                    </div>
                    <motion.button whileHover={{ x: 5 }} className="flex items-center text-sm font-medium text-accent hover:text-white">Read More <ChevronRight size={16} className="ml-1" /></motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent mb-24" />

        {/* Testimonials Section (Integrated) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Quote className="text-accent" size={24} />
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl orbitron gradient-text">Kind Words</h2>
          </div>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-accent to-primary" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-600 dark:text-gray-400">What colleagues and clients say about working with me.</p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative mb-16 overflow-hidden border shadow-xl dark:shadow-2xl bg-white dark:bg-white/5 backdrop-blur-xl rounded-3xl border-gray-200 dark:border-white/10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-8 lg:p-12"
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div>
                  <Quote className="mb-6 text-primary/40" size={40} />
                  <p className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-200 lg:text-xl xl:text-2xl leading-relaxed italic">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </p>
                  <div className="flex items-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={18} className="mr-1 text-yellow-500 dark:text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full border-2 border-primary/30 bg-gradient-to-r ${testimonials[currentIndex].bgColor} flex items-center justify-center shadow-lg`}>
                      <span className="text-lg font-bold text-white">{testimonials[currentIndex].initials}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-primary font-medium">{testimonials[currentIndex].role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block space-y-4">
                  <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
                    <div className="flex items-center mb-2"><Award className="mr-2 text-accent" size={16} /> <span className="text-sm font-semibold text-gray-900 dark:text-white">Project Highlights</span></div>
                    <p className="text-gray-600 dark:text-gray-300">{testimonials[currentIndex].project}</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
                    <div className="flex items-center mb-2"><ThumbsUp className="mr-2 text-green-600 dark:text-green-400" size={16} /> <span className="text-sm font-semibold text-gray-900 dark:text-white">Collaboration Term</span></div>
                    <p className="text-gray-600 dark:text-gray-300">{testimonials[currentIndex].date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
            <button onClick={() => setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)} className="p-3 bg-gray-200 dark:bg-white/10 hover:bg-primary/20 rounded-full transition-colors"><ChevronLeft className="text-gray-900 dark:text-white" /></button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 dark:bg-white/20'}`} />
              ))}
            </div>
            <button onClick={() => setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)} className="p-3 bg-gray-200 dark:bg-white/10 hover:bg-primary/20 rounded-full transition-colors"><ChevronRight className="text-gray-900 dark:text-white" /></button>
          </div>
        </motion.div>

        {/* All Testimonials Grid (Restored) */}
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
              className="relative p-4 transition-all duration-300 border cursor-pointer sm:p-6 bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none hover:border-primary/30 group"
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
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors truncate sm:text-base group-hover:text-primary">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate sm:text-sm">{testimonial.role}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="mr-1 text-yellow-500 dark:text-yellow-400 fill-current sm:w-3.5 sm:h-3.5" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{testimonial.date}</span>
                </div>

                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 transition-colors sm:text-sm group-hover:text-gray-900 dark:group-hover:text-gray-200">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0,
                    height: hoveredCard === index ? 'auto' : 0
                  }}
                  className="pt-3 mt-3 border-t sm:pt-4 sm:mt-4 border-gray-100 dark:border-white/10"
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