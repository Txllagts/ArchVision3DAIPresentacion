import React from 'react';
import { Compass, Cpu, Box, Layers, Bot, Sparkles, Play } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose }) {
  return (
    <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} id="mobile-drawer">
      <div className="mobile-drawer-content">
        <ul className="mobile-nav-links">
          <li>
            <a href="#filosofia" className="mobile-nav-link" onClick={onClose}>
              <Compass size={18} /> Filosofía de Diseño
            </a>
          </li>
          <li>
            <a href="#capacidades" className="mobile-nav-link" onClick={onClose}>
              <Cpu size={18} /> Capacidades Principales
            </a>
          </li>
          <li>
            <a href="#arquitectura" className="mobile-nav-link" onClick={onClose}>
              <Layers size={18} /> Arquitectura Técnica
            </a>
          </li>
          <li>
            <a href="#asistente" className="mobile-nav-link" onClick={onClose}>
              <Bot size={18} /> Copiloto Arquitectónico
            </a>
          </li>
          <li>
            <a href="#roadmap" className="mobile-nav-link highlight" onClick={onClose}>
              <Sparkles size={18} /> Próximos Hitos & Roadmap
            </a>
          </li>
        </ul>
        <div className="mobile-drawer-footer">
          <a href="#asistente" className="btn btn-primary btn-block" onClick={onClose}>
            <Bot size={18} /> Probar Copiloto IA
          </a>
        </div>
      </div>
    </div>
  );
}
