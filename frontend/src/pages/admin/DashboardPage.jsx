import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import {
  Newspaper, Users, Calendar, MessageSquare, UserCheck, Trophy
} from 'lucide-react';

const statCards = [
  { key: 'total_news', label: 'Berita', icon: Newspaper, color: '#1A56DB' },
  { key: 'total_teachers', label: 'Guru', icon: Users, color: '#0E9F6E' },
  { key: 'total_events', label: 'Agenda', icon: Calendar, color: '#F59E0B' },
  { key: 'total_unread_messages', label: 'Pesan Baru', icon: MessageSquare, color: '#E02424' }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/dashboard/stats');
      setStats(data.data);
    } catch (err) {
      setError('Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#DC2626' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
        Selamat Datang, {user?.name}
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
        Ringkasan data website sekolah
      </p>

      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.key} className="stat-card">
            <div className="stat-icon" style={{ background: `${card.color}15`, color: card.color }}>
              <card.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats?.[card.key] ?? 0}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      {stats?.ppdb_stats && (
        <div className="dashboard-section">
          <h3 className="section-title">Statistik PPDB</h3>
          <div className="stats-grid">
            <div className="stat-card stat-card--sm">
              <span className="stat-value">{stats.ppdb_stats.total}</span>
              <span className="stat-label">Total Pendaftar</span>
            </div>
            <div className="stat-card stat-card--sm">
              <span className="stat-value" style={{ color: '#F59E0B' }}>{stats.ppdb_stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card stat-card--sm">
              <span className="stat-value" style={{ color: '#1A56DB' }}>{stats.ppdb_stats.verified}</span>
              <span className="stat-label">Terverifikasi</span>
            </div>
            <div className="stat-card stat-card--sm">
              <span className="stat-value" style={{ color: '#0E9F6E' }}>{stats.ppdb_stats.approved}</span>
              <span className="stat-label">Diterima</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          background: #fff;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .stat-card--sm {
          flex-direction: column;
          text-align: center;
          padding: 1rem;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          line-height: 1.2;
        }
        .stat-label {
          font-size: 0.8125rem;
          color: #6B7280;
        }
        .dashboard-section {
          margin-top: 1.5rem;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
