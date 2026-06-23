import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, GraduationCap, Code2, Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { swipeIn, riseIn } from '../utils/motion';

const TERMINAL_LINES = [
  { text: '$ ./wahid --info', cmd: true },
  { text: '> loading profile... done', muted: true },
  { text: '> name: Abdelouahid Kherchache' },
  { text: '> alias: Wahid' },
  { text: '> location: Algiers, Algeria', icon: 'pin' },
  { text: '> education: USTHB — L2 → L3 CS', icon: 'edu' },
  { text: '> focus: Full-Stack + Security', icon: 'code' },
  { text: '> interests: F1, Linux, CTFs', icon: 'heart' },
  { text: '> status: READY', cmd: true, accent: true },
];

function TerminalLine({ text, muted, cmd, accent, icon }: any) {
  const Icon = icon === 'pin' ? MapPin : icon === 'edu' ? GraduationCap : icon === 'code' ? Code2 : icon === 'heart' ? Heart : null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-ferrari-red select-none">{cmd ? '' : Icon ? ' ' : ' '}</span>
      {cmd && <span className="text-ferrari-gold">$</span>}
      {Icon && <Icon size={12} className="mt-0.5 text-ferrari-gold/70 flex-shrink-0" />}
      <span
        className={`font-mono text-[0.7rem] md:text-xs ${
          accent ? 'text-ferrari-red font-bold' : muted ? 'text-ferrari-smoke/40' : 'text-emerald-400/90'
        }`}
      >
        {text}
      </span>
    </div>
  );
}

export default function About() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 400);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section id="about" className="relative py-24 md:py-32 carbon-grid overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ferrari-carbon via-transparent to-ferrari-carbon pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="01"
          title="THE DRIVER"
          subtitle="Behind the wheel — a quick telemetry readout."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div {...swipeIn(true)} className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-ferrari-red/30 via-transparent to-ferrari-gold/20 blur-md" />
              <div className="relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg overflow-hidden hud-border">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-ferrari-carbon border-b border-ferrari-pit-border">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-ferrari-red" />
                    <span className="w-3 h-3 rounded-full bg-ferrari-gold" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-2 text-ferrari-smoke/40 font-mono text-xs">
                    <Terminal size={12} />
                    <span>wahid@scuderia:~</span>
                  </div>
                </div>
                <div className="p-4 md:p-6 min-h-[260px] md:min-h-[300px] font-mono text-sm relative scanlines">
                  <div className="space-y-1.5">
                    {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TerminalLine {...line} />
                      </motion.div>
                    ))}
                    {visibleLines >= TERMINAL_LINES.length && (
                      <div className="flex items-center gap-1 mt-2 text-ferrari-gold">
                        <span>$</span>
                        <span className="inline-block w-2 h-4 bg-ferrari-red animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...swipeIn(false)} className="order-1 lg:order-2 space-y-5">
            <p className="text-ferrari-smoke/85 text-base md:text-lg leading-relaxed">
              I'm <span className="text-ferrari-gold font-semibold">Abd eloahid</span> — a computer
              science student at <span className="text-ferrari-red font-semibold">USTHB</span>,
              Algiers, navigating from L2 to L3. I write code the way a race engineer
              tunes a car: methodically, relentlessly, with an eye for the millisecond.
            </p>
            <p className="text-ferrari-smoke/65 text-sm md:text-base leading-relaxed">
              My garage runs on <span className="text-ferrari-smoke">Java, C, JavaScript, React,
              Node.js, Oracle SQL,</span> and <span className="text-ferrari-smoke">Linux</span>. I'm
              equally comfortable wiring a backend, optimizing it, and trying to break
              into it — because secure code starts with thinking like the attacker.
            </p>
            <p className="text-ferrari-smoke/65 text-sm md:text-base leading-relaxed">
              Off-track, I'm deep into Formula 1, cybersecurity platforms like TryHackMe
              and HackTheBox, and the quiet art of making systems faster, one lap at a time.
            </p>

            <motion.div {...riseIn(0.2)} className="flex flex-wrap gap-2 pt-2">
              {['Full-Stack', 'Cybersecurity', 'F1 Fanatic', 'Linux Native'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[0.65rem] font-mono tracking-[0.2em] uppercase border border-ferrari-pit-border text-ferrari-smoke/70 rounded-full hover:border-ferrari-red hover:text-ferrari-red transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
