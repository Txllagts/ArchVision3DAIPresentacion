import React from 'react';
import { Sparkles, Download, SunMedium, Users, Armchair, Calculator, Server } from 'lucide-react';

export default function Roadmap() {
  return (
    <section className="section roadmap-section" id="roadmap">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Sparkles size={16} /> Próximos Desafíos & Futuro</div>
          <h2 className="section-title">Hitos en Desarrollo y <span className="text-gradient">Próximas Innovaciones</span></h2>
          <p className="section-subtitle">
            Descubre las funciones de vanguardia que están siendo implementadas para llevar ArchVision al siguiente nivel de la industria AEC.
          </p>
        </div>

        <div className="roadmap-grid">
          {/* Milestone 1 */}
          <div className="roadmap-card glass-panel" data-category="export">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-blue">
                <Download size={24} />
              </div>
              <span className="milestone-status-badge in-progress">
                <span className="status-dot"></span> En Desarrollo Activo
              </span>
            </div>
            <h3 className="milestone-title">Suite de Exportaciones Multiformato Profesionales</h3>
            <p className="milestone-desc">
              Descarga tus proyectos en los estándares universales de la industria para renders, animación, fabricación digital y planos constructivos.
            </p>
            <div className="milestone-tags">
              <span className="tag">GLB / GLTF 2.0</span>
              <span className="tag">OBJ + MTL</span>
              <span className="tag">STL (Impresión 3D)</span>
              <span className="tag">Planos Vectoriales DXF/CAD</span>
              <span className="tag">Renders 4K Ultra-HD</span>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="roadmap-card glass-panel" data-category="render">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-amber">
                <SunMedium size={24} />
              </div>
              <span className="milestone-status-badge in-progress">
                <span className="status-dot"></span> En Desarrollo
              </span>
            </div>
            <h3 className="milestone-title">Motor de Renderizado Fotorrealista y Estudio Solar Geo-Posicionado</h3>
            <p className="milestone-desc">
              Simulación de iluminación con cielos físicos HDRI y trayectoria solar exacta basada en latitud, longitud, fecha y hora del año para análisis de asoleamiento y eficiencia energética.
            </p>
            <div className="milestone-tags">
              <span className="tag">Cielos Físicos HDRI</span>
              <span className="tag">Asoleamiento Dinámico</span>
              <span className="tag">Oclusión Ambiental PBR</span>
              <span className="tag">Trayectoria Solar Real</span>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="roadmap-card glass-panel" data-category="collab">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-purple">
                <Users size={24} />
              </div>
              <span className="milestone-status-badge planned">
                <span className="status-dot"></span> Próxima Integración
              </span>
            </div>
            <h3 className="milestone-title">Workspaces de Colaboración en Vivo y Enlaces Compartibles</h3>
            <p className="milestone-desc">
              Edita proyectos simultáneamente con tu equipo mediante WebSockets y CRDTs. Genera enlaces interactivos de solo lectura para clientes con navegación virtual y visualización en Realidad Aumentada (AR).
            </p>
            <div className="milestone-tags">
              <span className="tag">Colaboración Multiusuario</span>
              <span className="tag">Cursores en Vivo</span>
              <span className="tag">Enlaces Web para Clientes</span>
              <span className="tag">Visor en Realidad Aumentada (AR)</span>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="roadmap-card glass-panel" data-category="ai">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-emerald">
                <Armchair size={24} />
              </div>
              <span className="milestone-status-badge planned">
                <span className="status-dot"></span> Próxima Integración
              </span>
            </div>
            <h3 className="milestone-title">Diseño Interior Generativo y Amoblado Inteligente</h3>
            <p className="milestone-desc">
              Distribución automática de mobiliario contextual adaptada a la tipología de cada habitación (salón, suite, cocina, baño) y estilización automática de materiales de fachada a partir de referencias visuales.
            </p>
            <div className="milestone-tags">
              <span className="tag">Auto-Layout Espacial</span>
              <span className="tag">Clasificación de Estancias</span>
              <span className="tag">Estilización de Fachadas</span>
            </div>
          </div>

          {/* Milestone 5 */}
          <div className="roadmap-card glass-panel" data-category="bim">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-cyan">
                <Calculator size={24} />
              </div>
              <span className="milestone-status-badge planned">
                <span className="status-dot"></span> Próxima Integración
              </span>
            </div>
            <h3 className="milestone-title">Cómputos Métricos BIM y Presupuesto de Obra en Tiempo Real</h3>
            <p className="milestone-desc">
              Cálculo automatizado de la lista de materiales (BOM), cubicación de hormigón, superficie de mampostería, pintura y acabados, exportable directamente a hojas de cálculo con estimación de costos.
            </p>
            <div className="milestone-tags">
              <span className="tag">Listado de Materiales (BOM)</span>
              <span className="tag">Cubicación de Volúmenes</span>
              <span className="tag">Presupuestador Paramétrico</span>
              <span className="tag">Exportación Excel/CSV</span>
            </div>
          </div>

          {/* Milestone 6 */}
          <div className="roadmap-card glass-panel" data-category="cloud">
            <div className="roadmap-card-header">
              <div className="milestone-icon-wrapper gradient-pink">
                <Server size={24} />
              </div>
              <span className="milestone-status-badge planned">
                <span className="status-dot"></span> Próxima Integración
              </span>
            </div>
            <h3 className="milestone-title">Clúster de Inferencia Neuronal en GPU de Alto Rendimiento</h3>
            <p className="milestone-desc">
              Escalado horizontal de trabajadores FastAPI con cola Redis / BullMQ para procesamiento paralelo de reconstrucciones InstantMesh en resolución ultra-fina sin latencia de espera.
            </p>
            <div className="milestone-tags">
              <span className="tag">Colas Redis / BullMQ</span>
              <span className="tag">Inferencia Distribuida</span>
              <span className="tag">Soporte Multi-GPU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
