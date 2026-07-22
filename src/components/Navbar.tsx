import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code2, Briefcase, Compass, Mail, Moon, Sun } from 'lucide-react';

const NAV = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Briefcase },
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

    const nav = document.querySelector('nav');
    const headerHeight = nav ? nav.getBoundingClientRect().height : 64;

    window.setTimeout(() => {
      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }, 280);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ferrari-carbon/90 backdrop-blur-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="hidden md:flex items-center text-ferrari-smoke/70 font-mono text-xs uppercase tracking-[0.2em]">
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
                    active === n.id ? 'text-ferrari-gold' : 'text-ferrari-smoke/70 hover:text-ferrari-smoke'
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
            <div className="hidden md:flex items-center text-ferrari-smoke/70 font-mono text-xs uppercase tracking-[0.2em]">
              {time}
            </div>
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ferrari-pit-border/50 bg-ferrari-carbon/90 text-ferrari-smoke transition-colors hover:bg-ferrari-pit hover:text-ferrari-gold"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        className={`fixed inset-x-0 bottom-4 z-50 px-4 md:hidden transition-all duration-300 ${
          isIntroComplete ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2 rounded-full border border-ferrari-pit-border/50 bg-ferrari-carbon/90 px-4 py-3 backdrop-blur-xl shadow-black/20">
          {[
            { id: 'hero', label: 'Home', icon: Home },
            { id: 'about', label: 'About', icon: User },
            { id: 'skills', label: 'Skills', icon: Code2 },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'roadmap', label: 'Roadmap', icon: Compass },
            { id: 'contact', label: 'Contact', icon: Mail },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-label={label}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                active === id ? 'bg-ferrari-red text-white' : 'text-ferrari-smoke/70 hover:bg-white/5 hover:text-ferrari-smoke'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
          <div className="h-7 w-px rounded-full bg-ferrari-smoke/40 mx-2" />
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle theme"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ferrari-smoke/70 hover:bg-white/5 hover:text-ferrari-smoke transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </>
  );
}
