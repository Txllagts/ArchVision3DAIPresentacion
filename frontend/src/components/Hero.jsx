import React, { useState, useEffect, useRef } from 'react';
import { Eye, Sparkles, Repeat, Maximize2 } from 'lucide-react';

export default function Hero({ onOpenModal }) {
  const [controlCount, setControlCount] = useState(0);
  const [extrusionCount, setExtrusionCount] = useState(0);
  const heroMetricsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroMetricsRef.current) {
      observer.observe(heroMetricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    let count1 = 0;
    const interval1 = setInterval(() => {
      count1 += 5;
      if (count1 >= 100) {
        setControlCount(100);
        clearInterval(interval1);
      } else {
        setControlCount(count1);
      }
    }, 25);

    let count2 = 0;
    const interval2 = setInterval(() => {
      count2 += 1;
      if (count2 >= 3) {
        setExtrusionCount(3);
        clearInterval(interval2);
      } else {
        setExtrusionCount(count2);
      }
    }, 200);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span className="badge-dot"></span>
            <span>Nueva Generación de Modelado Arquitectónico</span>
            <span className="badge-tag">v2.0 Beta</span>
          </div>

          <h1 className="hero-title animate-fade-in delay-1">
            De Fotografías y Planos a <span className="text-gradient">Modelos 3D Paramétricos</span> con IA
          </h1>

          <p className="hero-description animate-fade-in delay-2">
            <strong>ArchVision 3D AI</strong> fusiona visión artificial profunda (TripoSR & InstantMesh HQ), extrusión vectorial de planos 2D y un motor paramétrico en Three.js. <em>La Inteligencia Artificial construye la base geométrica, mientras tú mantienes el control dimensional absoluto.</em>
          </p>

          <div className="hero-actions animate-fade-in delay-3">
            <a href="#asistente" className="btn btn-lg btn-primary shadow-glow">
              <Sparkles size={20} />
              <span>Explorar Copiloto IA</span>
            </a>
            <a href="#capacidades" className="btn btn-lg btn-glass">
              <Sparkles size={20} />
              <span>Ver Capacidades</span>
            </a>
          </div>

          {/* Hero Metrics Bar */}
          <div className="hero-metrics animate-fade-in delay-4" ref={heroMetricsRef}>
            <div className="metric-card">
              <div className="metric-value"><span>{controlCount}</span>%</div>
              <div className="metric-label">Control Paramétrico</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-card">
              <div className="metric-value">&lt; <span>{extrusionCount}</span>s</div>
              <div className="metric-label">Extrusión de Planos</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-card">
              <div className="metric-value">2D <Repeat size={16} className="inline-icon" /> 3D</div>
              <div className="metric-label">Sincronización Dual</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase with arch1.gif */}
        <div className="hero-visual animate-scale-in">
          <div className="visual-card-wrapper glass-panel">
            <div className="card-header-bar">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="window-title">Demostración de construcción de paredes</div>
              <div className="window-status"><span class="status-live"></span> En vivo</div>
            </div>

            {/* Responsive GIF Preview Stage */}
            <div className="hero-gif-container" id="hero-gif-stage">
              <img 
                src="/arch1.gif" 
                alt="Demostración de Reconstrucción Arquitectónica 3D con ArchVision 3D AI" 
                className="hero-gif-media" 
                id="hero-gif-image" 
                onClick={onOpenModal}
                style={{ cursor: 'pointer' }}
              />
              
              <div className="hero-canvas-overlay">
                <button 
                  className="canvas-tag bottom-right expand-btn" 
                  id="btn-expand-gif" 
                  onClick={onOpenModal}
                  aria-label="Ampliar demo en pantalla completa"
                >
                  <Maximize2 size={16} /> <span>Pantalla Completa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
