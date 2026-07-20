import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(form.email, form.password);
      login(response.data.user, response.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Login gagal. Periksa koneksi Anda.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <img src="/school-svgrepo-com.svg" alt="Logo" width={64} height={64} />
          </div>
          <h1>Admin Panel</h1>
          <p>SDN Profile - Masuk ke dashboard</p>
        </div>

        {error && (
          <div className="login-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@school.sch.id"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? <span className="loading-spinner" /> : <LogIn size={18} />}
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <style>{`
          .login-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F3F4F6;
            padding: 1rem;
          }
          .login-container {
            width: 100%;
            max-width: 400px;
            background: #fff;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          }
          .login-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .login-logo {
            margin-bottom: 1rem;
          }
          .login-logo img {
            margin: 0 auto;
          }
          .login-header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.25rem;
          }
          .login-header p {
            font-size: 0.875rem;
            color: #6B7280;
          }
          .login-alert {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: #FEF2F2;
            color: #DC2626;
            border-radius: 8px;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
          }
          .form-group label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
          }
          .form-group input {
            padding: 0.75rem;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 0.875rem;
            transition: border-color 0.2s;
          }
          .form-group input:focus {
            border-color: #1A56DB;
            box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
          }
          .input-wrapper {
            position: relative;
          }
          .input-wrapper input {
            width: 100%;
            padding-right: 2.5rem;
          }
          .toggle-password {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
          }
          .btn-login {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: #1A56DB;
            color: #fff;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            transition: background 0.2s;
            margin-top: 0.5rem;
          }
          .btn-login:hover:not(:disabled) {
            background: #1340A0;
          }
          .btn-login:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .loading-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
