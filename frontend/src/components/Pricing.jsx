import React, { useState } from 'react';
import { Sparkle, Check, Info } from 'lucide-react';

const plansData = [
  {
    id: 'free',
    name: 'Free',
    description: 'Para probar la herramienta con un proyecto real.',
    priceMonthly: '$0',
    priceAnnual: '$0',
    periodMonthly: 'Para siempre',
    periodAnnual: 'Para siempre',
    isEnterprise: false,
    recommended: false,
    features: [
      '3 proyectos activos',
      '500 MB de almacenamiento',
      'Editor 2D y 3D completo',
      'Importación de planos y detección de muros',
      'Auditoría dimensional del modelo'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para quien entrega proyectos a clientes.',
    priceMonthly: '$79.000',
    priceAnnual: '$63.200',
    periodMonthly: 'al mes, IVA incluido',
    periodAnnual: 'al mes, facturado anual ($758.400 / año)',
    isEnterprise: false,
    recommended: true,
    features: [
      '50 proyectos y 20 GB',
      'Hasta 3 personas en el espacio de trabajo',
      '50 versiones guardadas por proyecto',
      '100 análisis de IA al mes',
      'Exportación en todos los formatos'
    ]
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Para oficinas con varios proyectos a la vez.',
    priceMonthly: '$249.000',
    priceAnnual: '$199.000',
    periodMonthly: 'al mes, IVA incluido',
    periodAnnual: 'al mes, facturado anual ($2.388.000 / año)',
    isEnterprise: false,
    recommended: false,
    features: [
      '300 proyectos y 200 GB',
      'Hasta 15 personas',
      '1.000 análisis de IA al mes',
      'Render hasta 4K',
      '200 versiones por proyecto'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Volumen alto, acuerdos a medida y facturación propia.',
    priceMonthly: 'A convenir',
    priceAnnual: 'A convenir',
    periodMonthly: 'Contrato a medida y facturación propia',
    periodAnnual: 'Contrato a medida y facturación propia',
    isEnterprise: true,
    recommended: false,
    features: [
      'Proyectos, almacenamiento y personas sin límite',
      'Render hasta 8K',
      'Acuerdo de nivel de servicio',
      'Facturación y soporte dedicados'
    ]
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <section className="section pricing-section" id="planes">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <Sparkle size={16} /> Flexibilidad
          </div>
          <h2 className="section-title">
            Planes Diseñados para <span className="text-gradient">Cada Necesidad</span>
          </h2>
          <p className="section-subtitle">
            Precios en pesos colombianos, IVA incluido. Puedes empezar gratis y cambiar de plan cuando quieras; al cancelar conservas lo pagado hasta el final del periodo.
          </p>
        </div>

        {/* Mensual / Anual Billing Toggle */}
        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-toggle" role="group" aria-label="Frecuencia de cobro">
            <button
              type="button"
              className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Mensual
            </button>
            <button
              type="button"
              className={`billing-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Anual
              <span className="annual-badge-discount">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {plansData.map((plan) => {
            const isAnnual = billingCycle === 'annual';
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            const period = isAnnual ? plan.periodAnnual : plan.periodMonthly;

            return (
              <div 
                key={plan.id} 
                className={`pricing-card glass-panel ${plan.recommended ? 'featured-plan' : ''}`}
              >
                {/* Plan Header */}
                <div className="plan-header">
                  <div className="plan-title-row">
                    <h3 className="plan-name">{plan.name}</h3>
                    {plan.recommended && (
                      <span className="plan-recommended-badge">Recomendado</span>
                    )}
                  </div>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                {/* Plan Price */}
                <div className="plan-price-wrap">
                  <div className={`plan-price-amount ${plan.isEnterprise ? 'enterprise-amount' : ''}`}>
                    {price}
                  </div>
                  <div className="plan-price-period">
                    {period}
                  </div>
                </div>

                {/* Features List */}
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={16} className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Ficha del texto informativo */}
        <div className="pricing-disclaimer-card glass-panel">
          <Info size={18} className="disclaimer-icon" />
          <p className="disclaimer-text">
            <strong>Nota informativa:</strong> Los precios están sujetos a cambios con el paso del tiempo.
          </p>
        </div>
      </div>
    </section>
  );
}
