import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function AnnouncementsManagementPage() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/announcements', { params: { page, limit: 10 } });
      setData(res.data.data || []);
      setPagination(res.data.pagination);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/announcements/${deleteTarget.id}`);
      addNotification('Pengumuman dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Judul', render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'priority', label: 'Prioritas', render: (row) => (
      <span className={`badge badge--${row.priority}`}>
        {row.priority === 'urgent' ? 'Urgent' : row.priority === 'important' ? 'Penting' : 'Normal'}
      </span>
    )},
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'published' ? '#0E9F6E' : '#9CA3AF' }}>{row.status}</span>
    )},
    { key: 'published_at', label: 'Tanggal', render: (row) => row.published_at ? new Date(row.published_at).toLocaleDateString('id-ID') : '-' }
  ];

  return (
    <div>
      <AdminPage title="Kelola Pengumuman">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={() => navigate('/admin/pengumuman/tambah')}
          onEdit={(row) => navigate(`/admin/pengumuman/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
      <style>{`.badge { display:inline-block; padding:0.125rem 0.5rem; border-radius:999px; font-size:0.75rem; font-weight:500; }
        .badge--urgent { background:#FEF2F2; color:#DC2626; }
        .badge--important { background:#FEF3C7; color:#92400E; }
        .badge--normal { background:#F3F4F6; color:#6B7280; }`}</style>
    </div>
  );
}
