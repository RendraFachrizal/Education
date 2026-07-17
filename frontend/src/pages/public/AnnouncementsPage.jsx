import { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function AnnouncementsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/announcements?limit=50')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Pengumuman</h1>
          <p>Informasi dan pengumuman resmi sekolah</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {loading ? <Loading /> : (
            <div className="announcement-list">
              {data.map(item => (
                <div key={item.id} className="announcement-item">
                  <div className="announcement-icon"><Megaphone size={24} /></div>
                  <div className="announcement-body">
                    <h3>{item.title}</h3>
                    <span className="announcement-date">{new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada pengumuman.</p>}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #E02424, #9B1C1C); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .announcement-list { display: flex; flex-direction: column; gap: 1rem; }
        .announcement-item { display: flex; gap: 1rem; background: #fff; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border-left: 4px solid #E02424; }
        .announcement-icon { color: #E02424; flex-shrink: 0; }
        .announcement-body h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
        .announcement-date { font-size: 0.75rem; color: #9CA3AF; display: block; margin-bottom: 0.5rem; }
        .announcement-body p { font-size: 0.875rem; color: #4B5563; line-height: 1.6; }
      `}</style>
    </div>
  );
}
