import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, School, Users, Trophy, Building2, ArrowRight } from 'lucide-react';
import api, { getFullUrl } from '../../services/api';
import Slider from '../../components/ui/Slider';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: `${color}15`, color }}>
        <Icon size={28} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

function getExcerpt(html, max = 120) {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > max ? text.substring(0, max) + '...' : text;
}

export default function HomePage() {
  const [sliders, setSliders] = useState([]);
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, achievements: 0, facilities: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/sliders').catch(() => ({ data: { data: { data: [] } } })),
      api.get('/news?limit=6').catch(() => ({ data: { data: { data: [] } } })),
      api.get('/achievements?limit=6').catch(() => ({ data: { data: { data: [] } } })),
      api.get('/student-statistics?limit=1').catch(() => ({ data: { data: [] } })),
      api.get('/teachers?limit=1').catch(() => ({ data: { data: { data: [], pagination: { total: 0 } } } })),
      api.get('/facilities?limit=1').catch(() => ({ data: { data: { data: [], pagination: { total: 0 } } } }))
    ]).then(([s, n, a, ss, t, f]) => {
      setSliders(s.data.data?.data || []);
      setNews(n.data.data?.data || []);
      setAchievements(a.data.data?.data || []);

      const studentData = ss.data.data?.[0] || {};
      const achData = a.data.data?.pagination || { total: 0 };
      const teachData = t.data.data?.pagination || { total: 0 };
      const facilityData = f.data.data?.pagination || { total: 0 };

      setStats({
        students: studentData.total_students || 0,
        total_class: studentData.total_class || 0,
        teachers: teachData.total || 0,
        achievements: achData.total || 0,
        facilities: facilityData.total || 0
      });
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Slider slides={sliders} />

      {/* Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCard icon={School} value={stats.students} label="Siswa" color="#1A56DB" />
            <StatCard icon={Users} value={stats.teachers} label="Guru" color="#0E9F6E" />
            <StatCard icon={Trophy} value={stats.achievements} label="Prestasi" color="#F59E0B" />
            <StatCard icon={Building2} value={stats.facilities} label="Fasilitas" color="#E02424" />
          </div>
        </div>
      </section>

      {/* News */}
      {news.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Berita Terbaru</h2>
              <Link to="/berita" className="section-link">Lihat Semua <ArrowRight size={16} /></Link>
            </div>
            <div className="news-grid">
              {news.map((item) => (
                <Link key={item.id} to={`/berita/${item.slug}`} className="news-card">
                  <div className="news-thumb">
                    <img src={getFullUrl(item.thumbnail) || '/placeholder.svg'} alt={item.title} />
                  </div>
                  <div className="news-body">
                    <span className="news-date">{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                    <h3>{item.title}</h3>
                    <p>{getExcerpt(item.content)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <div className="section-header">
              <h2>Prestasi Terbaru</h2>
              <Link to="/prestasi" className="section-link">Lihat Semua <ArrowRight size={16} /></Link>
            </div>
            <div className="achievement-grid">
              {achievements.map((item) => (
                <Card key={item.id} className="achievement-card">
                  <div className="achievement-rank">#{item.rank || 'Juara'}</div>
                  <h3>{item.title}</h3>
                  <span className="achievement-level">{item.level}</span>
                  <span className="achievement-year">{item.year}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .section--gray { background: #F9FAFB; }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .section-header h2 { font-size: 1.5rem; font-weight: 700; color: #111827; }
        .section-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #1A56DB;
          font-weight: 500;
        }
        .section-link:hover { text-decoration: underline; }

        .stats-section { padding: 3rem 0; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .stat-card {
          text-align: center;
          padding: 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .stat-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .stat-card-value {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
        }
        .stat-card-label {
          font-size: 0.875rem;
          color: #6B7280;
          margin-top: 0.25rem;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .news-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .news-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
        .news-thumb {
          height: 200px;
          overflow: hidden;
        }
        .news-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-body { padding: 1.25rem; }
        .news-date { font-size: 0.75rem; color: #9CA3AF; }
        .news-body h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0.5rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .achievement-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .achievement-card { text-align: center; padding: 1.5rem; }
        .achievement-rank {
          font-size: 1.5rem;
          font-weight: 800;
          color: #F59E0B;
          margin-bottom: 0.5rem;
        }
        .achievement-card h3 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        .achievement-level {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #E1EFFE;
          color: #1A56DB;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-right: 0.5rem;
        }
        .achievement-year { font-size: 0.75rem; color: #9CA3AF; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .news-grid { grid-template-columns: 1fr; }
          .achievement-grid { grid-template-columns: 1fr; }
          .section { padding: 2rem 0; }
        }
      `}</style>
    </div>
  );
}
