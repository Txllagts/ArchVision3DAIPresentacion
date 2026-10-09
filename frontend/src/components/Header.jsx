import React from 'react';
import { Box, Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header({ theme, toggleTheme, isMobileOpen, toggleMobileMenu }) {
  return (
    <header className="site-header" id="site-header">
      <div className="header-container">
        <a href="#hero" className="brand-logo" id="brand-logo">
          <div className="logo-symbol">
            <img src="/logo.svg" alt="ArchVision 3D AI Logo" className="brand-icon-img" />
          </div>
          <div className="logo-text">
            <span className="logo-title">ArchVision <span className="badge-ai">3D AI</span></span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="main-nav" id="main-nav">
          <ul className="nav-links">
            <li><a href="#filosofia" className="nav-link">Filosofía</a></li>
            <li><a href="#capacidades" className="nav-link">Capacidades</a></li>
            <li><a href="#arquitectura" className="nav-link">Arquitectura</a></li>
            <li><a href="#asistente" className="nav-link">Asistente IA</a></li>
            <li>
              <a href="#roadmap" className="nav-link highlight-link">
                <span className="radar-dot"></span> Próximos Hitos
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle-btn" 
            id="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Cambiar modo claro / oscuro" 
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="#asistente" className="btn btn-sm btn-primary header-cta">
            <span>Probar Asistente</span>
            <ArrowUpRight size={16} />
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-btn ${isMobileOpen ? 'active' : ''}`}
            id="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú de navegación"
          >
            {isMobileOpen ? <X size={20} className="icon-close" /> : <Menu size={20} className="icon-open" />}
          </button>
        </div>
      </div>
    </header>
  );
}
