import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: '¿Qué diferencia a ArchVision de otros generadores 3D basados en IA?',
      a: 'La mayoría de generadores entregan una sola malla "estática" o "muerta", imposible de modificar constructivamente. ArchVision utiliza la IA para crear el borrador, pero lo descompone en <strong>entidades arquitectónicas paramétricas vivas</strong> (muros, puertas con vanos booleanos, losas y cubiertas), permitiéndote editar cada medida y parámetro con precisión milimétrica.'
    },
    {
      q: '¿Cómo funciona el motor de reconstrucción desde imágenes?',
      a: 'Utilizamos un microservicio en FastAPI conectado a modelos neuronales de vanguardia (TripoSR para inferencia ultrarrápida y el motor de difusión multicámara InstantMesh para alta fidelidad geométrica). El pipeline remueve el fondo con RMBG, genera la malla inicial, aplica alineación PCA, reconstrucción superficial Poisson para cerrar huecos y transfiere los colores RGBA por k-d Tree.'
    },
    {
      q: '¿Puedo importar planos arquitectónicos dibujados a mano o en AutoCAD?',
      a: 'Sí. Puedes subir cualquier imagen de plano en formato PNG, JPG o WebP. Solo debes indicar una medida de referencia conocida para calibrar la escala en metros, y el motor de visión computacional detectará automáticamente las líneas de muros para levantarlos en 3D de inmediato.'
    },
    {
      q: '¿Qué tecnologías componen el núcleo técnico de la plataforma?',
      a: 'El proyecto está construido como un monorepo TypeScript estricto con Next.js 15, React 19, Three.js / React Three Fiber para renderizado 3D en WebGL, Prisma ORM conectado a PostgreSQL en Supabase, y un backend de IA independiente en Python con FastAPI y PyTorch.'
    }
  ];

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><HelpCircle size={16} /> Preguntas Frecuentes</div>
          <h2 className="section-title">Todo lo que necesitas saber sobre <span className="text-gradient">ArchVision 3D AI</span></h2>
        </div>

        <div className="faq-accordion-container">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item glass-panel ${activeIndex === index ? 'active' : ''}`}
            >
              <button className="faq-trigger" onClick={() => toggleAccordion(index)}>
                <span>{item.q}</span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              <div className="faq-content">
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
