import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function PPDBPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const [form, setForm] = useState({
    student_name: '', gender: 'L', place_of_birth: '', date_of_birth: '',
    religion: 'Islam', address: '', previous_school: '',
    father_name: '', father_education: '', father_occupation: '',
    mother_name: '', mother_education: '', mother_occupation: '',
    parent_phone: ''
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.student_name.trim() || !form.parent_phone.trim()) return;
    setSaving(true);
    try {
      const { data: res } = await api.post('/ppdb/register', form);
      setRegNumber(res.data.registration_number || '');
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.');
    }
    setSaving(false);
  };

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>PPDB Online</h1>
          <p>Pendaftaran Peserta Didik Baru Tahun Ajaran {new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          {step < 3 && (
            <div className="ppdb-steps">
              <div className={`ppdb-step ${step >= 1 ? 'active' : ''}`}><span>1</span> Data Siswa</div>
              <div className="ppdb-step-line" />
              <div className={`ppdb-step ${step >= 2 ? 'active' : ''}`}><span>2</span> Data Orang Tua</div>
            </div>
          )}

          {step === 1 && (
            <div className="ppdb-form">
              <h2>Data Siswa</h2>
              <div className="form-group"><label>Nama Lengkap *</label><input value={form.student_name} onChange={e => update('student_name', e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>Jenis Kelamin</label><select value={form.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="L">Laki-laki</option><option value="P">Perempuan</option>
                </select></div>
                <div className="form-group"><label>Agama</label><select value={form.religion} onChange={e => update('religion', e.target.value)}>
                  <option value="Islam">Islam</option><option value="Kristen">Kristen</option><option value="Katolik">Katolik</option><option value="Hindu">Hindu</option><option value="Buddha">Buddha</option>
                </select></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Tempat Lahir</label><input value={form.place_of_birth} onChange={e => update('place_of_birth', e.target.value)} /></div>
                <div className="form-group"><label>Tanggal Lahir</label><input type="date" value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Alamat</label><textarea rows={2} value={form.address} onChange={e => update('address', e.target.value)} /></div>
              <div className="form-group"><label>Sekolah Asal</label><input value={form.previous_school} onChange={e => update('previous_school', e.target.value)} /></div>
              <Button variant="primary" onClick={() => setStep(2)}>Selanjutnya</Button>
            </div>
          )}

          {step === 2 && (
            <div className="ppdb-form">
              <h2>Data Orang Tua</h2>
              <h3>Data Ayah</h3>
              <div className="form-group"><label>Nama Ayah</label><input value={form.father_name} onChange={e => update('father_name', e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>Pendidikan</label><input value={form.father_education} onChange={e => update('father_education', e.target.value)} /></div>
                <div className="form-group"><label>Pekerjaan</label><input value={form.father_occupation} onChange={e => update('father_occupation', e.target.value)} /></div>
              </div>
              <h3>Data Ibu</h3>
              <div className="form-group"><label>Nama Ibu</label><input value={form.mother_name} onChange={e => update('mother_name', e.target.value)} /></div>
              <div className="form-row">
                <div className="form-group"><label>Pendidikan</label><input value={form.mother_education} onChange={e => update('mother_education', e.target.value)} /></div>
                <div className="form-group"><label>Pekerjaan</label><input value={form.mother_occupation} onChange={e => update('mother_occupation', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>No. HP Orang Tua *</label><input value={form.parent_phone} onChange={e => update('parent_phone', e.target.value)} /></div>
              <div className="form-actions">
                <Button variant="outline" onClick={() => setStep(1)}>Kembali</Button>
                <Button variant="primary" onClick={handleSubmit} loading={saving}>Daftar</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="ppdb-success">
              <div className="success-icon">✓</div>
              <h2>Pendaftaran Berhasil!</h2>
              <p>Nomor pendaftaran Anda:</p>
              <div className="reg-number">{regNumber}</div>
              <p className="success-note">Simpan nomor pendaftaran untuk cek status. Kami akan menghubungi Anda melalui nomor telepon yang didaftarkan.</p>
              <Button variant="primary" onClick={() => navigate('/')}>Kembali ke Beranda</Button>
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
        .ppdb-steps { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem; }
        .ppdb-step { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 500; color: #9CA3AF; }
        .ppdb-step.active { color: #1A56DB; }
        .ppdb-step span { width: 28px; height: 28px; border-radius: 50%; background: #E5E7EB; display: flex; align-items: center; justify-content: center; font-size: 0.8125rem; font-weight: 600; color: #fff; }
        .ppdb-step.active span { background: #1A56DB; }
        .ppdb-step-line { flex: 1; max-width: 80px; height: 2px; background: #E5E7EB; }
        .ppdb-form { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .ppdb-form h2 { font-size: 1.125rem; font-weight: 700; color: #111827; margin-bottom: 1rem; }
        .ppdb-form h3 { font-size: 0.9375rem; font-weight: 600; color: #4B5563; margin: 1rem 0 0.5rem; padding-top: 0.75rem; border-top: 1px solid #E5E7EB; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.75rem; }
        .form-group label { font-size: 0.75rem; font-weight: 500; color: #6B7280; }
        .form-group input, .form-group textarea, .form-group select { padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.875rem; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .form-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .ppdb-success { text-align: center; padding: 3rem; background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .success-icon { width: 64px; height: 64px; border-radius: 50%; background: #DEF7EC; color: #057A55; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem; }
        .ppdb-success h2 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
        .ppdb-success p { color: #6B7280; font-size: 0.875rem; }
        .reg-number { font-size: 1.75rem; font-weight: 800; color: #1A56DB; letter-spacing: 2px; margin: 1rem 0; }
        .success-note { font-size: 0.8125rem; color: #9CA3AF; max-width: 400px; margin: 0 auto 1.5rem; }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
