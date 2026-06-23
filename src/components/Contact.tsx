import { motion } from 'framer-motion';
import { Github, Mail, Radio, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { swipeIn, riseIn } from '../utils/motion';

const EMAIL = 'wahidkherchache@gmail.com';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 carbon-grid overflow-hidden">
      {/* radio static background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(220,0,0,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="05"
          title="OPEN COMMS"
          subtitle="Team radio is open — transmissions welcome."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex items-center gap-3 font-mono text-xs"
        >
          <Radio size={14} className="text-ferrari-red animate-flicker" />
          <span className="text-ferrari-smoke/50 tracking-[0.25em] uppercase animate-flicker">
            [ rx ] ...receiving...over...
          </span>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 gap-5 md:gap-6">
          <motion.a
            {...swipeIn(true)}
            href="https://github.com/Wahidkherchache"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-6 md:p-7 overflow-hidden hover:border-ferrari-red/50 transition-colors animate-pulse-red"
            data-cursor="hover"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-glow opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-ferrari-carbon border border-ferrari-red/40 flex items-center justify-center group-hover:border-ferrari-red transition-colors">
                <Github size={26} className="text-ferrari-smoke group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-gold uppercase mb-1">
                  Channel 01
                </div>
                <div className="font-display text-2xl md:text-3xl tracking-wide text-ferrari-smoke">
                  GitHub
                </div>
                <div className="font-mono text-xs text-ferrari-smoke/50 mt-1">
                  @Wahidkherchache
                </div>
              </div>
              <Send
                size={18}
                className="ml-auto text-ferrari-smoke/30 group-hover:text-ferrari-red group-hover:translate-x-1 transition-all"
              />
            </div>
          </motion.a>

          <motion.a
            {...swipeIn(false)}
            href={`mailto:${EMAIL}`}
            className="group relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-6 md:p-7 overflow-hidden hover:border-ferrari-gold/50 transition-colors"
            data-cursor="hover"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(200,168,75,0.4) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-ferrari-carbon border border-ferrari-gold/40 flex items-center justify-center group-hover:border-ferrari-gold transition-colors">
                <Mail size={24} className="text-ferrari-gold" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-red uppercase mb-1">
                  Channel 02
                </div>
                <div className="font-display text-2xl md:text-3xl tracking-wide text-ferrari-smoke">
                  Email
                </div>
                <div className="font-mono text-xs text-ferrari-smoke/50 mt-1 break-all">
                  {EMAIL}
                </div>
              </div>
              <Send
                size={18}
                className="ml-auto text-ferrari-smoke/30 group-hover:text-ferrari-gold group-hover:translate-x-1 transition-all"
              />
            </div>
          </motion.a>
        </div>

        <motion.blockquote
          {...riseIn(0.3)}
          className="mt-14 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-ferrari-red" />
            <span className="font-mono text-[0.65rem] tracking-[0.3em] text-ferrari-gold uppercase">
              Team Principal
            </span>
            <span className="h-px w-8 bg-ferrari-red" />
          </div>
          <p className="font-display text-xl md:text-3xl text-ferrari-smoke/85 leading-snug tracking-wide italic">
            "To achieve anything in this game, you must be prepared to dabble on
            the boundary of disaster."
          </p>
          <footer className="mt-3 font-mono text-xs text-ferrari-smoke/40 tracking-wider">
            — Stirling Moss
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
