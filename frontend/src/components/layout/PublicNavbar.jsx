import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil' },
  { to: '/guru', label: 'Guru' },
  { to: '/prestasi', label: 'Prestasi' },
  { to: '/berita', label: 'Berita' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/ppdb', label: 'PPDB' },
  { to: '/kontak', label: 'Kontak' }
];

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="public-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/favicon.svg" alt="Logo" width={36} height={36} />
          <span className="navbar-title">SDN Profile</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/ppdb" className="navbar-cta">PPDB</Link>
        </div>
      </div>

      <style>{`
        .public-navbar {
          background: #fff;
          border-bottom: 1px solid #E5E7EB;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .navbar-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
        }
        .navbar-toggle {
          display: none;
          color: #374151;
        }
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .navbar-link {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6B7280;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .navbar-link:hover { color: #1A56DB; background: #F3F4F6; }
        .navbar-link.active { color: #1A56DB; font-weight: 600; }
        .navbar-cta {
          padding: 0.5rem 1rem;
          background: #1A56DB;
          color: #fff !important;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-left: 0.5rem;
          transition: background 0.2s;
        }
        .navbar-cta:hover { background: #1340A0; }

        @media (max-width: 768px) {
          .navbar-toggle { display: block; }
          .navbar-menu {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            padding: 0.5rem;
            border-bottom: 1px solid #E5E7EB;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          }
          .navbar-menu.open { display: flex; }
          .navbar-link { width: 100%; padding: 0.75rem; }
          .navbar-cta { width: 100%; text-align: center; margin-left: 0; margin-top: 0.25rem; }
        }
      `}</style>
    </nav>
  );
}
