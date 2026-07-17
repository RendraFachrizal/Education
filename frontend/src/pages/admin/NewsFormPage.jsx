import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';
import ImagePreview from '../../components/common/ImagePreview';
import { newsService } from '../../services/newsService';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function NewsFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [form, setForm] = useState({
    title: '', content: '', category_id: '', author: '', status: 'draft',
    thumbnail: '', meta_title: '', meta_description: '', meta_keywords: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data.data || [])).catch(() => {});
    if (isEdit) {
      newsService.getById(id).then(({ data }) => {
        setForm({
          title: data.title || '', content: data.content || '', category_id: data.category_id || '',
          author: data.author || '', status: data.status || 'draft',
          thumbnail: data.thumbnail || '', meta_title: data.meta_title || '',
          meta_description: data.meta_description || '', meta_keywords: data.meta_keywords || ''
        });
      }).catch(() => addNotification('Gagal memuat data berita', 'error'))
      .finally(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Judul harus diisi';
    if (!form.content.trim()) errs.content = 'Konten harus diisi';
    if (!form.author.trim()) errs.author = 'Penulis harus diisi';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit) {
        await newsService.update(id, form);
        addNotification('Berita berhasil diupdate', 'success');
      } else {
        await newsService.create(form);
        addNotification('Berita berhasil ditambahkan', 'success');
      }
      navigate('/admin/berita');
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menyimpan berita';
      addNotification(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat...</div>;

  return (
    <AdminPage title={isEdit ? 'Edit Berita' : 'Tambah Berita'} subtitle={isEdit ? 'Edit berita yang sudah ada' : 'Buat berita baru'}>
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-row">
          <div className="form-group">
            <label>Judul Berita *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Masukkan judul berita" />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Kategori</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Penulis *</label>
            <input name="author" value={form.author} onChange={handleChange} placeholder="Nama penulis" />
            {errors.author && <span className="form-error">{errors.author}</span>}
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Konten *</label>
          <textarea name="content" rows={12} value={form.content} onChange={handleChange} placeholder="Tulis konten berita di sini..." />
          {errors.content && <span className="form-error">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label>Thumbnail</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {form.thumbnail && <ImagePreview src={form.thumbnail} onRemove={() => setForm({...form, thumbnail: ''})} size={120} />}
            <FileUpload onUpload={(res) => res && setForm({...form, thumbnail: res.url})} module="thumbnails" label="Upload Thumbnail" />
          </div>
        </div>

        <div className="form-section">
          <h4>SEO Settings (Opsional)</h4>
          <div className="form-group">
            <label>Meta Title</label>
            <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO title" />
          </div>
          <div className="form-group">
            <label>Meta Description</label>
            <textarea name="meta_description" rows={3} value={form.meta_description} onChange={handleChange} placeholder="SEO description" />
          </div>
        </div>

        <div className="form-actions">
          <Button variant="outline" onClick={() => navigate('/admin/berita')}>Batal</Button>
          <Button variant="primary" type="submit" loading={loading}>
            {isEdit ? 'Update' : 'Simpan'}
          </Button>
        </div>
      </form>

      <style>{`
        .news-form { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1rem; }
        .form-group label { font-size: 0.8125rem; font-weight: 500; color: #374151; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.625rem 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #1A56DB;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
        }
        .form-error { font-size: 0.75rem; color: #DC2626; }
        .form-section { background: #F9FAFB; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
        .form-section h4 { font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.75rem; }
        .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #E5E7EB; }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </AdminPage>
  );
}
