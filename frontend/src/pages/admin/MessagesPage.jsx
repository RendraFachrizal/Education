import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/common/Modal';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';
import { Mail, MailOpen } from 'lucide-react';

export default function MessagesPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get('/messages', { params: { page, limit: 10 } });
      setData(res.data.data || []); setPagination(res.data.pagination);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleView = async (row) => {
    setViewTarget(row);
    if (row.status === 'unread') {
      try { await api.get(`/messages/${row.id}`); fetchData(); } catch {}
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/messages/${deleteTarget.id}`);
      addNotification('Pesan dihapus', 'success');
      setDeleteTarget(null); fetchData();
    } catch { addNotification('Gagal menghapus', 'error'); }
    finally { setDeleting(false); }
  };

  const columns = [
    { key: 'name', label: 'Pengirim', render: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {row.status === 'unread' ? <Mail size={14} color="#1A56DB" /> : <MailOpen size={14} color="#9CA3AF" />}
        <span style={{ fontWeight: row.status === 'unread' ? 600 : 400 }}>{row.name}</span>
      </div>
    )},
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subjek' },
    { key: 'created_at', label: 'Tanggal', render: (row) => new Date(row.created_at).toLocaleDateString('id-ID') },
    { key: 'status', label: 'Status', render: (row) => (
      <span style={{ color: row.status === 'unread' ? '#1A56DB' : row.status === 'read' ? '#0E9F6E' : '#6B7280' }}>
        {row.status === 'unread' ? 'Baru' : row.status === 'read' ? 'Dibaca' : 'Dibalas'}
      </span>
    )}
  ];

  return (
    <div>
      <AdminPage title="Pesan Masuk" subtitle="Pesan dari pengunjung website">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onView={handleView}
          onDelete={(row) => setDeleteTarget(row)} />
      </AdminPage>

      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Detail Pesan" width="600px">
        {viewTarget && (
          <div>
            <div className="form-row">
              <div className="form-group"><label>Nama</label><div style={{ fontWeight: 500 }}>{viewTarget.name}</div></div>
              <div className="form-group"><label>Email</label><div>{viewTarget.email}</div></div>
            </div>
            {viewTarget.phone && <div className="form-group"><label>Telepon</label><div>{viewTarget.phone}</div></div>}
            <div className="form-group"><label>Subjek</label><div style={{ fontWeight: 500 }}>{viewTarget.subject || '-'}</div></div>
            <div className="form-group"><label>Pesan</label>
              <div style={{ padding: '0.75rem', background: '#F9FAFB', borderRadius: 8, whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>
                {viewTarget.message}
              </div>
            </div>
            <div className="form-group"><label>Tanggal</label><div style={{ color: '#6B7280', fontSize: '0.875rem' }}>
              {new Date(viewTarget.created_at).toLocaleString('id-ID')}
            </div></div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
