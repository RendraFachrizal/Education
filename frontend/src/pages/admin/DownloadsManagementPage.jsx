import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function DownloadsManagementPage() {
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
  const [form, setForm] = useState({ title: '', description: '', file_url: '', type: 'document', status: 'active' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/downloads', { params: { page, limit: 10 } });
      setData(res.data.data || []); setPagination(res.data.pagination);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ title: '', description: '', file_url: '', type: 'document', status: 'active' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ title: row.title, description: row.description || '', file_url: row.file_url, type: row.type, status: row.status }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.file_url.trim()) return addNotification('Judul dan URL file harus diisi', 'error');
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/downloads/${editTarget.id}`, form); addNotification('Download diupdate', 'success'); }
      else { await api.post('/downloads', form); addNotification('Download ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/downloads/${deleteTarget.id}`);
      addNotification('Download dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Judul', render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'type', label: 'Tipe', render: (row) => <span style={{ textTransform: 'capitalize' }}>{row.type}</span> },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Download">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Download' : 'Tambah Download'} width="500px">
        <div className="form-group"><label>Judul</label><input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
        <div className="form-group"><label>Deskripsi</label><textarea rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
        <div className="form-group"><label>URL File</label><input value={form.file_url} onChange={(e) => setForm({...form, file_url: e.target.value})} /></div>
        <div className="form-row">
          <div className="form-group"><label>Tipe</label><select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
            <option value="document">Dokumen</option><option value="form">Formulir</option><option value="brochure">Brosur</option><option value="other">Lainnya</option>
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
