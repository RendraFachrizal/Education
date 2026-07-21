import { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import api, { getFullUrl } from '../../services/api';
import Loading from '../../components/common/Loading';
import Lightbox from '../../components/ui/Lightbox';

export default function GalleriesPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    api.get('/galleries?limit=50')
      .then(({ data: res }) => setAlbums(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openAlbum = async (album) => {
    setSelectedAlbum(album);
    setPhotosLoading(true);
    try {
      const { data: res } = await api.get(`/galleries/${album.id}`);
      setPhotos(res.data?.photos || []);
    } catch { setPhotos([]); }
    setPhotosLoading(false);
  };

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Galeri</h1>
          <p>Dokumentasi kegiatan dan momen sekolah</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? <Loading /> : !selectedAlbum ? (
            <>
              <div className="gallery-grid">
                {albums.map(a => (
                  <div key={a.id} className="gallery-album" onClick={() => openAlbum(a)}>
                    <div className="gallery-album-icon"><Image size={32} /></div>
                    <h3>{a.title}</h3>
                    {a.description && <p>{a.description}</p>}
                  </div>
                ))}
              </div>
              {albums.length === 0 && <p style={{ textAlign: 'center', color: '#6B7280' }}>Belum ada galeri.</p>}
            </>
          ) : (
            <div>
              <button className="back-btn" onClick={() => setSelectedAlbum(null)}>← Kembali ke album</button>
              <h2 className="album-title">{selectedAlbum.title}</h2>
              {photosLoading ? <Loading /> : (
                <div className="photo-grid">
                  {photos.map((p, i) => (
                    <div key={p.id} className="photo-item" onClick={() => setLightboxIndex(i)}>
                      <img src={getFullUrl(p.image)} alt={p.caption || ''} />
                    </div>
                  ))}
                  {photos.length === 0 && <p style={{ color: '#6B7280' }}>Belum ada foto di album ini.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Lightbox images={photos.map(p => ({ src: getFullUrl(p.image), caption: p.caption }))} index={lightboxIndex} onClose={() => setLightboxIndex(-1)} />

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .gallery-album { background: #fff; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.2s; }
        .gallery-album:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
        .gallery-album-icon { color: #7C3AED; margin-bottom: 0.75rem; }
        .gallery-album h3 { font-size: 1rem; font-weight: 600; color: #111827; }
        .gallery-album p { font-size: 0.8125rem; color: #6B7280; margin-top: 0.25rem; }
        .back-btn { background: none; border: 1px solid #D1D5DB; border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.875rem; cursor: pointer; margin-bottom: 1rem; }
        .back-btn:hover { background: #F9FAFB; }
        .album-title { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
        .photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        .photo-item { aspect-ratio: 1; overflow: hidden; border-radius: 8px; cursor: pointer; }
        .photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .photo-item:hover img { transform: scale(1.05); }
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr; } .photo-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
