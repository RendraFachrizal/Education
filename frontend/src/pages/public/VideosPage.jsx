import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function VideosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get('/videos?limit=50')
      .then(({ data: res }) => {
        setData(res.data.data || []);
        if (res.data.data?.length > 0) setActive(res.data.data[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vmMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;
    return url;
  };

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Video</h1>
          <p>Tonton video kegiatan dan profil sekolah</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : (
            <div className="video-layout">
              <div className="video-main">
                {active && (
                  <>
                    <div className="video-player">
                      <iframe src={getEmbedUrl(active.url)} title={active.title} allowFullScreen />
                    </div>
                    <h3 className="video-title">{active.title}</h3>
                    {active.description && <p className="video-desc">{active.description}</p>}
                  </>
                )}
              </div>
              <div className="video-sidebar">
                <h4>Daftar Video</h4>
                {data.map(v => (
                  <div key={v.id} className={`video-item ${active?.id === v.id ? 'active' : ''}`} onClick={() => setActive(v)}>
                    <div className="video-thumb">
                      <Play size={20} />
                      {v.thumbnail_url && <img src={v.thumbnail_url} alt="" />}
                    </div>
                    <div className="video-info">
                      <span className="video-item-title">{v.title}</span>
                      <span className="video-item-meta">{v.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #DC2626, #991B1B); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .video-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .video-player { position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden; }
        .video-player iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .video-title { font-size: 1.125rem; font-weight: 600; color: #111827; margin-top: 1rem; }
        .video-desc { font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem; }
        .video-sidebar { background: #fff; border-radius: 12px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .video-sidebar h4 { font-size: 0.875rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
        .video-item { display: flex; gap: 0.75rem; padding: 0.5rem; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .video-item:hover, .video-item.active { background: #F3F4F6; }
        .video-thumb { width: 80px; height: 50px; border-radius: 6px; overflow: hidden; flex-shrink: 0; background: #374151; display: flex; align-items: center; justify-content: center; position: relative; color: #fff; }
        .video-thumb img { position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
        .video-info { display: flex; flex-direction: column; gap: 0.125rem; }
        .video-item-title { font-size: 0.8125rem; font-weight: 500; color: #111827; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .video-item-meta { font-size: 0.6875rem; color: #9CA3AF; }
        @media (max-width: 768px) { .video-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
