export default function AdminPage({ title, subtitle, children }) {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">{title}</h2>
          {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="admin-page-content">
        {children}
      </div>
      <style>{`
        .admin-page { }
        .admin-page-header {
          margin-bottom: 1.5rem;
        }
        .admin-page-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }
        .admin-page-subtitle {
          font-size: 0.875rem;
          color: #6B7280;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
