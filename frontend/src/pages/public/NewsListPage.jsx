import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { getFullUrl } from '../../services/api';
import Loading from '../../components/common/Loading';

function getExcerpt(html, max = 120) {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > max ? text.substring(0, max) + '...' : text;
}

export default function NewsListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get('/news', { params: { page, limit: 9 } })
      .then(({ data: res }) => {
        setData(res.data.data || []);
        setPagination(res.data.pagination);
      }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  const totalPages = pagination ? pagination.totalPages : 1;

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Berita</h1>
          <p>Informasi dan kegiatan terbaru SDN Profile</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : (
            <>
              <div className="news-list-grid">
                {data.map(item => (
                  <Link key={item.id} to={`/berita/${item.slug}`} className="news-card">
                    <div className="news-thumb">
                      <img src={getFullUrl(item.thumbnail) || '/placeholder.svg'} alt={item.title} />
                    </div>
                    <div className="news-body">
                      <span className="news-category">{item.category_name}</span>
                      <span className="news-date">{new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <h3>{item.title}</h3>
                      <p>{getExcerpt(item.content)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {pagination && totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Sebelumnya</button>
                  <span>{page} dari {totalPages}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Selanjutnya</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #1A56DB, #1E40AF); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .news-list-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .news-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: transform 0.2s; }
        .news-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
        .news-thumb { height: 200px; overflow: hidden; }
        .news-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .news-body { padding: 1.25rem; }
        .news-category { display: inline-block; padding: 0.125rem 0.5rem; background: #E1EFFE; color: #1A56DB; border-radius: 999px; font-size: 0.75rem; font-weight: 500; margin-bottom: 0.5rem; }
        .news-date { display: block; font-size: 0.75rem; color: #9CA3AF; margin-bottom: 0.5rem; }
        .news-body h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .news-body p { font-size: 0.875rem; color: #6B7280; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem; }
        .pagination button { padding: 0.5rem 1rem; border: 1px solid #D1D5DB; border-radius: 8px; background: #fff; font-size: 0.875rem; cursor: pointer; }
        .pagination button:disabled { opacity: 0.5; cursor: not-allowed; }
        .pagination span { font-size: 0.875rem; color: #6B7280; }
        @media (max-width: 768px) { .news-list-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
