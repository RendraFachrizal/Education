import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!images || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}><X size={24} /></button>

      {images.length > 1 && (
        <>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
            <ChevronLeft size={32} />
          </button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={current.image || current} alt={current.caption || ''} />
        {current.caption && <p className="lightbox-caption">{current.caption}</p>}
        <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>
      </div>

      <style>{`
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: #fff;
          z-index: 1;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
          z-index: 1;
          padding: 1rem;
        }
        .lightbox-prev { left: 0.5rem; }
        .lightbox-next { right: 0.5rem; }
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 4px;
        }
        .lightbox-caption {
          text-align: center;
          color: #D1D5DB;
          margin-top: 0.75rem;
          font-size: 0.875rem;
        }
        .lightbox-counter {
          position: absolute;
          top: -2rem;
          left: 50%;
          transform: translateX(-50%);
          color: #9CA3AF;
          font-size: 0.8125rem;
        }
      `}</style>
    </div>
  );
}
