import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function UsersManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'admin', password: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/users', { params: { page, limit: 10 } });
      setData(res.data.data || []); setPagination(res.data.pagination);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ name: '', email: '', role: 'admin', password: '' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ name: row.name, email: row.email, role: row.role, password: '' }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) return addNotification('Nama dan email harus diisi', 'error');
    if (!editTarget && !form.password) return addNotification('Password harus diisi', 'error');
    setSaving(true);
    try {
      const payload = { ...form };
      if (editTarget) { delete payload.password; if (!form.password) delete payload.password; }
      if (editTarget) { await api.put(`/users/${editTarget.id}`, payload); addNotification('User diupdate', 'success'); }
      else { await api.post('/users', form); addNotification('User ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch (err) { addNotification(err.response?.data?.message || 'Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${deleteTarget.id}`);
      addNotification('User dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama', render: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span> },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (row) => (
      <span style={{ background: row.role === 'superadmin' ? '#E1EFFE' : '#F3F4F6', color: row.role === 'superadmin' ? '#1A56DB' : '#374151', padding: '0.125rem 0.5rem', borderRadius: 999, fontSize: '0.75rem' }}>
        {row.role === 'superadmin' ? 'Super Admin' : row.role === 'admin' ? 'Admin' : 'Operator'}
      </span>
    )},
    { key: 'last_login', label: 'Terakhir Login', render: (row) => row.last_login ? new Date(row.last_login).toLocaleDateString('id-ID') : '-' }
  ];

  return (
    <div>
      <AdminPage title="Kelola User">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit User' : 'Tambah User'} width="450px">
        <div className="form-group"><label>Nama</label><input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
        <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></div>
        <div className="form-group"><label>Role</label><select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="superadmin">Super Admin</option><option value="admin">Admin</option><option value="operator">Operator</option>
        </select></div>
        <div className="form-group"><label>{editTarget ? 'Password (biarkan kosong jika tidak diganti)' : 'Password'}</label>
          <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></div>
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
