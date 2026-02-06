'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Disc, ListMusic } from 'lucide-react'

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [volume, setVolume] = useState(0.5)

    // --- Visibility State ---
    const [isInterfaceHidden, setIsInterfaceHidden] = useState(false)
    // ------------------------

    // Ref for the audio element
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const autoStopTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Expanded Playlist with updated titles and local paths
    // Restored Namah Parvati Pataye
    const playlist = [
        {
            title: "Namah Parvati Pataye",
            artist: "Har Har Mahadev",
            src: "/songs/namah-parvati.mp3",
            coverColor: "from-yellow-500 to-amber-600"
        },
        {
            title: "Shiv Tandav Stotram",
            artist: "Powerful Chant",
            src: "/songs/shiv-tandav.mp3",
            coverColor: "from-orange-500 to-red-600"
        },
        {
            title: "Lo-Fi Study",
            artist: "Chill Vibes",
            src: "/songs/lofi-study.mp3",
            coverColor: "from-purple-500 to-indigo-500"
        },
        {
            title: "Neon Lights",
            artist: "SoundHelix Demo",
            src: "/songs/neon-lights.mp3",
            coverColor: "from-cyan-500 to-blue-500"
        },
        {
            title: "Piano Moments",
            artist: "SoundHelix Demo",
            src: "/songs/piano-moments.mp3",
            coverColor: "from-emerald-500 to-green-600"
        }
    ]

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    // Listen for external "start-music" event from WelcomeModal
    // AND "modal-visibility" event to hide/show
    useEffect(() => {
        const handleStartMusic = () => {
            console.log("Music start event received")
            setIsPlaying(true)
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("External play failed:", e))

                // Auto-stop after 90 seconds (1.5 mins) to not annoy user
                if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current)

                autoStopTimerRef.current = setTimeout(() => {
                    console.log("Auto-stopping music")
                    setIsPlaying(false)
                    if (audioRef.current) audioRef.current.pause()
                }, 90000) // 90 seconds
            }
        }

        const handleModalVisibility = (e: CustomEvent) => {
            console.log("Visibility Event:", e.detail.isOpen)
            setIsInterfaceHidden(e.detail.isOpen)
        }

        window.addEventListener('start-music', handleStartMusic)
        window.addEventListener('modal-visibility', handleModalVisibility as EventListener)

        return () => {
            window.removeEventListener('start-music', handleStartMusic)
            window.removeEventListener('modal-visibility', handleModalVisibility as EventListener)
            if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current)
        }
    }, [])

    // Handle track changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load()
            if (isPlaying) {
                const playPromise = audioRef.current.play()
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Auto-play prevented:", e))
                }
            }
        }
    }, [currentTrack])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e))
            }
            setIsPlaying(!isPlaying)
        }
    }

    const playTrack = (index: number) => {
        if (currentTrack === index) {
            togglePlay()
        } else {
            setCurrentTrack(index)
            setIsPlaying(true)
        }
    }

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length)
        setIsPlaying(true)
    }

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
        setIsPlaying(true)
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleTrackError = () => {
        console.log(`Track ${currentTrack + 1} failed to load from local source.`)
        if (isPlaying) {
            setTimeout(() => nextTrack(), 1000)
        }
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrack].src}
                onEnded={nextTrack}
                onError={handleTrackError}
                preload="metadata"
            />

            <AnimatePresence>
                {!isInterfaceHidden && (
                    <motion.div
                        className="fixed bottom-40 right-4 sm:bottom-44 sm:right-6 z-[9999] flex flex-col items-end"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ delay: 0.2 }}
                    >
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                    className="mb-4 w-[85vw] max-w-[320px] bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-primary/20 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
                                >
                                    {/* Decorative Background Glow - Adaptive opacity */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${playlist[currentTrack].coverColor}`} />

                                    <div className="p-4 sm:p-5">
                                        {/* Top Bar */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                                <Music size={12} className="text-primary" />
                                                <span>Music Player</span>
                                            </div>
                                            <button
                                                onClick={() => setShowPlaylist(!showPlaylist)}
                                                className={`p-1.5 rounded-full transition-colors ${showPlaylist ? 'bg-primary/20 text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                                title="Toggle Playlist"
                                            >
                                                <ListMusic size={16} />
                                            </button>
                                        </div>

                                        {/* Main Player View */}
                                        <div className="flex items-center space-x-4 mb-5">
                                            {/* Rotating Album Art */}
                                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden shadow-lg border-2 border-gray-100 dark:border-white/10 group">
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${playlist[currentTrack].coverColor} animate-spin-slow`}
                                                    style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                                                >
                                                    <Disc className="absolute inset-0 m-auto text-white/50 w-full h-full p-2" />
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {isPlaying ? (
                                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                    ) : (
                                                        <Music size={16} className="text-white drop-shadow-md" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <motion.h4
                                                    key={playlist[currentTrack].title + currentTrack}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-gray-900 dark:text-white font-bold text-base sm:text-lg truncate"
                                                >
                                                    {playlist[currentTrack].title}
                                                </motion.h4>
                                                <motion.p
                                                    key={playlist[currentTrack].artist + currentTrack}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="text-xs sm:text-sm text-primary truncate font-medium"
                                                >
                                                    {playlist[currentTrack].artist}
                                                </motion.p>
                                            </div>
                                        </div>

                                        {/* Playlist View */}
                                        <AnimatePresence>
                                            {showPlaylist && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="mb-4 overflow-hidden border-t border-gray-100 dark:border-white/10 pt-2"
                                                >
                                                    <div className="bg-gray-50/50 dark:bg-black/20 rounded-xl p-2 max-h-40 overflow-y-auto custom-scrollbar space-y-1">
                                                        {playlist.map((track, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => playTrack(index)}
                                                                className={`w-full flex items-center p-2 rounded-lg text-left transition-all ${currentTrack === index
                                                                    ? 'bg-primary/20 text-gray-900 dark:text-white shadow-sm'
                                                                    : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                                    }`}
                                                            >
                                                                <div className="flex-1 min-w-0">
                                                                    <div className={`text-xs font-bold ${currentTrack === index ? 'text-primary' : ''}`}>
                                                                        {track.title}
                                                                    </div>
                                                                    <div className="text-[10px] opacity-70 truncate">{track.artist}</div>
                                                                </div>
                                                                {currentTrack === index && isPlaying && (
                                                                    <div className="flex space-x-0.5 h-3 ml-2">
                                                                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-primary rounded-full" />
                                                                        <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} className="w-0.5 bg-primary rounded-full" />
                                                                        <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-0.5 bg-primary rounded-full" />
                                                                    </div>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Controls Row */}
                                        <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-xl p-2 sm:p-3 backdrop-blur-sm shadow-inner dark:shadow-none">
                                            <button
                                                onClick={toggleMute}
                                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full"
                                            >
                                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                            </button>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={prevTrack}
                                                    className="text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-full transition-all active:scale-95"
                                                >
                                                    <SkipBack size={24} />
                                                </button>

                                                <button
                                                    onClick={togglePlay}
                                                    className={`p-3 sm:p-4 rounded-full text-white shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-r ${playlist[currentTrack].coverColor}`}
                                                >
                                                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                                                </button>

                                                <button
                                                    onClick={nextTrack}
                                                    className="text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-full transition-all active:scale-95"
                                                >
                                                    <SkipForward size={24} />
                                                </button>
                                            </div>

                                            {/* Spacer for symmetry */}
                                            <div className="w-8"></div>
                                        </div>

                                        {/* Progress Bar (Simple Visual) */}
                                        <div className="mt-4 flex items-center space-x-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${playlist[currentTrack].coverColor}`}
                                                initial={{ width: "0%" }}
                                                animate={{ width: isPlaying ? "100%" : "0%" }}
                                                transition={{ duration: 180, ease: "linear", repeat: Infinity }} // Approx fake duration
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Floating Toggle Button - Adjusted Position logic (via parent fixed bottom changed above) */}
                        <motion.button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 border-2 ${isPlaying
                                ? 'border-transparent'
                                : 'bg-white/80 dark:bg-black/90 border-gray-200 dark:border-primary/50 text-gray-800 dark:text-primary'
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* Background Gradient when playing */}
                            {isPlaying && (
                                <div className={`absolute inset-0 bg-gradient-to-tr ${playlist[currentTrack].coverColor} opacity-90`} />
                            )}

                            {/* Spinning Disc Effect */}
                            {isPlaying && (
                                <div className="absolute inset-0 animate-spin-slow">
                                    <div className="absolute inset-[2px] border border-white/20 rounded-full" />
                                    <div className="absolute inset-[8px] border border-white/10 rounded-full" />
                                </div>
                            )}

                            <div className="relative z-10">
                                {isExpanded ? (
                                    <Music size={24} className={isPlaying ? "text-white" : "text-primary"} />
                                ) : isPlaying ? (
                                    <div className="flex items-end space-x-0.5 h-4 mb-1">
                                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-white rounded-full text-white" />
                                        <motion.div animate={{ height: [4, 16, 4] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }} className="w-1 bg-white rounded-full text-white" />
                                        <motion.div animate={{ height: [4, 10, 4] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1 bg-white rounded-full text-white" />
                                    </div>
                                ) : (
                                    <Music size={24} className="text-gray-700 dark:text-primary" />
                                )}
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
