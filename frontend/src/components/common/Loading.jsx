export default function Loading({ text = 'Memuat data...' }) {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <p>{text}</p>
      <style>{`
        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          gap: 1rem;
          color: #6B7280;
        }
        .loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid #E5E7EB;
          border-top-color: #1A56DB;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
