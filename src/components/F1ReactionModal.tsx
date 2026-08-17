import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, RotateCcw, Trophy, AlertTriangle } from 'lucide-react';

interface F1ReactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameState = 'ready' | 'sequence' | 'waiting' | 'reacting' | 'result' | 'jumpstart';

function getRating(ms: number) {
  if (ms < 150) {
    return { title: 'IMPOSSIBLE — ARE YOU SENNA?', icon: '🏆', color: 'text-[#C9A84C]' };
  } else if (ms <= 200) {
    return { title: 'POLE POSITION — ELITE REFLEXES', icon: '🏆', color: 'text-[#C9A84C]' };
  } else if (ms <= 250) {
    return { title: 'RACE PACE — SOLID DRIVER', icon: '✅', color: 'text-emerald-400' };
  } else if (ms <= 300) {
    return { title: 'POINTS FINISH — NOT BAD', icon: '✅', color: 'text-green-400' };
  } else if (ms <= 400) {
    return { title: 'MIDFIELD — NEEDS WORK', icon: '⚠️', color: 'text-yellow-400' };
  } else {
    return { title: 'BACK OF THE GRID 😄', icon: '❌', color: 'text-red-500' };
  }
}

export default function F1ReactionModal({ isOpen, onClose }: F1ReactionModalProps) {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [litCount, setLitCount] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [flashEffect, setFlashEffect] = useState<'none' | 'white' | 'red'>('none');

  const startTimeRef = useRef<number>(0);
  const timerIdsRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timerIdsRef.current.forEach((id) => window.clearTimeout(id));
    timerIdsRef.current = [];
  };

  // Load best time from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('f1_best_reaction_time');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) {
          setBestTime(parsed);
        }
      }
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll and add modal-open class to hide navbar when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      resetGame();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const resetGame = () => {
    clearAllTimers();
    setGameState('ready');
    setLitCount(0);
    setReactionTime(null);
    setFlashEffect('none');
  };

  const handleClose = () => {
    clearAllTimers();
    resetGame();
    onClose();
  };

  const startSequence = () => {
    clearAllTimers();
    setGameState('sequence');
    setLitCount(0);
    setReactionTime(null);
    setFlashEffect('none');

    // Lights turn RED one by one every 800ms
    // 0ms -> Light 1
    // 800ms -> Light 2
    // 1600ms -> Light 3
    // 2400ms -> Light 4
    // 3200ms -> Light 5
    for (let i = 1; i <= 5; i++) {
      const timerId = window.setTimeout(() => {
        setLitCount(i);
        if (i === 5) {
          // All 5 lights are RED. Transition to waiting state for random 1000-3000ms delay
          setGameState('waiting');
          const randomDelay = Math.floor(Math.random() * 2000) + 1000;
          const lightsOutTimer = window.setTimeout(() => {
            // LIGHTS OUT!
            setLitCount(0);
            setGameState('reacting');
            startTimeRef.current = performance.now();
            // Trigger white flash
            setFlashEffect('white');
            const flashTimeout = window.setTimeout(() => setFlashEffect('none'), 200);
            timerIdsRef.current.push(flashTimeout);
          }, randomDelay);
          timerIdsRef.current.push(lightsOutTimer);
        }
      }, (i - 1) * 800);
      timerIdsRef.current.push(timerId);
    }
  };

  const handleContainerClick = () => {
    if (gameState === 'sequence' || gameState === 'waiting') {
      // User reacted too early -> JUMP START!
      clearAllTimers();
      setGameState('jumpstart');
      setFlashEffect('red');
      const flashTimeout = window.setTimeout(() => setFlashEffect('none'), 400);
      timerIdsRef.current.push(flashTimeout);
    } else if (gameState === 'reacting') {
      // Valid reaction time!
      const endTime = performance.now();
      const timeMs = Math.round(endTime - startTimeRef.current);
      setReactionTime(timeMs);
      setGameState('result');

      // Update best time if it's new high score
      if (bestTime === null || timeMs < bestTime) {
        setBestTime(timeMs);
        localStorage.setItem('f1_best_reaction_time', timeMs.toString());
      }
    }
  };

  if (!isOpen) return null;

  const rating = reactionTime !== null ? getRating(reactionTime) : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={handleContainerClick}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#0A0A0A]/95 backdrop-blur-md font-mono select-none p-4 md:p-8 cursor-pointer overflow-y-auto"
      >
        {/* Flash Effect Overlays */}
        {flashEffect === 'white' && (
          <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-ping opacity-90 transition-opacity" />
        )}
        {flashEffect === 'red' && (
          <div className="absolute inset-0 bg-[#E8002D]/40 z-50 pointer-events-none animate-pulse transition-opacity" />
        )}

        {/* Top Header Bar */}
        <div
          className="w-full max-w-4xl flex items-center justify-between z-10 pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <Zap className="text-[#E8002D] animate-pulse" size={20} />
            <span className="text-xs md:text-sm tracking-[0.25em] text-[#C9A84C] uppercase font-bold">
              SCUDERIA REFLEX TELEMETRY
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#E8002D] hover:bg-[#E8002D]/20 transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-3xl w-full text-center my-6 z-10">
          {/* Titles */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              LIGHTS OUT — AND AWAY WE GO
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">
              F1 REACTION TIME TEST
            </p>
          </motion.div>

          {/* F1 Gantry Starting Lights */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full f1-gantry-box bg-[#121212] rounded-2xl p-6 sm:p-8 md:p-10 mb-8 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative"
          >
            {/* Gantry top beam */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1f1f1f] border border-[#333] px-6 py-1 rounded-t-md text-[10px] text-white/40 tracking-[0.3em] uppercase">
              FIA STARTING LIGHTS
            </div>

            <div className="grid grid-cols-5 gap-3 sm:gap-6 md:gap-8 items-center justify-items-center">
              {[0, 1, 2, 3, 4].map((index) => {
                const isLitRed = (gameState === 'sequence' || gameState === 'waiting') && index < litCount;
                const isLightsOut = gameState === 'reacting';

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3 bg-[#0d0d0d] p-2 sm:p-3 md:p-4 rounded-xl border border-white/5 w-full max-w-[100px]"
                  >
                    {/* Light Circle */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full transition-all duration-100 flex items-center justify-center border-4 ${
                        isLitRed
                          ? 'bg-[#FF0000] border-[#E8002D] shadow-[0_0_35px_#FF0000,0_0_70px_rgba(255,0,0,0.6)] animate-pulse'
                          : isLightsOut
                          ? 'bg-[#111] border-[#222] shadow-inner'
                          : 'bg-[#262626] border-[#333] shadow-inner opacity-60'
                      }`}
                    >
                      {/* Inner bulb highlight */}
                      <div
                        className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full transition-opacity ${
                          isLitRed ? 'bg-white/90 shadow-[0_0_10px_#fff]' : 'bg-transparent'
                        }`}
                      />
                    </div>

                    {/* Light Column Index */}
                    <span className="text-[10px] text-white/30 tracking-widest font-mono">
                      0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Instructions & States Content */}
          <div className="min-h-[140px] flex flex-col items-center justify-center w-full">
            {gameState === 'ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-5"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm md:text-base text-white/70 tracking-wide max-w-md">
                  Click below when ready. Wait for all 5 red lights to turn on, then click/tap AS FAST AS YOU CAN when they go out!
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startSequence();
                  }}
                  className="px-8 py-4 bg-[#E8002D] hover:bg-[#ff1e43] text-white text-sm sm:text-base tracking-[0.25em] font-bold uppercase rounded-full shadow-[0_0_25px_rgba(232,0,45,0.6)] transition-all hover:scale-105 active:scale-95"
                >
                  PREPARE TO START
                </button>
              </motion.div>
            )}

            {(gameState === 'sequence' || gameState === 'waiting') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-lg sm:text-2xl font-bold text-[#E8002D] tracking-widest animate-pulse">
                  {gameState === 'sequence' ? 'LIGHTS ON...' : 'WAIT FOR LIGHTS OUT!'}
                </p>
                <span className="text-xs text-white/50 tracking-wider">
                  TAP ANYWHERE ON SCREEN AS SOON AS LIGHTS GO OFF
                </span>
              </motion.div>
            )}

            {gameState === 'reacting' && (
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-3xl sm:text-5xl font-black text-[#C9A84C] tracking-widest animate-bounce">
                  REACT NOW! ⚡
                </p>
                <span className="text-xs sm:text-sm text-white/80 tracking-widest uppercase">
                  TAP / CLICK ANYWHERE!
                </span>
              </motion.div>
            )}

            {gameState === 'jumpstart' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 text-red-500 font-bold text-lg sm:text-2xl md:text-3xl tracking-wider">
                  <AlertTriangle size={28} />
                  <span>JUMP START ❌ — DRIVE THROUGH PENALTY</span>
                </div>
                <p className="text-xs sm:text-sm text-white/60">
                  You clicked before the lights went out!
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startSequence();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8002D] text-white font-mono text-xs sm:text-sm tracking-wider uppercase font-bold rounded-full hover:bg-[#ff1e43] shadow-[0_0_20px_rgba(232,0,45,0.5)] transition-all"
                  >
                    <RotateCcw size={16} />
                    TRY AGAIN
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="px-6 py-3 border border-white/20 text-white/80 font-mono text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-white/10 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </motion.div>
            )}

            {gameState === 'result' && reactionTime !== null && rating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Time Display */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                    {reactionTime}
                  </span>
                  <span className="text-xl sm:text-3xl font-bold text-[#E8002D]">ms</span>
                </div>

                {/* Rating */}
                <div className={`text-base sm:text-xl md:text-2xl font-bold tracking-wider ${rating.color}`}>
                  {rating.icon} "{rating.title}"
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startSequence();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8002D] text-white font-mono text-xs sm:text-sm tracking-wider uppercase font-bold rounded-full hover:bg-[#ff1e43] shadow-[0_0_20px_rgba(232,0,45,0.5)] transition-all"
                  >
                    <RotateCcw size={16} />
                    TRY AGAIN
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="px-6 py-3 border border-white/20 text-white/80 font-mono text-xs sm:text-sm tracking-wider uppercase rounded-full hover:bg-white/10 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer / Best Lap Display */}
        <div
          className="z-10 pb-2 flex items-center justify-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Trophy size={16} className="text-[#C9A84C]" />
          <span className="text-xs sm:text-sm tracking-[0.2em] text-[#C9A84C] font-bold uppercase">
            YOUR BEST: {bestTime !== null ? `${bestTime}ms` : '--'}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
