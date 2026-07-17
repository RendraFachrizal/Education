import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { teacherService } from '../../services/teacherService';
import { useNotification } from '../../hooks/useNotification';

export default function TeachersManagementPage() {
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
      const res = await teacherService.getAll({ page, limit: 10 });
      setData(res.data.data || []);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Gagal memuat data guru');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await teacherService.delete(deleteTarget.id);
      addNotification('Guru berhasil dihapus', 'success');
      setDeleteTarget(null);
      fetchData();
    } catch { addNotification('Gagal menghapus guru', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Nama', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#E1EFFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A56DB', fontWeight: 600, fontSize: '0.875rem' }}>
          {row.name?.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 500, color: '#111827' }}>{row.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{row.nip || '-'}</div>
        </div>
      </div>
    )},
    { key: 'subject', label: 'Mapel' },
    { key: 'position', label: 'Jabatan' },
    { key: 'education', label: 'Pendidikan' },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'active' ? '#0E9F6E' : '#9CA3AF' }}>
        {row.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
      </span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Kelola Guru" subtitle="Data guru sekolah">
        <DataTable
          columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onAdd={() => navigate('/admin/guru/tambah')}
          onEdit={(row) => navigate(`/admin/guru/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </AdminPage>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} message={`Hapus guru "${deleteTarget?.name}"?`} loading={deleting} />
    </div>
  );
}
