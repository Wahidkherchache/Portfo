import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Roadmap from './components/Roadmap';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
    <>
      <div className="noise-overlay" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {showLoader && <Loader key="loader" onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      {showContent && (
        <>
          <Navbar isIntroComplete={showContent} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Roadmap />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
