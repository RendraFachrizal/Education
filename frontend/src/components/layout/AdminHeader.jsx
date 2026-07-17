import { useAuth } from '../../hooks/useAuth';

export default function AdminHeader({ title }) {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <h2 className="header-title">{title || 'Dashboard'}</h2>
      <div className="header-right">
        <span className="header-user">{user?.name}</span>
      </div>

      <style>{`
        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: #fff;
          border-bottom: 1px solid #E5E7EB;
        }
        .header-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .header-user {
          font-size: 0.875rem;
          color: #374151;
          font-weight: 500;
        }
      `}</style>
    </header>
  );
}
