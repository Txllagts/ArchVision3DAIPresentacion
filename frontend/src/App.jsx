import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Capabilities from './components/Capabilities';
import Architecture from './components/Architecture';
import Assistant from './components/Assistant';
import Roadmap from './components/Roadmap';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import GifModal from './components/GifModal';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('archvision_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('archvision_theme', nextTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="app-root">
      {/* Ambient Backgrounds */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="grid-overlay"></div>

      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        isMobileOpen={isMobileOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />

      <MobileDrawer 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />

      <main>
        <Hero onOpenModal={openModal} />
        <Philosophy />
        <Capabilities />
        <Architecture />
        <Assistant />
        <Roadmap />
        <Pricing />
        <FAQ />
      </main>

      <Footer />

      <GifModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
