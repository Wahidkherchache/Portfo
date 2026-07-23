import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, ShieldCheck, Gauge, Flag } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { riseIn } from '../utils/motion';

interface SkillCarConfig {
  id: string;
  name: string;
  lapTime: number; // Target lap duration in seconds
  color: string;
  category: string;
  iconClass: string;
}

// 11 Skills mapped to 11 Real 2024 F1 Team Colors & Devicons
const SKILL_CARS: SkillCarConfig[] = [
  { id: 'react', name: 'React', lapTime: 35.0, color: '#E8002D', category: 'Frontend', iconClass: 'devicon-react-original colored' },        // Ferrari (red)
  { id: 'js', name: 'JavaScript', lapTime: 35.5, color: '#FF8000', category: 'Frontend', iconClass: 'devicon-javascript-plain colored' },     // McLaren (papaya orange)
  { id: 'html-css', name: 'HTML/CSS', lapTime: 36.0, color: '#3671C6', category: 'Frontend', iconClass: 'devicon-html5-plain colored' },   // Red Bull (dark blue)
  { id: 'java', name: 'Java', lapTime: 36.5, color: '#27F4D2', category: 'Backend', iconClass: 'devicon-java-plain colored' },           // Mercedes (teal)
  { id: 'node', name: 'Node.js', lapTime: 37.0, color: '#358C75', category: 'Backend', iconClass: 'devicon-nodejs-plain colored' },        // Aston Martin (british green)
  { id: 'ts', name: 'TypeScript', lapTime: 41.0, color: '#FF87BC', category: 'Frontend', iconClass: 'devicon-typescript-plain colored' },      // Alpine (pink)
  { id: 'git', name: 'Git', lapTime: 38.0, color: '#64C4FF', category: 'Tools', iconClass: 'devicon-git-plain colored' },              // Williams (light blue)
  { id: 'tailwind', name: 'Tailwind', lapTime: 38.5, color: '#B6BABD', category: 'Frontend', iconClass: 'devicon-tailwindcss-plain colored' },  // Haas (gray/white)
  { id: 'oracle-sql', name: 'Oracle SQL', lapTime: 39.0, color: '#52E252', category: 'Backend', iconClass: 'devicon-oracle-original colored' },// Kick Sauber (green)
  { id: 'c', name: 'C', lapTime: 39.5, color: '#6692FF', category: 'Systems', iconClass: 'devicon-c-plain colored' },                 // RB (blue-purple)
  { id: 'linux', name: 'Linux', lapTime: 40.0, color: '#C92D4B', category: 'Systems', iconClass: 'devicon-linux-plain colored' },         // Stake (dark red)
];

/**
 * Official Monza Circuit SVG Path matching Gemini_Generated_Image_kg2rqgkg2rqgkg2r.png (ViewBox 0 0 1000 600)
 */
const MONZA_TRACK_PATH = `M 488.5 523.8 C 494 524.2, 502.9 521.1, 510.6 520.9 C 518.3 520.7, 526.7 521.9, 534.8 522.5 C 542.9 523.1, 551 523.8, 559.3 524.6 C 567.5 525.3, 576.2 526.2, 584.3 527 C 592.4 527.8, 599.9 528.5, 607.9 529.2 C 615.9 530, 624 530.7, 632.1 531.5 C 640.2 532.3, 648.4 533.1, 656.4 533.9 C 664.4 534.7, 671.9 535.4, 679.9 536.2 C 687.9 537, 696.3 537.8, 704.3 538.6 C 712.3 539.4, 720.1 540.1, 728.1 540.8 C 736.1 541.5, 744.3 542.4, 752.4 543 C 760.5 543.6, 768.8 544.3, 776.8 544.6 C 784.8 544.9, 792.7 545.1, 800.4 545 C 808.1 544.9, 815.4 544.2, 822.9 544 C 830.4 543.8, 837.9 543.9, 845.5 543.6 C 853.1 543.3, 860.3 543.6, 868.5 542.4 C 876.7 541.2, 886.1 539.8, 894.8 536.5 C 903.4 533.2, 914.1 527, 920.4 522.4 C 926.7 517.8, 929.2 514, 932.4 508.9 C 935.6 503.7, 939.6 498.6, 939.7 491.5 C 939.8 484.4, 936.3 472.1, 933.2 466.5 C 930.1 460.9, 926.4 460.2, 921.1 457.7 C 915.8 455.3, 908.6 453.2, 901.2 451.8 C 893.8 450.4, 885 450.1, 876.9 449.3 C 868.8 448.5, 860.8 447.7, 852.8 446.9 C 844.8 446.1, 836.8 445.5, 828.8 444.7 C 820.7 444, 812.6 443.2, 804.5 442.4 C 796.4 441.6, 788.3 440.9, 780.2 440.1 C 772.2 439.3, 764.2 438.6, 756.2 437.8 C 748.2 437, 740.2 436.1, 732.2 435.3 C 724.2 434.5, 716.2 433.7, 708.3 432.9 C 700.4 432.1, 692.6 431.5, 684.6 430.7 C 676.5 429.9, 668.1 429.1, 660 428.3 C 651.9 427.5, 643.9 426.9, 635.9 426.1 C 627.9 425.3, 619.8 424.4, 611.8 423.6 C 603.8 422.8, 595.9 422, 587.9 421.1 C 579.9 420.2, 572 419.4, 563.8 418.4 C 555.6 417.4, 547.5 417.5, 538.9 414.9 C 530.3 412.3, 519.1 406.3, 512 402.7 C 504.9 399.2, 501.8 396.1, 496.2 393.6 C 490.6 391.1, 485.8 390, 478.3 387.9 C 470.8 385.8, 458.8 384.7, 451 381.2 C 443.2 377.7, 437.5 372, 431.7 366.7 C 425.9 361.5, 421.5 355.4, 416.2 349.7 C 411 344, 405.5 338.2, 400.2 332.4 C 394.9 326.6, 389.6 320.9, 384.3 315.1 C 379 309.3, 373.6 303.5, 368.3 297.7 C 363 291.9, 357.9 286.1, 352.7 280.4 C 347.5 274.7, 342.2 269.2, 336.9 263.5 C 331.6 257.8, 326.1 251.7, 320.7 245.9 C 315.4 240.1, 310 234.3, 304.8 228.5 C 299.6 222.7, 294.6 217.1, 289.7 211.3 C 284.8 205.6, 279.7 199.7, 275.3 194 C 270.9 188.3, 267.1 182.9, 263.2 177 C 259.3 171.1, 255.6 164.8, 251.7 158.3 C 247.8 151.8, 243.6 144.8, 239.7 138 C 235.7 131.2, 231.9 124.5, 228 117.8 C 224.1 111.1, 220.4 104.5, 216.4 97.7 C 212.4 90.9, 208.4 82.9, 203.8 76.8 C 199.2 70.7, 193.7 64.5, 189 61 C 184.3 57.5, 181.6 56.9, 175.7 56.1 C 169.8 55.2, 161.1 55.6, 153.4 55.9 C 145.7 56.2, 137.6 57.3, 129.6 58.1 C 121.6 58.8, 113.9 58.9, 105.3 60.4 C 96.7 61.9, 84.9 63.8, 78 67 C 71.1 70.2, 67 74.2, 64 79.3 C 61 84.4, 59.7 90.7, 60 97.6 C 60.3 104.5, 63.5 113.3, 65.7 120.7 C 67.9 128.1, 70.6 134.9, 73.2 142.2 C 75.8 149.5, 78.7 157.4, 81.1 164.7 C 83.5 172, 84.4 178, 87.6 185.9 C 90.8 193.8, 97 204.9, 100.4 212 C 103.8 219.1, 106.1 223.4, 108.2 228.6 C 110.3 233.9, 111.9 237.2, 113 243.5 C 114.1 249.8, 114.1 258.7, 114.6 266.2 C 115.1 273.7, 115.6 281, 116.1 288.7 C 116.6 296.4, 117.2 304.6, 117.8 312.4 C 118.4 320.2, 119.1 328, 119.8 335.6 C 120.5 343.2, 121.3 350.5, 122.2 358.2 C 123.1 365.9, 123.9 374, 125.2 381.8 C 126.5 389.6, 127.8 397.1, 130.2 404.8 C 132.6 412.5, 135.8 420.5, 139.7 428.1 C 143.6 435.7, 148.7 443.5, 153.7 450.3 C 158.7 457, 164.2 463.4, 169.7 468.6 C 175.2 473.8, 181 477.7, 186.8 481.4 C 192.7 485.1, 198.4 488.2, 204.8 490.8 C 211.2 493.4, 218.1 495.6, 225.1 497.2 C 232.1 498.8, 239.4 499.7, 247 500.6 C 254.6 501.5, 262.8 502, 270.9 502.4 C 278.9 502.8, 287.2 503.4, 295.3 503.2 C 303.4 503, 311.4 502.2, 319.6 501.3 C 327.8 500.4, 336 497.4, 344.6 497.6 C 353.2 497.8, 364.4 501, 371 502.7 C 377.6 504.4, 378.3 506, 384 507.6 C 389.7 509.2, 397.4 511, 405 512.1 C 412.6 513.2, 421.5 513.5, 429.5 514.2 C 437.5 514.9, 445.2 515.5, 453.2 516.2 C 461.3 516.9, 471.9 517, 477.8 518.3 C 483.7 519.6, 483 523.4, 488.5 523.8 Z`;

// Corner Label Locations for Monza Circuit
const CORNER_LABELS = [
  { name: 'Start/Finish', x: 650, y: 535, labelX: 650, labelY: 572, textAnchor: 'middle' },
  { name: 'Variante del Rettifilo', x: 935, y: 490, labelX: 955, labelY: 525, textAnchor: 'start' },
  { name: 'Curva Grande', x: 880, y: 450, labelX: 920, labelY: 420, textAnchor: 'start' },
  { name: 'Variante della Roggia', x: 512, y: 402, labelX: 512, labelY: 368, textAnchor: 'middle' },
  { name: 'Lesmo 1 & 2', x: 320, y: 246, labelX: 360, labelY: 220, textAnchor: 'start' },
  { name: 'Variante Ascari', x: 130, y: 58, labelX: 130, labelY: 28, textAnchor: 'middle' },
  { name: 'Parabolica', x: 150, y: 440, labelX: 90, labelY: 440, textAnchor: 'end' },
];

interface DynamicCarState extends SkillCarConfig {
  x: number;
  y: number;
  angle: number;
  totalLaps: number;
  currentLap: number;
  initialOffset: number;
}

// Top-Down F1 Car SVG Component
const TopDownF1Car: React.FC<{
  color: string;
  name: string;
  isHovered: boolean;
  rank: number;
  angle: number;
}> = ({ color, name, isHovered, rank, angle }) => {
  return (
    <g className="transition-transform duration-75 pointer-events-none">
      {/* Downforce / Ground Effect Glow */}
      <ellipse cx="0" cy="0" rx="15" ry="7" fill={color} opacity={isHovered ? 0.6 : 0.3} filter="blur(3px)" />

      {/* 4 Black Wheel Circles */}
      <circle cx="8" cy="-7.5" r="2.5" fill="#111111" stroke="#333333" strokeWidth="0.5" />
      <circle cx="8" cy="7.5" r="2.5" fill="#111111" stroke="#333333" strokeWidth="0.5" />
      <circle cx="-9" cy="-8" r="2.8" fill="#111111" stroke="#333333" strokeWidth="0.5" />
      <circle cx="-9" cy="8" r="2.8" fill="#111111" stroke="#333333" strokeWidth="0.5" />

      {/* Wide Front Wing */}
      <rect x="11" y="-9" width="3" height="18" rx="0.5" fill={color} stroke="#111111" strokeWidth="0.5" />

      {/* Narrow Long Body */}
      <path
        d="M -12 -3.5 L -5 -4 L 3 -3 L 13 0 L 3 3 L -5 4 L -12 3.5 Z"
        fill={color}
        stroke="#111111"
        strokeWidth="0.6"
      />

      {/* Cockpit */}
      <ellipse cx="1" cy="0" rx="3.5" ry="1.8" fill="#080808" />
      <circle cx="0.5" cy="0" r="1.2" fill="#ffffff" />

      {/* Wide Rear Wing */}
      <rect x="-14" y="-8.5" width="3.5" height="17" rx="0.5" fill="#141414" stroke={color} strokeWidth="0.8" />
      <line x1="-15" y1="-8.5" x2="-10" y2="-8.5" stroke={color} strokeWidth="1" />
      <line x1="-15" y1="8.5" x2="-10" y2="8.5" stroke={color} strokeWidth="1" />
      {/* Rear Rain Safety Light */}
      <circle cx="-14.5" cy="0" r="0.9" fill="#ff0000" />

      {/* Position Rank Badge */}
      <text x="-6" y="2" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        {rank}
      </text>

      {/* Car Label (Always Dark BG + White Text) */}
      <g transform={`translate(0, -18) rotate(${-angle})`}>
        <rect
          x={-(name.length * 3.8 + 8)}
          y="-9"
          width={name.length * 7.6 + 16}
          height="14"
          rx="3"
          fill="#111111"
          fillOpacity="0.95"
          stroke={color}
          strokeWidth="1.2"
        />
        <text
          x="0"
          y="1"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontWeight="bold"
          fontFamily="monospace"
          letterSpacing="0.5"
        >
          {name}
        </text>
      </g>
    </g>
  );
};

export default function Skills() {
  const pathRef = useRef<SVGPathElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Dynamic Theme state listener (Light vs Dark mode)
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('light');
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const updateTheme = () => {
      setIsLightMode(document.documentElement.classList.contains('light'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Time tracking ref for continuous RAF
  const startTimeRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Current dynamic car state positions
  const [cars, setCars] = useState<DynamicCarState[]>(() =>
    SKILL_CARS.map((car, idx) => ({
      ...car,
      x: 0,
      y: 0,
      angle: 0,
      totalLaps: idx / SKILL_CARS.length,
      currentLap: 1,
      initialOffset: idx / SKILL_CARS.length,
    }))
  );

  // Continuous animation loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        lastTimeRef.current = timestamp;
      }

      if (isPlaying && pathRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        const delta = (timestamp - lastTimeRef.current) / 1000;
        lastTimeRef.current = timestamp;
        pausedElapsedRef.current += delta * speedMultiplier;

        const elapsedTime = pausedElapsedRef.current;

        setCars((prevCars) =>
          prevCars.map((car, idx) => {
            const totalLaps = car.initialOffset + elapsedTime / car.lapTime;
            const currentLap = Math.floor(totalLaps) + 1;
            const lapProgress = (totalLaps % 1 + 1) % 1; // 0 to 1

            const distance = lapProgress * totalLength;
            const pt1 = pathRef.current!.getPointAtLength(distance);
            const pt2 = pathRef.current!.getPointAtLength((distance + 2) % totalLength);

            const dx = pt2.x - pt1.x;
            const dy = pt2.y - pt1.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            // Lateral lane offset for natural racing lines & overtaking
            const laneShift = ((idx % 3) - 1) * 7.5;
            const x = pt1.x + nx * laneShift;
            const y = pt1.y + ny * laneShift;

            return {
              ...car,
              x,
              y,
              angle,
              totalLaps,
              currentLap,
            };
          })
        );
      } else {
        lastTimeRef.current = timestamp;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, speedMultiplier]);

  // Reset grid handler
  const handleResetGrid = () => {
    pausedElapsedRef.current = 0;
    startTimeRef.current = null;
    setCars(
      SKILL_CARS.map((car, idx) => ({
        ...car,
        x: 0,
        y: 0,
        angle: 0,
        totalLaps: idx / SKILL_CARS.length,
        currentLap: 1,
        initialOffset: idx / SKILL_CARS.length,
      }))
    );
  };

  // Live Timing sorted leaderboard (P1 to P11)
  const leaderboard = useMemo(() => {
    const sorted = [...cars].sort((a, b) => b.totalLaps - a.totalLaps);
    const leaderLaps = sorted[0]?.totalLaps || 0;

    return sorted.map((car, rankIdx) => {
      const gapLaps = leaderLaps - car.totalLaps;
      const gapSeconds = gapLaps * car.lapTime;
      const gapText =
        rankIdx === 0
          ? 'LEADER'
          : `+${gapSeconds.toFixed(2)}s`;

      return {
        ...car,
        rank: rankIdx + 1,
        gapText,
      };
    });
  }, [cars]);

  return (
    <section
      id="skills"
      className={`relative py-20 md:py-28 overflow-hidden font-sans transition-colors duration-300 ${
        isLightMode ? 'bg-[#f5f5f5] text-[#111111]' : 'bg-[#0A0A0A] text-white'
      }`}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: isLightMode
            ? `
              radial-gradient(circle at 10% 20%, rgba(220,0,0,0.06), transparent 30%),
              radial-gradient(circle at 90% 80%, rgba(200,168,75,0.05), transparent 35%),
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `
            : `
              radial-gradient(circle at 10% 20%, rgba(220,0,0,0.15), transparent 30%),
              radial-gradient(circle at 90% 80%, rgba(200,168,75,0.1), transparent 35%),
              linear-gradient(rgba(128,128,128,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128,128,128,0.15) 1px, transparent 1px)
            `,
          backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <SectionHeading
          index="02"
          title="Skills"
          subtitle="ITALIAN GRAND PRIX — SKILL TELEMETRY"
        />

        {/* Top Bar (LIVE SESSION / CONDITIONS) */}
        <motion.div
          {...riseIn(0.1)}
          className={`mt-8 mb-6 rounded-xl p-3 md:p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xl border transition-colors ${
            isLightMode
              ? 'bg-[#ffffff] border-[#e0e0e0] text-[#111111]'
              : 'bg-[#121212] border-[#222222] text-gray-300'
          }`}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-500 font-bold tracking-widest uppercase text-[0.75rem]">
                LIVE SESSION
              </span>
            </div>
            <span className={isLightMode ? 'text-[#cccccc]' : 'text-gray-600'}>|</span>
            <div className="flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-yellow-500" />
              <span>
                CIRCUIT: <strong className={isLightMode ? 'text-[#111111]' : 'text-white'}>AUTODROMO NAZIONALE MONZA (5.793 km)</strong>
              </span>
            </div>
            <span className={`hidden sm:inline ${isLightMode ? 'text-[#cccccc]' : 'text-gray-600'}`}>|</span>
            <div className="flex items-center gap-1.5">
              <Gauge className={`w-3.5 h-3.5 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <span>
                CONDITIONS: <strong className={isLightMode ? 'text-emerald-700 font-bold' : 'text-emerald-400'}>DRY / AIR 26°C</strong>
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-colors border font-medium ${
                isLightMode
                  ? 'bg-[#ffffff] hover:bg-[#e8e8e8] border-[#cccccc] text-[#111111]'
                  : 'bg-[#1f1f1f] hover:bg-[#2a2a2a] border-[#333333] text-gray-200'
              }`}
            >
              {isPlaying ? (
                <Pause className={`w-3.5 h-3.5 ${isLightMode ? 'text-amber-600' : 'text-yellow-400'}`} />
              ) : (
                <Play className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
              )}
              <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
            </button>

            <button
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-mono text-xs transition-colors border font-medium ${
                isLightMode
                  ? 'bg-[#ffffff] hover:bg-[#e8e8e8] border-[#cccccc] text-[#111111]'
                  : 'bg-[#1f1f1f] hover:bg-[#2a2a2a] border-[#333333] text-cyan-400'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{speedMultiplier}x</span>
            </button>

            <button
              onClick={handleResetGrid}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-mono text-xs transition-colors border font-medium ${
                isLightMode
                  ? 'bg-[#ffffff] hover:bg-[#e8e8e8] border-[#cccccc] text-[#111111]'
                  : 'bg-[#1f1f1f] hover:bg-[#2a2a2a] border-[#333333] text-gray-400 hover:text-white'
              }`}
              title="Reset Grid Positions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          </div>
        </motion.div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TRACK AREA SVG CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className={`lg:col-span-7 rounded-xl p-4 md:p-6 relative shadow-2xl overflow-hidden border transition-colors ${
              isLightMode ? 'bg-[#f5f5f5] border-[#e0e0e0]' : 'bg-[#111111] border-[#222222]'
            }`}
          >
            {/* Top decorative Ferrari red racing line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600" />

            <div className={`flex items-center justify-between mb-4 pb-2 border-b font-mono text-xs ${
              isLightMode ? 'border-[#e0e0e0] text-[#111111]' : 'border-[#222222] text-gray-400'
            }`}>
              <span className="font-semibold tracking-wider">MONZA</span>
              <span className={isLightMode ? 'text-[#666666] text-[0.7rem]' : 'text-gray-500 text-[0.7rem]'}>ITALY // AUTODROMO NAZIONALE MONZA</span>
            </div>

            {/* SVG Track Viewport: viewBox 0 0 1000 600 */}
            <div className={`w-full relative aspect-[1000/600] rounded-lg border p-2 overflow-hidden shadow-inner transition-colors ${
              isLightMode ? 'bg-[#f5f5f5] border-[#e0e0e0]' : 'bg-[#0A0A0A] border-[#1a1a1a]'
            }`}>
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full select-none"
                style={{ filter: isLightMode ? 'none' : 'drop-shadow(0 0 8px rgba(0,0,0,0.15))' }}
              >
                <defs>
                  {/* Red/White Kerb Pattern for Corner Apexes */}
                  <pattern id="kerbPattern" width="16" height="8" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#DC0000" />
                    <rect x="8" width="8" height="8" fill="#FFFFFF" />
                  </pattern>

                  {/* Chequered Start/Finish Line Pattern */}
                  <pattern id="chequeredLine" width="12" height="12" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#FFFFFF" />
                    <rect x="6" width="6" height="6" fill="#000000" />
                    <rect y="6" width="6" height="6" fill="#000000" />
                    <rect x="6" y="6" width="6" height="6" fill="#FFFFFF" />
                  </pattern>
                </defs>

                {/* 1. Track Ground Runoff Base */}
                <path
                  d={MONZA_TRACK_PATH}
                  fill="none"
                  stroke={isLightMode ? '#f5f5f5' : '#0A0A0A'}
                  strokeWidth="52"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 2. Red/White Apex Kerbs Outer Border */}
                <path
                  d={MONZA_TRACK_PATH}
                  fill="none"
                  stroke="url(#kerbPattern)"
                  strokeWidth="36"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 3. Track Borders (#222222 in light mode) */}
                <path
                  d={MONZA_TRACK_PATH}
                  fill="none"
                  stroke={isLightMode ? '#222222' : '#333333'}
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 4. Track Surface (#d0d0d0 in light mode) */}
                <path
                  ref={pathRef}
                  d={MONZA_TRACK_PATH}
                  fill="none"
                  stroke={isLightMode ? '#d0d0d0' : '#1a1a1a'}
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 5. Dashed Center Line */}
                <path
                  d={MONZA_TRACK_PATH}
                  fill="none"
                  stroke={isLightMode ? '#666666' : 'rgba(255,255,255,0.25)'}
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                />

                {/* 6. Start / Finish Line Grid */}
                <g transform="translate(650, 535) rotate(1)">
                  <rect x="-18" y="-4" width="36" height="8" fill="url(#chequeredLine)" stroke="#222222" strokeWidth="0.5" />
                </g>

                {/* 7. Sector Reference Points with Leader Lines & Corner Labels */}
                {CORNER_LABELS.map((lbl) => (
                  <g key={lbl.name} className="pointer-events-none">
                    {/* Leader Line */}
                    <line
                      x1={lbl.x}
                      y1={lbl.y}
                      x2={lbl.labelX}
                      y2={lbl.labelY}
                      stroke={isLightMode ? '#666666' : 'rgba(255,255,255,0.5)'}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    {/* Corner Target Dot */}
                    <circle
                      cx={lbl.x}
                      cy={lbl.y}
                      r="2.5"
                      fill={isLightMode ? '#111111' : '#ffffff'}
                      stroke={isLightMode ? '#ffffff' : '#000000'}
                      strokeWidth="0.5"
                    />

                    {/* Corner Label Text */}
                    <text
                      x={lbl.labelX}
                      y={lbl.labelY}
                      fill={isLightMode ? '#111111' : '#FFFFFF'}
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="700"
                      textAnchor={lbl.textAnchor as any}
                      alignmentBaseline="middle"
                      style={{
                        textShadow: isLightMode
                          ? '0 0 4px #ffffff, 0 0 2px #ffffff'
                          : '0 0 4px #000000, 0 0 2px #000000',
                      }}
                    >
                      {lbl.name}
                    </text>
                  </g>
                ))}

                {/* 8. Animated Skill F1 Cars */}
                {cars.map((car) => {
                  if (!car.x && !car.y) return null; // Prevent initial rendering at (0,0)
                  const isHovered = hoveredSkillId === car.id;
                  const leaderboardEntry = leaderboard.find((l) => l.id === car.id);
                  const rank = leaderboardEntry ? leaderboardEntry.rank : 11;

                  return (
                    <g
                      key={car.id}
                      transform={`translate(${car.x}, ${car.y}) rotate(${car.angle})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSkillId(car.id)}
                      onMouseLeave={() => setHoveredSkillId(null)}
                    >
                      <TopDownF1Car
                        color={car.color}
                        name={car.name}
                        isHovered={isHovered}
                        rank={rank}
                        angle={car.angle}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* RIGHT SIDE: LIVE TIMING LEADERBOARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`lg:col-span-5 rounded-xl p-4 md:p-5 relative shadow-2xl flex flex-col justify-between border transition-colors ${
              isLightMode
                ? 'bg-white border-[#e0e0e0] text-[#111111]'
                : 'bg-[#111111] border-[#222222] text-white'
            }`}
          >
            <div>
              {/* Leaderboard Header */}
              <div className={`flex items-center justify-between pb-3 mb-4 border-b ${
                isLightMode ? 'border-[#e0e0e0]' : 'border-[#222222]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <h3 className={`font-mono text-sm font-bold tracking-widest uppercase ${
                    isLightMode ? 'text-[#111111]' : 'text-white'
                  }`}>
                    LIVE TIMING
                  </h3>
                </div>
                <div className={`flex items-center gap-2 font-mono text-[0.65rem] ${
                  isLightMode ? 'text-[#555555]' : 'text-gray-400'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MONZA TELEMETRY</span>
                </div>
              </div>

              {/* Leaderboard Column Titles */}
              <div className={`grid grid-cols-12 gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider mb-2 px-2 ${
                isLightMode ? 'text-[#555555]' : 'text-gray-500'
              }`}>
                <div className="col-span-2">POS</div>
                <div className="col-span-5">SKILL DRIVER</div>
                <div className="col-span-2 text-center">LAP</div>
                <div className="col-span-3 text-right">GAP / TIME</div>
              </div>

              {/* Dynamic Re-ordering Cars List */}
              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {leaderboard.map((item) => {
                    const isHovered = hoveredSkillId === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        onMouseEnter={() => setHoveredSkillId(item.id)}
                        onMouseLeave={() => setHoveredSkillId(null)}
                        className={`grid grid-cols-12 gap-2 items-center p-2 rounded-md font-mono text-xs transition-colors border ${
                          isHovered
                            ? isLightMode
                              ? 'bg-[#f0f0f0] border-yellow-500 shadow-md'
                              : 'bg-[#1a1a1a] border-yellow-500/60 shadow-lg'
                            : isLightMode
                              ? 'bg-[#ffffff] border-[#e0e0e0] hover:border-gray-400'
                              : 'bg-[#141414] border-[#222222] hover:border-[#333333]'
                        }`}
                        style={{ borderLeft: `4px solid ${item.color}` }}
                      >
                        {/* Position Badge */}
                        <div className="col-span-2 flex items-center gap-1.5">
                          <span
                            className={`font-bold text-xs px-1.5 py-0.5 rounded ${
                              item.rank === 1
                                ? 'bg-yellow-500 text-black'
                                : item.rank === 2
                                ? 'bg-gray-300 text-black'
                                : item.rank === 3
                                ? 'bg-amber-600 text-black'
                                : isLightMode
                                ? 'bg-[#f0f0f0] text-[#111111] border border-[#e0e0e0]'
                                : 'text-gray-400 bg-transparent'
                            }`}
                          >
                            P{item.rank}
                          </span>
                        </div>

                        {/* Skill Name & Team Color Indicator */}
                        <div className="col-span-5 flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}
                          />
                          <span className={`font-bold truncate text-xs ${
                            isLightMode ? 'text-[#111111]' : 'text-white'
                          }`}>
                            {item.name}
                          </span>
                        </div>

                        {/* Lap Counter */}
                        <div className={`col-span-2 text-center text-[0.7rem] ${
                          isLightMode ? 'text-[#555555]' : 'text-gray-400'
                        }`}>
                          L{item.currentLap}
                        </div>

                        {/* Gap / Lap Time */}
                        <div className="col-span-3 text-right">
                          <span
                            className={`font-bold text-[0.7rem] ${
                              item.rank === 1
                                ? 'text-yellow-500'
                                : isLightMode
                                ? 'text-[#111111]'
                                : 'text-gray-300'
                            }`}
                          >
                            {item.gapText}
                          </span>
                          <div className={`text-[0.6rem] ${
                            isLightMode ? 'text-[#666666]' : 'text-gray-500'
                          }`}>
                            {item.lapTime.toFixed(1)}s
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Telemetry Footer */}
            <div className={`mt-4 pt-3 border-t flex items-center justify-between font-mono text-[0.65rem] ${
              isLightMode ? 'border-[#e0e0e0] text-[#666666]' : 'border-[#222222] text-gray-500'
            }`}>
              <span>TELEMETRY: ACTIVE</span>
              {/*<span className="text-red-500 font-bold">SCUDERIA FERRARI DATA</span>*/}
            </div>
          </motion.div>
        </div>

        {/* Bottom GRID TELEMETRY Bar (Devicon + skill name in pill badges) */}
        <motion.div
          {...riseIn(0.3)}
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[0.75rem] ${
            isLightMode ? 'text-[#111111]' : 'text-gray-300'
          }`}
        >
          <span className="text-yellow-500 font-bold tracking-wider mr-1">GRID TELEMETRY:</span>
          {SKILL_CARS.map((s) => (
            <span
              key={s.id}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all shadow-sm font-medium border ${
                isLightMode
                  ? 'bg-white border-[#e0e0e0] text-[#111111] hover:border-gray-400'
                  : 'bg-[#121212] border-[#2a2a2a] text-gray-200 hover:border-gray-500 hover:bg-[#181818]'
              }`}
              onMouseEnter={() => setHoveredSkillId(s.id)}
              onMouseLeave={() => setHoveredSkillId(null)}
            >
              <i
                className={`${s.iconClass} text-[18px]`}
                style={
                  s.id === 'linux'
                    ? {
                        filter: isLightMode
                          ? 'drop-shadow(0 0 1px rgba(0,0,0,0.15))'
                          : 'drop-shadow(0 0 1.5px #ffffff)',
                      }
                    : undefined
                }
              />
              <span>{s.name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
