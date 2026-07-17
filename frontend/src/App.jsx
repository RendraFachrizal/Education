import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Public Layout - Coming Soon</div>} />
      <Route path="/admin/login" element={<div>Admin Login - Coming Soon</div>} />
    </Routes>
  );
}

export default App;
