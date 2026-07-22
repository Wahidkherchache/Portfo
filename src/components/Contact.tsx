import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Radio, Send, Linkedin, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { swipeIn, riseIn } from '../utils/motion';

const EMAIL = 'wahidkherchache@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

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

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
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

        {/* Channels 01, 02, 03 Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Channel 01 - GitHub */}
          <motion.a
            {...swipeIn(true)}
            href="https://github.com/Wahidkherchache"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-6 overflow-hidden hover:border-ferrari-red/50 transition-colors animate-pulse-red"
            data-cursor="hover"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-glow opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ferrari-carbon border border-ferrari-red/40 flex items-center justify-center group-hover:border-ferrari-red transition-colors shrink-0">
                <Github size={22} className="text-ferrari-smoke group-hover:text-white transition-colors" />
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
            className="group relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-6 overflow-hidden hover:border-ferrari-gold/50 transition-colors"
            data-cursor="hover"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(200,168,75,0.4) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ferrari-carbon border border-ferrari-gold/40 flex items-center justify-center group-hover:border-ferrari-gold transition-colors shrink-0">
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
            className="group relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-6 overflow-hidden hover:border-ferrari-gold/50 transition-colors"
            data-cursor="hover"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{
                background: 'radial-gradient(circle, rgba(200,168,75,0.4) 0%, transparent 70%)',
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ferrari-carbon border border-ferrari-gold/40 flex items-center justify-center group-hover:border-ferrari-gold transition-colors shrink-0">
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

        {/* Channel 04 - DIRECT COMMS (Contact Form) */}
        <motion.div
          {...riseIn(0.2)}
          className="mt-8 bg-ferrari-pit border border-ferrari-pit-border rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl group hover:border-ferrari-red/40 transition-colors"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ferrari-red via-ferrari-gold to-ferrari-red" />

          <div className="flex items-center justify-between mb-6 border-b border-ferrari-pit-border pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.25em] text-ferrari-gold uppercase">
                Channel 04
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-wide text-ferrari-smoke">
                DIRECT COMMS
              </h3>
            </div>
            <span className="font-mono text-[0.65rem] text-ferrari-smoke/40 tracking-widest uppercase hidden sm:inline-block">
              [ PIT_WALL_RADIO ]
            </span>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ferrari-red/10 border border-ferrari-red text-ferrari-red mb-2">
                <CheckCircle2 size={26} />
              </div>
              <h4 className="font-display text-2xl md:text-3xl text-ferrari-smoke tracking-wide">
                TRANSMISSION SENT
              </h4>
              <p className="font-mono text-xs text-ferrari-smoke/60 max-w-md mx-auto">
                Message received on the pit wall. I will respond to your transmission as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-ferrari-carbon border border-ferrari-pit-border text-ferrari-gold font-mono text-xs uppercase tracking-wider rounded-md hover:border-ferrari-gold transition-colors"
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-ferrari-smoke/70 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[rgb(var(--surface-strong))] border border-ferrari-pit-border rounded-lg p-3 text-sm text-ferrari-smoke placeholder:text-ferrari-smoke/30 font-mono focus:outline-none focus:border-ferrari-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-ferrari-smoke/70 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    className="w-full bg-[rgb(var(--surface-strong))] border border-ferrari-pit-border rounded-lg p-3 text-sm text-ferrari-smoke placeholder:text-ferrari-smoke/30 font-mono focus:outline-none focus:border-ferrari-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs text-ferrari-smoke/70 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your transmission..."
                  className="w-full bg-[rgb(var(--surface-strong))] border border-ferrari-pit-border rounded-lg p-3 text-sm text-ferrari-smoke placeholder:text-ferrari-smoke/30 font-mono focus:outline-none focus:border-ferrari-gold transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-ferrari-red text-white font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold rounded-lg overflow-hidden transition-all hover:bg-ferrari-red-bright hover:shadow-red-glow"
                data-cursor="hover"
              >
                <span className="absolute inset-0 bg-racing-stripe opacity-0 group-hover:opacity-30 transition-opacity" />
                <span className="relative">TRANSMIT MESSAGE</span>
                <Send size={16} className="relative transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </motion.div>

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
