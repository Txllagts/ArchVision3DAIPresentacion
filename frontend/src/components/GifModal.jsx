import React, { useEffect } from 'react';
import { PlayCircle, X, Smartphone } from 'lucide-react';

export default function GifModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="gif-modal active" id="gif-modal" aria-hidden="false">
      <div className="gif-modal-backdrop" id="gif-modal-backdrop" onClick={onClose}></div>
      <div className="gif-modal-content glass-panel">
        <div className="gif-modal-header">
          <div className="gif-modal-title">
            <PlayCircle size={20} /> 
            <span>ArchVision 3D AI — Demostración Interactiva</span>
          </div>
          <button className="gif-modal-close" id="gif-modal-close" onClick={onClose} aria-label="Cerrar vista previa">
            <X size={20} />
          </button>
        </div>
        <div className="gif-modal-body">
          <img src="/arch1.gif" alt="ArchVision 3D AI Fullscreen Demo" className="gif-modal-img" />
        </div>
        <div className="gif-modal-footer">
          <span className="modal-hint"><Smartphone size={16} /> Optimizado para vista móvil y de escritorio</span>
        </div>
      </div>
    </div>
  );
}
