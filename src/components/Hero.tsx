import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Speedometer from './Speedometer';
import SpeedLines from './SpeedLines';
import { reduceMotion } from '../utils/motion';

const ROLES = ['Developer', 'Problem Solver', 'F1 Fanatic', 'Future Hacker'];

function useTypewriter(words: string[], speed = 110, pause = 1600) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduceMotion()) {
      setText(words[0]);
      return;
    }
    const word = words[i % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!del && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
    } else if (!del && text.length === word.length) {
      timeout = setTimeout(() => setDel(true), pause);
    } else if (del && text.length > 0) {
      timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), speed / 2);
    } else {
      setDel(false);
      setI((v) => v + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, del, i, words, speed, pause]);

  return text;
}

export default function Hero() {
  const [lightSwept, setLightSwept] = useState(false);
  const typed = useTypewriter(ROLES);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLightSwept(true), reduceMotion() ? 200 : 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden carbon-bg"
      aria-label="Hero"
    >
      <SpeedLines />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ferrari-carbon pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-50"
           style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(220,0,0,0.12) 0%, transparent 60%)' }} />

      <AnimatePresence>
        {!lightSwept && (
          <motion.div
            className="absolute inset-y-0 left-0 w-full bg-ferrari-red z-30 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-[1fr_auto] gap-10 items-center pt-20 pb-16">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: lightSwept ? 1 : 0, y: lightSwept ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-ferrari-red" />
            <span className="font-mono text-[0.7rem] md:text-xs tracking-[0.4em] text-ferrari-gold uppercase">
              USTHB · Algiers, DZ
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: lightSwept ? 1 : 0, y: lightSwept ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-ferrari-smoke leading-[0.85] tracking-tight"
          >
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]">ABDELOUAHID</span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] gold-shimmer">KHERCHACHE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: lightSwept ? 1 : 0, y: lightSwept ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 font-mono text-base md:text-xl text-ferrari-smoke/90 h-7"
          >
            <span className="text-ferrari-red">&gt;</span>{' '}
            <span>{typed}</span>
            <span className="inline-block w-2 h-5 ml-1 bg-ferrari-red align-middle animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: lightSwept ? 1 : 0, y: lightSwept ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 max-w-xl text-sm md:text-base text-ferrari-smoke/60"
          >
            Full-Stack Developer & Cybersecurity Enthusiast. I build software the way
            Scuderia builds a car — every component matters, no compromises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: lightSwept ? 1 : 0, y: lightSwept ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-ferrari-red text-white font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold rounded-full overflow-hidden transition-all hover:bg-ferrari-red-bright hover:shadow-red-glow"
              style={{ borderRadius: '9999px 9999px 9999px 0' }}
              aria-label="View my work"
            >
              <span className="absolute inset-0 bg-racing-stripe opacity-0 group-hover:opacity-30 transition-opacity" />
              <span className="relative">View My Work</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
              {/* tire marks */}
              <span className="absolute -left-1 -bottom-0.5 w-2 h-1 bg-ferrari-carbon/40 rotate-12" />
            </a>

            <a
              href="https://github.com/Wahidkherchache"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-ferrari-pit-border text-ferrari-smoke/80 font-mono text-xs md:text-sm tracking-[0.2em] uppercase rounded-full hover:border-ferrari-gold hover:text-ferrari-gold transition-colors"
            >
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: lightSwept ? 1 : 0, scale: lightSwept ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="order-1 lg:order-2 mx-auto"
        >
          <Speedometer />
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-ferrari-smoke/40 hover:text-ferrari-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: lightSwept ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  );
}
