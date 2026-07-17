import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && <ChevronRight size={14} className="breadcrumb-sep" />}
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
      <style>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8125rem;
          color: #6B7280;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .breadcrumb-item a { color: #1A56DB; }
        .breadcrumb-item a:hover { text-decoration: underline; }
        .breadcrumb-sep { color: #D1D5DB; }
        .breadcrumb-current { color: #374151; font-weight: 500; }
      `}</style>
    </nav>
  );
}
