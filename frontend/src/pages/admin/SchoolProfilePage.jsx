import { useState, useEffect } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function SchoolProfilePage() {
  const { addNotification } = useNotification();
  const [form, setForm] = useState({
    school_name: '', npsn: '', address: '', village: '', district: '', city: '',
    province: '', postal_code: '', phone: '', email: '', website: '',
    vision: '', mission: '', history: '', principal_speech: '',
    principal_name: '', principal_qualification: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api.get('/school-profile').then(({ data }) => {
      if (data.data) {
        const d = data.data;
        setForm({
          school_name: d.school_name || '', npsn: d.npsn || '', address: d.address || '',
          village: d.village || '', district: d.district || '', city: d.city || '',
          province: d.province || '', postal_code: d.postal_code || '', phone: d.phone || '',
          email: d.email || '', website: d.website || '',
          vision: d.vision || '', mission: d.mission || '', history: d.history || '',
          principal_speech: d.principal_speech || '', principal_name: d.principal_name || '',
          principal_qualification: d.principal_qualification || ''
        });
      }
    }).catch(() => {}).finally(() => setFetching(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/school-profile', form);
      addNotification('Profil sekolah berhasil disimpan', 'success');
    } catch { addNotification('Gagal menyimpan profil', 'error'); }
    finally { setLoading(false); }
  };

  if (fetching) return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat...</div>;

  return (
    <AdminPage title="Profil Sekolah" subtitle="Kelola informasi profil sekolah">
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Informasi Umum</h4>
        <div className="form-row">
          <div className="form-group"><label>Nama Sekolah</label><input name="school_name" value={form.school_name} onChange={handleChange} /></div>
          <div className="form-group"><label>NPSN</label><input name="npsn" value={form.npsn} onChange={handleChange} /></div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: '1/-1' }}><label>Alamat</label><textarea name="address" rows={2} value={form.address} onChange={handleChange} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Kelurahan</label><input name="village" value={form.village} onChange={handleChange} /></div>
          <div className="form-group"><label>Kecamatan</label><input name="district" value={form.district} onChange={handleChange} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Kota</label><input name="city" value={form.city} onChange={handleChange} /></div>
          <div className="form-group"><label>Provinsi</label><input name="province" value={form.province} onChange={handleChange} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Kode Pos</label><input name="postal_code" value={form.postal_code} onChange={handleChange} /></div>
          <div className="form-group"><label>Telepon</label><input name="phone" value={form.phone} onChange={handleChange} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Email</label><input name="email" value={form.email} onChange={handleChange} /></div>
          <div className="form-group"><label>Website</label><input name="website" value={form.website} onChange={handleChange} /></div>
        </div>

        <h4 style={{ margin: '1.5rem 0 1rem', color: '#374151' }}>Visi & Misi</h4>
        <div className="form-group"><label>Visi</label><textarea name="vision" rows={3} value={form.vision} onChange={handleChange} /></div>
        <div className="form-group"><label>Misi</label><textarea name="mission" rows={5} value={form.mission} onChange={handleChange} placeholder="Pisahkan setiap misi dengan baris baru" /></div>

        <h4 style={{ margin: '1.5rem 0 1rem', color: '#374151' }}>Sejarah & Sambutan</h4>
        <div className="form-group"><label>Sejarah</label><textarea name="history" rows={6} value={form.history} onChange={handleChange} /></div>
        <div className="form-row">
          <div className="form-group"><label>Nama Kepala Sekolah</label><input name="principal_name" value={form.principal_name} onChange={handleChange} /></div>
          <div className="form-group"><label>Gelar Kepala Sekolah</label><input name="principal_qualification" value={form.principal_qualification} onChange={handleChange} /></div>
        </div>
        <div className="form-group"><label>Sambutan Kepala Sekolah</label><textarea name="principal_speech" rows={8} value={form.principal_speech} onChange={handleChange} /></div>

        <div className="form-actions">
          <Button variant="primary" type="submit" loading={loading}>Simpan Profil</Button>
        </div>
      </form>
      <style>{`
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .form-group label { font-size: 0.8125rem; font-weight: 500; color: #374151; }
        .form-group input, .form-group textarea { padding: 0.625rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.875rem; }
        .form-group input:focus, .form-group textarea:focus { border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #E5E7EB; }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </AdminPage>
  );
}
