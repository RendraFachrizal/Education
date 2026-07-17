const MODULES = [
  'auth', 'profile', 'teacher', 'staff', 'news', 'category',
  'announcement', 'event', 'achievement', 'gallery', 'video',
  'download', 'faq', 'testimonial', 'slider', 'banner',
  'menu', 'footer', 'contact', 'message', 'ppdb',
  'social-media', 'facility', 'program', 'user', 'setting', 'dashboard', 'log'
];

const NEWS_STATUS = { DRAFT: 'draft', PUBLISHED: 'published', ARCHIVED: 'archived' };
const PPDB_STATUS = { PENDING: 'pending', VERIFIED: 'verified', APPROVED: 'approved', REJECTED: 'rejected', WAITING_LIST: 'waiting_list' };
const ACHIEVEMENT_LEVELS = ['sekolah', 'kecamatan', 'kota', 'provinsi', 'nasional', 'internasional'];

const DEFAULT_PAGINATION = { page: 1, limit: 10 };

module.exports = { MODULES, NEWS_STATUS, PPDB_STATUS, ACHIEVEMENT_LEVELS, DEFAULT_PAGINATION };
