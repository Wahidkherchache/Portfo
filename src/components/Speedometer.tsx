import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { reduceMotion } from '../utils/motion';

const REDLINE = 185;
const TOTAL = 240;

export default function Speedometer() {
  const [rpm, setRpm] = useState(0);
  const reduced = reduceMotion();

  useEffect(() => {
    if (reduced) {
      setRpm(REDLINE);
      return;
    }
    let v = 0;
    const interval = setInterval(() => {
      v += 7 + Math.random() * 14;
      if (v >= REDLINE) {
        v = REDLINE;
        clearInterval(interval);
      }
      setRpm(v);
    }, 40);
    return () => clearInterval(interval);
  }, [reduced]);

  const angle = -120 + (rpm / TOTAL) * 240;
  const redlined = rpm >= REDLINE - 1;

  const ticks = Array.from({ length: 13 }, (_, i) => i * 20);

  return (
    <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
      {redlined && (
        <div className="absolute inset-0 rounded-full bg-red-glow blur-2xl opacity-50 animate-pulse" />
      )}

      <svg viewBox="0 0 300 300" className="relative w-full h-full">
        <defs>
          <linearGradient id="rpmGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A84B" />
            <stop offset="50%" stopColor="#DC0000" />
            <stop offset="100%" stopColor="#FF1E1E" />
          </linearGradient>
          <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#151515" />
            <stop offset="70%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        <circle cx="150" cy="150" r="140" fill="url(#faceGrad)" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="150" cy="150" r="140" fill="none" stroke="#1A1A1A" strokeWidth="6" />

        <circle
          cx="150"
          cy="150"
          r="124"
          fill="none"
          stroke="url(#rpmGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(rpm / TOTAL) * (2 * Math.PI * 124)} ${2 * Math.PI * 124}`}
          transform="rotate(120 150 150)"
          style={{ transition: 'stroke-dasharray 0.05s linear' }}
        />

        {ticks.map((t, i) => {
          const tickAngle = -120 + (t / TOTAL) * 240;
          const rad = (tickAngle * Math.PI) / 180;
          const isRed = t >= REDLINE;
          const r1 = 118;
          const r2 = i % 2 === 0 ? 100 : 108;
          return (
            <line
              key={i}
              x1={150 + r1 * Math.cos(rad)}
              y1={150 + r1 * Math.sin(rad)}
              x2={150 + r2 * Math.cos(rad)}
              y2={150 + r2 * Math.sin(rad)}
              stroke={isRed ? '#FF3030' : i % 2 === 0 ? '#F0F0F0' : '#666'}
              strokeWidth={i % 2 === 0 ? 2 : 1}
            />
          );
        })}

        {ticks.filter((_, i) => i % 2 === 0).map((t) => {
          const tickAngle = -120 + (t / TOTAL) * 240;
          const rad = (tickAngle * Math.PI) / 180;
          const r = 86;
          const x = 150 + r * Math.cos(rad);
          const y = 150 + r * Math.sin(rad);
          const display = Math.round((t / TOTAL) * 12);
          return (
            <text
              key={t}
              x={x}
              y={y}
              fill={t >= REDLINE ? '#FF3030' : '#888'}
              fontSize="9"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {display}
            </text>
          );
        })}

        <text x="150" y="110" fill="#C8A84B" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
          RPM x1000
        </text>

        <g style={{ transformOrigin: '150px 150px', transform: `rotate(${angle}deg)`, transition: 'transform 0.05s linear' }}>
          <line x1="150" y1="150" x2="150" y2="48" stroke="#DC0000" strokeWidth="3" strokeLinecap="round" />
          <circle cx="150" cy="48" r="3" fill="#FF1E1E" />
        </g>

        <circle cx="150" cy="150" r="10" fill="#1A1A1A" stroke="#C8A84B" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="3" fill="#DC0000" />

        <text x="150" y="200" fill={redlined ? '#FF1E1E' : '#888'} fontSize="14" fontFamily="monospace" textAnchor="middle">
          {Math.round(rpm)}
        </text>

        {redlined && (
          <motion.text
            x="150"
            y="218"
            fill="#FF1E1E"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            • REDLINE •
          </motion.text>
        )}
      </svg>

      <div className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] text-ferrari-smoke/40 uppercase">
        Telemetry
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] text-ferrari-smoke/40 uppercase">
        {redlined ? 'Full Throttle' : 'Spooling'}
      </div>
    </div>
  );
}
