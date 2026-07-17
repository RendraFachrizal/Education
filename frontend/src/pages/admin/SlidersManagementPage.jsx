import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function SlidersManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', button_text: '', button_url: '', sort_order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/sliders?limit=50');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ title: '', subtitle: '', button_text: '', button_url: '', sort_order: 0, status: 'active' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ title: row.title, subtitle: row.subtitle, button_text: row.button_text, button_url: row.button_url, sort_order: row.sort_order, status: row.status }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/sliders/${editTarget.id}`, form); addNotification('Slider diupdate', 'success'); }
      else { await api.post('/sliders', form); addNotification('Slider ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/sliders/${deleteTarget.id}`);
      addNotification('Slider dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Judul', render: (row) => <span style={{ fontWeight: 500 }}>{row.title || '(Tanpa Judul)'}</span> },
    { key: 'sort_order', label: 'Urutan' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Slider">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Slider' : 'Tambah Slider'} width="500px">
        <div className="form-group"><label>Judul</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
        <div className="form-group"><label>Subtitle</label><textarea rows={2} value={form.subtitle} onChange={(e) => setForm({...form, subtitle: e.target.value})} /></div>
        <div className="form-row">
          <div className="form-group"><label>Teks Tombol</label><input value={form.button_text} onChange={(e) => setForm({...form, button_text: e.target.value})} /></div>
          <div className="form-group"><label>URL Tombol</label><input value={form.button_url} onChange={(e) => setForm({...form, button_url: e.target.value})} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Urutan</label><input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value) || 0})} /></div>
          <div className="form-group"><label>Status</label><select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
            <option value="active">Aktif</option><option value="inactive">Tidak Aktif</option>
          </select></div>
        </div>
        <div className="form-actions">
          <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>Simpan</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
