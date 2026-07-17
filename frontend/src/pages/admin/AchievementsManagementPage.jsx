import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function AchievementsManagementPage() {
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
      const { data: res } = await api.get('/achievements', { params: { page, limit: 10 } });
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
      await api.delete(`/achievements/${deleteTarget.id}`);
      addNotification('Prestasi dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Prestasi', render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'category', label: 'Kategori', render: (row) => row.category === 'akademik' ? 'Akademik' : 'Non-Akademik' },
    { key: 'rank', label: 'Juara' },
    { key: 'level', label: 'Tingkat' },
    { key: 'year', label: 'Tahun' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Prestasi">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={() => navigate('/admin/prestasi/tambah')}
          onEdit={(row) => navigate(`/admin/prestasi/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
