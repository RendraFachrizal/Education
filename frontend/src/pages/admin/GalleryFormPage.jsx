import { useState, useEffect } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';
import ImagePreview from '../../components/common/ImagePreview';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';

export default function GalleryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', status: 'active' });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/galleries/${id}`)
        .then(({ data }) => {
          const d = data.data;
          setForm({ title: d.title, description: d.description || '', status: d.status });
          setImages(d.photos || []);
        })
        .catch(() => addNotification('Gagal memuat data', 'error'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, addNotification]);

  const handleUpload = async (res) => {
    if (!res || !id) return;
    setImages(prev => [...prev, { id: Date.now(), url: res.url, caption: '' }]);
  };

  const handleRemoveImage = async (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    try {
      await api.delete(`/galleries/${id}/images/${imageId}`);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return addNotification('Judul harus diisi', 'error');
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/galleries/${id}`, form);
        addNotification('Album diupdate', 'success');
      } else {
        const { data: res } = await api.post('/galleries', form);
        addNotification('Album ditambahkan', 'success');
        if (images.length > 0) {
          for (const img of images) {
            if (typeof img.id === 'number') {
              await api.post(`/galleries/${res.data.id}/images`, img);
            }
          }
        }
        navigate('/admin/galeri');
        return;
      }
      navigate('/admin/galeri');
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminPage title={isEdit ? 'Edit Album' : 'Tambah Album'}><div style={{ textAlign: 'center', padding: '3rem' }}>Memuat...</div></AdminPage>;

  return (
    <AdminPage title={isEdit ? 'Edit Album' : 'Tambah Album'}>
      <div style={{ maxWidth: 700, background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Judul Album</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
          <div className="form-group"><label>Deskripsi</label><textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
          <div className="form-group"><label>Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="active">Aktif</option><option value="inactive">Tidak Aktif</option>
          </select></div>

          {isEdit && (
            <div className="form-group">
              <label>Foto-foto</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {images.map(img => (
                  <div key={img.id} style={{ position: 'relative' }}>
                    <ImagePreview src={img.url} size={100} />
                    <button type="button" onClick={() => handleRemoveImage(img.id)}
                      style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <FileUpload onUpload={handleUpload} module="galleries" label="Tambah Foto" />
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button variant="outline" onClick={() => navigate('/admin/galeri')}>Batal</Button>
            <Button variant="primary" type="submit" loading={saving}>Simpan</Button>
          </div>
        </form>
      </div>
    </AdminPage>
  );
}
