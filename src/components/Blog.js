'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Eye, Heart, MessageCircle, Share2, BookOpen, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Blog() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredBlog, setHoveredBlog] = useState(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const blogs = [
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for building large-scale React applications with proper architecture and state management.',
      date: '2024-12-15',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      category: 'React',
      views: '2.5k',
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      title: 'Next.js 14: New Features and Performance',
      excerpt: 'Explore the latest features in Next.js 14 and how they can improve your web application performance.',
      date: '2024-12-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      category: 'Next.js',
      views: '1.8k',
      likes: 32,
      comments: 8,
      featured: false
    },
    {
      title: 'React Native vs Flutter: 2024 Comparison',
      excerpt: 'A comprehensive comparison of React Native and Flutter for cross-platform mobile development.',
      date: '2024-12-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      category: 'Mobile',
      views: '3.2k',
      likes: 67,
      comments: 15,
      featured: false
    },
    {
      title: 'Modern CSS Techniques for 2024',
      excerpt: 'Discover the latest CSS features and techniques that will revolutionize your web development workflow.',
      date: '2024-11-28',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      category: 'CSS',
      views: '1.5k',
      likes: 28,
      comments: 6,
      featured: false
    },
    {
      title: 'Full Stack Development Roadmap',
      excerpt: 'Complete guide to becoming a full stack developer in 2024 with modern technologies and best practices.',
      date: '2024-11-20',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      category: 'Career',
      views: '4.1k',
      likes: 89,
      comments: 23,
      featured: true
    },
    {
      title: 'JavaScript ES2024: New Features Guide',
      excerpt: 'Explore the latest JavaScript features in ES2024 including new array methods, async improvements, and performance enhancements.',
      date: '2024-11-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      category: 'JavaScript',
      views: '2.7k',
      likes: 54,
      comments: 18,
      featured: false
    },
    {
      title: 'Building REST APIs with Node.js & Express',
      excerpt: 'Learn how to create robust and scalable REST APIs using Node.js, Express, and MongoDB with authentication and validation.',
      date: '2024-11-10',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      category: 'Backend',
      views: '3.8k',
      likes: 76,
      comments: 21,
      featured: false
    }
  ]

  return (
    <section id="blog" className="relative py-12 overflow-hidden sm:py-16 md:py-20 lg:ml-72">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
      
      <div className="container relative z-10 px-4 mx-auto sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 text-center sm:mb-12 md:mb-16"
        >
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl orbitron gradient-text">Latest Blog</h2>
          <div className="w-16 h-0.5 mx-auto rounded-full bg-gradient-to-r from-primary to-accent sm:w-20 sm:h-1 md:w-24"></div>
          <p className="max-w-2xl mx-auto mt-4 text-sm text-gray-300 sm:mt-6 sm:text-base">
            Sharing knowledge and insights about web development and technology
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 sm:gap-4 sm:mt-8">
            <motion.div 
              className="flex items-center px-3 py-1.5 space-x-2 border rounded-full bg-blue-500/20 border-blue-500/30 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen size={14} className="text-blue-400 sm:w-4 sm:h-4" />
              <span className="text-xs font-medium text-blue-400 sm:text-sm">{blogs.length} Articles</span>
            </motion.div>
            <motion.div 
              className="flex items-center px-3 py-1.5 space-x-2 border rounded-full bg-green-500/20 border-green-500/30 sm:px-4 sm:py-2"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp size={14} className="text-green-400 sm:w-4 sm:h-4" />
              <span className="text-xs font-medium text-green-400 sm:text-sm">Weekly Updates</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Blog Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative mb-8 overflow-hidden border shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border-white/20 sm:mb-12 md:mb-16"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1 }}
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid items-center gap-6 p-4 md:grid-cols-2 sm:gap-8 sm:p-6 md:p-8 lg:p-12"
            >
              <div className="relative overflow-hidden rounded-2xl group">
                <Image
                  src={blogs[featuredIndex].image}
                  alt={blogs[featuredIndex].title}
                  width={500}
                  height={300}
                  className="object-cover w-full transition-transform duration-500 h-48 group-hover:scale-110 sm:h-56 md:h-60"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-0.5 text-xs text-white rounded-full bg-primary/90 sm:px-3 sm:py-1">
                    Featured
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex flex-wrap items-center mb-3 space-x-2 text-xs text-gray-400 sm:mb-4 sm:space-x-4 sm:text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span suppressHydrationWarning={true}>{new Date(blogs[featuredIndex].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span>{blogs[featuredIndex].readTime}</span>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent sm:py-1">
                    {blogs[featuredIndex].category}
                  </span>
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl md:text-3xl">
                  {blogs[featuredIndex].title}
                </h3>
                
                <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:mb-6 sm:text-base">
                  {blogs[featuredIndex].excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 sm:space-x-4 sm:text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{blogs[featuredIndex].views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{blogs[featuredIndex].likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{blogs[featuredIndex].comments}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-between p-4 border-t border-white/10 sm:p-6">
            <button
              onClick={() => setFeaturedIndex(featuredIndex === 0 ? blogs.length - 1 : featuredIndex - 1)}
              className="p-1.5 transition-colors rounded-full bg-white/10 hover:bg-primary/20 sm:p-2"
            >
              <ChevronLeft className="text-white" size={18} />
            </button>
            
            <div className="flex space-x-1.5 sm:space-x-2">
              {blogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 sm:w-3 sm:h-3 ${
                    index === featuredIndex ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setFeaturedIndex(featuredIndex === blogs.length - 1 ? 0 : featuredIndex + 1)}
              className="p-1.5 transition-colors rounded-full bg-white/10 hover:bg-primary/20 sm:p-2"
            >
              <ChevronRight className="text-white" size={18} />
            </button>
          </div>
        </motion.div>
        
        {/* Blog Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(1).map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredBlog(index)}
              onHoverEnd={() => setHoveredBlog(null)}
              className="relative overflow-hidden transition-all duration-300 border cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-primary/30 group"
            >
              <motion.div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:opacity-100"
              />
              
              <div className="relative overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={200}
                  className="object-cover w-full transition-transform duration-500 h-36 group-hover:scale-110 sm:h-44"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-0.5 text-xs text-white rounded-full bg-primary/80 sm:px-3 sm:py-1">
                    {blog.category}
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: hoveredBlog === index ? 1 : 0, scale: hoveredBlog === index ? 1 : 0 }}
                  className="absolute bottom-4 right-4"
                >
                  <button className="p-2 transition-colors rounded-full bg-white/20 backdrop-blur-sm hover:bg-primary/30">
                    <Share2 size={14} className="text-white sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              </div>
              
              <div className="relative z-10 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-400 sm:mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={10} className="sm:w-3 sm:h-3" />
                      <span suppressHydrationWarning={true}>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} className="sm:w-3 sm:h-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-primary line-clamp-2 sm:mb-3 sm:text-lg">
                  {blog.title}
                </h3>
                
                <p className="mb-3 text-xs leading-relaxed text-gray-300 line-clamp-3 sm:mb-4 sm:text-sm">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 sm:space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye size={10} className="sm:w-3 sm:h-3" />
                      <span>{blog.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={10} className="sm:w-3 sm:h-3" />
                      <span>{blog.likes}</span>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center transition-colors text-primary group-hover:text-accent"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs font-medium sm:text-sm">Read More</span>
                    <ArrowRight size={12} className="ml-1 sm:w-[14px] sm:h-[14px]" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center sm:mt-12 md:mt-16"
        >
          <div className="p-6 border rounded-3xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border-white/10 sm:p-8">
            <motion.h3 
              className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Want to Read More?
            </motion.h3>
            <p className="max-w-2xl mx-auto mb-4 text-sm text-gray-300 sm:mb-6 sm:text-base">
              Subscribe to get the latest articles and insights delivered to your inbox weekly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(236, 24, 57, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 space-x-2 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
              >
                <BookOpen size={16} className="sm:w-5 sm:h-5" />
                <span>View All Posts</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 space-x-2 text-sm font-semibold text-white transition-all duration-300 border-2 rounded-full border-primary/30 hover:bg-primary/10 sm:px-8 sm:py-4 sm:text-base"
              >
                <span>Subscribe</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}