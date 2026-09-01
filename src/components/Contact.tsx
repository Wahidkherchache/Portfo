import { motion } from 'framer-motion';
import { Github, Mail, Radio, Send, Linkedin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { swipeIn, riseIn } from '../utils/motion';

const EMAIL = 'wahidkherchache@gmail.com';

export default function Contact() {

  return (
    <section id="contact" className="relative pt-20 pb-6 md:pt-28 md:pb-8 carbon-grid overflow-hidden">
      {/* radio static background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(220,0,0,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="06"
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

        {/* Channels 01, 02, 03 Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Channel 01 - GitHub */}
          <motion.a
            {...swipeIn(true)}
            href="https://github.com/Wahidkherchache"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative spatial-glass rounded-2xl p-6 overflow-hidden hover:border-ferrari-red/50 transition-colors animate-pulse-red"
            data-cursor="hover"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-glow opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-ferrari-red/40 flex items-center justify-center group-hover:border-ferrari-red transition-colors shrink-0 backdrop-blur-md">
                <Github size={22} className="text-ferrari-smoke group-hover:text-white transition-colors comms-github-icon" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-gold uppercase mb-1">
                  Channel 01
                </div>
                <div className="font-display text-xl md:text-2xl tracking-wide text-ferrari-smoke truncate">
                  GitHub
                </div>
                <div className="font-mono text-xs text-ferrari-smoke/50 mt-0.5 truncate">
                  @Wahidkherchache
                </div>
              </div>
              <Send
                size={16}
                className="ml-auto text-ferrari-smoke/30 group-hover:text-ferrari-red group-hover:translate-x-1 transition-all shrink-0"
              />
            </div>
          </motion.a>

          {/* Channel 02 - Email */}
          <motion.a
            {...swipeIn(false)}
            href={`mailto:${EMAIL}`}
            className="group relative spatial-glass rounded-2xl p-6 overflow-hidden hover:border-ferrari-gold/50 transition-colors"
            data-cursor="hover"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(200,168,75,0.4) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-ferrari-gold/40 flex items-center justify-center group-hover:border-ferrari-gold transition-colors shrink-0 backdrop-blur-md">
                <Mail size={20} className="text-ferrari-gold" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-red uppercase mb-1">
                  Channel 02
                </div>
                <div className="font-display text-xl md:text-2xl tracking-wide text-ferrari-smoke truncate">
                  Email
                </div>
                <div className="font-mono text-xs text-ferrari-smoke/50 mt-0.5 truncate">
                  {EMAIL}
                </div>
              </div>
              <Send
                size={16}
                className="ml-auto text-ferrari-smoke/30 group-hover:text-ferrari-gold group-hover:translate-x-1 transition-all shrink-0"
              />
            </div>
          </motion.a>

          {/* Channel 03 - LinkedIn */}
          <motion.a
            {...swipeIn(true)}
            href="https://linkedin.com/in/abdelouahid-kherchache"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative spatial-glass rounded-2xl p-6 overflow-hidden hover:border-ferrari-gold/50 transition-colors"
            data-cursor="hover"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(200,168,75,0.4) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-ferrari-gold/40 flex items-center justify-center group-hover:border-ferrari-gold transition-colors shrink-0 backdrop-blur-md">
                <Linkedin size={20} className="text-ferrari-gold" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-gold uppercase mb-1">
                  Channel 03
                </div>
                <div className="font-display text-xl md:text-2xl tracking-wide text-ferrari-smoke truncate">
                  LinkedIn
                </div>
                <div className="font-mono text-xs text-ferrari-smoke/50 mt-0.5 truncate">
                  abdelouahid-kherchache
                </div>
              </div>
              <Send
                size={16}
                className="ml-auto text-ferrari-smoke/30 group-hover:text-ferrari-gold group-hover:translate-x-1 transition-all shrink-0"
              />
            </div>
          </motion.a>
        </div>

        {/* Channel 04 - DIRECT COMMS (Disabled until backend & database integration) */}
        {/*
        <motion.div
          {...riseIn(0.2)}
          className="mt-8 spatial-glass rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-ferrari-red/40 transition-colors"
        >
          ...
        </motion.div>
        */}

        {/* Quote section */}
        <motion.blockquote
          {...riseIn(0.3)}
          className="mt-14 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-ferrari-red" />
            <span className="font-mono text-[0.65rem] tracking-[0.3em] text-ferrari-gold uppercase">
              7x World Champion
            </span>
            <span className="h-px w-8 bg-ferrari-red" />
          </div>
          <p className="font-display text-xl md:text-3xl text-ferrari-smoke/85 leading-snug tracking-wide italic">
            "When you start out in a team, you have to get the other members to go along with your ideas."
          </p>
          <footer className="mt-3 font-mono text-xs text-ferrari-smoke/40 tracking-wider">
            — Michael Schumacher
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
