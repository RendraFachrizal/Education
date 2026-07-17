import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`accordion-item ${openIndex === index ? 'open' : ''}`}>
          <button className="accordion-header" onClick={() => toggle(index)}>
            <span>{item.question}</span>
            <ChevronDown size={18} className="accordion-icon" />
          </button>
          <div className="accordion-body" style={{
            maxHeight: openIndex === index ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease'
          }}>
            <div className="accordion-content">{item.answer}</div>
          </div>
        </div>
      ))}
      <style>{`
        .accordion { border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; }
        .accordion-item { border-bottom: 1px solid #E5E7EB; }
        .accordion-item:last-child { border-bottom: none; }
        .accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #374151;
          text-align: left;
          transition: background 0.2s;
        }
        .accordion-header:hover { background: #F9FAFB; }
        .accordion-icon {
          transition: transform 0.3s;
          color: #9CA3AF;
          flex-shrink: 0;
        }
        .accordion-item.open .accordion-icon { transform: rotate(180deg); }
        .accordion-content {
          padding: 0 1.25rem 1rem;
          font-size: 0.875rem;
          color: #6B7280;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
