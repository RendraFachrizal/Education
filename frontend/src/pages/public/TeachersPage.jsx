import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/teachers?limit=50')
      .then(({ data: res }) => setTeachers(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Guru & Tenaga Pengajar</h1>
          <p>Tenaga pendidik profesional dan berdedikasi</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : (
            <div className="teacher-grid">
              {teachers.map(t => (
                <div key={t.id} className="teacher-card">
                  <div className="teacher-avatar">
                    <img src={t.photo || '/avatar-placeholder.svg'} alt={t.name} />
                  </div>
                  <h3>{t.nuptk ? `${t.name}` : t.name}</h3>
                  <span className="teacher-field">{t.field}</span>
                  {t.nuptk && <span className="teacher-nuptk">NUPTK: {t.nuptk}</span>}
                </div>
              ))}
              {teachers.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada data guru.</p>}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #0E9F6E, #057A55); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .teacher-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .teacher-card { background: #fff; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: transform 0.2s; }
        .teacher-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
        .teacher-avatar { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin: 0 auto 1rem; background: #F3F4F6; }
        .teacher-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .teacher-card h3 { font-size: 0.9375rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
        .teacher-field { display: block; font-size: 0.8125rem; color: #0E9F6E; font-weight: 500; }
        .teacher-nuptk { display: block; font-size: 0.75rem; color: #9CA3AF; margin-top: 0.5rem; }
        @media (max-width: 768px) { .teacher-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
