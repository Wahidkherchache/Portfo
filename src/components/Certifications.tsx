import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
// import { riseIn } from '../utils/motion';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  certId: string;
  verifyUrl: string;
  imageUrl: string;
  status: string;
  skills: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cisco-cybersecurity',
    title: 'INTRODUCTION TO CYBERSECURITY',
    issuer: 'CISCO NETWORKING ACADEMY',
    date: 'July 24, 2026',
    certId: '24a9f198-6ff7-41ce-b369-811a712fc3a1',
    verifyUrl: 'https://www.credly.com/badges/4f98438f-35fe-4efc-adc8-9d2efbde2834/public_url',
    imageUrl: '/Portfo/certificates/cisco-cybersecurity.png',
    status: 'VERIFIED',
    skills: [
      'CYBER HYGIENE',
      'THREAT DEFENSE',
      'NETWORK SECURITY',
      'DATA CONFIDENTIALITY',
    ],
  },
];

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group relative w-full bg-ferrari-pit border border-ferrari-pit-border rounded-lg overflow-hidden transition-all duration-300 hover:border-ferrari-red/60 hover:shadow-card-hover flex flex-col md:flex-row"
      data-cursor="hover"
    >
      {/* 1. CERTIFICATE PREVIEW (LEFT SIDE: ~45% ON DESKTOP) */}
      <div className="w-full md:w-[45%] relative overflow-hidden bg-ferrari-carbon border-b md:border-b-0 md:border-r border-ferrari-pit-border flex items-center justify-center min-h-[260px] md:min-h-[360px]">
        <img
          src={cert.imageUrl}
          alt="Cisco Cybersecurity Certificate"
          className="w-full h-full object-cover object-center block"
        />
      </div>

      {/* 2. DETAILS (RIGHT SIDE: ~55% ON DESKTOP) */}
      <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Header: Issuer (Gold) & VERIFIED Badge (Red) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="font-mono text-xs font-bold tracking-widest text-ferrari-gold uppercase">
              {cert.issuer}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[0.65rem] font-bold tracking-widest uppercase border border-ferrari-red/40 bg-ferrari-red/10 text-ferrari-red">
              <CheckCircle2 size={12} />
              {cert.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-ferrari-smoke tracking-wide uppercase mb-4">
            {cert.title}
          </h3>

          {/* Issued Date */}
          <div className="my-4 p-3.5 px-4 rounded-md bg-ferrari-carbon/60 border border-ferrari-pit-border font-mono text-xs flex items-center justify-between">
            <span className="text-ferrari-smoke/60 uppercase tracking-wider text-[0.65rem]">Issued:</span>
            <span className="font-semibold text-ferrari-smoke">{cert.date}</span>
          </div>

          {/* Tags as Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 font-mono text-[0.65rem] tracking-wider uppercase border border-ferrari-pit-border text-ferrari-smoke/80 rounded bg-ferrari-carbon/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* VERIFY Button */}
        <div className="pt-4 border-t border-ferrari-pit-border flex items-center justify-between mt-auto">
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded font-mono text-xs tracking-[0.2em] font-semibold uppercase text-white bg-ferrari-red hover:bg-ferrari-red-bright transition-all duration-300 shadow-red-glow group/btn"
          >
            <span>VERIFY</span>
            <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 carbon-bg overflow-hidden">
      {/* Background ambient red glow matching Ferrari theme */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(220,0,0,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          index="04"
          title="CERTIFICATIONS"
          subtitle="Official technical accreditations & security qualifications."
        />

        <div className="mt-14 w-full">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
          {/*  
        <motion.div
          {...riseIn(0.3)}
          className="mt-12 flex items-center justify-between font-mono text-[0.7rem] text-ferrari-smoke/40 tracking-wider border-t border-ferrari-pit-border/40 pt-6"
        >
          <span>// continuous skill verification</span>
          <span className="uppercase tracking-[0.2em] text-ferrari-gold">
            Cisco Networking Academy Verified
          </span>
        </motion.div>
        */}
      </div>
    </section>
  );
}
