import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';
import ImagePreview from '../../components/common/ImagePreview';
import { teacherService } from '../../services/teacherService';
import { useNotification } from '../../hooks/useNotification';

export default function TeacherFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [form, setForm] = useState({ name: '', nip: '', subject: '', position: '', education: '', gender: 'L', status: 'active', phone: '', email: '', photo: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      teacherService.getById(id).then(({ data }) => {
        setForm({ name: data.name || '', nip: data.nip || '', subject: data.subject || '', position: data.position || '', education: data.education || '', gender: data.gender || 'L', status: data.status || 'active', phone: data.phone || '', email: data.email || '', photo: data.photo || '' });
      }).catch(() => addNotification('Gagal memuat data', 'error'))
      .finally(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return addNotification('Nama harus diisi', 'error');
    setLoading(true);
    try {
      if (isEdit) { await teacherService.update(id, form); addNotification('Guru berhasil diupdate', 'success'); }
      else { await teacherService.create(form); addNotification('Guru berhasil ditambahkan', 'success'); }
      navigate('/admin/guru');
    } catch (err) { addNotification(err.response?.data?.message || 'Gagal menyimpan', 'error'); }
    finally { setLoading(false); }
  };

  if (fetching) return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat...</div>;

  return (
    <AdminPage title={isEdit ? 'Edit Guru' : 'Tambah Guru'}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="form-row">
          <div className="form-group"><label>Nama *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Nama lengkap" /></div>
          <div className="form-group"><label>NIP</label><input name="nip" value={form.nip} onChange={handleChange} placeholder="NIP" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Mata Pelajaran</label><input name="subject" value={form.subject} onChange={handleChange} placeholder="Mapel" /></div>
          <div className="form-group"><label>Jabatan</label><input name="position" value={form.position} onChange={handleChange} placeholder="Jabatan" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Pendidikan</label><input name="education" value={form.education} onChange={handleChange} placeholder="Pendidikan terakhir" /></div>
          <div className="form-group"><label>Jenis Kelamin</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="L">Laki-laki</option><option value="P">Perempuan</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Telepon</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="No telepon" /></div>
          <div className="form-group"><label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Aktif</option><option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label>Foto</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {form.photo && <ImagePreview src={form.photo} onRemove={() => setForm({...form, photo: ''})} size={100} />}
            <FileUpload onUpload={(res) => res && setForm({...form, photo: res.url})} module="photos" label="Upload Foto" />
          </div>
        </div>
        <div className="form-actions">
          <Button variant="outline" onClick={() => navigate('/admin/guru')}>Batal</Button>
          <Button variant="primary" type="submit" loading={loading}>{isEdit ? 'Update' : 'Simpan'}</Button>
        </div>
      </form>
      <style>{`
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .form-group label { font-size: 0.8125rem; font-weight: 500; color: #374151; }
        .form-group input, .form-group select { padding: 0.625rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.875rem; }
        .form-group input:focus, .form-group select:focus { border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #E5E7EB; }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </AdminPage>
  );
}
