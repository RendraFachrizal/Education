import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function TestimonialsManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', content: '', avatar_url: '', rating: 5, status: 'active' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/testimonials?limit=50');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ name: '', position: '', content: '', avatar_url: '', rating: 5, status: 'active' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ name: row.name, position: row.position || '', content: row.content, avatar_url: row.avatar_url || '', rating: row.rating, status: row.status }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.content.trim()) return addNotification('Nama dan testimoni harus diisi', 'error');
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/testimonials/${editTarget.id}`, form); addNotification('Testimoni diupdate', 'success'); }
      else { await api.post('/testimonials', form); addNotification('Testimoni ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/testimonials/${deleteTarget.id}`);
      addNotification('Testimoni dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama', render: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span> },
    { key: 'position', label: 'Posisi' },
    { key: 'rating', label: 'Rating', render: (row) => '★'.repeat(row.rating) + '☆'.repeat(5 - row.rating) },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Testimoni">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Testimoni' : 'Tambah Testimoni'} width="500px">
        <div className="form-row">
          <div className="form-group"><label>Nama</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
          <div className="form-group"><label>Posisi</label><input value={form.position} onChange={(e) => setForm({...form, position: e.target.value})} /></div>
        </div>
        <div className="form-group"><label>Testimoni</label><textarea rows={3} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} /></div>
        <div className="form-row">
          <div className="form-group"><label>Rating</label><select value={form.rating} onChange={(e) => setForm({...form, rating: parseInt(e.target.value)})}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
          </select></div>
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
