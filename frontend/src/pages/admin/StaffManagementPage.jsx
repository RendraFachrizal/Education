import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function StaffManagementPage() {
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
      const { data: res } = await api.get('/staffs', { params: { page, limit: 10 } });
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
      await api.delete(`/staffs/${deleteTarget.id}`);
      addNotification('Staff berhasil dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama' },
    { key: 'position', label: 'Jabatan' },
    { key: 'department', label: 'Bagian' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Staff" subtitle="Data staff tata usaha">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={() => navigate('/admin/staff/tambah')}
          onEdit={(row) => navigate(`/admin/staff/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} message={`Hapus staff "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
