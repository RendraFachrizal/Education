import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../../components/common/Loading';

export default function ProfilePage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      const items = data.data || data || {};
      const map = {};
      if (Array.isArray(items)) items.forEach(s => { map[s.key] = s.value; });
      else Object.assign(map, items);
      setSettings(map);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Profil Sekolah</h1>
          <p>{settings?.school_name || 'SDN Profile'}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-content">
              <h2>Tentang Kami</h2>
              <p>{settings?.about_us || 'Informasi tentang sekolah akan segera hadir.'}</p>

              {settings?.vision && (
                <div className="profile-block">
                  <h3>Visi</h3>
                  <p>{settings.vision}</p>
                </div>
              )}

              {settings?.mission && (
                <div className="profile-block">
                  <h3>Misi</h3>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{settings.mission}</p>
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-card">
                <h3>Informasi Sekolah</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Nama</span>
                    <span>{settings?.school_name || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Alamat</span>
                    <span>{settings?.address || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Telepon</span>
                    <span>{settings?.phone || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span>{settings?.email || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Website</span>
                    <span>{settings?.website || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero {
          background: linear-gradient(135deg, #1A56DB, #1E40AF);
          color: #fff;
          padding: 4rem 0;
          text-align: center;
        }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .profile-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        .profile-content h2 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
        .profile-content p { color: #4B5563; line-height: 1.8; }
        .profile-block { margin-top: 2rem; }
        .profile-block h3 { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.75rem; }
        .info-card { background: #F9FAFB; border-radius: 12px; padding: 1.5rem; }
        .info-card h3 { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 1rem; }
        .info-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .info-item { display: flex; justify-content: space-between; font-size: 0.875rem; }
        .info-label { color: #6B7280; font-weight: 500; }
        @media (max-width: 768px) { .profile-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
