import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, RotateCcw, ShieldAlert, PlusCircle, Home, Send, CheckCheck, Check, Sun, Ruler } from 'lucide-react';

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '¡Hola! Soy tu asistente de diseño espacial. He analizado el proyecto actual: tienes <strong>142.8 m²</strong> construidos con 3 estancias principales. ¿En qué te gustaría avanzar?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    try {
      // Fetch from backend API
      const res = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('Fallback logic');
      }
    } catch {
      // Local fallback
      setTimeout(() => {
        let reply = '';
        const lower = text.toLowerCase();
        if (lower.includes('auditar') || lower.includes('reglas') || lower.includes('coherencia')) {
          reply = `🔍 <strong>Auditoría finalizada con éxito:</strong><br>
          • ✅ Todas las estancias poseen puertas de acceso válidas.<br>
          • ✅ Sin vanos flotantes en los 14 muros analizados.<br>
          • ⚠️ <em>Sugerencia:</em> El dormitorio principal tiene un ratio de iluminación del 12% (mínimo recomendado: 15%). ¿Deseas agrandar la ventana este?`;
        } else if (lower.includes('habitación') || lower.includes('dormitorio') || lower.includes('crear')) {
          reply = `✨ He generado la propuesta en memoria: <strong>Estancia de 4.00m x 4.00m</strong> (16 m²) adosada al muro norte con 2 ventanas de 1.50m. Pulsa <code>Aceptar</code> o presiona <code>Ctrl+Z</code> para deshacer.`;
        } else if (lower.includes('cubierta') || lower.includes('techo')) {
          reply = `🏠 He recalculado las cumbreras para la <strong>Cubierta a Dos Aguas</strong> con inclinación del 28%. Geometría paramétrica actualizada sin fisuras topológicas.`;
        } else {
          reply = `Comprendido. He parametrizado tu solicitud: <em>"${text}"</em>. La escena conserva la integridad dimensional y las cotas han sido actualizadas en tiempo real.`;
        }
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: reply }]);
      }, 500);
    } finally {
      setIsThinking(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: '¡Hola! Soy tu asistente de diseño espacial. He analizado el proyecto actual: tienes <strong>142.8 m²</strong> construidos con 3 estancias principales. ¿En qué te gustaría avanzar?'
      }
    ]);
  };

  return (
    <section className="section assistant-section" id="asistente">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-badge"><Sparkles size={16} /> Inteligencia Aumentada</div>
          <h2 className="section-title">Copiloto y <span className="text-gradient">Auditor Arquitectónico</span></h2>
          <p className="section-subtitle">
            No solo dibuja: entiende las relaciones espaciales, comprueba la iluminación natural y audita la coherencia constructiva.
          </p>
        </div>

        <div className="assistant-interactive-grid">
          {/* Chat Simulation Box */}
          <div className="chat-sim-card glass-panel">
            <div className="chat-sim-header">
              <div className="copilot-avatar">
                <Bot size={20} />
              </div>
              <div className="copilot-info">
                <div className="copilot-name">ArchVision AI Copilot</div>
                <div className="copilot-status"><span className="dot-online"></span> Listo para asistir (Tecla A)</div>
              </div>
              <button className="chat-reset-btn" onClick={handleReset} title="Reiniciar conversación">
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="chat-messages-scroll" ref={scrollRef}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
                  dangerouslySetInnerHTML={{ __html: `<p>${msg.text}</p>` }}
                />
              ))}
              {isThinking && (
                <div className="chat-bubble ai-bubble">
                  <p><em>Analizando parámetros del modelo...</em></p>
                </div>
              )}
            </div>

            {/* Quick Action Prompts */}
            <div className="chat-quick-actions">
              <button className="quick-prompt-chip" onClick={() => handleSend('Auditar coherencia del modelo')}>
                <ShieldAlert size={14} /> Auditar modelo
              </button>
              <button className="quick-prompt-chip" onClick={() => handleSend('Añadir una habitación de 4x4m con dos ventanas')}>
                <PlusCircle size={14} /> Crear dormitorio 4x4m
              </button>
              <button className="quick-prompt-chip" onClick={() => handleSend('Cambiar la cubierta a estilo dos aguas')}>
                <Home size={14} /> Cambiar cubierta
              </button>
            </div>

            {/* Input area */}
            <form 
              className="chat-input-bar" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe una instrucción arquitectónica..." 
                autoComplete="off"
              />
              <button type="submit" className="btn-send-chat">
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Auditor Feature List */}
          <div className="auditor-features-panel glass-panel">
            <h3 className="panel-heading"><CheckCheck size={20} /> Reglas de Auditoría Automática</h3>
            <div className="audit-rule-item">
              <div className="audit-rule-icon pass"><Check size={16} /></div>
              <div className="audit-rule-info">
                <strong>Verificación de Accesibilidad</strong>
                <p>Detecta habitaciones cerradas sin ninguna puerta de entrada o con vanos bloqueados.</p>
              </div>
            </div>

            <div className="audit-rule-item">
              <div className="audit-rule-icon pass"><Check size={16} /></div>
              <div className="audit-rule-info">
                <strong>Vanos y Muros Flotantes</strong>
                <p>Identifica ventanas fuera del rango geométrico del muro o paredes duplicadas en la misma coordenada.</p>
              </div>
            </div>

            <div className="audit-rule-item">
              <div className="audit-rule-icon alert"><Sun size={16} /></div>
              <div className="audit-rule-info">
                <strong>Ratio de Iluminación Natural</strong>
                <p>Calcula el porcentaje de superficie vidriada respecto al área útil de cada estancia.</p>
              </div>
            </div>

            <div className="audit-rule-item">
              <div className="audit-rule-icon pass"><Ruler size={16} /></div>
              <div className="audit-rule-info">
                <strong>Cálculo de Escaleras Confortables</strong>
                <p>Valida la ley de Blondel (2 contrahuellas + 1 huella = 63-65 cm) para evitar peldaños empinados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
