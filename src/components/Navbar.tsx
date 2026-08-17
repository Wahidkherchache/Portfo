import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Shield, Compass, Mail, Moon, Sun } from 'lucide-react';

const NAV = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'certifications', label: 'Certs', icon: Shield },
  { id: 'roadmap', label: 'Roadmap', icon: Compass },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface NavbarProps {
  isIntroComplete?: boolean;
  hidden?: boolean;
  isModalOpen?: boolean;
}

export default function Navbar({
  isIntroComplete = true,
  hidden = false,
  isModalOpen = false,
}: NavbarProps) {
  const isHidden = hidden || isModalOpen;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-GB'));
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (window.localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark';
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB'));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(
        (el): el is HTMLElement => Boolean(el)
      );
      const nav = document.querySelector('nav');
      const headerHeight = nav ? nav.getBoundingClientRect().height : 64;
      const threshold = headerHeight + 32;

      let current = sections[0]?.id ?? 'hero';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }
      setActive(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const el = document.querySelector<HTMLAnchorElement>(`[data-nav="${active}"]`);
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const isMobile = window.innerWidth <= 1100;
    const nav = document.querySelector('nav');
    const headerHeight = isMobile ? 0 : (nav ? nav.getBoundingClientRect().height : 64);
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const topPadding = isMobile ? 24 : 16;

    window.scrollTo({
      top: Math.max(0, targetPosition - headerHeight - topPadding),
      behavior: 'smooth',
    });
  };

  const isLight = theme === 'light';

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`desktop-nav fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isHidden ? 'navbar-hidden pointer-events-none' : ''
        } ${
          scrolled
            ? isLight
              ? 'bg-white/95 backdrop-blur-[20px] shadow-sm text-[#111111]'
              : 'bg-black/40 backdrop-blur-[20px] saturate-180 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : isLight
            ? 'bg-transparent text-[#111111]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className={`flex items-center font-mono text-xs uppercase tracking-[0.2em] shrink-0 ${
            isLight ? 'text-[#111111]/80 font-semibold' : 'text-ferrari-smoke/70'
          }`}>
            Algiers, Algeria
          </div>

          <div className="flex items-center relative gap-1 xl:gap-1.5 flex-nowrap shrink-0">
            {NAV.map((n) => {
              const Icon = (n as any).icon as React.ComponentType<any> | undefined;
              return (
                <a
                  key={n.id}
                  data-nav={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.id);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1 xl:px-2.5 xl:py-1.5 font-mono text-[11px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.2em] whitespace-nowrap shrink-0 transition-colors ${
                    active === n.id
                      ? isLight ? 'text-[#DC0000] font-bold' : 'text-ferrari-gold font-semibold'
                      : isLight ? 'text-[#111111]/80 hover:text-[#111111] font-semibold' : 'text-ferrari-smoke/70 hover:text-ferrari-smoke'
                  }`}
                >
                  {Icon ? <Icon size={13} className="opacity-80 shrink-0" /> : null}
                  <span className="leading-none">{n.label}</span>
                </a>
              );
            })}
            <motion.div
              className="absolute -bottom-0.5 h-0.5 bg-red-gradient"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`flex items-center font-mono text-xs uppercase tracking-[0.2em] shrink-0 ${
              isLight ? 'text-[#111111]/80 font-semibold' : 'text-ferrari-smoke/70'
            }`}>
              {time}
            </div>
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors shrink-0 ${
                isLight
                  ? 'border-gray-300 bg-gray-100 text-[#111111] hover:bg-gray-200 hover:text-[#DC0000]'
                  : 'border-white/10 bg-white/5 backdrop-blur-xl text-ferrari-smoke hover:bg-white/10 hover:text-ferrari-gold'
              }`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Apple Liquid Glass Bottom Navigation Bar (iOS 26 Style) */}
      <AnimatePresence>
        {isIntroComplete && !isHidden && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '15px',
              left: '50%',
              zIndex: 9999,
              width: 'fit-content',
              padding: '6px 12px',
            }}
            className={`mobile-liquid-nav apple-liquid-glass flex items-center gap-0.5 ${
              isHidden ? 'navbar-hidden' : ''
            }`}
          >
            {NAV.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  aria-label={label}
                  whileTap={{ scale: 0.85 }}
                  className="relative flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer focus:outline-none shrink-0"
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-bubble"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundColor: isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={isActive ? 17 : 15}
                    className="relative z-10 transition-all duration-200"
                    style={{
                      color: isLight
                        ? isActive
                          ? 'rgba(0, 0, 0, 1.0)'
                          : 'rgba(0, 0, 0, 0.6)'
                        : isActive
                          ? 'rgba(255, 255, 255, 1.0)'
                          : 'rgba(255, 255, 255, 0.6)',
                    }}
                  />
                </motion.button>
              );
            })}

            <motion.button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.85 }}
              className="relative flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer focus:outline-none shrink-0"
            >
              {theme === 'dark' ? (
                <Sun
                  size={15}
                  className="relative z-10 transition-all duration-200"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                />
              ) : (
                <Moon
                  size={15}
                  className="relative z-10 transition-all duration-200"
                  style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
