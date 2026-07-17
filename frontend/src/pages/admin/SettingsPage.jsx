import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import Button from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';
import ImagePreview from '../../components/common/ImagePreview';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function SettingsPage() {
  const { addNotification } = useNotification();
  const [settings, setSettings] = useState({
    school_name: '', address: '', phone: '', email: '', website: '',
    vision: '', mission: '', logo_url: '', favicon_url: '',
    facebook_url: '', twitter_url: '', instagram_url: '', youtube_url: '',
    about_us: '', map_embed: '', operating_hours: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/settings');
      const items = res.data || {};
      const map = {};
      if (Array.isArray(items)) items.forEach(s => { map[s.key] = s.value; });
      else Object.assign(map, items);
      setSettings(prev => ({ ...prev, ...map }));
    } catch { addNotification('Gagal memuat pengaturan', 'error'); }
    finally { setLoading(false); }
  }, [addNotification]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleChange = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', settings);
      addNotification('Pengaturan disimpan', 'success');
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminPage title="Pengaturan"><div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>Memuat...</div></AdminPage>;

  return (
    <AdminPage title="Pengaturan Sekolah" subtitle="Konfigurasi umum website sekolah">
      <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Informasi Umum</h3>
        <div className="form-row">
          <div className="form-group"><label>Nama Sekolah</label><input value={settings.school_name} onChange={e => handleChange('school_name', e.target.value)} /></div>
          <div className="form-group"><label>Website</label><input value={settings.website} onChange={e => handleChange('website', e.target.value)} /></div>
        </div>
        <div className="form-group"><label>Alamat</label><textarea rows={2} value={settings.address} onChange={e => handleChange('address', e.target.value)} /></div>
        <div className="form-row">
          <div className="form-group"><label>Telepon</label><input value={settings.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
          <div className="form-group"><label>Email</label><input type="email" value={settings.email} onChange={e => handleChange('email', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Jam Operasional</label><input value={settings.operating_hours} onChange={e => handleChange('operating_hours', e.target.value)} /></div>
          <div className="form-group"><label>About Us (Singkat)</label><input value={settings.about_us} onChange={e => handleChange('about_us', e.target.value)} /></div>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '1.5rem 0 1rem' }}>Logo & Favicon</h3>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label>Logo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {settings.logo_url && <ImagePreview src={settings.logo_url} onRemove={() => handleChange('logo_url', '')} size={80} />}
              <FileUpload onUpload={(res) => res && handleChange('logo_url', res.url)} module="general" label="Upload Logo" />
            </div>
          </div>
          <div className="form-group">
            <label>Favicon</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {settings.favicon_url && <ImagePreview src={settings.favicon_url} onRemove={() => handleChange('favicon_url', '')} size={48} />}
              <FileUpload onUpload={(res) => res && handleChange('favicon_url', res.url)} module="general" label="Upload Favicon" />
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '1.5rem 0 1rem' }}>Visi & Misi</h3>
        <div className="form-group"><label>Visi</label><textarea rows={3} value={settings.vision} onChange={e => handleChange('vision', e.target.value)} /></div>
        <div className="form-group"><label>Misi</label><textarea rows={4} value={settings.mission} onChange={e => handleChange('mission', e.target.value)} /></div>

        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '1.5rem 0 1rem' }}>Media Sosial</h3>
        <div className="form-row">
          <div className="form-group"><label>Facebook</label><input value={settings.facebook_url} onChange={e => handleChange('facebook_url', e.target.value)} /></div>
          <div className="form-group"><label>Twitter</label><input value={settings.twitter_url} onChange={e => handleChange('twitter_url', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Instagram</label><input value={settings.instagram_url} onChange={e => handleChange('instagram_url', e.target.value)} /></div>
          <div className="form-group"><label>YouTube</label><input value={settings.youtube_url} onChange={e => handleChange('youtube_url', e.target.value)} /></div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <Button variant="primary" onClick={handleSave} loading={saving}>Simpan Pengaturan</Button>
        </div>
      </div>

      <style>{`
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.75rem; }
        .form-group label { font-size: 0.75rem; font-weight: 500; color: #6B7280; }
        .form-group input, .form-group textarea, .form-group select {
          padding: 0.5rem 0.75rem; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 0.875rem; transition: border-color 0.15s;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          outline: none; border-color: #1A56DB; box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
        }
      `}</style>
    </AdminPage>
  );
}
