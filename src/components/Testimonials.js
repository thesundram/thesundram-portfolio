'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const testimonials = [
    {
      name: 'Mahesh RajGuru',
      role: 'Project Manager at Uttam Infotech',
      initials: 'MR',
      bgColor: 'from-blue-500 to-cyan-500',
      rating: 5,
      text: 'Sundram is an exceptional developer. His React Native skills and problem-solving abilities are outstanding. Always delivers quality work on time.'
    },
    {
      name: 'Priya Patel',
      role: 'Tech Lead at SaiKet Systems',
      initials: 'PP',
      bgColor: 'from-pink-500 to-purple-500',
      rating: 5,
      text: 'Working with Sundram was amazing. His full-stack development skills and attention to detail made our project a huge success.'
    },
    {
      name: 'Amit Kumar',
      role: 'Senior Developer at RCAS LLP',
      initials: 'AK',
      bgColor: 'from-green-500 to-emerald-500',
      rating: 5,
      text: 'Sundram\'s Flutter development expertise is impressive. He delivered a high-quality cross-platform app with excellent UI/UX design.'
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
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative p-6 transition-all duration-300 border bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-primary/30"
            >
              <Quote className="absolute top-4 right-4 text-primary/20" size={32} />
              
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full mr-4 border-2 border-primary/30 bg-gradient-to-r ${testimonial.bgColor} flex items-center justify-center`}>
                  <span className="text-sm font-bold text-white">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="italic leading-relaxed text-gray-300">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}