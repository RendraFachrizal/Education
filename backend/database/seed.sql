USE school_profile;

-- ========================================
-- 1. ROLES
-- ========================================
INSERT INTO roles (id, name, description) VALUES
(1, 'superadmin', 'Akses penuh ke seluruh fitur sistem'),
(2, 'admin', 'Akses ke manajemen konten'),
(3, 'operator', 'Akses terbatas untuk input data');

-- ========================================
-- 2. USERS (password: admin123)
-- ========================================
INSERT INTO users (id, role_id, name, email, password, status) VALUES
(1, 1, 'Super Admin', 'superadmin@school.sch.id', '$2b$10$b/fJrTDrCCaeuqCTN.fP2e0xLyK6Ci1oUGdo1euFk32iMD/3cWP3y', 'active'),
(2, 2, 'Admin Sekolah', 'admin@school.sch.id', '$2b$10$b/fJrTDrCCaeuqCTN.fP2e0xLyK6Ci1oUGdo1euFk32iMD/3cWP3y', 'active');

-- ========================================
-- 3. SETTINGS
-- ========================================
INSERT INTO settings (`key`, `value`, `group`, `type`) VALUES
('school_name', 'SDN Contoh Bangsa', 'general', 'text'),
('school_npsn', '12345678', 'general', 'text'),
('address', 'Jl. Pendidikan No. 1, Kelurahan Maju, Kecamatan Sejahtera, Kota Pendidikan', 'general', 'textarea'),
('phone', '(021) 1234-5678', 'general', 'text'),
('email', 'info@sdcontoh.sch.id', 'general', 'text'),
('website', 'https://sdcontoh.sch.id', 'general', 'text'),
('operating_hours', 'Senin - Jumat: 07:00 - 16:00 WIB', 'general', 'text'),
('about_us', 'SDN Contoh Bangsa adalah sekolah dasar unggulan yang berkomitmen mencetak generasi berprestasi, berkarakter, dan berakhlak mulia melalui pendidikan berkualitas dan pembelajaran inovatif.', 'general', 'textarea'),
('vision', 'Terwujudnya peserta didik yang beriman, berilmu, berkarakter, dan berdaya saing global.', 'general', 'textarea'),
('mission', '1. Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan\n2. Membentuk karakter peserta didik yang berakhlak mulia\n3. Mengembangkan potensi dan bakat peserta didik secara optimal\n4. Menjalin kerjasama yang harmonis dengan orang tua dan masyarakat', 'general', 'textarea'),
('facebook_url', 'https://facebook.com/sdcontohbangsa', 'social', 'text'),
('instagram_url', 'https://instagram.com/sdcontohbangsa', 'social', 'text'),
('youtube_url', 'https://youtube.com/@sdcontohbangsa', 'social', 'text'),
('maintenance_mode', 'false', 'general', 'boolean');

-- ========================================
-- 4. MENUS
-- ========================================
INSERT INTO menus (id, name, slug, url, parent_id, sort_order, position, status) VALUES
(1, 'Beranda', 'beranda', '/', NULL, 1, 'header', 'active'),
(2, 'Profil', 'profil', '/profil', NULL, 2, 'header', 'active'),
(3, 'Guru & Staff', 'guru', '/guru', NULL, 3, 'header', 'active'),
(4, 'Prestasi', 'prestasi', '/prestasi', NULL, 4, 'header', 'active'),
(5, 'Berita', 'berita', '/berita', NULL, 5, 'header', 'active'),
(6, 'Galeri', 'galeri', '/galeri', NULL, 6, 'header', 'active'),
(7, 'PPDB', 'ppdb', '/ppdb', NULL, 7, 'header', 'active'),
(8, 'Kontak', 'kontak', '/kontak', NULL, 8, 'header', 'active');

-- ========================================
-- 5. SCHOOL PROFILES
-- ========================================
INSERT INTO school_profiles (id, school_name, npsn, address, village, district, city, province, postal_code, phone, email, website, vision, mission, principal_name, principal_qualification) VALUES
(1, 'SDN Contoh Bangsa', '12345678', 'Jl. Pendidikan No. 1', 'Kelurahan Maju', 'Kecamatan Sejahtera', 'Kota Pendidikan', 'Provinsi Belajar', '12345', '(021) 1234-5678', 'info@sdcontoh.sch.id', 'https://sdcontoh.sch.id', 'Terwujudnya peserta didik yang beriman, berilmu, berkarakter, dan berdaya saing global.', '1. Menyelenggarakan pembelajaran yang aktif, kreatif, dan menyenangkan\n2. Membentuk karakter peserta didik yang berakhlak mulia\n3. Mengembangkan potensi dan bakat peserta didik secara optimal\n4. Menjalin kerjasama yang harmonis dengan orang tua dan masyarakat', 'Drs. H. Ahmad Syahputra, M.Pd.', 'S2 Pendidikan');

-- ========================================
-- 6. TEACHERS (10 data)
-- ========================================
INSERT INTO teachers (id, name, nip, subject, position, education, gender, phone, email, status) VALUES
(1, 'Drs. H. Ahmad Syahputra, M.Pd.', '198001012005011001', 'Kepala Sekolah', 'Kepala Sekolah', 'S2 Pendidikan', 'L', '081234567890', 'ahmad@sdcontoh.sch.id', 'active'),
(2, 'Dra. Siti Nurhaliza, M.Pd.', '198103152006042002', 'Guru Kelas', 'Wali Kelas VI', 'S2 Pendidikan', 'P', '081234567891', 'siti@sdcontoh.sch.id', 'active'),
(3, 'Bambang Supriyadi, S.Pd.', '198205202007013003', 'Matematika', 'Guru Mapel', 'S1 Pendidikan Matematika', 'L', '081234567892', 'bambang@sdcontoh.sch.id', 'active'),
(4, 'Rina Marlina, S.Pd.', '198307252008022004', 'Guru Kelas', 'Wali Kelas V', 'S1 PGSD', 'P', '081234567893', 'rina@sdcontoh.sch.id', 'active'),
(5, 'Dedi Kusnadi, S.Pd.I.', '198408302009033005', 'Pendidikan Agama', 'Guru Mapel', 'S1 PAI', 'L', '081234567894', 'dedi@sdcontoh.sch.id', 'active'),
(6, 'Fitri Handayani, S.Pd.', '198510052010044006', 'Guru Kelas', 'Wali Kelas IV', 'S1 PGSD', 'P', '081234567895', 'fitri@sdcontoh.sch.id', 'active'),
(7, 'Agus Wijaya, S.Pd.', '198611102011055007', 'Penjaskes', 'Guru Mapel', 'S1 Penjaskes', 'L', '081234567896', 'agus@sdcontoh.sch.id', 'active'),
(8, 'Dewi Sartika, S.Pd.', '198712152012066008', 'Guru Kelas', 'Wali Kelas III', 'S1 PGSD', 'P', '081234567897', 'dewi@sdcontoh.sch.id', 'active'),
(9, 'Hendra Gunawan, S.Pd.', '198801202013077009', 'Bahasa Inggris', 'Guru Mapel', 'S1 Pendidikan Bahasa Inggris', 'L', '081234567898', 'hendra@sdcontoh.sch.id', 'active'),
(10, 'Nurul Aini, S.Pd.', '198902252014088010', 'Guru Kelas', 'Wali Kelas II', 'S1 PGSD', 'P', '081234567899', 'nurul@sdcontoh.sch.id', 'active');

-- ========================================
-- 7. STAFF (5 data)
-- ========================================
INSERT INTO staffs (id, name, position, gender, phone, status) VALUES
(1, 'Tati Sumiati', 'Tata Usaha', 'P', '081111111111', 'active'),
(2, 'Joko Susilo', 'Bendahara', 'L', '081111111112', 'active'),
(3, 'Mega Wati', 'Perpustakaan', 'P', '081111111113', 'active'),
(4, 'Sariman', 'Penjaga Sekolah', 'L', '081111111114', 'active'),
(5, 'Eka Prasetya', 'Operator IT', 'L', '081111111115', 'active');

-- ========================================
-- 8. STUDENT STATISTICS
-- ========================================
INSERT INTO student_statistics (id, year, total_students, total_class, male_count, female_count) VALUES
(1, 2025, 360, 12, 185, 175),
(2, 2024, 350, 12, 180, 170),
(3, 2023, 340, 12, 172, 168);

-- ========================================
-- 9. NEWS CATEGORIES
-- ========================================
INSERT INTO news_categories (id, name, slug, status) VALUES
(1, 'Kegiatan Sekolah', 'kegiatan-sekolah', 'active'),
(2, 'Prestasi', 'prestasi', 'active'),
(3, 'Pengumuman', 'pengumuman', 'active'),
(4, 'Ekstrakurikuler', 'ekstrakurikuler', 'active');

-- ========================================
-- 10. NEWS (6 data)
-- ========================================
INSERT INTO news (id, category_id, title, slug, content, author, status, published_at) VALUES
(1, 1, 'Kegiatan MPLS Tahun Ajaran 2025/2026', 'kegiatan-mpls-2025', '<p>Masa Pengenalan Lingkungan Sekolah (MPLS) tahun ajaran 2025/2026 telah dilaksanakan pada tanggal 15-17 Juli 2025. Kegiatan ini diikuti oleh 120 siswa baru dengan penuh antusias. Berbagai kegiatan menarik seperti pengenalan guru, pengenalan fasilitas sekolah, dan permainan edukatif telah dilaksanakan.</p><p>Kami berharap siswa baru dapat beradaptasi dengan baik dan meraih prestasi selama belajar di SDN Contoh Bangsa.</p>', 'Admin', 'published', '2025-07-15 08:00:00'),
(2, 1, 'Upacara Hari Kemerdekaan RI ke-80', 'upacara-hari-kemerdekaan-80', '<p>SDN Contoh Bangsa menggelar upacara peringatan Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-80 pada 17 Agustus 2025. Seluruh siswa, guru, dan staff mengikuti upacara dengan khidmat.</p><p>Setelah upacara, dilaksanakan berbagai perlombaan tradisional seperti balap karung, makan kerupuk, dan tarik tambang yang diikuti oleh siswa dengan meriah.</p>', 'Admin', 'published', '2025-08-17 07:00:00'),
(3, 1, 'Karya Wisata Siswa ke Museum Nasional', 'karya-wisata-museum-nasional', '<p>Sebanyak 180 siswa kelas V dan VI mengikuti kegiatan karya wisata ke Museum Nasional pada tanggal 10 September 2025. Kegiatan ini bertujuan untuk menambah wawasan siswa tentang sejarah dan budaya bangsa.</p><p>Siswa sangat antusias mengamati berbagai koleksi sejarah yang dipamerkan. Diharapkan kegiatan ini dapat menumbuhkan rasa cinta tanah air pada diri siswa.</p>', 'Admin', 'published', '2025-09-10 08:00:00'),
(4, 4, 'Tim Pramuka Raih Juara Umum Lomba Tingkat', 'pramuka-juara-umum', '<p>Tim Pramuka SDN Contoh Bangsa berhasil meraih juara umum dalam Lomba Tingkat Regu Pramuka Siaga Tingkat Kecamatan Sejahtera. Prestasi ini diraih setelah melalui berbagai perlombaan seperti pioneering, sandi, dan keterampilan Pramuka.</p><p>Pembina Pramuka menyampaikan rasa bangga atas kerja keras dan kekompakan seluruh anggota regu. Prestasi ini akan menjadi motivasi untuk meraih prestasi yang lebih tinggi di tingkat kota.</p>', 'Admin', 'published', '2025-11-20 08:00:00'),
(5, 3, 'Pengumuman Kelulusan Kelas VI Tahun 2025', 'pengumuman-kelulusan-2025', '<p>Dengan mengucap syukur kepada Tuhan Yang Maha Esa, kami mengumumkan bahwa seluruh siswa kelas VI tahun ajaran 2024/2025 dinyatakan LULUS 100%. Pengumuman kelulusan dapat dilihat di papan pengumuman sekolah mulai pukul 10.00 WIB.</p><p>Pengambilan ijazah dapat dilakukan mulai tanggal 15 Juni 2025 di ruang Tata Usaha dengan membawa fotokopi Kartu Keluarga. Selamat kepada seluruh siswa yang telah lulus!</p>', 'Admin', 'published', '2025-06-10 09:00:00'),
(6, 4, 'Kegiatan Ekstrakurikuler Seni Tari Tradisional', 'ekstrakurikuler-seni-tari', '<p>Ekstrakurikuler Seni Tari Tradisional SDN Contoh Bangsa kembali aktif setiap hari Sabtu. Siswa diajarkan berbagai tarian daerah seperti Tari Saman, Tari Pendet, dan Tari Jaipong.</p><p>Kegiatan ini bertujuan untuk melestarikan budaya bangsa dan mengembangkan bakat seni siswa. Saat ini terdapat 35 siswa yang aktif mengikuti ekstrakurikuler ini.</p>', 'Admin', 'published', '2025-09-01 09:00:00');

-- ========================================
-- 11. ANNOUNCEMENTS (4 data)
-- ========================================
INSERT INTO announcements (id, title, content, priority, status, published_at) VALUES
(1, 'Pembagian Raport Semester Genap', 'Pembagian raport semester genap tahun ajaran 2024/2025 akan dilaksanakan pada hari Sabtu, 22 Juni 2025 pukul 08.00 WIB. Orang tua/wali murid diharapkan hadir tepat waktu.', 'normal', 'published', '2025-06-15 08:00:00'),
(2, 'Libur Hari Raya Idul Adha', 'Berdasarkan Surat Edaran Pemerintah, libur Hari Raya Idul Adha 1446 H jatuh pada tanggal 7-8 Juni 2025. Sekolah akan kembali aktif pada tanggal 9 Juni 2025.', 'normal', 'published', '2025-06-01 08:00:00'),
(3, 'Jadwal PPDB Gelombang 2', 'Pendaftaran Peserta Didik Baru (PPDB) Gelombang 2 akan dibuka mulai 1 Juli 2025. Kuota terbatas, segera daftarkan putra-putri Anda.', 'important', 'published', '2025-06-25 08:00:00'),
(4, 'Vaksinasi Siswa Kelas 1-6', 'Program vaksinasi akan dilaksanakan pada hari Kamis, 15 Agustus 2025 bekerjasama dengan Puskesmas Sejahtera. Mohon membawa kartu vaksin sebelumnya.', 'normal', 'published', '2025-08-10 08:00:00');

-- ========================================
-- 12. EVENTS (4 data)
-- ========================================
INSERT INTO events (id, title, description, start_date, end_date, location, status) VALUES
(1, 'MPLS Tahun Ajaran 2025/2026', 'Masa Pengenalan Lingkungan Sekolah bagi siswa baru', '2025-07-15', '2025-07-17', 'Lapangan SDN Contoh Bangsa', 'completed'),
(2, 'Peringatan HUT RI ke-80', 'Upacara dan perlombaan dalam rangka HUT Kemerdekaan RI', '2025-08-17', '2025-08-17', 'Lapangan SDN Contoh Bangsa', 'upcoming'),
(3, 'Karya Wisata Kelas V-VI', 'Kunjungan edukatif ke Museum Nasional', '2025-09-10', '2025-09-10', 'Museum Nasional', 'upcoming'),
(4, 'Pentas Seni Akhir Tahun', 'Pertunjukan seni dan penampilan bakat siswa', '2025-12-20', '2025-12-20', 'Aula SDN Contoh Bangsa', 'upcoming');

-- ========================================
-- 13. ACHIEVEMENTS (6 data)
-- ========================================
INSERT INTO achievements (id, title, category, rank, level, year, description, status) VALUES
(1, 'Juara 1 Olimpiade Matematika Tingkat Kota', 'akademik', 'Juara 1', 'kota', '2025', 'Atas nama Ananda Budi Prasetyo, siswa kelas VI', 'active'),
(2, 'Juara 2 Lomba Cerdas Cermat Tingkat Kecamatan', 'akademik', 'Juara 2', 'kecamatan', '2025', 'Tim cerdas cermat SDN Contoh Bangsa', 'active'),
(3, 'Juara 1 Pramuka Siaga Tingkat Kecamatan', 'non-akademik', 'Juara 1', 'kecamatan', '2025', 'Regu Pramuka Siaga SDN Contoh Bangsa', 'active'),
(4, 'Juara 3 Lomba Tahfidz Al-Quran Tingkat Kota', 'non-akademik', 'Juara 3', 'kota', '2025', 'Atas nama Ananda Siti Aisyah, siswa kelas V', 'active'),
(5, 'Juara Harapan 1 Seni Tari Tradisional', 'non-akademik', 'Harapan 1', 'kota', '2024', 'Tim tari tradisional SDN Contoh Bangsa', 'active'),
(6, 'Juara 2 Lomba Kebersihan Kelas Tingkat Sekolah', 'non-akademik', 'Juara 2', 'sekolah', '2025', 'Kelas VI-A sebagai kelas terbersih', 'active');

-- ========================================
-- 14. FACILITIES (6 data)
-- ========================================
INSERT INTO facilities (id, name, description, total, sort_order, status) VALUES
(1, 'Ruang Kelas', 'Ruang belajar yang nyaman dengan LCD proyektor', 12, 1, 'active'),
(2, 'Perpustakaan', 'Perpustakaan dengan koleksi 2000+ buku', 1, 2, 'active'),
(3, 'Laboratorium Komputer', 'Lab komputer dengan 30 unit PC', 1, 3, 'active'),
(4, 'Lapangan Olahraga', 'Lapangan multifungsi untuk olahraga dan upacara', 1, 4, 'active'),
(5, 'Mushola', 'Tempat ibadah yang nyaman', 1, 5, 'active'),
(6, 'Kantin Sehat', 'Kantin dengan makanan sehat dan bergizi', 1, 6, 'active');

-- ========================================
-- 15. GALLERIES (2 album)
-- ========================================
INSERT INTO galleries (id, title, description, status) VALUES
(1, 'MPLS 2025', 'Dokumentasi kegiatan MPLS tahun ajaran 2025/2026', 'active'),
(2, 'Upacara Hari Kemerdekaan', 'Dokumentasi peringatan HUT RI ke-80', 'active');

-- ========================================
-- 16. GALLERY IMAGES
-- ========================================
INSERT INTO gallery_images (id, gallery_id, image, caption, sort_order) VALUES
(1, 1, '/uploads/placeholder.svg', 'Pembukaan MPLS', 1),
(2, 1, '/uploads/placeholder.svg', 'Siswa baru berbaris', 2),
(3, 2, '/uploads/placeholder.svg', 'Pengibaran bendera', 1),
(4, 2, '/uploads/placeholder.svg', 'Lomba balap karung', 2);

-- ========================================
-- 17. VIDEOS (3 data)
-- ========================================
INSERT INTO videos (id, title, url, platform, category, status) VALUES
(1, 'Profil SDN Contoh Bangsa', 'https://www.youtube.com/watch?v=example1', 'youtube', 'Profil Sekolah', 'active'),
(2, 'Kegiatan MPLS 2025', 'https://www.youtube.com/watch?v=example2', 'youtube', 'Kegiatan', 'active'),
(3, 'Pentas Seni Akhir Tahun', 'https://www.youtube.com/watch?v=example3', 'youtube', 'Kegiatan', 'active');

-- ========================================
-- 18. DOWNLOADS (4 data)
-- ========================================
INSERT INTO downloads (id, title, description, file, file_type, category, status) VALUES
(1, 'Formulir PPDB 2025', 'Formulir pendaftaran peserta didik baru', '/uploads/documents/form-ppdb-2025.pdf', 'pdf', 'form', 'active'),
(2, 'Brosur Penerimaan Siswa Baru', 'Brosur informasi PPDB tahun ajaran 2025/2026', '/uploads/documents/brosur-ppdb-2025.pdf', 'pdf', 'brochure', 'active'),
(3, 'Kalender Akademik 2025/2026', 'Kalender pendidikan tahun ajaran 2025/2026', '/uploads/documents/kalender-akademik-2025.pdf', 'pdf', 'document', 'active'),
(4, 'Tata Tertib Sekolah', 'Buku tata tertib SDN Contoh Bangsa', '/uploads/documents/tata-tertib.pdf', 'pdf', 'document', 'active');

-- ========================================
-- 19. FAQS (6 data)
-- ========================================
INSERT INTO faqs (id, question, answer, category, sort_order, status) VALUES
(1, 'Bagaimana cara mendaftar PPDB?', 'Pendaftaran PPDB dilakukan secara online melalui website sekolah. Silakan klik menu PPDB dan ikuti langkah-langkah yang tersedia.', 'PPDB', 1, 'active'),
(2, 'Kapan jadwal PPDB dibuka?', 'PPDB dibuka setiap tahun pada bulan Maret-Juni. Informasi jadwal lengkap dapat dilihat di menu Pengumuman.', 'PPDB', 2, 'active'),
(3, 'Apa saja dokumen yang diperlukan untuk daftar?', 'Dokumen yang diperlukan: Akta Kelahiran, Kartu Keluarga, Pas Foto 3x4, dan ijazah TK (jika ada).', 'PPDB', 3, 'active'),
(4, 'Berapa biaya sekolah per bulan?', 'Biaya sekolah mengikuti ketentuan pemerintah. Untuk informasi detail silakan hubungi Tata Usaha.', 'Akademik', 4, 'active'),
(5, 'Jam berapa sekolah dimulai?', 'Sekolah dimulai pukul 07.00 WIB dan berakhir pukul 12.30 WIB. Khusus hari Jumat sampai pukul 11.00 WIB.', 'Akademik', 5, 'active'),
(6, 'Bagaimana cara menghubungi pihak sekolah?', 'Silakan hubungi nomor telepon (021) 1234-5678 atau datang langsung ke alamat sekolah pada jam kerja.', 'Kontak', 6, 'active');

-- ========================================
-- 20. TESTIMONIALS (4 data)
-- ========================================
INSERT INTO testimonials (id, name, origin, content, rating, status) VALUES
(1, 'Bapak Agus Santoso', 'Orang Tua Siswa', 'Saya sangat puas dengan kualitas pendidikan di SDN Contoh Bangsa. Anak saya mengalami perkembangan yang signifikan dalam akademik maupun karakter.', 5, 'active'),
(2, 'Ibu Rina Permata', 'Orang Tua Siswa', 'Guru-guru sangat profesional dan perhatian. Sekolah juga memiliki fasilitas yang memadai untuk mendukung pembelajaran.', 5, 'active'),
(3, 'Bapak Dedi Hermawan', 'Orang Tua Siswa', 'Kegiatan ekstrakurikulernya sangat bagus. Anak saya mengembangkan bakatnya di bidang seni tari.', 4, 'active'),
(4, 'Ibu Siti Maesyaroh', 'Orang Tua Siswa', 'Sekolah memiliki lingkungan yang nyaman dan aman. Saya merekomendasikan SDN Contoh Bangsa untuk pendidikan anak.', 5, 'active');

-- ========================================
-- 21. SLIDERS (3 data)
-- ========================================
INSERT INTO sliders (id, title, subtitle, button_text, button_url, sort_order, status) VALUES
(1, 'Selamat Datang di SDN Contoh Bangsa', 'Mencetak generasi berprestasi, berkarakter, dan berakhlak mulia', 'Profil Sekolah', '/profil', 1, 'active'),
(2, 'PPDB Tahun Ajaran 2025/2026', 'Daftarkan putra-putri Anda segera! Kuota terbatas.', 'Daftar Sekarang', '/ppdb', 2, 'active'),
(3, 'Prestasi Membanggakan', 'Raihan prestasi siswa di berbagai bidang, baik akademik maupun non-akademik', 'Lihat Prestasi', '/prestasi', 3, 'active');

-- ========================================
-- 22. CONTACTS
-- ========================================
INSERT INTO contacts (id, address, phone, email, working_hours) VALUES
(1, 'Jl. Pendidikan No. 1, Kelurahan Maju, Kecamatan Sejahtera, Kota Pendidikan 12345', '(021) 1234-5678', 'info@sdcontoh.sch.id', 'Senin - Jumat: 07:00 - 16:00 WIB');

-- ========================================
-- 23. SOCIAL MEDIA
-- ========================================
INSERT INTO social_media (id, platform, icon, url, sort_order, status) VALUES
(1, 'Facebook', 'facebook', 'https://facebook.com/sdcontohbangsa', 1, 'active'),
(2, 'Instagram', 'instagram', 'https://instagram.com/sdcontohbangsa', 2, 'active'),
(3, 'YouTube', 'youtube', 'https://youtube.com/@sdcontohbangsa', 3, 'active');

-- ========================================
-- 24. PROGRAMS (program unggulan)
-- ========================================
INSERT INTO programs (id, name, description, icon, type, status) VALUES
(1, 'Program Tahfidz', 'Program menghafal Al-Quran juz 30 untuk siswa', 'book', 'keagamaan', 'active'),
(2, 'Program Bilingual', 'Pembelajaran menggunakan bahasa Indonesia dan Inggris', 'globe', 'akademik', 'active'),
(3, 'Robotik', 'Ekstrakurikuler robotik untuk mengembangkan kreativitas', 'cpu', 'ekstrakurikuler', 'active');

-- ========================================
-- 25. PPDB SAMPLE (2 pendaftar contoh)
-- ========================================
INSERT INTO ppdb (id, registration_number, student_name, gender, religion, place_of_birth, date_of_birth, parent_phone, status, registered_at) VALUES
(1, 'PPDB/2025/001', 'Ahmad Fauzi', 'L', 'Islam', 'Jakarta', '2018-05-12', '081234567001', 'approved', '2025-01-15 08:30:00'),
(2, 'PPDB/2025/002', 'Siti Khadijah', 'P', 'Islam', 'Jakarta', '2019-01-20', '081234567002', 'pending', '2025-01-20 10:00:00');

-- ========================================
-- 26. MESSAGES (2 pesan contoh)
-- ========================================
INSERT INTO messages (id, name, email, subject, message, status) VALUES
(1, 'Hendra Gunawan', 'hendra@email.com', 'Informasi PPDB', 'Selamat pagi, saya ingin menanyakan informasi mengenai jadwal PPDB dan persyaratan yang diperlukan. Terima kasih.', 'read'),
(2, 'Dewi Lestari', 'dewi@email.com', 'Kegiatan Ekstrakurikuler', 'Mohon info jadwal ekstrakurikuler seni tari untuk siswa kelas 3. Apakah masih ada kuota?', 'unread');

-- ========================================
-- 27. BANNERS
-- ========================================
INSERT INTO banners (id, title, url, position, sort_order, status) VALUES
(1, 'PPDB 2025', '/ppdb', 'sidebar', 1, 'active'),
(2, 'Kalender Akademik', '/download', 'sidebar', 2, 'active');

-- ========================================
-- Reset auto_increment
-- ========================================
SET @max_id = (SELECT GREATEST(
  (SELECT COALESCE(MAX(id),0) FROM roles),
  (SELECT COALESCE(MAX(id),0) FROM users),
  (SELECT COALESCE(MAX(id),0) FROM menus),
  (SELECT COALESCE(MAX(id),0) FROM school_profiles),
  (SELECT COALESCE(MAX(id),0) FROM teachers),
  (SELECT COALESCE(MAX(id),0) FROM staffs),
  (SELECT COALESCE(MAX(id),0) FROM student_statistics),
  (SELECT COALESCE(MAX(id),0) FROM achievements),
  (SELECT COALESCE(MAX(id),0) FROM facilities),
  (SELECT COALESCE(MAX(id),0) FROM programs),
  (SELECT COALESCE(MAX(id),0) FROM news_categories),
  (SELECT COALESCE(MAX(id),0) FROM news),
  (SELECT COALESCE(MAX(id),0) FROM announcements),
  (SELECT COALESCE(MAX(id),0) FROM events),
  (SELECT COALESCE(MAX(id),0) FROM galleries),
  (SELECT COALESCE(MAX(id),0) FROM gallery_images),
  (SELECT COALESCE(MAX(id),0) FROM videos),
  (SELECT COALESCE(MAX(id),0) FROM downloads),
  (SELECT COALESCE(MAX(id),0) FROM faqs),
  (SELECT COALESCE(MAX(id),0) FROM testimonials),
  (SELECT COALESCE(MAX(id),0) FROM sliders),
  (SELECT COALESCE(MAX(id),0) FROM contacts),
  (SELECT COALESCE(MAX(id),0) FROM social_media),
  (SELECT COALESCE(MAX(id),0) FROM ppdb),
  (SELECT COALESCE(MAX(id),0) FROM messages),
  (SELECT COALESCE(MAX(id),0) FROM banners)
));
