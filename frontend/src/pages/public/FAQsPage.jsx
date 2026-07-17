import { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function FAQsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    api.get('/faqs?limit=100')
      .then(({ data: res }) => setData(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const grouped = data.reduce((acc, item) => {
    const cat = item.category || 'Umum';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>FAQ</h1>
          <p>Pertanyaan yang sering diajukan</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {loading ? <Loading /> : (
            <div>
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="faq-group">
                  <h3 className="faq-category">{cat}</h3>
                  {items.map(item => (
                    <div key={item.id} className={`faq-item ${openId === item.id ? 'open' : ''}`}>
                      <button className="faq-question" onClick={() => setOpenId(openId === item.id ? null : item.id)}>
                        <HelpCircle size={18} />
                        <span>{item.question}</span>
                        <ChevronDown size={18} className="faq-chevron" />
                      </button>
                      <div className="faq-answer">{item.answer}</div>
                    </div>
                  ))}
                </div>
              ))}
              {data.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada FAQ.</p>}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #6B7280, #4B5563); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .faq-group { margin-bottom: 2rem; }
        .faq-category { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid #E5E7EB; }
        .faq-item { background: #fff; border-radius: 10px; margin-bottom: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden; }
        .faq-question { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 1rem; background: none; border: none; font-size: 0.9375rem; font-weight: 500; color: #111827; text-align: left; cursor: pointer; }
        .faq-question:hover { background: #F9FAFB; }
        .faq-question svg { flex-shrink: 0; }
        .faq-chevron { margin-left: auto; transition: transform 0.2s; color: #9CA3AF; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); }
        .faq-answer { max-height: 0; overflow: hidden; transition: all 0.2s; padding: 0 1rem; font-size: 0.875rem; color: #4B5563; line-height: 1.7; }
        .faq-item.open .faq-answer { max-height: 500px; padding: 0 1rem 1rem; }
      `}</style>
    </div>
  );
}
