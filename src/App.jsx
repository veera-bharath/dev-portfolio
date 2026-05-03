import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Tech from './sections/Tech';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import StarsCanvas from './components/canvas/Stars';
import BeeGuide from './components/BeeGuide';
import Onboarding from './components/Onboarding';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('portfolio-onboarding-done') !== 'true';
  });
  const [isGuided, setIsGuided] = useState(() => {
    return localStorage.getItem('portfolio-guided') === 'true';
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOnboardingSelect = (guided) => {
    setIsGuided(guided);
    setShowOnboarding(false);
    localStorage.setItem('portfolio-onboarding-done', 'true');
    localStorage.setItem('portfolio-guided', guided.toString());
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <AnimatePresence>
          {showOnboarding && (
            <Onboarding onSelect={handleOnboardingSelect} />
          )}
        </AnimatePresence>
        
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar scrolled={scrolled} />
          <Hero scrolled={scrolled} />
        </div>
        <About />
        <Experience />
        <Tech />
        <Projects />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      <BeeGuide enabled={isGuided} />
    </BrowserRouter>
  );
};

export default App;
