export default function Card({ children, className = '', padding = '1.25rem', onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {children}
      <style>{`
        .card {
          background: #fff;
          border-radius: 12px;
          padding: ${padding};
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
        }
      `}</style>
    </div>
  );
}
