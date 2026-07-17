import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function FAQsManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', category: '', sort_order: 0, status: 'active' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/faqs?limit=100');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openAdd = () => { setEditTarget(null); setForm({ question: '', answer: '', category: '', sort_order: 0, status: 'active' }); setModalOpen(true); };
  const openEdit = (row) => { setEditTarget(row); setForm({ question: row.question, answer: row.answer, category: row.category || '', sort_order: row.sort_order, status: row.status }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) return addNotification('Pertanyaan dan jawaban harus diisi', 'error');
    setSaving(true);
    try {
      if (editTarget) { await api.put(`/faqs/${editTarget.id}`, form); addNotification('FAQ diupdate', 'success'); }
      else { await api.post('/faqs', form); addNotification('FAQ ditambahkan', 'success'); }
      setModalOpen(false); fetchData();
    } catch { addNotification('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/faqs/${deleteTarget.id}`);
      addNotification('FAQ dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'question', label: 'Pertanyaan', render: (row) => <span style={{ fontWeight: 500 }}>{row.question}</span> },
    { key: 'category', label: 'Kategori' },
    { key: 'sort_order', label: 'Urutan' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola FAQ">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={openAdd} onEdit={openEdit} onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit FAQ' : 'Tambah FAQ'} width="600px">
        <div className="form-group"><label>Pertanyaan</label><textarea rows={2} value={form.question} onChange={(e) => setForm({...form, question: e.target.value})} /></div>
        <div className="form-group"><label>Jawaban</label><textarea rows={4} value={form.answer} onChange={(e) => setForm({...form, answer: e.target.value})} /></div>
        <div className="form-row">
          <div className="form-group"><label>Kategori</label><input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} /></div>
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
