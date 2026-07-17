USE school_profile;

-- ========================================
-- Seed: Roles
-- ========================================
INSERT INTO roles (id, name, description) VALUES
(1, 'superadmin', 'Akses penuh ke seluruh fitur sistem'),
(2, 'admin', 'Akses ke manajemen konten'),
(3, 'operator', 'Akses terbatas untuk input data');

-- ========================================
-- Seed: Users (password: admin123)
-- ========================================
INSERT INTO users (id, role_id, name, email, password, status) VALUES
(1, 1, 'Super Admin', 'superadmin@school.sch.id', '$2a$10$YourBcryptHashHere', 'active'),
(2, 2, 'Admin Sekolah', 'admin@school.sch.id', '$2a$10$YourBcryptHashHere', 'active');

-- ========================================
-- Seed: Settings
-- ========================================
INSERT INTO settings (`key`, `value`, `group`, `type`) VALUES
('site_title', 'SDN Contoh Bangsa', 'general', 'text'),
('site_description', 'Sekolah Dasar unggulan yang mencetak generasi berprestasi dan berakhlak mulia', 'general', 'text'),
('site_keywords', 'SD, sekolah dasar, pendidikan, sekolah unggulan', 'general', 'text'),
('maintenance_mode', 'false', 'general', 'boolean'),
('ppdb_active', 'true', 'ppdb', 'boolean'),
('ppdb_year', '2025/2026', 'ppdb', 'text'),
('ppdb_phase', 'Gelombang 1', 'ppdb', 'text'),
('ppdb_start_date', '', 'ppdb', 'text'),
('ppdb_end_date', '', 'ppdb', 'text');

-- ========================================
-- Seed: Menus
-- ========================================
INSERT INTO menus (id, name, slug, url, parent_id, sort_order, position, status) VALUES
(1, 'Beranda', 'beranda', '/', NULL, 1, 'header', 'active'),
(2, 'Profil', 'profil', '/profil', NULL, 2, 'header', 'active'),
(3, 'Sambutan Kepala Sekolah', 'sambutan', '/profil/sambutan', 2, 1, 'header', 'active'),
(4, 'Sejarah', 'sejarah', '/profil/sejarah', 2, 2, 'header', 'active'),
(5, 'Visi Misi', 'visi-misi', '/profil/visi-misi', 2, 3, 'header', 'active'),
(6, 'Struktur Organisasi', 'struktur-organisasi', '/profil/struktur-organisasi', 2, 4, 'header', 'active'),
(7, 'Guru', 'guru', '/guru', NULL, 3, 'header', 'active'),
(8, 'Prestasi', 'prestasi', '/prestasi', NULL, 4, 'header', 'active'),
(9, 'Berita', 'berita', '/berita', NULL, 5, 'header', 'active'),
(10, 'Galeri', 'galeri', '/galeri', NULL, 6, 'header', 'active'),
(11, 'PPDB', 'ppdb', '/ppdb', NULL, 7, 'header', 'active'),
(12, 'Kontak', 'kontak', '/kontak', NULL, 8, 'header', 'active');

-- ========================================
-- Seed: School Profile (minimal)
-- ========================================
INSERT INTO school_profiles (id, school_name, npsn, address, village, district, city, province) VALUES
(1, 'SDN Contoh Bangsa', '12345678', 'Jl. Pendidikan No. 1', 'Kelurahan Maju', 'Kecamatan Sejahtera', 'Kota Pendidikan', 'Provinsi belajar');

-- ========================================
-- Seed: Contact
-- ========================================
INSERT INTO contacts (id, address, phone, email, working_hours) VALUES
(1, 'Jl. Pendidikan No. 1, Kelurahan Maju, Kecamatan Sejahtera', '021-12345678', 'info@sdcontoh.sch.id', 'Senin - Jumat: 07:00 - 16:00');
