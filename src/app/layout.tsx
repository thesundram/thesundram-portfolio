import './globals.css'
import ScrollProgress from '../components/ScrollProgress'
import BirthdayWish from '../components/BirthdayWish'
import { Toaster } from 'sonner'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://thesundram.vercel.app'),
  title: 'Sundram Pandey | Software Engineer | Full Stack Developer',
  description: 'Portfolio of Sundram Pandey. Software Engineer and Full Stack Developer with expertise in React, Next.js, Node.js, React Native, Flutter, and modern web architecture. Building scalable and performant applications.',
  keywords: ['Sundram Pandey', 'Software Engineer', 'Full Stack Developer', 'React Developer', 'Next.js', 'Node.js', 'React Native', 'Flutter', 'Web Development', 'Mobile App Development', 'Mumbai', 'India', 'Portfolio'],
  authors: [{ name: 'Sundram Pandey', url: 'https://thesundram.vercel.app' }],
  creator: 'Sundram Pandey',
  openGraph: {
    title: 'Sundram Pandey - Software Engineer',
    description: 'Explore my projects, skills, and experience in Full Stack Web and Mobile Development.',
    url: 'https://thesundram.vercel.app',
    siteName: 'Sundram Pandey | Portfolio',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'Sundram Pandey - Software Engineer' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundram Pandey | Software Engineer',
    description: 'Explore my projects, skills, and experience in Full Stack Web and Mobile Development.',
    images: ['/images/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased transition-colors duration-300">
        <ScrollProgress />
        <BirthdayWish />
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  )
}