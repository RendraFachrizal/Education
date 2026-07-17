import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function AchievementsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/achievements?limit=50')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Prestasi</h1>
          <p>Raihan prestasi siswa di berbagai bidang</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : (
            <div className="achievement-grid">
              {data.map(item => (
                <div key={item.id} className="achievement-card">
                  <div className="achievement-icon"><Trophy size={32} /></div>
                  <div className="achievement-rank">{item.rank}</div>
                  <h3>{item.title}</h3>
                  <div className="achievement-tags">
                    <span className="achievement-level">{item.level}</span>
                    <span className="achievement-category">{item.category}</span>
                    <span className="achievement-year">{item.year}</span>
                  </div>
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada data prestasi.</p>}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #F59E0B, #D97706); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .achievement-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .achievement-card { background: #fff; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .achievement-icon { color: #F59E0B; margin-bottom: 0.5rem; }
        .achievement-rank { font-size: 1.75rem; font-weight: 800; color: #D97706; margin-bottom: 0.5rem; }
        .achievement-card h3 { font-size: 0.9375rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
        .achievement-tags { display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
        .achievement-level, .achievement-category { padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
        .achievement-level { background: #E1EFFE; color: #1A56DB; }
        .achievement-category { background: #DEF7EC; color: #057A55; }
        .achievement-year { font-size: 0.75rem; color: #9CA3AF; }
        .achievement-card p { font-size: 0.8125rem; color: #6B7280; }
        @media (max-width: 768px) { .achievement-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
