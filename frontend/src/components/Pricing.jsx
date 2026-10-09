import React from 'react';
import { Sparkle, Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="section pricing-section" id="planes">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Sparkle size={16} /> Flexibilidad</div>
          <h2 className="section-title">Planes Diseñados para <span className="text-gradient">Cada Necesidad</span></h2>
          <p className="section-subtitle">
            Empieza gratis y escala a medida que requieras mayor potencia de inferencia 3D y funciones avanzadas de renderizado.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Starter Plan */}
          <div className="pricing-card glass-panel">
            <div className="plan-header">
              <h3 className="plan-name">Starter Gratuito</h3>
              <p className="plan-desc">Ideal para explorar el modelado paramétrico y crear tus primeros espacios.</p>
              <div className="plan-price">
                <span className="currency">$</span><span className="amount">0</span>
                <span className="period">/ mes</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><Check size={16} /> Hasta 3 proyectos activos</li>
              <li><Check size={16} /> Editor paramétrico 2D y 3D</li>
              <li><Check size={16} /> Reconstrucción estándar TripoSR</li>
              <li><Check size={16} /> Biblioteca de materiales básicos</li>
              <li><Check size={16} /> Importación y calibración de planos</li>
            </ul>
            <a href="#asistente" className="btn btn-glass btn-block">Comenzar Ahora</a>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card glass-panel featured-plan">
            <div className="popular-ribbon">Recomendado</div>
            <div className="plan-header">
              <h3 className="plan-name">Pro Architect</h3>
              <p className="plan-desc">Para profesionales que demandan máxima calidad en mallas e IA.</p>
              <div className="plan-price">
                <span className="currency">$</span><span className="amount">29</span>
                <span className="period">/ mes</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><Check size={16} /> Proyectos ilimitados</li>
              <li><Check size={16} /> <strong>Reconstrucción HQ con InstantMesh</strong></li>
              <li><Check size={16} /> Copiloto de IA y Auditor de normativa</li>
              <li><Check size={16} /> Catálogo completo de materiales PBR</li>
              <li><Check size={16} /> Prioridad en colas de inferencia</li>
              <li><Check size={16} /> Soporte técnico prioritario</li>
            </ul>
            <a href="#asistente" className="btn btn-primary btn-block shadow-glow">Acceso Pro</a>
          </div>

          {/* Studio Plan */}
          <div className="pricing-card glass-panel">
            <div className="plan-header">
              <h3 className="plan-name">Studio Enterprise</h3>
              <p className="plan-desc">Para estudios de arquitectura, constructoras y equipos multidisciplinares.</p>
              <div className="plan-price">
                <span className="currency">$</span><span className="amount">89</span>
                <span className="period">/ mes</span>
              </div>
            </div>
            <ul className="plan-features">
              <li><Check size={16} /> Todo lo incluido en el plan Pro</li>
              <li><Check size={16} /> <strong>Workspaces compartidos y roles</strong></li>
              <li><Check size={16} /> Exportaciones BIM y cómputos métricos</li>
              <li><Check size={16} /> Enlaces de presentación con marca blanca</li>
              <li><Check size={16} /> Despliegue dedicado on-premise disponible</li>
            </ul>
            <a href="#asistente" className="btn btn-glass btn-block">Contactar Ventas</a>
          </div>
        </div>
      </div>
    </section>
  );
}
