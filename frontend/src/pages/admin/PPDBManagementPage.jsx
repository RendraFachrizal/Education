import { useState, useEffect, useCallback } from 'react';
import AdminPage from '../../components/ui/AdminPage';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useNotification } from '../../hooks/useNotification';
import api from '../../services/api';

export default function PPDBManagementPage() {
  const { addNotification } = useNotification();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [viewTarget, setViewTarget] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [regRes, statsRes] = await Promise.all([
        api.get('/ppdb/registrants', { params: { page, limit: 10 } }),
        api.get('/ppdb/stats')
      ]);
      setData(regRes.data.data.data || []);
      setPagination(regRes.data.data.pagination);
      setStats(statsRes.data.data);
    } catch { setError('Gagal memuat data'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/ppdb/registrants/${id}/status`, { status });
      addNotification('Status berhasil diupdate', 'success');
      fetchData();
      if (viewTarget?.id === id) setViewTarget({ ...viewTarget, status });
    } catch { addNotification('Gagal update status', 'error'); }
  };

  const columns = [
    { key: 'registration_number', label: 'No. Daftar', render: (row) => <span style={{ fontWeight: 500, fontSize: '0.8125rem' }}>{row.registration_number}</span> },
    { key: 'student_name', label: 'Nama', render: (row) => <span style={{ fontWeight: 500 }}>{row.student_name}</span> },
    { key: 'gender', label: 'JK', render: (row) => row.gender === 'L' ? 'L' : 'P' },
    { key: 'parent_phone', label: 'No. HP' },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`ppdb-badge ppdb-badge--${row.status}`}>
        {row.status === 'pending' ? 'Pending' : row.status === 'verified' ? 'Terverifikasi' : row.status === 'approved' ? 'Diterima' : row.status === 'rejected' ? 'Ditolak' : 'Waiting List'}
      </span>
    )},
    { key: 'registered_at', label: 'Daftar', render: (row) => new Date(row.registered_at).toLocaleDateString('id-ID') }
  ];

  return (
    <div>
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} style={{ background: '#fff', borderRadius: 8, padding: '1rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      )}

      <AdminPage title="Data PPDB" subtitle="Kelola pendaftaran peserta didik baru">
        <DataTable columns={columns} data={data} loading={loading} error={error}
          pagination={pagination} onPageChange={setPage}
          onView={(row) => setViewTarget(row)} />
      </AdminPage>

      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Detail Pendaftar" width="700px">
        {viewTarget && (
          <div>
            <div className="form-row">
              <div className="form-group"><label>No. Pendaftaran</label><div style={{ fontWeight: 600 }}>{viewTarget.registration_number}</div></div>
              <div className="form-group"><label>Status</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['pending','verified','approved','rejected','waiting_list'].map(s => (
                    <button key={s} onClick={() => handleStatusChange(viewTarget.id, s)}
                      style={{ padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 500,
                        background: viewTarget.status === s ? '#1A56DB' : '#F3F4F6',
                        color: viewTarget.status === s ? '#fff' : '#374151' }}>
                      {s === 'pending' ? 'Pending' : s === 'verified' ? 'Verifikasi' : s === 'approved' ? 'Terima' : s === 'rejected' ? 'Tolak' : 'Waiting List'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 600 }}>Data Siswa</h4>
            <div className="form-row">
              <div className="form-group"><label>Nama</label><div>{viewTarget.student_name}</div></div>
              <div className="form-group"><label>Tempat, Tgl Lahir</label><div>{viewTarget.place_of_birth ? `${viewTarget.place_of_birth}, ${viewTarget.date_of_birth ? new Date(viewTarget.date_of_birth).toLocaleDateString('id-ID') : '-'}` : '-'}</div></div>
            </div>
            <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 600 }}>Data Orang Tua</h4>
            <div className="form-row">
              <div className="form-group"><label>Ayah</label><div>{viewTarget.father_name || '-'}</div></div>
              <div className="form-group"><label>Ibu</label><div>{viewTarget.mother_name || '-'}</div></div>
            </div>
            <div className="form-group"><label>No. HP Orang Tua</label><div>{viewTarget.parent_phone}</div></div>
          </div>
        )}
      </Modal>

      <style>{`
        .ppdb-badge { display: inline-block; padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
        .ppdb-badge--pending { background: #FEF3C7; color: #92400E; }
        .ppdb-badge--verified { background: #E1EFFE; color: #1A56DB; }
        .ppdb-badge--approved { background: #DEF7EC; color: #057A55; }
        .ppdb-badge--rejected { background: #FEF2F2; color: #DC2626; }
        .ppdb-badge--waiting_list { background: #F3F4F6; color: #6B7280; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.25rem; }
        .form-group label { font-size: 0.75rem; font-weight: 500; color: #6B7280; }
      `}</style>
    </div>
  );
}
