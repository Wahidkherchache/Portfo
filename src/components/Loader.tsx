import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reduceMotion } from '../utils/motion';

interface LoaderProps {
  onComplete: () => void;
}

const F1Car = () => (
  <svg viewBox="0 0 220 70" className="w-44 md:w-64 h-auto" fill="none">
    <path
      d="M2 48 L18 48 Q26 42 38 42 L70 42 Q88 30 110 26 L150 24 Q180 24 196 30 L210 36 Q215 38 215 44 L215 50 H2 Z"
      fill="#DC0000"
    />
    <path d="M70 42 L92 26 L116 26 Q132 30 150 44 Z" fill="#7a0000" opacity="0.6" />
    <path d="M150 24 Q175 24 196 30 L190 36 L156 34 Z" fill="#A80000" />
    <ellipse cx="82" cy="54" rx="6" ry="7" fill="#0a0a0a" stroke="#C8A84B" strokeWidth="1.5" />
    <ellipse cx="174" cy="54" rx="6" ry="7" fill="#0a0a0a" stroke="#C8A84B" strokeWidth="1.5" />
    <rect x="195" y="22" width="22" height="9" rx="2" fill="#C8A84B" />
    <path d="M195 30 L214 36 L214 38 L196 34 Z" fill="#FF1E1E" />
  </svg>
);

export default function Loader({ onComplete }: LoaderProps) {
  const [showCar, setShowCar] = useState(true);
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [label, setLabel] = useState('awaiting start signal');
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (reduceMotion()) {
      setVisible(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
    };

    // 0ms      — car is visible (already in state)
    // 1900ms   — hide car, show lights panel
    t(() => setShowCar(false), 1900);

    // 2400–4400ms — light up 5 lights, one every 500ms
    [0, 1, 2, 3, 4].forEach((i) => {
      t(() => setLights((prev) => prev.map((v, idx) => (idx === i ? true : v))), 2400 + i * 500);
    });

    // 5200ms   — all lights go dark
    t(() => setLights([false, false, false, false, false]), 5200);

    // 5400ms   — update label
    t(() => setLabel('lights out — go go go'), 5400);

    // 6200ms   — start exit fade
    t(() => setVisible(false), 6200);

    return () => timers.forEach(clearTimeout);
  }, []); // run once on mount

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current()}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ferrari-carbon carbon-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="absolute inset-0 bg-red-glow opacity-30" />

          {showCar && (
            <motion.div
              initial={{ x: '-60vw', opacity: 0 }}
              animate={{ x: '60vw', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute z-10"
            >
              <F1Car />
            </motion.div>
          )}

          {!showCar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center gap-8"
            >
              <div className="flex gap-3 md:gap-5">
                {lights.map((on, i) => (
                  <motion.div
                    key={i}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full border border-ferrari-pit-border transition-all duration-300 ${
                      on ? 'start-light-on' : 'start-light-off'
                    }`}
                    animate={on ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <div className="font-mono text-xs md:text-sm text-ferrari-gold tracking-[0.3em] uppercase">
                {label}
              </div>
              <div className="font-display text-2xl md:text-3xl tracking-[0.4em] text-ferrari-smoke">
                ABDELOUAHID KHERCHACHE
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
