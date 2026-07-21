import { useState, useEffect } from 'react';
import api, { getFullUrl } from '../../services/api';
import Loading from '../../components/common/Loading';

export default function StaffPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/staffs?limit=50')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Staff & Tata Usaha</h1>
          <p>Tenaga kependidikan yang siap melayani</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : (
            <div className="staff-grid">
              {data.map(s => (
                <div key={s.id} className="staff-card">
                  <div className="staff-avatar">
                    <img src={getFullUrl(s.photo) || '/avatar-placeholder.svg'} alt={s.name} />
                  </div>
                  <h3>{s.name}</h3>
                  <span className="staff-position">{s.position}</span>
                </div>
              ))}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada data staff.</p>}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #7C3AED, #6D28D9); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .staff-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .staff-card { background: #fff; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .staff-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.07); transition: all 0.2s; }
        .staff-avatar { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto 1rem; background: #F3F4F6; }
        .staff-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .staff-card h3 { font-size: 0.9375rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
        .staff-position { display: block; font-size: 0.8125rem; color: #7C3AED; font-weight: 500; }
        @media (max-width: 768px) { .staff-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
