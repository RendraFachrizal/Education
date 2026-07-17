import { useState } from 'react';
import { Search, ChevronDown, Edit, Trash2, Eye } from 'lucide-react';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import Loading from '../common/Loading';
import Button from '../common/Button';

export default function DataTable({
  columns,
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onSearch,
  onEdit,
  onDelete,
  onView,
  onAdd,
  searchPlaceholder = 'Cari data...',
  title,
  actions = true
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearch) {
      const timer = setTimeout(() => onSearch(val), 300);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        {title && <h2 className="data-table-title">{title}</h2>}
        <div className="data-table-toolbar">
          {onSearch && (
            <div className="data-table-search">
              <Search size={18} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          )}
          {onAdd && (
            <Button variant="primary" size="sm" onClick={onAdd}>
              + Tambah
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="data-table-error">
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Muat Ulang
          </Button>
        </div>
      ) : !data || data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} style={col.width ? { width: col.width } : {}}>
                      {col.label}
                    </th>
                  ))}
                  {actions && (onEdit || onDelete || onView) && (
                    <th style={{ width: '120px' }}>Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={row.id || rowIndex}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    {actions && (onEdit || onDelete || onView) && (
                      <td>
                        <div className="data-table-actions">
                          {onView && (
                            <button className="action-btn view" onClick={() => onView(row)} title="Lihat">
                              <Eye size={16} />
                            </button>
                          )}
                          {onEdit && (
                            <button className="action-btn edit" onClick={() => onEdit(row)} title="Edit">
                              <Edit size={16} />
                            </button>
                          )}
                          {onDelete && (
                            <button className="action-btn delete" onClick={() => onDelete(row)} title="Hapus">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}

      <style>{`
        .data-table-wrapper { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .data-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          border-bottom: 1px solid #E5E7EB;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .data-table-title { font-size: 1.125rem; font-weight: 700; color: #111827; }
        .data-table-toolbar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .data-table-search {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          color: #9CA3AF;
        }
        .data-table-search input {
          border: none;
          outline: none;
          font-size: 0.8125rem;
          min-width: 200px;
          color: #374151;
        }
        .data-table-container { overflow-x: auto; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th {
          text-align: left;
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #F9FAFB;
          border-bottom: 1px solid #E5E7EB;
          white-space: nowrap;
        }
        .data-table td {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #374151;
          border-bottom: 1px solid #F3F4F6;
        }
        .data-table tbody tr:hover { background: #F9FAFB; }
        .data-table-actions {
          display: flex;
          gap: 0.25rem;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .action-btn.view:hover { background: #E1EFFE; color: #1A56DB; }
        .action-btn.edit:hover { background: #DEF7EC; color: #0E9F6E; }
        .action-btn.delete:hover { background: #FEF2F2; color: #E02424; }
        .data-table-error {
          padding: 2rem;
          text-align: center;
          color: #DC2626;
        }
      `}</style>
    </div>
  );
}
