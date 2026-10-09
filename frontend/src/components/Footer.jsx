import React from 'react';
import { Box, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="logo-symbol">
              <img src="/logo.svg" alt="ArchVision 3D AI Logo" className="brand-icon-img" />
            </div>
            <div className="logo-text">
              <span className="logo-title">ArchVision <span className="badge-ai">3D AI</span></span>
            </div>
          </div>
          <p className="footer-tagline">
            Plataforma de modelado arquitectónico paramétrico impulsada por Inteligencia Artificial y Visión Computacional.
          </p>
          <div className="footer-disclaimer">
            <AlertCircle size={16} />
            <span>Aviso: Los modelos generados automáticamente deben ser revisados dimensionalmente antes de su uso para presupuesto o construcción oficial.</span>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="#filosofia">Filosofía Paramétrica</a></li>
            <li><a href="#capacidades">Capacidades & Herramientas</a></li>
            <li><a href="#arquitectura">Arquitectura Técnica</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Inteligencia & Futuro</h4>
          <ul>
            <li><a href="#asistente">Copiloto de IA & Auditoría</a></li>
            <li><a href="#roadmap">Próximos Hitos de Desarrollo</a></li>
            <li><a href="#planes">Planes & Facturación Wompi</a></li>
            <li><a href="#faq">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Tecnologías</h4>
          <div className="tech-stack-pills">
            <span className="tech-pill">Next.js 15</span>
            <span className="tech-pill">Three.js</span>
            <span className="tech-pill">FastAPI</span>
            <span className="tech-pill">TripoSR</span>
            <span className="tech-pill">InstantMesh</span>
            <span className="tech-pill">Supabase</span>
            <span className="tech-pill">Prisma</span>
            <span className="tech-pill">TypeScript</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 ArchVision 3D AI. Todos los derechos reservados. Diseñado para arquitectura paramétrica de vanguardia.</p>
      </div>
    </footer>
  );
}
