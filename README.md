# Abdelouahid Kherchache - Portfolio

A high-performance, F1-inspired personal portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic animations, a racing-themed speedometer, and a sleek carbon-fiber aesthetic.

## Features

- **Racing-Inspired Design** - Carbon fiber textures, Ferrari-inspired color palette (red, gold, carbon black), and motorsport aesthetics
- **Animated Speedometer** - Interactive RPM gauge that animates to redline on load
- **Smooth Animations** - Powered by Framer Motion with reduced-motion support for accessibility
- **Custom Cursor** - Themed cursor that follows mouse movement
- **Typewriter Effect** - Rotating role descriptions in the hero section
- **Loader Animation** - Sleek loading screen with progress indicator
- **Responsive Layout** - Fully responsive from mobile to desktop
- **Multiple Sections** - Hero, About, Skills, Projects, Roadmap, and Contact

## Tech Stack

- **Framework** - React 18 + TypeScript
- **Build Tool** - Vite
- **Styling** - Tailwind CSS
- **Animations** - Framer Motion
- **Icons** - Lucide React
- **Backend** - Supabase (available for data persistence)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server starts automatically. Open your browser to view the site.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npm run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Loader.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Roadmap.tsx
│   ├── SectionHeading.tsx
│   ├── Skills.tsx
│   ├── SpeedLines.tsx
│   └── Speedometer.tsx
├── utils/
│   └── motion.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Customization

### Theme Colors

The color palette is defined in `tailwind.config.js` with Ferrari-inspired colors:

- **ferrari-red** - Primary accent (#DC0000)
- **ferrari-gold** - Secondary accent (#C8A84B)
- **ferrari-carbon** - Dark backgrounds (#0A0A0A)
- **ferrari-smoke** - Light text (#F0F0F0)

### Personal Information

Update the hero section in `src/components/Hero.tsx`:

- Name and title
- Role descriptions in the `ROLES` array
- Location
- Bio text
- GitHub link

## License

MIT
