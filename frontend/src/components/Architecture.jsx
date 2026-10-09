import React from 'react';
import { Layers, Layout, Package } from 'lucide-react';

export default function Architecture() {
  return (
    <section className="section architecture-section" id="arquitectura">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Layers size={16} /> Ingeniería de Software</div>
          <h2 className="section-title">Arquitectura del Monorepo <span class="text-gradient">Robusta y Escalable</span></h2>
          <p className="section-subtitle">
            Estructurado en un monorepo modular con TypeScript estricto, Next.js 15, FastAPI en Python, Supabase y Three.js.
          </p>
        </div>

        <div className="arch-diagram-card glass-panel">
          <div className="diagram-grid">
            {/* App Layer */}
            <div className="arch-block">
              <div className="arch-block-header">
                <Layout size={18} />
                <span>Aplicaciones Frontend & Backend Web</span>
              </div>
              <div className="arch-tag-list">
                <div className="arch-tag-item">
                  <strong>apps/web</strong>
                  <span>Next.js 15 + React 19 + TypeScript + REST APIs + Three.js Editor</span>
                </div>
                <div className="arch-tag-item">
                  <strong>apps/ai-service</strong>
                  <span>FastAPI + Python + PyTorch + TripoSR + InstantMesh + OpenCV</span>
                </div>
              </div>
            </div>

            {/* Packages Layer */}
            <div className="arch-block">
              <div className="arch-block-header">
                <Package size={18} />
                <span>Paquetes del Dominio Arquitectónico</span>
              </div>
              <div className="package-chips-grid">
                <div className="pkg-chip"><code>packages/types</code> <span>SceneDocument & Entidades</span></div>
                <div className="pkg-chip"><code>packages/geometry</code> <span>Booleanos & Mallas</span></div>
                <div className="pkg-chip"><code>packages/three-engine</code> <span>Materiales PBR & Sol</span></div>
                <div className="pkg-chip"><code>packages/vision</code> <span>Otsu & Hough Planos</span></div>
                <div className="pkg-chip"><code>packages/assistant</code> <span>Copiloto & Reglas</span></div>
                <div className="pkg-chip"><code>packages/database</code> <span>Prisma ORM & Supabase</span></div>
                <div className="pkg-chip"><code>packages/validation</code> <span>Esquemas Zod</span></div>
                <div className="pkg-chip"><code>packages/billing</code> <span>Wompi & Cuotas</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
