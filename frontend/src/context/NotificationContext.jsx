import { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="toast-container">
        {notifications.map((n) => (
          <div key={n.id} className={`toast toast--${n.type}`} onClick={() => removeNotification(n.id)}>
            {n.message}
          </div>
        ))}
      </div>
      <style>{`
        .toast-container {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .toast {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 500;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          cursor: pointer;
          animation: slideIn 0.3s ease;
          min-width: 250px;
        }
        .toast--success { background: #0E9F6E; }
        .toast--error { background: #E02424; }
        .toast--warning { background: #F59E0B; }
        .toast--info { background: #1A56DB; }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}
