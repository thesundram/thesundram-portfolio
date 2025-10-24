'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

const botResponses = {
  'hi': '👋 Hello! I\'m Sundram\'s AI assistant. I can tell you everything about his skills, projects, and how to get in touch with him!',
  'hello': '🚀 Hi there! I\'m here to showcase Sundram Pandey - a passionate Software Engineer. What would you like to explore?',
  'skills': '💻 Sundram is a Full Stack Developer expert in:\n\n🔹 Frontend: React, Next.js, React Native, Flutter\n🔹 Backend: Node.js, Express, MongoDB, REST APIs\n🔹 Languages: JavaScript, TypeScript, Python\n🔹 Tools: Git, AWS, Firebase, Tailwind CSS\n\nHe builds scalable, modern applications!',
  'experience': '🏆 Sundram has 2+ years of experience:\n\n✅ Built 20+ web & mobile applications\n✅ Specialized in responsive UI/UX design\n✅ Expert in REST API development\n✅ Cloud integration & deployment\n✅ Authentication & security implementation\n\nHe\'s passionate about creating user-friendly solutions!',
  'projects': '🎯 Sundram has created amazing projects:\n\n🔸 Threads - Real-time chat app (MERN + Socket.io)\n🔸 Socially - Social media platform (Next.js + PostgreSQL)\n🔸 Bookstore - React Native app with JWT auth\n🔸 E-commerce platforms with payment integration\n🔸 Portfolio websites & dashboards\n\nAll built with modern tech stacks and best practices!',
  'contact': '📞 Ready to connect with Sundram? Here are all the ways:\n\n📧 Email: thesundram29@gmail.com\n📱 Phone: +91 7897403349\n💼 LinkedIn: linkedin.com/in/thesundram\n🐙 GitHub: github.com/thesundram\n📱 Instagram: @the.sun29\n\n💡 He\'s available for freelance projects, full-time opportunities, and collaborations!',
  'hire': '💼 Want to hire Sundram? Great choice!\n\n🎯 He\'s available for:\n✅ Full-time positions (Currently at Uttam Infotech)\n✅ Freelance projects\n✅ Contract work\n✅ Consultations\n\n📧 Email: thesundram29@gmail.com\n💬 Response time: Within 2-4 hours\n💰 Competitive rates & flexible terms',
  'education': '🎓 Sundram\'s Background:\n\n📚 B.Tech in Computer Science & Engineering\n🏫 Chhatrapati Shivaji Maharaj University (2021-2025)\n🏆 Full Stack Development - LiveWire Training\n📜 Multiple certifications in web development\n💡 Self-taught in mobile app development\n\nAlways upgrading skills to deliver cutting-edge solutions!',
  'location': '🌍 Location & Availability:\n\n📍 Based in Mumbai, India\n🌐 Available for remote work globally\n⏰ Flexible with different time zones\n✈️ Open to relocation for right opportunity\n🏢 Currently working at Uttam Infotech Global Ventures\n\nReady to work with international teams!',
  'services': '🛠️ Services Sundram offers:\n\n🔹 Custom Web Development (React, Next.js)\n🔹 Mobile App Development (React Native, Flutter)\n🔹 E-commerce Solutions\n🔹 API Development & Integration\n🔹 UI/UX Design\n🔹 Website Optimization & SEO\n🔹 Technical Consulting\n🔹 Database Design (MongoDB, PostgreSQL)\n\n💯 Quality guaranteed with timely delivery!',
  'achievements': '🏆 Sundram\'s Achievements:\n\n⭐ 500+ GitHub followers\n🚀 35+ repositories\n💼 5+ successful internships\n🎯 100+ GitHub stars\n🏅 Best Intern Award at Uttam Infotech\n📈 2+ years of professional experience\n\nConstantly growing and achieving new milestones!',
  'technologies': '⚡ Technologies Sundram works with:\n\n🌐 Frontend: React, Next.js, HTML5, CSS3, Tailwind\n📱 Mobile: React Native, Flutter, Dart\n⚙️ Backend: Node.js, Express.js, Python\n🗄️ Databases: MongoDB, PostgreSQL, MySQL\n☁️ Cloud: AWS, Firebase, Vercel\n🔧 Tools: Git, Docker, Postman, VS Code\n\nAlways learning new technologies!',
  'salary': '💰 Salary & Rates Information:\n\n💼 Full-time: Competitive market rates\n🔄 Freelance: $15-25/hour (depending on project)\n📋 Contract: Negotiable based on scope\n⚡ Quick tasks: Fixed pricing available\n\n📧 Contact for detailed discussion: thesundram29@gmail.com\n💬 Free consultation for project estimation!',
  'availability': '📅 Current Availability:\n\n🏢 Full-time: Currently employed (open to better opportunities)\n💼 Freelance: Available for evening/weekend projects\n⏰ Response time: 2-4 hours during business hours\n🌍 Time zone: IST (GMT+5:30)\n\n📧 Reach out to discuss your project timeline!',
  'default': '🤔 That\'s interesting! I can help you learn about:\n\n💻 Technical Skills & Technologies\n🏆 Work Experience & Achievements\n🎯 Projects Portfolio\n📞 Contact Information\n💼 Hiring Details & Availability\n🛠️ Services Offered\n💰 Rates & Salary Info\n\nWhat would you like to know?'
}

const quickQuestions = [
  '💻 What are his skills?',
  '🏆 Tell me his experience',
  '📞 How to contact him?',
  '💼 Want to hire him?',
  '🎯 Show me his projects',
  '🛠️ What services he offers?',
  '🏅 His achievements?',
  '💰 Salary & rates?'
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m Sundram\'s AI assistant. Ask me anything about him!' }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [showNotification, setShowNotification] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getFollowUpQuestions = (topic) => {
    const followUps = {
      skills: ['🚀 Want to see his projects?', '💼 Interested in hiring him?', '🏅 His achievements?'],
      experience: ['🛠️ What services he offers?', '🎯 See his projects?', '💰 Salary & rates?'],
      projects: ['💻 What are his skills?', '💼 Want to hire him?', '⚡ Technologies used?'],
      contact: ['🚀 See his projects first?', '💼 Check his experience?', '📅 His availability?'],
      hire: ['💻 Check his skills?', '🎯 See his projects?', '💰 Rates & salary?'],
      services: ['💼 Want to hire him?', '🎯 See his projects?', '💰 What are his rates?'],
      achievements: ['🎯 See his projects?', '💻 Technical skills?', '💼 Want to hire him?'],
      technologies: ['🎯 See projects using these?', '💼 Hire for these skills?', '🏅 His achievements?'],
      salary: ['💼 Ready to hire him?', '📅 Check availability?', '📞 Contact information?'],
      availability: ['💼 Want to hire him?', '💰 Check his rates?', '📞 Contact details?']
    }
    return followUps[topic] || ['💻 His skills?', '🎯 His projects?', '📞 Contact him?']
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    let response = ''
    let topic = 'default'
    
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      response = botResponses.skills
      topic = 'skills'
    } else if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      response = botResponses.experience
      topic = 'experience'
    } else if (message.includes('project') || message.includes('portfolio')) {
      response = botResponses.projects
      topic = 'projects'
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      response = botResponses.contact
      topic = 'contact'
    } else if (message.includes('hire') || message.includes('freelance') || message.includes('available')) {
      response = botResponses.hire
      topic = 'hire'
    } else if (message.includes('service') || message.includes('offer')) {
      response = botResponses.services
      topic = 'services'
    } else if (message.includes('education') || message.includes('study') || message.includes('degree')) {
      response = botResponses.education
      topic = 'education'
    } else if (message.includes('location') || message.includes('where') || message.includes('based')) {
      response = botResponses.location
      topic = 'location'
    } else if (message.includes('achievement') || message.includes('award') || message.includes('recognition')) {
      response = botResponses.achievements
      topic = 'achievements'
    } else if (message.includes('technology') || message.includes('tech stack') || message.includes('tools')) {
      response = botResponses.technologies
      topic = 'technologies'
    } else if (message.includes('salary') || message.includes('rate') || message.includes('cost') || message.includes('price')) {
      response = botResponses.salary
      topic = 'salary'
    } else if (message.includes('available') || message.includes('availability') || message.includes('free')) {
      response = botResponses.availability
      topic = 'availability'
    } else if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      response = botResponses.hi
      topic = 'greeting'
    } else {
      response = botResponses.default
      topic = 'default'
    }
    
    return { response, followUps: getFollowUpQuestions(topic) }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInputText('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const { response, followUps } = getBotResponse(userMessage)
      setMessages(prev => [...prev, { type: 'bot', text: response, followUps }])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickQuestion = (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }])
    setIsTyping(true)

    setTimeout(() => {
      const { response, followUps } = getBotResponse(question)
      setMessages(prev => [...prev, { type: 'bot', text: response, followUps }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          setUnreadCount(0)
          setShowNotification(false)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-20 right-6 z-[60] w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={24} className="text-white" />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
          >
            <span className="text-xs font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </motion.div>
        )}
        
        {/* Pulsing Ring */}
        {showNotification && (
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-primary"
          />
        )}
        
        {/* Notification Dot */}
        {showNotification && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white shadow-sm"
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-6 z-[60] w-96 h-[500px] bg-black/90 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Sundram's AI</h3>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 transition-colors rounded-full hover:bg-white/10"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto h-80">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-primary' : 'bg-gradient-to-r from-primary to-accent'} shadow-lg`}>
                      {message.type === 'user' ? <User size={13} className="text-white" /> : <span className="text-xs font-bold text-white">SP</span>}
                    </div>
                    <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-primary text-white' : 'bg-white/10 text-gray-100'}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {message.type === 'bot' && message.followUps && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {message.followUps.map((followUp, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickQuestion(followUp)}
                              className="px-2 py-1 text-xs transition-colors border rounded-full bg-primary/20 hover:bg-primary/40 border-primary/30"
                            >
                              {followUp}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex items-center justify-center w-6 rounded-full shadow-lg h-7 bg-gradient-to-r from-primary to-accent">
                      <span className="text-xs font-bold text-white">SP</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 delay-100 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 delay-200 rounded-full bg-primary animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="mb-2 text-xs text-gray-400">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-2 py-1 text-xs transition-colors rounded-full bg-white/10 hover:bg-primary/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Sundram..."
                  className="flex-1 px-4 py-2 text-sm text-white placeholder-gray-400 border rounded-full bg-white/10 border-white/20 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 transition-all duration-300 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}