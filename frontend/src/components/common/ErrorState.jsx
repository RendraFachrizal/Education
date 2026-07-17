import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ message = 'Terjadi kesalahan', onRetry }) {
  return (
    <div className="error-state">
      <AlertTriangle size={48} strokeWidth={1} />
      <h3>Gagal Memuat Data</h3>
      <p>{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} style={{ marginTop: '1rem' }}>
          Coba Lagi
        </Button>
      )}
      <style>{`
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          color: #DC2626;
          text-align: center;
        }
        .error-state h3 {
          margin-top: 1rem;
          font-size: 1.125rem;
          color: #DC2626;
        }
        .error-state p {
          margin-top: 0.25rem;
          font-size: 0.875rem;
          color: #6B7280;
        }
      `}</style>
    </div>
  );
}
