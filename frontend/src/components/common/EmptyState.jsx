import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Belum Ada Data', description = 'Belum ada data yang tersedia.', action }) {
  return (
    <div className="empty-state">
      <Inbox size={48} strokeWidth={1} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="empty-action">{action}</div>}
      <style>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: #9CA3AF;
          text-align: center;
        }
        .empty-state h3 {
          margin-top: 1rem;
          font-size: 1.125rem;
          color: #6B7280;
        }
        .empty-state p {
          margin-top: 0.25rem;
          font-size: 0.875rem;
        }
        .empty-action { margin-top: 1rem; }
      `}</style>
    </div>
  );
}
