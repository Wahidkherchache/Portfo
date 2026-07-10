import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
];

const WK = () => (
  <svg viewBox="0 0 64 48" className="h-8 w-10" fill="none" aria-hidden>
    <path d="M2 44 L2 4 L14 4 L24 28 L34 4 L46 4 L46 44 L36 44 L36 20 L26 44 L22 44 L12 20 L12 44 Z" fill="#C8A84B" />
    <path d="M48 4 L56 4 L62 24 L56 44 L48 44 L54 24 Z" fill="#DC0000" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.querySelector<HTMLAnchorElement>(`[data-nav="${active}"]`);
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active, open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ferrari-carbon/92 backdrop-blur-md border-b border-ferrari-pit-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => go('hero')}
            className="flex items-center gap-2 group"
            aria-label="Back to top"
          >
            <div className="relative">
              <WK />
              <div className="absolute inset-0 blur-md opacity-40 group-hover:opacity-70 transition-opacity">
                <WK />
              </div>
            </div>
            <span className="font-display tracking-[0.3em] text-sm text-ferrari-smoke hidden sm:block">
              OUAHID
            </span>
          </button>

          <div className="hidden md:flex items-center relative">
            {NAV.map((n) => (
              <button
                key={n.id}
                data-nav={n.id}
                onClick={() => go(n.id)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === n.id ? 'text-ferrari-gold' : 'text-ferrari-smoke/70 hover:text-ferrari-smoke'
                }`}
              >
                {n.label}
              </button>
            ))}
            <motion.div
              className="absolute -bottom-0.5 h-0.5 bg-red-gradient"
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          </div>

          <button
            className="md:hidden text-ferrari-smoke p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-ferrari-carbon/98 backdrop-blur border-b border-ferrari-pit-border"
            >
              <div className="flex flex-col px-4 py-2">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => go(n.id)}
                    className={`text-left py-3 font-mono text-sm uppercase tracking-[0.2em] border-b border-ferrari-pit-border/60 ${
                      active === n.id ? 'text-ferrari-gold' : 'text-ferrari-smoke/80'
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
