import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
}

export default function Navbar({ isIntroComplete = true }: NavbarProps) {
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

    const isMobile = window.innerWidth < 768;
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
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? isLight
              ? 'bg-white/95 backdrop-blur-[20px] shadow-sm text-[#111111]'
              : 'bg-black/40 backdrop-blur-[20px] saturate-180 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : isLight
            ? 'bg-transparent text-[#111111]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className={`hidden md:flex items-center font-mono text-xs uppercase tracking-[0.2em] ${
            isLight ? 'text-[#111111]/80 font-semibold' : 'text-ferrari-smoke/70'
          }`}>
            Algiers, Algeria
          </div>

          <div className="hidden md:flex items-center relative gap-2">
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
                  className={`flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    active === n.id
                      ? isLight ? 'text-[#DC0000] font-bold' : 'text-ferrari-gold font-semibold'
                      : isLight ? 'text-[#111111]/80 hover:text-[#111111] font-semibold' : 'text-ferrari-smoke/70 hover:text-ferrari-smoke'
                  }`}
                >
                  {Icon ? <Icon size={14} className="opacity-80" /> : null}
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

          <div className="hidden md:flex items-center gap-4">
            <div className={`hidden md:flex items-center font-mono text-xs uppercase tracking-[0.2em] ${
              isLight ? 'text-[#111111]/80 font-semibold' : 'text-ferrari-smoke/70'
            }`}>
              {time}
            </div>
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                isLight
                  ? 'border-gray-300 bg-gray-100 text-[#111111] hover:bg-gray-200 hover:text-[#DC0000]'
                  : 'border-white/10 bg-white/5 backdrop-blur-xl text-ferrari-smoke hover:bg-white/10 hover:text-ferrari-gold'
              }`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        className={`fixed inset-x-0 bottom-3 z-50 px-3 md:hidden transition-all duration-300 ${
          isIntroComplete ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className={`mx-auto flex max-w-fit items-center justify-center gap-0.5 rounded-full border px-2.5 py-1.5 backdrop-blur-[20px] shadow-lg ${
          isLight
            ? 'bg-white/95 border-gray-300 text-[#111111]'
            : 'bg-black/30 border-white/10 saturate-180 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]'
        }`}>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-label={label}
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                active === id
                  ? 'bg-ferrari-red text-white'
                  : isLight
                  ? 'text-[#111111]/80 hover:bg-gray-100 hover:text-[#111111]'
                  : 'text-ferrari-smoke/70 hover:bg-white/5 hover:text-ferrari-smoke'
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
          <div className={`h-4 w-px mx-1 shrink-0 ${isLight ? 'bg-gray-300' : 'bg-ferrari-smoke/20'}`} />
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle theme"
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
              isLight
                ? 'text-[#111111]/80 hover:bg-gray-100 hover:text-[#111111]'
                : 'text-ferrari-smoke/70 hover:bg-white/5 hover:text-ferrari-smoke'
            }`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </>
  );
}
