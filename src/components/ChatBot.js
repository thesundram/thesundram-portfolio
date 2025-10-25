'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Copy, Download, ExternalLink, Clock, Eye } from 'lucide-react'

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
    { type: 'bot', text: 'Hi! I\'m Sundram\'s intelligent assistant! 🤖 I know everything about his skills, projects, and experience. Ask me anything!', timestamp: new Date() }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [showNotification, setShowNotification] = useState(true)
  const [copiedMessageId, setCopiedMessageId] = useState(null)
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

  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        })
      })

      const data = await response.json()
      
      // Determine topic for follow-up questions
      const message = userMessage.toLowerCase()
      let topic = 'default'
      
      if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
        topic = 'skills'
      } else if (message.includes('experience') || message.includes('work') || message.includes('job')) {
        topic = 'experience'
      } else if (message.includes('project') || message.includes('portfolio')) {
        topic = 'projects'
      } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
        topic = 'contact'
      } else if (message.includes('hire') || message.includes('freelance') || message.includes('available')) {
        topic = 'hire'
      } else if (message.includes('service') || message.includes('offer')) {
        topic = 'services'
      } else if (message.includes('achievement') || message.includes('award') || message.includes('recognition')) {
        topic = 'achievements'
      } else if (message.includes('salary') || message.includes('rate') || message.includes('cost') || message.includes('price')) {
        topic = 'salary'
      } else if (message.includes('availability') || message.includes('free')) {
        topic = 'availability'
      }
      
      if (data.success) {
        return { response: data.response, followUps: getFollowUpQuestions(topic) }
      } else {
        return { response: data.response, followUps: getFollowUpQuestions(topic) }
      }
    } catch (error) {
      console.error('AI API Error:', error)
      return { 
        response: "I'm having connection issues right now. But I can tell you that Sundram is an amazing Full Stack Developer! 🚀 You can reach him at thesundram29@gmail.com", 
        followUps: getFollowUpQuestions('contact') 
      }
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    setMessages(prev => [...prev, { type: 'user', text: userMessage, timestamp: new Date() }])
    setInputText('')
    setIsTyping(true)

    // Get AI response
    try {
      const { response, followUps } = await getAIResponse(userMessage)
      
      // Realistic typing delay based on response length
      const typingDelay = Math.min(Math.max(response.length * 30, 1000), 3000)
      
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: response, followUps, timestamp: new Date() }])
        setIsTyping(false)
      }, typingDelay)
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "Sorry, I'm having trouble right now. But Sundram is a skilled developer ready to help with your projects! 💻", 
          followUps: [], 
          timestamp: new Date() 
        }])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleQuickQuestion = async (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question, timestamp: new Date() }])
    setIsTyping(true)

    try {
      const { response, followUps } = await getAIResponse(question)
      
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: response, followUps, timestamp: new Date() }])
        setIsTyping(false)
      }, 1500)
    } catch (error) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "I'm having some technical difficulties, but I'd love to tell you about Sundram! He's an expert in React, Node.js, and mobile development. 🚀", 
          followUps: [], 
          timestamp: new Date() 
        }])
        setIsTyping(false)
      }, 1200)
    }
  }

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.log('Copy failed')
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/images/Sundram_CV.pdf'
    link.download = 'Sundram_Pandey_CV.pdf'
    link.click()
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
        className={`fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-[60] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-r from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={20} className="text-white sm:w-6 sm:h-6" />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg sm:w-5 sm:h-5 sm:-top-1 sm:-right-1"
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
            className="absolute inset-0 border-2 rounded-full border-primary"
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
            className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white shadow-sm sm:w-3 sm:h-3"
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
            className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-16px)] sm:w-80 md:w-96 max-w-sm sm:max-w-none h-[80vh] sm:h-[480px] md:h-[550px] bg-black/90 backdrop-blur-lg border border-primary/20 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <motion.div 
                    className="flex items-center justify-center rounded-full w-7 h-7 bg-gradient-to-r from-primary to-accent sm:w-8 sm:h-8"
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(236, 24, 57, 0.4)',
                        '0 0 0 4px rgba(236, 24, 57, 0.1)',
                        '0 0 0 0 rgba(236, 24, 57, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot size={14} className="text-white sm:w-4 sm:h-4" />
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-black sm:w-2.5 sm:h-2.5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">Sundram's AI</h3>
                  <motion.p 
                    className="text-xs text-green-400"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ● Online
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <button
                    onClick={() => window.open('/images/Sundram_CV.pdf', '_blank')}
                    className="p-1.5 transition-colors rounded-full hover:bg-white/10 group"
                    title="View CV"
                  >
                    <Eye size={14} className="text-gray-400 group-hover:text-blue-400 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={downloadCV}
                    className="p-1.5 transition-colors rounded-full hover:bg-white/10 group"
                    title="Download CV"
                  >
                    <Download size={14} className="text-gray-400 group-hover:text-primary sm:w-4 sm:h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 p-2 space-y-2 overflow-y-auto sm:p-3 md:p-4 sm:space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-1 max-w-[90%] sm:max-w-[85%] sm:space-x-1.5 md:space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center sm:w-6 sm:h-6 md:w-7 md:h-7 ${message.type === 'user' ? 'bg-primary' : 'bg-gradient-to-r from-primary to-accent'} shadow-lg flex-shrink-0`}>
                      {message.type === 'user' ? <User size={10} className="text-white sm:w-3 sm:h-3 md:w-[13px] md:h-[13px]" /> : <span className="text-[8px] font-bold text-white">SP</span>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className={`group relative p-2 rounded-xl sm:p-2.5 md:p-3 sm:rounded-2xl ${message.type === 'user' ? 'bg-primary text-white' : 'bg-white/10 text-gray-100'}`}>
                        <p className="text-xs leading-relaxed whitespace-pre-line sm:text-sm">{message.text}</p>
                        
                        {/* Message Actions */}
                        <div className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity ${message.type === 'user' ? 'left-1' : 'right-1'}`}>
                          <button
                            onClick={() => copyToClipboard(message.text, index)}
                            className="p-1 transition-colors rounded bg-black/20 hover:bg-black/40"
                            title="Copy message"
                          >
                            {copiedMessageId === index ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-green-400"
                              >
                                ✓
                              </motion.div>
                            ) : (
                              <Copy size={8} className="text-gray-300" />
                            )}
                          </button>
                        </div>
                        
                        {message.type === 'bot' && message.followUps && (
                          <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
                            {message.followUps.map((followUp, idx) => (
                              <motion.button
                                key={idx}
                                onClick={() => handleQuickQuestion(followUp)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-1.5 py-0.5 text-xs transition-colors border rounded-full bg-primary/20 hover:bg-primary/40 border-primary/30 active:bg-primary/50 sm:px-2 sm:py-1"
                              >
                                {followUp}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Timestamp */}
                      <div className={`flex items-center space-x-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <Clock size={8} className="text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
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
                  <div className="flex items-start space-x-1 sm:space-x-1.5">
                    <motion.div 
                      className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent sm:w-6 sm:h-6 md:w-7 md:h-7"
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(236, 24, 57, 0.4)',
                          '0 0 0 4px rgba(236, 24, 57, 0.1)',
                          '0 0 0 0 rgba(236, 24, 57, 0.4)'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-xs font-bold text-white">SP</span>
                    </motion.div>
                    <div className="p-2 bg-white/10 rounded-xl sm:p-2.5 md:p-3 sm:rounded-2xl">
                      <div className="flex items-center space-x-0.5 sm:space-x-1">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary sm:w-2 sm:h-2"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary sm:w-2 sm:h-2"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary sm:w-2 sm:h-2"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                        <span className="ml-1 text-xs text-gray-400">typing...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-2 py-2 border-t border-primary/10 sm:px-3 md:px-4">
                <p className="mb-1.5 text-xs text-gray-400 sm:mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 6).map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-1.5 py-0.5 text-xs transition-all duration-200 rounded-full bg-white/10 hover:bg-primary/20 active:bg-primary/30 border border-transparent hover:border-primary/30 sm:px-2 sm:py-1"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-2 border-t border-primary/20 bg-black/50 sm:p-3 md:p-4">
              <div className="flex space-x-1.5 sm:space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Sundram..."
                  className="flex-1 px-3 py-2 text-xs text-white placeholder-gray-400 border rounded-full bg-white/10 border-white/20 focus:outline-none focus:border-primary sm:px-4 sm:text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-[0.9rem] transition-all duration-300 rounded-full sm:p-[0.9rem] ${
                    inputText.trim() && !isTyping 
                      ? 'bg-gradient-to-r from-primary to-accent hover:shadow-lg cursor-pointer' 
                      : 'bg-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Send size={12} className="text-white sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}