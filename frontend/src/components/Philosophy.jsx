import React from 'react';
import { Compass, DraftingCompass, BrainCircuit, Split, Check } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="section philosophy-section" id="filosofia">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Compass size={16} /> Principio Rector</div>
          <h2 className="section-title">La IA Construye el Borrador, <span className="text-gradient">Tú Dominas la Geometría</span></h2>
          <p className="section-subtitle">
            A diferencia de las herramientas que generan mallas 3D opacas e ineditables, ArchVision convierte cada inferencia en <strong>entidades arquitectónicas vivas</strong>: muros con vanos booleanos, losas, columnas y cubiertas calculadas con precisión milimétrica.
          </p>
        </div>

        <div className="philosophy-grid">
          <div className="philosophy-card glass-panel">
            <div className="card-icon gradient-amber">
              <DraftingCompass size={28} />
            </div>
            <h3>Fuente de Verdad Paramétrica</h3>
            <p>
              La escena se describe en un documento formal <code>SceneDocument</code>. Three.js es únicamente la representación visual reactiva: los muros, puertas y techos se recalculan dinámicamente sin degradación de malla.
            </p>
            <ul className="feature-checklist">
              <li><Check size={16} /> Muros con grosor, altura y vanos dinámicos</li>
              <li><Check size={16} /> Snapping inteligente a vértices, ejes y cuadrícula</li>
              <li><Check size={16} /> Deshacer / Rehacer ilimitado con historial atómico</li>
            </ul>
          </div>

          <div className="philosophy-card glass-panel">
            <div className="card-icon gradient-indigo">
              <BrainCircuit size={28} />
            </div>
            <h3>Pipeline Híbrido de IA & Visión</h3>
            <p>
              Combina visión computacional clásica (detección de contornos de Otsu y transformadas de Hough) con modelos neuronales de vanguardia (TripoSR y InstantMesh HQ) con alineación PCA y reconstrucción Poisson.
            </p>
            <ul className="feature-checklist">
              <li><Check size={16} /> Reconstrucción desde una sola fotografía</li>
              <li><Check size={16} /> Calibración dimensional con escala conocida</li>
              <li><Check size={16} /> Transferencia de color RGBA con árboles k-d</li>
            </ul>
          </div>

          <div className="philosophy-card glass-panel">
            <div className="card-icon gradient-cyan">
              <Split size={28} />
            </div>
            <h3>Sincronización Bidireccional 2D / 3D</h3>
            <p>
              Trabaja en vista 2D de plano, perspectiva 3D inmersiva o vista dividida simultánea. Cualquier cambio en 2D se refleja en tiempo real en la escena 3D y viceversa con cálculo instantáneo de áreas y perímetros.
            </p>
            <ul className="feature-checklist">
              <li><Check size={16} /> Detección automática de habitaciones y metros cuadrados</li>
              <li><Check size={16} /> Vistas ortográficas (Superior, Frontal, Lateral)</li>
              <li><Check size={16} /> Paleta de comandos universal <code>Ctrl+K</code></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
