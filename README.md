# 🚀 Sundram Pandey - Modern Portfolio

A feature-rich, modern portfolio website built with Next.js 14, featuring advanced 3D elements, smooth animations, interactive components, and comprehensive functionality.

## ✨ Features

### 🎨 UI/UX
- Modern glassmorphism design with gradient accents
- Fully responsive across all devices
- Dark theme with dynamic color switching
- Interactive particle background
- Smooth scroll animations
- Custom cursor trail effects
- Floating elements animation

### 🌟 Interactive Components
- 3D animated hero section
- Real-time visitor counter
- Live clock display
- GitHub statistics integration
- Interactive portfolio gallery
- Contact form with email integration
- Birthday wish feature
- AI-powered chatbot
- Easter eggs for enhanced UX

### ⚡ Performance & Analytics
- Performance monitoring
- Loading screen with progress
- Error boundary implementation
- SEO optimized
- Analytics integration
- Back to top functionality
- Scroll progress indicator

## 🛠️ Tech Stack

- **Framework:** Next.js 14.0.4
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **UI Components:** Lucide React
- **Email Service:** Nodemailer
- **Notifications:** React Hot Toast
- **Intersection Observer:** React Intersection Observer
- **Typing Effects:** React Typed

## 🚀 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/thesundram/thesundramportfolio.git
cd thesundramportfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Add your email service credentials
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 📁 Project Structure

```
thesundramportfolio/
├── public/
│   ├── images/
│   │   ├── portfolio/          # Portfolio project images
│   │   ├── hero.webp          # Hero section image
│   │   └── Sundram_CV.pdf     # Resume/CV file
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── send-contact/   # Contact form API
│   │   │   └── send-birthday-wish/ # Birthday wish API
│   │   ├── cv/                # CV page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   ├── components/
│   │   ├── About.js           # About section
│   │   ├── Achievements.js    # Achievements showcase
│   │   ├── Analytics.js       # Analytics component
│   │   ├── BackToTop.js       # Back to top button
│   │   ├── BirthdayWish.js    # Birthday wish feature
│   │   ├── Blog.js            # Blog section
│   │   ├── ChatBot.js         # AI chatbot
│   │   ├── CodeRain.js        # Matrix-style code rain
│   │   ├── ColorSwitcher.js   # Theme color switcher
│   │   ├── Contact.js         # Contact form
│   │   ├── CursorTrail.js     # Custom cursor effects
│   │   ├── EasterEgg.js       # Hidden easter eggs
│   │   ├── ErrorBoundary.js   # Error handling
│   │   ├── FloatingElements.js # Floating animations
│   │   ├── GitHubStats.js     # GitHub statistics
│   │   ├── Hero.js            # Hero section
│   │   ├── LiveClock.js       # Real-time clock
│   │   ├── LoadingScreen.js   # Loading animation
│   │   ├── Navbar.js          # Navigation bar
│   │   ├── ParticleBackground.js # Particle system
│   │   ├── PerformanceMonitor.js # Performance tracking
│   │   ├── Portfolio.js       # Portfolio showcase
│   │   ├── ScrollProgress.js  # Scroll indicator
│   │   ├── Services.js        # Services section
│   │   ├── Testimonials.js    # Client testimonials
│   │   ├── ThemeToggle.js     # Dark/light theme
│   │   ├── Timeline.js        # Experience timeline
│   │   └── VisitorCounter.js  # Visitor tracking
│   └── lib/
│       └── emailjs.js         # Email service config
├── .env.local                 # Environment variables
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## 🎯 Key Sections

- **Hero:** Animated introduction with 3D elements
- **About:** Personal information and skills
- **Services:** Professional services offered
- **Portfolio:** Project showcase with live demos
- **Timeline:** Professional experience
- **Achievements:** Certifications and awards
- **Testimonials:** Client feedback
- **Blog:** Technical articles and insights
- **Contact:** Multi-channel communication

## 🔧 Customization

1. **Personal Information:** Update details in respective components
2. **Styling:** Modify `tailwind.config.js` for colors and themes
3. **Images:** Replace images in `public/images/`
4. **Content:** Update text content in component files
5. **API Keys:** Configure email service in `.env.local`

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Deploy on Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

## 🌟 Performance Features

- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic code splitting for faster loads
- **SEO:** Meta tags and structured data
- **PWA Ready:** Manifest and service worker support
- **Analytics:** Built-in performance monitoring

## 📧 Contact

- **Email:** [thesundram29@gmail.com](mailto:thesundram29@gmail.com)
- **LinkedIn:** [linkedin.com/in/thesundram](https://linkedin.com/in/thesundram)
- **GitHub:** [github.com/thesundram](https://github.com/thesundram)
- **Instagram:** [instagram.com/the.sun29](https://instagram.com/the.sun29)
- **Facebook:** [facebook.com/thesundram29](https://www.facebook.com/thesundram29)
- **Portfolio:** [Live Demo](https://thesundram.vercel.app)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Sundram Pandey** | © 2025 All Rights Reserved