export const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const raceEase = [0.07, 0.77, 0.2, 0.95] as const;

export const swipeIn = (fromLeft = false) => ({
  initial: { opacity: 0, x: fromLeft ? -60 : 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: raceEase },
});

export const riseIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: raceEase, delay },
});
