import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function GalleriesManagementPage() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/galleries?limit=50');
      setData(res.data.data || []);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/galleries/${deleteTarget.id}`);
      addNotification('Galeri dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'title', label: 'Album', render: (row) => <span style={{ fontWeight: 500 }}>{row.title}</span> },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>{row.status === 'active' ? 'Aktif' : 'Tidak'}</span>
    )},
    { key: 'created_at', label: 'Tanggal', render: (row) => new Date(row.created_at).toLocaleDateString('id-ID') }
  ];

  return (
    <div>
      <AdminPage title="Kelola Galeri">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          onAdd={() => navigate('/admin/galeri/tambah')}
          onEdit={(row) => navigate(`/admin/galeri/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
