import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function EventsManagementPage() {
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
      const { data: res } = await api.get('/events', { params: { page, limit: 10 } });
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
      await api.delete(`/events/${deleteTarget.id}`);
      addNotification('Agenda dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Agenda', render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'location', label: 'Lokasi' },
    { key: 'start_date', label: 'Tanggal', render: (row) => new Date(row.start_date).toLocaleDateString('id-ID') },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge badge--${row.status}`}>
        {row.status === 'upcoming' ? 'Akan Datang' : row.status === 'ongoing' ? 'Berlangsung' : row.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
      </span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Agenda">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={() => navigate('/admin/agenda/tambah')}
          onEdit={(row) => navigate(`/admin/agenda/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
      <style>{`.badge { display:inline-block; padding:0.125rem 0.5rem; border-radius:999px; font-size:0.75rem; font-weight:500; }
        .badge--upcoming { background:#E1EFFE; color:#1A56DB; }
        .badge--ongoing { background:#DEF7EC; color:#057A55; }
        .badge--completed { background:#F3F4F6; color:#6B7280; }
        .badge--cancelled { background:#FEF2F2; color:#DC2626; }`}</style>
    </div>
  );
}
