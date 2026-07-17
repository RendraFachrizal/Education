import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminHeader from '../components/layout/AdminHeader';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`admin-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        <AdminHeader />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }
        .admin-main {
          flex: 1;
          margin-left: 250px;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s;
          background: #F9FAFB;
        }
        .admin-main.expanded {
          margin-left: 60px;
        }
        .admin-content {
          flex: 1;
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
}
