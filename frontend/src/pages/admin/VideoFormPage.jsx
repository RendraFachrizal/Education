import { useState, useEffect } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function VideoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', url: '', platform: 'youtube', thumbnail_url: '', category: '', status: 'active' });

  useEffect(() => {
    if (isEdit) {
      api.get(`/videos/${id}`)
        .then(({ data }) => {
          const d = data.data;
          setForm({ title: d.title, description: d.description || '', url: d.url, platform: d.platform, thumbnail_url: d.thumbnail_url || '', category: d.category || '', status: d.status });
        })
        .catch(() => addNotification('Gagal memuat data', 'error'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, addNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return addNotification('Judul dan URL harus diisi', 'error');
    setSaving(true);
    try {
      if (isEdit) { await api.put(`/videos/${id}`, form); addNotification('Video diupdate', 'success'); }
      else { await api.post('/videos', form); addNotification('Video ditambahkan', 'success'); }
      navigate('/admin/video');
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminPage title={isEdit ? 'Edit Video' : 'Tambah Video'}><div style={{ textAlign: 'center', padding: '3rem' }}>Memuat...</div></AdminPage>;

  return (
    <AdminPage title={isEdit ? 'Edit Video' : 'Tambah Video'}>
      <div style={{ maxWidth: 600, background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Judul Video</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
          <div className="form-group"><label>Deskripsi</label><textarea rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
          <div className="form-group"><label>URL Video</label><input value={form.url} onChange={e => setForm({...form, url: e.target.value})} /></div>
          <div className="form-row">
            <div className="form-group"><label>Platform</label><select value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
              <option value="youtube">YouTube</option><option value="vimeo">Vimeo</option><option value="other">Lainnya</option>
            </select></div>
            <div className="form-group"><label>Kategori</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
          </div>
          <div className="form-actions">
            <Button variant="outline" onClick={() => navigate('/admin/video')}>Batal</Button>
            <Button variant="primary" type="submit" loading={saving}>Simpan</Button>
          </div>
        </form>
      </div>
    </AdminPage>
  );
}
