import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function EventsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/events?limit=50')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Kalender Acara</h1>
          <p>Jadwal kegiatan dan acara sekolah</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {loading ? <Loading /> : (
            <div className="events-list">
              {data.map(item => {
                const start = new Date(item.start_date);
                return (
                  <div key={item.id} className="event-item">
                    <div className="event-date-box">
                      <span className="event-day">{start.getDate()}</span>
                      <span className="event-month">{start.toLocaleDateString('id-ID', { month: 'short' })}</span>
                    </div>
                    <div className="event-body">
                      <h3>{item.title}</h3>
                      <div className="event-info">
                        <span><Calendar size={14} /> {start.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {item.location && <span><MapPin size={14} /> {item.location}</span>}
                      </div>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </div>
                );
              })}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada acara.</p>}
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
        .events-list { display: flex; flex-direction: column; gap: 1rem; }
        .event-item { display: flex; gap: 1rem; background: #fff; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .event-date-box { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 60px; background: #FFFBEB; border-radius: 10px; padding: 0.75rem; }
        .event-day { font-size: 1.5rem; font-weight: 800; color: #D97706; line-height: 1; }
        .event-month { font-size: 0.75rem; color: #D97706; font-weight: 600; text-transform: uppercase; }
        .event-body { flex: 1; }
        .event-body h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; }
        .event-info { display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8125rem; color: #6B7280; margin-bottom: 0.5rem; }
        .event-info span { display: flex; align-items: center; gap: 0.25rem; }
        .event-body p { font-size: 0.875rem; color: #4B5563; line-height: 1.6; }
      `}</style>
    </div>
  );
}
