import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import SectionHeading from './SectionHeading';
import { riseIn } from '../utils/motion';

interface SkillData {
  skill: string;
  value: number;
  category: string;
}

const SKILLS_DATA: SkillData[] = [
  // Frontend
  { skill: 'React', value: 80, category: 'Frontend' },
  { skill: 'JavaScript', value: 80, category: 'Frontend' },
  { skill: 'HTML/CSS', value: 90, category: 'Frontend' },
  { skill: 'Tailwind', value: 75, category: 'Frontend' },
  // Backend
  { skill: 'Java', value: 80, category: 'Backend' },
  { skill: 'Node.js', value: 78, category: 'Backend' },
  { skill: 'Oracle SQL', value: 82, category: 'Backend' },
  // Systems
  { skill: 'C', value: 75, category: 'Systems' },
  { skill: 'Linux', value: 70, category: 'Systems' },
  // Tools
  { skill: 'Git', value: 84, category: 'Tools' },
  { skill: 'Supabase', value: 75, category: 'Tools' },
];

const CATEGORIES = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 80 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind', level: 75 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'Node.js', level: 78 },
      { name: 'Oracle SQL', level: 82 },
    ],
  },
  {
    name: 'Systems',
    skills: [
      { name: 'C', level: 75 },
      { name: 'Linux', level: 70 },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', level: 84 },
      { name: 'Supabase', level: 75 },
    ],
  },
];

const CustomAngleTick = (props: any) => {
  const { x, y, payload, textAnchor } = props;
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill="currentColor"
      fontSize={12}
      fontFamily="monospace"
      className="font-mono text-xs text-ferrari-smoke font-semibold tracking-wider"
    >
      {payload.value}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-ferrari-pit border border-ferrari-gold/50 p-3 rounded-lg shadow-2xl font-mono text-xs text-ferrari-smoke">
        <div className="flex items-center gap-2 mb-1.5 border-b border-ferrari-pit-border pb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red animate-pulse" />
          <span className="text-ferrari-gold font-bold tracking-widest text-[0.65rem] uppercase">
            [{data.category}] TELEMETRY
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-ferrari-smoke/90">{data.skill}:</span>
          <span className="text-ferrari-gold font-bold tabular-nums">{data.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

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

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-7 bg-ferrari-pit border border-ferrari-pit-border rounded-xl p-6 md:p-8 relative shadow-2xl overflow-hidden group hover:border-ferrari-gold/40 transition-colors"
          >
            {/* Top decorative Ferrari telemetry bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ferrari-red via-ferrari-gold to-ferrari-red" />
            <div className="flex items-center justify-between mb-4 border-b border-ferrari-pit-border pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ferrari-red animate-pulse" />
                <span className="font-mono text-xs tracking-[0.25em] text-ferrari-gold uppercase">
                  RADAR_TELEMETRY
                </span>
              </div>
              <span className="font-mono text-[0.65rem] text-ferrari-smoke/50 tracking-widest">
                SCALE: 0-100%
              </span>
            </div>

            {/* Recharts RadarChart */}
            <div className="w-full h-[380px] md:h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILLS_DATA}>
                  <PolarGrid stroke="rgb(var(--ferrari-red-dark) / 0.4)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={CustomAngleTick}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    stroke="rgb(var(--ferrari-pit-border))"
                    tick={{ fill: 'rgb(var(--ferrari-gold))', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="rgb(var(--ferrari-gold))"
                    fill="rgb(var(--ferrari-gold) / 0.18)"
                    fillOpacity={1}
                    dot={{ r: 4, fill: 'rgb(var(--ferrari-gold))', stroke: 'rgb(var(--background))', strokeWidth: 2 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Telemetry Breakdown Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-ferrari-pit border border-ferrari-pit-border rounded-lg p-4 relative group hover:border-ferrari-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3 border-b border-ferrari-pit-border pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] text-ferrari-gold">0{idx + 1}</span>
                    <h3 className="font-display text-xl text-ferrari-smoke tracking-wide">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-ferrari-gold/60" />
                </div>
                <div className="space-y-2">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-ferrari-smoke/90">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 md:w-24 h-1.5 bg-[rgb(var(--surface-strong))] border border-ferrari-pit-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-ferrari-gold"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                        <span className="text-ferrari-gold text-[0.7rem] w-8 text-right font-bold">
                          {s.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer SYS summary list */}
        <motion.div
          {...riseIn(0.3)}
          className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] text-ferrari-smoke/50 tracking-wider"
        >
          <span className="text-ferrari-gold">SYS:</span>
          <span>React</span><span className="text-ferrari-red">·</span>
          <span>JavaScript</span><span className="text-ferrari-red">·</span>
          <span>HTML/CSS</span><span className="text-ferrari-red">·</span>
          <span>Tailwind</span><span className="text-ferrari-red">·</span>
          <span>Java</span><span className="text-ferrari-red">·</span>
          <span>Node.js</span><span className="text-ferrari-red">·</span>
          <span>Oracle SQL</span><span className="text-ferrari-red">·</span>
          <span>C</span><span className="text-ferrari-red">·</span>
          <span>Linux</span><span className="text-ferrari-red">·</span>
          <span>Git</span><span className="text-ferrari-red">·</span>
          <span>Supabase</span>
        </motion.div>
      </div>
    </section>
  );
}
