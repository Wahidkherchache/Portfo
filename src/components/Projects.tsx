import { motion } from 'framer-motion';
import { Github, Wrench, ArrowUpRight, Lock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { riseIn } from '../utils/motion';

interface Project {
  name: string;
  tech: string[];
  description: string;
  github?: string;
  liveDemo?: string;
  status: 'shipped' | 'garage';
  pos: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Medical Clinic App',
    tech: ['Java Swing', 'Oracle JDBC', 'SQL'],
    description:
      'A desktop clinic management system — patient records, appointments, and prescriptions wired through Oracle JDBC. Built for reliability, not just features.',
    github: 'https://github.com/Wahidkherchache/medical-clinic-app',
    status: 'shipped',
    pos: 'P1',
  },
  {
    name: 'Calculator App',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description:
      'A precision-built web calculator — keyboard support, chained operations, clean UI. Small car, careful engineering.',
    github: 'https://github.com/Wahidkherchache',
    liveDemo: 'https://wahidkherchache.github.io/calculator-app/',
    status: 'shipped',
    pos: 'P2',
  },
  {
    name: 'Dashboard F1',
    tech: ['React', 'Vite', 'JavaScript'],
    description:
      'A real-time dashboard for F1 data visualization — live race updates, driver statistics, and team performance metrics. Built with React and modern web technologies.',
    github: 'https://github.com/Wahidkherchache/f1-Dashboard',
    liveDemo: 'https://wahidkherchache.github.io/F1-Dashboard/#/',
    status: 'shipped',
    pos: 'P3',
  },
    {
    name: 'To Do list app',
    tech: ['Coming Soon'],
    description:
      'Currently on the jacks in the garage. A todo list application with LocalStorage, real-time data. Provisional build — expect green-flag racing soon.',
    status: 'garage',
    pos: 'P4',
  },
  {
    name: 'Full-Stack Project',
    tech: ['Coming Soon'],
    description:
      'Currently on the jacks in the garage. A full-stack application with auth, real-time data, and a clean API. Provisional build — expect green-flag racing soon.',
    status: 'garage',
    pos: 'P5',
  },
];

function PosBadge({ pos, status }: { pos: string; status: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md font-display text-base tracking-wide ${
        status === 'garage'
          ? 'bg-ferrari-pit text-ferrari-smoke/40 border border-ferrari-pit-border'
          : 'bg-ferrari-red text-white shadow-red-glow'
      }`}
    >
      {pos}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const garage = project.status === 'garage';
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className={`group relative bg-ferrari-pit border rounded-lg overflow-hidden transition-shadow duration-300 ${
        garage
          ? 'border-ferrari-pit-border opacity-75 hover:opacity-100'
          : 'border-ferrari-pit-border hover:border-ferrari-red/50 hover:shadow-card-hover'
      }`}
      data-cursor="hover"
    >
      <div className="relative h-1 w-full overflow-hidden bg-ferrari-pit-border">
        <div className="absolute inset-y-0 left-0 w-0 bg-racing-stripe group-hover:w-full transition-all duration-500 ease-out" />
      </div>

      <div className="p-5 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <PosBadge pos={project.pos} status={project.status} />
          <span
            className={`font-mono text-[0.65rem] tracking-[0.25em] uppercase ${
              garage ? 'text-ferrari-smoke/40' : 'text-ferrari-gold'
            }`}
          >
            {garage ? 'In The Garage' : 'On Track'}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl text-ferrari-smoke tracking-wide mb-2 flex items-center gap-2">
          {project.name}
          {garage && <Wrench size={16} className="text-ferrari-gold/70" />}
        </h3>

        <p className="text-ferrari-smoke/60 text-sm leading-relaxed mb-5 min-h-[5rem]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 font-mono text-[0.65rem] tracking-wider uppercase border border-ferrari-pit-border text-ferrari-smoke/70 rounded-sm bg-ferrari-carbon/50"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-ferrari-pit-border/60">
          <div className="flex flex-wrap items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-ferrari-smoke/80 hover:text-ferrari-red transition-colors"
              >
                <Github size={15} />
                <span>View Repo</span>
                <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-xs text-ferrari-smoke/40">
                <Lock size={13} />
                <span>Classified</span>
              </span>
            )}

            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-ferrari-smoke/80 hover:text-ferrari-gold transition-colors"
              >
                {/* <ArrowUpRight size={15} /> */}
                <span>Live Demo</span>
              </a>
            ) : null}
          </div>

          <span className="font-mono text-[0.65rem] text-ferrari-smoke/30 tracking-wider">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 carbon-grid overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="03"
          title="ON THE GRID"
          subtitle="Real builds — shipped, on-track, and in the garage."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <motion.div
          {...riseIn(0.3)}
          className="mt-10 flex items-center justify-between font-mono text-[0.7rem] text-ferrari-smoke/40 tracking-wider"
        >
          <span>// more repos in the paddock</span>
          <a
            href="https://github.com/Wahidkherchache"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ferrari-gold hover:text-ferrari-red transition-colors uppercase tracking-[0.2em]"
          >
            github.com/wahidkherchache →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
