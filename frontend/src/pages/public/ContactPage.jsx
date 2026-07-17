import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import api from '../../services/api';
import Button from '../../components/common/Button';

export default function ContactPage() {
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.get('/settings').then(({ data }) => {
      const items = data.data || data || {};
      const map = {};
      if (Array.isArray(items)) items.forEach(s => { map[s.key] = s.value; });
      else Object.assign(map, items);
      setSettings(map);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    try {
      await api.post('/messages', form);
      alert('Pesan berhasil dikirim!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch { alert('Gagal mengirim pesan. Silakan coba lagi.'); }
    setSending(false);
  };

  return (
    <div className="public-page">
      <div className="page-hero">
        <div className="container">
          <h1>Kontak</h1>
          <p>Hubungi kami untuk informasi lebih lanjut</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Informasi Kontak</h2>
              <div className="contact-list">
                <div className="contact-item"><MapPin size={20} /><div><strong>Alamat</strong><p>{settings.address || 'Jl. Pendidikan No. 1, Jakarta'}</p></div></div>
                <div className="contact-item"><Phone size={20} /><div><strong>Telepon</strong><p>{settings.phone || '(021) 1234-5678'}</p></div></div>
                <div className="contact-item"><Mail size={20} /><div><strong>Email</strong><p>{settings.email || 'info@sdprofile.sch.id'}</p></div></div>
                <div className="contact-item"><Clock size={20} /><div><strong>Jam Operasional</strong><p>{settings.operating_hours || 'Senin - Jumat, 07:00 - 16:00'}</p></div></div>
              </div>
              {settings.map_embed && (
                <div className="contact-map">
                  <div dangerouslySetInnerHTML={{ __html: settings.map_embed }} />
                </div>
              )}
            </div>

            <div className="contact-form">
              <h2>Kirim Pesan</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label>Nama *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                  <div className="form-group"><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                </div>
                <div className="form-group"><label>Telepon</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                <div className="form-group"><label>Subjek</label><input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
                <div className="form-group"><label>Pesan *</label><textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required /></div>
                <Button variant="primary" type="submit" loading={sending}><Send size={16} /> Kirim Pesan</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .public-page { min-height: 60vh; }
        .page-hero { background: linear-gradient(135deg, #1A56DB, #1E40AF); color: #fff; padding: 4rem 0; text-align: center; }
        .page-hero h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; }
        .page-hero p { font-size: 1.125rem; opacity: 0.9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .section { padding: 4rem 0; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .contact-info h2, .contact-form h2 { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 1.5rem; }
        .contact-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .contact-item { display: flex; gap: 0.75rem; color: #1A56DB; }
        .contact-item div strong { display: block; font-size: 0.875rem; color: #111827; margin-bottom: 0.125rem; }
        .contact-item p { font-size: 0.875rem; color: #6B7280; }
        .contact-map { border-radius: 12px; overflow: hidden; }
        .contact-map iframe { width: 100%; height: 250px; border: none; }
        .contact-form { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.75rem; }
        .form-group label { font-size: 0.75rem; font-weight: 500; color: #6B7280; }
        .form-group input, .form-group textarea { padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.875rem; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
