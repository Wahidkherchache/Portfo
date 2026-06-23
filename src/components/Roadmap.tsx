import { motion } from 'framer-motion';
import { Check, Lock, Flag, Zap, Cpu, Shield } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { riseIn } from '../utils/motion';

interface Milestone {
  round: string;
  title: string;
  detail: string;
  status: 'done' | 'active' | 'upcoming';
  icon: typeof Zap;
  sub?: string;
}

const TIMELINE: Milestone[] = [
  {
    round: 'R01',
    title: 'Foundations',
    detail: 'C, Java, algorithms — the engine block. Built discipline and low-level thinking.',
    status: 'done',
    icon: Cpu,
    sub: 'L1 → L2',
  },
  {
    round: 'R02',
    title: 'React Mastery',
    detail: 'Hooks, state, component architecture. Took frontend to race pace.',
    status: 'done',
    icon: Zap,
    sub: 'Committed',
  },
  {
    round: 'R03',
    title: 'Full-Stack Integration',
    detail: 'Node.js, APIs, databases — wiring the chassis to the powertrain.',
    status: 'active',
    icon: Flag,
    sub: 'On Track',
  },
  {
    round: 'R04',
    title: 'Cybersecurity',
    detail: 'TryHackMe / HackTheBox — learning to defend by learning to break.',
    status: 'upcoming',
    icon: Shield,
    sub: 'Next Race',
  },
  {
    round: 'R05',
    title: 'Ship & Compete',
    detail: 'Production-grade projects, open-source contributions, CTF placements.',
    status: 'upcoming',
    icon: Flag,
    sub: 'Provisional',
  },
];

function Node({ m, index }: { m: Milestone; index: number }) {
  const Icon = m.icon;
  const done = m.status === 'done';
  const active = m.status === 'active';
  const upcoming = m.status === 'upcoming';

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative pl-16 pb-10 ${index === TIMELINE.length - 1 ? 'pb-0' : ''}`}
    >
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div
          className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
            done
              ? 'border-ferrari-red bg-ferrari-red text-white shadow-red-glow'
              : active
              ? 'border-ferrari-gold bg-ferrari-pit text-ferrari-gold shadow-gold-glow'
              : 'border-ferrari-pit-border bg-ferrari-carbon text-ferrari-smoke/40'
          }`}
        >
          {upcoming ? <Lock size={16} /> : done ? <Check size={18} /> : <Icon size={18} />}
          {active && (
            <span className="absolute inset-0 rounded-full border-2 border-ferrari-gold animate-ping opacity-40" />
          )}
        </div>
        {index < TIMELINE.length - 1 && (
          <div className="w-0.5 h-full min-h-[3rem] mt-2 track-line" />
        )}
      </div>

      <div
        className={`bg-ferrari-pit border rounded-lg p-4 md:p-5 transition-colors ${
          upcoming
            ? 'border-ferrari-pit-border opacity-60'
            : active
            ? 'border-ferrari-gold/40'
            : 'border-ferrari-pit-border hover:border-ferrari-red/40'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[0.65rem] tracking-[0.25em] text-ferrari-red uppercase">
            {m.round}
          </span>
          <span
            className={`font-mono text-[0.65rem] tracking-wider uppercase ${
              done ? 'text-emerald-400/80' : active ? 'text-ferrari-gold' : 'text-ferrari-smoke/40'
            }`}
          >
            {m.sub}
          </span>
        </div>
        <h3 className="font-display text-xl md:text-2xl tracking-wide text-ferrari-smoke mb-1">
          {m.title}
        </h3>
        <p className="text-ferrari-smoke/60 text-xs md:text-sm leading-relaxed">{m.detail}</p>
      </div>
    </motion.div>
  );
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32 carbon-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(220,0,0,0.1) 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="04"
          title="THE RACE CALENDAR"
          subtitle="The season — lap by lap, circuit by circuit."
        />

        <motion.div
          {...riseIn(0.2)}
          className="mt-14"
        >
          {TIMELINE.map((m, i) => (
            <Node key={m.round} m={m} index={i} />
          ))}
        </motion.div>

        <motion.div
          {...riseIn(0.4)}
          className="mt-10 flex items-center gap-3 font-mono text-[0.7rem] text-ferrari-smoke/40 tracking-wider"
        >
          <Flag size={12} className="text-ferrari-gold" />
          <span className="uppercase tracking-[0.25em]">
            Checkered flag — the goal is the journey
          </span>
        </motion.div>
      </div>
    </section>
  );
}
