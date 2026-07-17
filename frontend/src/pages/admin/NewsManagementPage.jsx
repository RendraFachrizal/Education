import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { newsService } from '../../services/newsService';
import { useNotification } from '../../hooks/useNotification';
import { BadgeAlert } from 'lucide-react';

export default function NewsManagementPage() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await newsService.getAll({ page, limit: 10, search });
      setData(res.data.data || []);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Gagal memuat data berita');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await newsService.delete(deleteTarget.id);
      addNotification('Berita berhasil dihapus', 'success');
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      addNotification('Gagal menghapus berita', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Judul', render: (row) => (
      <span style={{ fontWeight: 500, color: '#111827' }}>{row.title}</span>
    )},
    { key: 'category_name', label: 'Kategori' },
    { key: 'author', label: 'Penulis' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`badge badge--${row.status}`}>
        {row.status === 'published' ? 'Published' : row.status === 'draft' ? 'Draft' : 'Archived'}
      </span>
    )},
    { key: 'views', label: 'Dilihat' },
    { key: 'published_at', label: 'Tanggal', render: (row) =>
      row.published_at ? new Date(row.published_at).toLocaleDateString('id-ID') : '-'
    }
  ];

  return (
    <div>
      <AdminPage title="Kelola Berita" subtitle="Kelola berita dan artikel sekolah">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          pagination={pagination}
          onPageChange={setPage}
          onSearch={(val) => { setSearch(val); setPage(1); }}
          onAdd={() => navigate('/admin/berita/tambah')}
          onEdit={(row) => navigate(`/admin/berita/edit/${row.id}`)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </AdminPage>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin menghapus berita "${deleteTarget?.title}"?`}
        loading={deleting}
      />

      <style>{`
        .badge { display: inline-block; padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
        .badge--published { background: #DEF7EC; color: #057A55; }
        .badge--draft { background: #F3F4F6; color: #6B7280; }
        .badge--archived { background: #FEF3C7; color: #92400E; }
      `}</style>
    </div>
  );
}
