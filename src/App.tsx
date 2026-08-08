import { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Roadmap from './components/Roadmap';
import Contact from './components/Contact';
import Footer from './components/Footer';
import F1ReactionModal from './components/F1ReactionModal';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isF1ModalOpen, setIsF1ModalOpen] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [shouldReduceMotion, setShouldReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return prefersReducedMotion || window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const updateMotion = () => {
      setShouldReduceMotion(mediaQuery.matches || mobileQuery.matches);
    };

    mediaQuery.addEventListener?.('change', updateMotion);
    mobileQuery.addEventListener?.('change', updateMotion);
    return () => {
      mediaQuery.removeEventListener?.('change', updateMotion);
      mobileQuery.removeEventListener?.('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';
    setShowContent(true);

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader]);

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? 'always' : 'user'}>
      <div className="noise-overlay" aria-hidden />
      <CustomCursor />

      {/* Subtle floating background orbs */}
      <div className="floating-orbs-container fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] -left-32 w-[550px] h-[550px] rounded-full bg-[#FF000033] blur-[120px] animate-float-orb-1" />
        <div className="absolute top-[45%] -right-32 w-[650px] h-[650px] rounded-full bg-[#C9A84C22] blur-[140px] animate-float-orb-2" />
        <div className="absolute top-[80%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#FF000022] blur-[130px] animate-float-orb-1" />
      </div>

      <AnimatePresence>
        {showLoader && <Loader key="loader" onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      {showContent && (
        <>
          <Navbar isIntroComplete={showContent} />
          <main>
            <Hero onOpenF1Game={() => setIsF1ModalOpen(true)} />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Roadmap />
            <Contact />
          </main>
          <Footer />

          <F1ReactionModal
            isOpen={isF1ModalOpen}
            onClose={() => setIsF1ModalOpen(false)}
          />
        </>
      )}
    </MotionConfig>
  );
}

export default App;
