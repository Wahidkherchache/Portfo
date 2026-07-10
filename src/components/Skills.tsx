import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { riseIn } from '../utils/motion';

interface Skill {
  name: string;
  level: number;
}

interface Group {
  name: string;
  icon: string;
  skills: Skill[];
}

const GROUPS: Group[] = [
  {
    name: 'Frontend',
    icon: '01',
    skills: [
      { name: 'React', level: 80 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML / CSS', level: 90 },
    ],
  },
  {
    name: 'Backend',
    icon: '02',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'Node.js', level: 78 },
      { name: 'Oracle SQL', level: 82 },
    ],
  },
  {
    name: 'Systems',
    icon: '03',
    skills: [
      { name: 'C', level: 75 },
      { name: 'Linux', level: 75 },
      { name: 'Bash', level: 75 },
    ],
  },
  {
    name: 'Tools & Focus',
    icon: '04',
    skills: [
      { name: 'Git', level: 84 },
      { name: 'Security / CTF', level: 20 },
      { name: 'Problem Solving', level: 92 },
    ],
  },
];

function TelemetryBar({ name, level, delay }: Skill & { delay: number }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs md:text-sm text-ferrari-smoke/90 tracking-wide">{name}</span>
        <span className="font-mono text-[0.7rem] md:text-xs text-ferrari-gold tabular-nums">
          {level.toString().padStart(3, '0')}%
        </span>
      </div>
      <div className="relative h-2 bg-ferrari-pit border border-ferrari-pit-border overflow-hidden">
        <div className="absolute inset-0 track-line opacity-30" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-ferrari-red-dark via-ferrari-red to-ferrari-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
        </motion.div>
        <div className="absolute inset-y-0 right-0 w-px bg-ferrari-pit-border" />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 carbon-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(200,168,75,0.08) 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="02"
          title="TECHNICAL ARSENAL"
          subtitle="Every tool in the garage — calibrated and track-ready."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: gi * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-5 md:p-7 hover:border-ferrari-red/40 transition-colors group"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-red-gradient group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.65rem] tracking-[0.3em] text-ferrari-red">
                    {group.icon}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wide text-ferrari-smoke">
                    {group.name}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-ferrari-gold/40" />
                </div>
              </div>

              <div className="space-y-4">
                {group.skills.map((s, si) => (
                  <TelemetryBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    delay={gi * 0.12 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...riseIn(0.3)}
          className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] text-ferrari-smoke/40 tracking-wider"
        >
          <span className="text-ferrari-gold">SYS:</span>
          <span>Java</span><span className="text-ferrari-red">·</span>
          <span>React</span><span className="text-ferrari-red">·</span>
          <span>JavaScript</span><span className="text-ferrari-red">·</span>
          <span>Node.js</span><span className="text-ferrari-red">·</span>
          <span>Oracle SQL</span><span className="text-ferrari-red">·</span>
          <span>C</span><span className="text-ferrari-red">·</span>
          <span>Linux</span>
        </motion.div>
      </div>
    </section>
  );
}
