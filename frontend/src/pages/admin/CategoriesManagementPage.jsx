import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function CategoriesManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/categories?limit=100');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ name: '' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ name: row.name }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) return addNotification('Nama kategori harus diisi', 'error');
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/categories/${editTarget.id}`, form); addNotification('Kategori diupdate', 'success'); }
      else { await api.post('/categories', form); addNotification('Kategori ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch (err) { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/categories/${deleteTarget.id}`);
      addNotification('Kategori dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama Kategori' },
    { key: 'slug', label: 'Slug' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Kategori">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Kategori' : 'Tambah Kategori'} width="400px">
        <div className="form-group">
          <label>Nama Kategori</label>
          <input value={form.name} onChange={(e) => setForm({ name: e.target.value })} placeholder="Nama kategori" />
        </div>
        <div className="form-actions">
          <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>Simpan</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} message={`Hapus kategori "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
