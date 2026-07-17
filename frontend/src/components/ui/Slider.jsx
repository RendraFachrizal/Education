import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slider({ slides, interval = 5000 }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval, next]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="slider">
      <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-slide">
            <img src={slide.image} alt={slide.title || ''} className="slider-img" />
            <div className="slider-overlay">
              <div className="slider-content">
                {slide.title && <h2>{slide.title}</h2>}
                {slide.subtitle && <p>{slide.subtitle}</p>}
                {slide.button_text && (
                  <a href={slide.button_url || '#'} className="slider-btn">
                    {slide.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="slider-arrow slider-arrow--left" onClick={prev}>
            <ChevronLeft size={24} />
          </button>
          <button className="slider-arrow slider-arrow--right" onClick={next}>
            <ChevronRight size={24} />
          </button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </>
      )}

      <style>{`
        .slider {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 500px;
        }
        .slider-track {
          display: flex;
          transition: transform 0.5s ease;
          height: 100%;
        }
        .slider-slide {
          min-width: 100%;
          position: relative;
          height: 100%;
        }
        .slider-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slider-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-content {
          text-align: center;
          color: #fff;
          max-width: 700px;
          padding: 1rem;
        }
        .slider-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .slider-content p {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        .slider-btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          background: #1A56DB;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .slider-btn:hover { background: #1340A0; }
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          backdrop-filter: blur(4px);
        }
        .slider-arrow:hover { background: rgba(255,255,255,0.3); }
        .slider-arrow--left { left: 1rem; }
        .slider-arrow--right { right: 1rem; }
        .slider-dots {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }
        .slider-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          transition: all 0.2s;
        }
        .slider-dot.active { background: #fff; width: 32px; border-radius: 6px; }

        @media (max-width: 768px) {
          .slider { height: 300px; }
          .slider-content h2 { font-size: 1.5rem; }
          .slider-content p { font-size: 0.875rem; }
          .slider-arrow { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
}
