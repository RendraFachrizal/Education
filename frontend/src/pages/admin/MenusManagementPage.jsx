import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function MenusManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '', url: '', parent_id: null, sort_order: 0, location: 'main', status: 'active' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/menus?limit=100');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ name: '', url: '', parent_id: null, sort_order: 0, location: 'main', status: 'active' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ name: row.name, url: row.url, parent_id: row.parent_id, sort_order: row.sort_order, location: row.location, status: row.status }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) return addNotification('Nama menu harus diisi', 'error');
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/menus/${editTarget.id}`, form); addNotification('Menu diupdate', 'success'); }
      else { await api.post('/menus', form); addNotification('Menu ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/menus/${deleteTarget.id}`);
      addNotification('Menu dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama', render: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span> },
    { key: 'url', label: 'URL' },
    { key: 'location', label: 'Lokasi' },
    { key: 'sort_order', label: 'Urutan' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Menu">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Menu' : 'Tambah Menu'} width="500px">
        <div className="form-row">
          <div className="form-group"><label>Nama Menu</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
          <div className="form-group"><label>URL</label><input value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Lokasi</label><select value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}>
            <option value="main">Menu Utama</option><option value="footer">Footer</option><option value="top">Top Bar</option>
          </select></div>
          <div className="form-group"><label>Urutan</label><input type="number" value={form.sort_order} onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value) || 0})} /></div>
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
