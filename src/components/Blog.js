'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function Blog() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const blogs = [
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for building large-scale React applications with proper architecture and state management.',
      date: '2024-12-15',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      category: 'React'
    },
    {
      title: 'Next.js 14: New Features and Performance',
      excerpt: 'Explore the latest features in Next.js 14 and how they can improve your web application performance.',
      date: '2024-12-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      category: 'Next.js'
    },
    {
      title: 'React Native vs Flutter: 2024 Comparison',
      excerpt: 'A comprehensive comparison of React Native and Flutter for cross-platform mobile development.',
      date: '2024-12-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      category: 'Mobile'
    }
  ]

  return (
    <section className="py-20 lg:ml-72 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold orbitron gradient-text mb-4">Latest Blog</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Sharing knowledge and insights about web development and technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/80 text-white text-xs rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span suppressHydrationWarning={true}>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center text-primary group-hover:text-accent transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(236, 24, 57, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-semibold hover-lift"
          >
            View All Posts
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}