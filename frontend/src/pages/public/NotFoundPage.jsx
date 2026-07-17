import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link to="/" className="back-home">
        <Home size={18} />
        Kembali ke Beranda
      </Link>

      <style>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          padding: 2rem;
        }
        .not-found h1 {
          font-size: 6rem;
          font-weight: 800;
          color: #1A56DB;
          line-height: 1;
        }
        .not-found h2 {
          font-size: 1.5rem;
          margin-top: 1rem;
        }
        .not-found p {
          color: #6B7280;
          margin-top: 0.5rem;
        }
        .back-home {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          background: #1A56DB;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .back-home:hover { background: #1340A0; }
      `}</style>
    </div>
  );
}
