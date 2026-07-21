import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import api, { getFullUrl } from '../../services/api';
import Loading from '../../components/common/Loading';

export default function DownloadsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/downloads?limit=50')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const grouped = data.reduce((acc, item) => {
    const type = item.category || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const typeLabels = { document: 'Dokumen', form: 'Formulir', brochure: 'Brosur', other: 'Lainnya' };

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Download</h1>
          <p>Unduh dokumen dan formulir sekolah</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {loading ? <Loading /> : (
            <div>
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type} className="download-group">
                  <h3>{typeLabels[type] || type}</h3>
                  <div className="download-list">
                    {items.map(item => (
                      <a key={item.id} href={getFullUrl(item.file)} target="_blank" rel="noopener noreferrer" className="download-item">
                        <FileText size={20} />
                        <div className="download-info">
                          <span className="download-title">{item.title}</span>
                          {item.description && <span className="download-desc">{item.description}</span>}
                        </div>
                        <Download size={18} className="download-icon" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada file download.</p>}
            </div>
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
        .download-group { margin-bottom: 2rem; }
        .download-group h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
        .download-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .download-item { display: flex; align-items: center; gap: 1rem; background: #fff; border-radius: 10px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); text-decoration: none; transition: background 0.2s; }
        .download-item:hover { background: #F9FAFB; }
        .download-item { color: #1A56DB; }
        .download-info { flex: 1; display: flex; flex-direction: column; gap: 0.125rem; }
        .download-title { font-size: 0.875rem; font-weight: 500; color: #111827; }
        .download-desc { font-size: 0.75rem; color: #6B7280; }
        .download-icon { color: #9CA3AF; }
      `}</style>
    </div>
  );
}
