import React from 'react';
import { Sparkles, Camera, ScanLine, DoorOpen, Palette, Bot, CreditCard } from 'lucide-react';

export default function Capabilities() {
  return (
    <section className="section capabilities-section" id="capacidades">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Sparkles size={16} /> Arsenal Tecnológico</div>
          <h2 className="section-title">Todo lo que puedes hacer en <span className="text-gradient">ArchVision 3D AI</span></h2>
          <p className="section-subtitle">
            Una suite integral pensada para arquitectos, diseñadores de interiores, desarrolladores inmobiliarios y constructores.
          </p>
        </div>

        <div className="capabilities-grid">
          {/* Item 1 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-purple">
                <Camera size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Foto a Objeto 3D (TripoSR & InstantMesh HQ)</h3>
            <p>
              Sube una fotografía de un mueble, fachada o elemento constructivo. El microservicio aplica segmentación RMBG, reconstrucción de superficie de Poisson, alineación PCA y entrega un archivo GLB watertight optimizado.
            </p>
            <div className="cap-footer">
              <code>POST /api/v1/image-to-3d/generate</code>
            </div>
          </div>

          {/* Item 2 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-blue">
                <ScanLine size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Importación y Extrusión Automática de Planos</h3>
            <p>
              Carga planos en JPG, PNG o WebP. Fija la escala calibrando con una medida conocida (ej. una puerta de 0.90 m) y la visión por computador detectará los muros, generando la estructura 3D en segundos.
            </p>
            <div className="cap-footer">
              <span>Umbrales Otsu + Transformada de Hough</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-emerald">
                <DoorOpen size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Vanos Booleanos y Elementos Paramétricos</h3>
            <p>
              Coloca puertas y ventanas con un solo clic: el hueco en el muro se calcula dinámicamente con geometría booleana sin romper la topología. Inserta columnas, escaleras configurables y cubiertas adaptables.
            </p>
            <div className="cap-footer">
              <span>Geometría paramétrica en tiempo real</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-amber">
                <Palette size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Estudio de Materiales PBR y Pincel Rápido</h3>
            <p>
              Catálogo de texturas físicas: ladrillo visto, hormigón, maderas nobles, baldosas cerámicas, tejas y metales. Arrastra una muestra a la escena o presiona la tecla <code>G</code> para pintar con el pincel arquitectónico.
            </p>
            <div className="cap-footer">
              <span>Mapas Normales, Rugosidad y Albedo PBR</span>
            </div>
          </div>

          {/* Item 5 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-indigo">
                <Bot size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Copiloto de IA y Auditor de Normativa</h3>
            <p>
              Presiona la tecla <code>A</code> para dialogar con el asistente arquitectónico. Pídele crear ambientes, sugerir vanos o auditar tu modelo: detecta habitaciones inaccesibles, vanos flotantes o escaleras incómodas.
            </p>
            <div className="cap-footer">
              <span>Integración con LLM y Comandos Reversibles</span>
            </div>
          </div>

          {/* Item 6 */}
          <div className="cap-card glass-panel">
            <div className="cap-header">
              <div className="cap-icon-box gradient-pink">
                <CreditCard size={24} />
              </div>
              <div className="cap-badge ready">Disponible</div>
            </div>
            <h3>Gestión de Planes y Suscripciones (Wompi)</h3>
            <p>
              Sistema completo de cuotas, control de límites por plan (Gratuito, Pro y Studio) con integración de pasarela de pagos Wompi y almacenamiento seguro en Supabase Storage con URLs firmadas.
            </p>
            <div className="cap-footer">
              <span>Tokens seguros & Almacenamiento privado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
