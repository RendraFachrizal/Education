// Route configuration for future use with createBrowserRouter
// Currently using BrowserRouter in main.jsx with manual Routes in App.jsx

export const PUBLIC_ROUTES = {
  home: '/',
  profile: '/profil',
  teachers: '/guru',
  achievements: '/prestasi',
  news: '/berita',
  newsDetail: '/berita/:slug',
  gallery: '/galeri',
  galleryDetail: '/galeri/:slug',
  events: '/agenda',
  ppdb: '/ppdb',
  contact: '/kontak',
  faq: '/faq',
  downloads: '/download'
};

export const ADMIN_ROUTES = {
  dashboard: '/admin',
  login: '/admin/login',
  profile: '/admin/profil',
  schoolProfile: '/admin/profil-sekolah',
  teachers: '/admin/guru',
  staffs: '/admin/staff',
  news: '/admin/berita',
  announcements: '/admin/pengumuman',
  events: '/admin/agenda',
  achievements: '/admin/prestasi',
  galleries: '/admin/galeri',
  videos: '/admin/video',
  downloads: '/admin/download',
  sliders: '/admin/slider',
  banners: '/admin/banner',
  menus: '/admin/menu',
  ppdb: '/admin/ppdb',
  testimonials: '/admin/testimoni',
  faqs: '/admin/faq',
  messages: '/admin/pesan',
  users: '/admin/user',
  settings: '/admin/pengaturan'
};
