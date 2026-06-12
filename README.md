# Portfolio - Aviral Shukla

A modern, full-stack developer portfolio built with Next.js 15, React 19, and Tailwind CSS. Showcasing projects, skills, and experience with smooth animations and responsive design.

## 🚀 Features

- **Modern UI**: Responsive design with Tailwind CSS and Radix UI components
- **Smooth Animations**: Framer Motion for elegant page transitions and interactions
- **Dark Theme**: Optimized dark mode with subtle white accents
- **Project Showcase**: Interactive project explorer displaying full-stack work
- **Skills Directory**: Categorized technical skills across Frontend, Backend, Data, and Foundations
- **Performance Optimized**: Next.js static generation and optimization
- **TypeScript**: Fully typed codebase for reliability
- **Accessible**: Built with accessibility standards in mind

## 🛠️ Tech Stack

**Frontend**:
- Next.js 15.5.7
- React 19.1.0
- TypeScript 5.7.2
- Tailwind CSS 3.4.17
- Framer Motion 12.23.24
- Lucide React Icons

**UI & Components**:
- Radix UI Slot
- Class Variance Authority
- Tailwind Merge
- CLSX

**Development**:
- ESLint
- PostCSS
- Node.js

## 📋 Projects Featured

1. **BloodBond** - Full-stack blood donation platform
   - Tech: React.js, Node.js, MongoDB, Redis, OAuth
   - Features: Donor matching, secure auth, role-based access, caching
   - [Live](https://bloodbond-platform.vercel.app/) | [GitHub](https://github.com/getchaviral)

2. **Reservify** - Reservation and booking management platform
   - Tech: React.js, Node.js, MongoDB, JWT, Razorpay
   - Features: Booking system, JWT auth, payment processing, admin dashboard
   - [Live](https://smart-reservation-system.vercel.app/) | [GitHub](https://github.com/getchaviral)

3. **MUGGAM** - Text-to-video creation platform
   - Tech: React.js, FFmpeg, Google OAuth
   - Features: Media processing, responsive UI, seamless creator experience
   - [Live](https://muggam.vercel.app/) | [GitHub](https://github.com/getchaviral)

## 🎯 Skills

### Frontend
React, Next.js, JavaScript, TypeScript, Tailwind CSS

### Backend
Node.js, Express.js, REST APIs, OAuth 2.0, JWT

### Data
MongoDB, MySQL, Redis

### Foundations
DSA, OOP, DBMS, Operating Systems, Computer Networks

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/getchaviral/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Production

```bash
# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Generate Resume

```bash
# Generate resume from data
npm run generate:resume
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── blog/                # Blog posts with dynamic routing
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── robots.ts            # SEO robots file
│   └── sitemap.ts           # Sitemap for SEO
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── about.tsx            # About section
│   ├── contact.tsx          # Contact section
│   ├── experience.tsx       # Experience section
│   ├── hero.tsx             # Hero banner
│   ├── project-explorer.tsx # Project showcase
│   ├── reveal.tsx           # Animation component
│   ├── section-heading.tsx  # Section headers
│   └── site-header.tsx      # Navigation header
├── content/                 # Static content (blog, etc.)
├── lib/                     # Utility functions
│   ├── data.ts             # Projects and skills data
│   └── utils.ts            # Helper utilities
├── public/                  # Static assets
├── scripts/                 # Build and generation scripts
│   └── generate-resume.mjs  # Resume generation
├── styles/                  # Additional stylesheets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind CSS config
├── postcss.config.mjs       # PostCSS config
└── next.config.mjs          # Next.js config
```

## 🔧 Configuration

### TypeScript
Configuration defined in `tsconfig.json` with strict type checking enabled.

### Tailwind CSS
Custom configuration in `tailwind.config.ts` with project-specific color scheme and typography.

### Next.js
Configured in `next.config.mjs` with optimizations for performance and SEO.

## 📱 Responsive Design

The portfolio is fully responsive across all device sizes:
- Mobile: Optimized touch interactions
- Tablet: Flexible layouts
- Desktop: Full-feature experience

## 🚀 Deployment

### Vercel (Recommended)

The portfolio is configured for seamless deployment on Vercel:

```bash
# Push to GitHub and connect to Vercel at vercel.com
# Automatic builds on every push
```

### Other Platforms

```bash
# Build for deployment
npm run build

# Start the application
npm start
```

## 📄 SEO

- Sitemap: Auto-generated via `app/sitemap.ts`
- Robots: Configured in `app/robots.ts`
- Meta tags: Configured in layout and pages
- Open Graph support for social sharing

## 🤝 Connect

- **GitHub**: [getchaviral](https://github.com/getchaviral)
- **Portfolio**: [https://aviral-shukla.com](https://aviral-shukla.com)
- **Email**: Contact via portfolio site

## 📝 License

This portfolio is personal work. Feel free to use as inspiration for your own.

## 🎨 Customization

To customize this portfolio:

1. **Update Projects**: Edit `lib/data.ts` to add/modify projects
2. **Modify Skills**: Update skill groups in `lib/data.ts`
3. **Change Styling**: Customize `tailwind.config.ts`
4. **Add Content**: Add blog posts to the `content/` directory

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Built with ❤️ as a modern recruiter-focused portfolio showcase**
