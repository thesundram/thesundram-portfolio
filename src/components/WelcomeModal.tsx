'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { X, Sparkles, ArrowRight, Wand2 } from 'lucide-react'

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Show modal shortly after mounting
        const openTimer = setTimeout(() => {
            setIsOpen(true)
            // Notify when modal OPENS
            window.dispatchEvent(new CustomEvent('modal-visibility', { detail: { isOpen: true } }))
        }, 800)

        // Auto-close after 30 seconds
        const closeTimer = setTimeout(() => {
            handleClose()
        }, 30800)

        return () => {
            clearTimeout(openTimer)
            clearTimeout(closeTimer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        window.dispatchEvent(new CustomEvent('modal-visibility', { detail: { isOpen: false } }))
    }

    const handleEnter = () => {
        handleClose()
        // Music does NOT start automatically anymore.
    }

    // 3D & Animation Variants
    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    }

    const modalVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotateX: 45,
            y: 100,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.2, // Wait for backdrop
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            rotateX: -20,
            y: -50,
            transition: { duration: 0.3 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const floatingAnimation = {
        y: [0, -10, 0],
        rotate: [0, 1, -1, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-1000">
                    {/* Dynamic Moving Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md overflow-hidden"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={handleEnter} // Closing triggers enter experience too
                    >
                        {/* Animated Orbs in Background */}
                        <motion.div
                            animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px]"
                        />
                    </motion.div>

                    {/* 3D Glass Card */}
                    <motion.div
                        className="relative w-full max-w-md"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ perspective: 1000 }} // Enable 3D CSS
                    >
                        <motion.div
                            animate={floatingAnimation} // Constant levitation
                            className="relative bg-white/10 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden"
                        >
                            {/* Shiny Gradient Border Effect */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-50 pointer-events-none" />

                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-20 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 p-8 flex flex-col items-center text-center">
                                {/* 3D Icon Container */}
                                <motion.div variants={itemVariants} className="mb-6 relative">
                                    <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-40 animate-pulse" />
                                    <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 transform rotate-6 border border-white/20">
                                        <Wand2 className="text-white w-10 h-10 drop-shadow-md" />
                                    </div>
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="absolute -inset-2 border border-dashed border-white/30 rounded-3xl"
                                    />
                                </motion.div>

                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-lg"
                                >
                                    Welcome
                                </motion.h2>

                                <motion.div variants={itemVariants} className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-4 rounded-full" />

                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-200 mb-8 text-lg font-light leading-relaxed"
                                >
                                    Step into my digital universe.<br />
                                    <span className="text-sm text-gray-400 mt-2 block">Headphones recommended for full immersion.</span>
                                </motion.p>

                                <motion.div variants={itemVariants} className="w-full">
                                    <motion.button
                                        onClick={handleEnter}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl shadow-purple-900/30 flex items-center justify-center space-x-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative z-10">Enter Experience</span>
                                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>

                                {/* Removed Sound Enabled Text as requested */}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
