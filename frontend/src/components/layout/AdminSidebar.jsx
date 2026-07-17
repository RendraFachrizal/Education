import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, School, Users, UserSquare2, Newspaper, Megaphone,
  Calendar, Trophy, Image, Video, Download, SlidersHorizontal,
  PanelTop, Menu, BookOpen, MessagesSquare, ClipboardList,
  HelpCircle, Settings, LogOut, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/profil-sekolah', label: 'Profil Sekolah', icon: School },
  { path: '/admin/berita', label: 'Berita', icon: Newspaper },
  { path: '/admin/kategori', label: 'Kategori', icon: BookOpen },
  { path: '/admin/guru', label: 'Guru', icon: Users },
  { path: '/admin/staff', label: 'Staff', icon: UserSquare2 },
  { path: '/admin/pengumuman', label: 'Pengumuman', icon: Megaphone },
  { path: '/admin/agenda', label: 'Agenda', icon: Calendar },
  { path: '/admin/prestasi', label: 'Prestasi', icon: Trophy },
  { path: '/admin/galeri', label: 'Galeri', icon: Image },
  { path: '/admin/video', label: 'Video', icon: Video },
  { path: '/admin/download', label: 'Download', icon: Download },
  { path: '/admin/slider', label: 'Slider', icon: SlidersHorizontal },
  { path: '/admin/banner', label: 'Banner', icon: PanelTop },
  { path: '/admin/menu', label: 'Menu', icon: Menu },
  { path: '/admin/ppdb', label: 'PPDB', icon: ClipboardList },
  { path: '/admin/testimoni', label: 'Testimoni', icon: MessagesSquare },
  { path: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { path: '/admin/pesan', label: 'Pesan', icon: MessagesSquare },
  { path: '/admin/user', label: 'User Admin', icon: Users },
  { path: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function AdminSidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/favicon.svg" alt="Logo" width={32} height={32} />
          {!collapsed && <span className="sidebar-title">Admin Panel</span>}
        </div>
        <button className="sidebar-toggle" onClick={onToggle}>
          <Menu size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'A'}
          </div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          )}
        </div>
        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={18} />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          width: ${collapsed ? '60px' : '250px'};
          height: 100vh;
          background: #1F2937;
          color: #fff;
          display: flex;
          flex-direction: column;
          transition: width 0.3s;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          overflow: hidden;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sidebar-title {
          font-weight: 700;
          font-size: 1rem;
        }
        .sidebar-toggle {
          color: #9CA3AF;
        }
        .sidebar-toggle:hover {
          color: #fff;
        }
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          color: #D1D5DB;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s;
          margin-bottom: 2px;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .sidebar-link.active {
          background: #1A56DB;
          color: #fff;
        }
        .sidebar-footer {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 0.75rem;
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1A56DB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .user-name {
          font-size: 0.8125rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role {
          font-size: 0.75rem;
          color: #9CA3AF;
          text-transform: capitalize;
        }
        .sidebar-logout {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          color: #FCA5A5;
          border-radius: 8px;
          font-size: 0.875rem;
          width: 100%;
          transition: background 0.2s;
        }
        .sidebar-logout:hover {
          background: rgba(239,68,68,0.15);
        }
      `}</style>
    </aside>
  );
}
