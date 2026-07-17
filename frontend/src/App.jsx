import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import HomePage from './pages/public/HomePage';
import NotFoundPage from './pages/public/NotFoundPage';
import NewsManagementPage from './pages/admin/NewsManagementPage';
import NewsFormPage from './pages/admin/NewsFormPage';
import CategoriesManagementPage from './pages/admin/CategoriesManagementPage';
import TeachersManagementPage from './pages/admin/TeachersManagementPage';
import TeacherFormPage from './pages/admin/TeacherFormPage';
import StaffManagementPage from './pages/admin/StaffManagementPage';
import AnnouncementsManagementPage from './pages/admin/AnnouncementsManagementPage';
import EventsManagementPage from './pages/admin/EventsManagementPage';
import AchievementsManagementPage from './pages/admin/AchievementsManagementPage';
import GalleriesManagementPage from './pages/admin/GalleriesManagementPage';
import GalleryFormPage from './pages/admin/GalleryFormPage';
import VideosManagementPage from './pages/admin/VideosManagementPage';
import VideoFormPage from './pages/admin/VideoFormPage';
import DownloadsManagementPage from './pages/admin/DownloadsManagementPage';
import SlidersManagementPage from './pages/admin/SlidersManagementPage';
import MenusManagementPage from './pages/admin/MenusManagementPage';
import FAQsManagementPage from './pages/admin/FAQsManagementPage';
import TestimonialsManagementPage from './pages/admin/TestimonialsManagementPage';
import PPDBManagementPage from './pages/admin/PPDBManagementPage';
import MessagesPage from './pages/admin/MessagesPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import SchoolProfilePage from './pages/admin/SchoolProfilePage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <NotificationProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Auth */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="berita" element={<NewsManagementPage />} />
          <Route path="berita/tambah" element={<NewsFormPage />} />
          <Route path="berita/edit/:id" element={<NewsFormPage />} />
          <Route path="kategori" element={<CategoriesManagementPage />} />
          <Route path="guru" element={<TeachersManagementPage />} />
          <Route path="guru/tambah" element={<TeacherFormPage />} />
          <Route path="guru/edit/:id" element={<TeacherFormPage />} />
          <Route path="staff" element={<StaffManagementPage />} />
          <Route path="pengumuman" element={<AnnouncementsManagementPage />} />
          <Route path="events" element={<EventsManagementPage />} />
          <Route path="prestasi" element={<AchievementsManagementPage />} />
          <Route path="galeri" element={<GalleriesManagementPage />} />
          <Route path="galeri/tambah" element={<GalleryFormPage />} />
          <Route path="galeri/edit/:id" element={<GalleryFormPage />} />
          <Route path="video" element={<VideosManagementPage />} />
          <Route path="video/tambah" element={<VideoFormPage />} />
          <Route path="video/edit/:id" element={<VideoFormPage />} />
          <Route path="download" element={<DownloadsManagementPage />} />
          <Route path="slider" element={<SlidersManagementPage />} />
          <Route path="menu" element={<MenusManagementPage />} />
          <Route path="faq" element={<FAQsManagementPage />} />
          <Route path="testimoni" element={<TestimonialsManagementPage />} />
          <Route path="ppdb" element={<PPDBManagementPage />} />
          <Route path="pesan" element={<MessagesPage />} />
          <Route path="user" element={<UsersManagementPage />} />
          <Route path="profil-sekolah" element={<SchoolProfilePage />} />
          <Route path="pengaturan" element={<SettingsPage />} />
        </Route>
      </Routes>
    </NotificationProvider>
  );
}

export default App;
