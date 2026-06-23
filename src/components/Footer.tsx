import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative carbon-bg border-t border-ferrari-pit-border py-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-racing-stripe opacity-50" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="font-display text-2xl md:text-3xl tracking-[0.15em] text-ferrari-smoke">
              ENGINEERED BY <span className="gold-shimmer">ABDELOUAHID KHERCHACHE</span>
            </div>
            <div className="mt-1.5 font-mono text-[0.7rem] md:text-xs text-ferrari-smoke/40 tracking-wider flex items-center gap-2 justify-center md:justify-start">
              <span>Powered by Passion</span>
              <Heart size={11} className="text-ferrari-red fill-ferrari-red" />
              <span>& Caffeine</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/Wahidkherchache"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full border border-ferrari-pit-border flex items-center justify-center text-ferrari-smoke/70 hover:border-ferrari-red hover:text-ferrari-red transition-colors"
            >
              <Github size={18} />
            </a>
            <div className="h-8 w-px bg-ferrari-pit-border" />
            <a
              href="https://github.com/Wahidkherchache"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ferrari-smoke/70 hover:text-ferrari-gold transition-colors tracking-wider uppercase"
            >
              Forza Ferrari
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-ferrari-pit-border/50 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[0.65rem] text-ferrari-smoke/30 tracking-wider"
        >
          <span>© 2026 ABDELOUAHID KHERCHACHE. ALL LAPS RESERVED.</span>
          <span className="uppercase tracking-[0.3em]">
            USTHB · Algiers, DZ
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
