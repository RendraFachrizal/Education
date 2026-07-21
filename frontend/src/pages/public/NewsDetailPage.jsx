import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import api, { getFullUrl } from '../../services/api';
import Loading from '../../components/common/Loading';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/news/${slug}`)
      .then(({ data }) => setItem(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;
  if (!item) return (
    <div className="public-page" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h2>Berita tidak ditemukan</h2>
      <Link to="/berita" style={{ color: '#1A56DB' }}>Kembali ke berita</Link>
    </div>
  );

  return (
    <div className="public-page">
      <div className="page-hero" style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Link to="/berita" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> Kembali
          </Link>
          <h1>{item.title}</h1>
          <div className="news-meta">
            <span><Calendar size={14} /> {new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span><User size={14} /> {item.author}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {item.thumbnail && (
            <img src={getFullUrl(item.thumbnail)} alt={item.title} className="detail-thumb" />
          )}
          <div className="detail-content" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #1A56DB, #1E40AF); color: #fff; text-align: center; }
        .page-hero h1 { font-size: 1.75rem; font-weight: 800; line-height: 1.3; }
        .news-meta { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1rem; font-size: 0.875rem; opacity: 0.9; }
        .news-meta span { display: flex; align-items: center; gap: 0.375rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 3rem 0; }
        .detail-thumb { width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 2rem; }
        .detail-content { font-size: 1rem; line-height: 1.9; color: #374151; }
        .detail-content h1, .detail-content h2, .detail-content h3 { margin: 1.5rem 0 0.75rem; color: #111827; }
        .detail-content p { margin-bottom: 1rem; }
        .detail-content img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
      `}</style>
    </div>
  );
}
