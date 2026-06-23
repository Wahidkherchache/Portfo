import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { riseIn } from '../utils/motion';

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function SectionHeading({
  index,
  title,
  subtitle,
  align = 'left',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <motion.div
      {...riseIn()}
      className={`relative ${centered ? 'text-center mx-auto' : ''} max-w-3xl`}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="block h-px w-8 bg-ferrari-red" />
        <span className="font-mono text-[0.65rem] tracking-[0.35em] text-ferrari-red uppercase">
          {index}
        </span>
        <span className="block h-px w-8 bg-ferrari-red" />
      </div>
      <h2 className="font-display text-4xl md:text-6xl text-ferrari-smoke tracking-tight leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-sm md:text-base text-ferrari-smoke/50 ${centered ? '' : ''}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
