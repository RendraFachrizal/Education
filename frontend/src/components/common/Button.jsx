export default function Button({ children, variant = 'primary', size = 'md', disabled, loading, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="btn-spinner" />}
      {children}
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
          border: 1px solid transparent;
          text-decoration: none;
        }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn--sm { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
        .btn--md { padding: 0.625rem 1.25rem; font-size: 0.875rem; }
        .btn--lg { padding: 0.75rem 1.5rem; font-size: 1rem; }
        .btn--primary { background: #1A56DB; color: #fff; }
        .btn--primary:hover:not(:disabled) { background: #1340A0; }
        .btn--secondary { background: #0E9F6E; color: #fff; }
        .btn--secondary:hover:not(:disabled) { background: #057A55; }
        .btn--danger { background: #E02424; color: #fff; }
        .btn--danger:hover:not(:disabled) { background: #C81E1E; }
        .btn--outline { background: transparent; border-color: #D1D5DB; color: #374151; }
        .btn--outline:hover:not(:disabled) { background: #F9FAFB; }
        .btn--ghost { background: transparent; color: #374151; }
        .btn--ghost:hover:not(:disabled) { background: #F3F4F6; }
        .btn-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
