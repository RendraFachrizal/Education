import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../../services/api';

export default function PublicFooter() {
  const [s, setS] = useState({});

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      const items = data.data || data || {};
      if (Array.isArray(items)) {
        const map = {};
        items.forEach(item => { map[item.key] = item.value; });
        setS(map);
      } else {
        setS(items);
      }
    }).catch(() => {});
  }, []);

  return (
    <footer className="public-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <img src="/school-svgrepo-com.svg" alt="Logo" width={40} height={40} />
              <h3>{s.school_name || 'SDN Profile'}</h3>
            </div>
            <p className="footer-desc">
              {s.about_us || 'Sekolah Dasar unggulan yang mencetak generasi berprestasi dan berakhlak mulia.'}
            </p>
          </div>

          <div className="footer-col">
            <h4>Menu Cepat</h4>
            <ul className="footer-links">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/profil">Profil</Link></li>
              <li><Link to="/berita">Berita</Link></li>
              <li><Link to="/ppdb">PPDB</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Kontak</h4>
            <ul className="footer-contact">
              <li><MapPin size={16} /> {s.address || 'Jl. Pendidikan No. 1, Jakarta'}</li>
              <li><Phone size={16} /> {s.phone || '(021) 1234-5678'}</li>
              <li><Mail size={16} /> {s.email || 'info@sdprofile.sch.id'}</li>
              <li><Clock size={16} /> {s.operating_hours || 'Senin - Jumat, 07:00 - 16:00'}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {s.school_name || 'SDN Profile'}. Hak Cipta Dilindungi.</p>
        </div>
      </div>

      <style>{`
        .public-footer {
          background: #1F2937;
          color: #D1D5DB;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1rem 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 2rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .footer-brand h3 {
          color: #fff;
          font-size: 1.25rem;
        }
        .footer-desc {
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .footer-col h4 {
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .footer-links li { margin-bottom: 0.5rem; }
        .footer-links a {
          font-size: 0.875rem;
          color: #D1D5DB;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #fff; }
        .footer-contact li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 1.5rem 0;
          margin-top: 2rem;
          text-align: center;
          font-size: 0.8125rem;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
