import './globals.css'
import ScrollProgress from '../components/ScrollProgress'
import BirthdayWish from '../components/BirthdayWish'
import { Toaster } from 'sonner'

export const metadata = {
  metadataBase: new URL('https://thesundram.vercel.app'),
  title: 'Sundram Pandey | Software Engineer | Portfolio Website | Full Stack Developer |Software Developer | Mumbai, India',
  description: 'Software Engineer | Full Stack Developer with expertise in React, Next.js, Node.js, React Native, Flutter, and MongoDB. Skilled in building scalable web and mobile applications.',
  keywords: 'Sundram Pandey, Software Engineer, Full Stack Developer, Software Developer, React, React Native, Flutter, MongoDB,mobile development, web development, Mysql, HTML, CSS, JavaScript, Next.js, Node.js, Express.js, Bootstrap, GitHub, LinkedIn, Twitter, Instagram, Mumbai, India',
  author: 'Sundram Pandey',
  openGraph: {
    title: 'Sundram Pandey - Software Engineer Portfolio',
    description: 'Full Stack Developer specializing in modern web and mobile development',
    url: 'https://thesundram.vercel.app',
    siteName: 'Sundram Pandey Portfolio',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundram Pandey - Software Engineer',
    description: 'Full Stack Developer specializing in React, Next.js, and mobile development',
    images: ['/images/hero.jpg'],
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