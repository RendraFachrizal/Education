const mysql = require('mysql2/promise');
require('dotenv').config();

const UNSPLASH = 'https://images.unsplash.com';

const images = {
  school: UNSPLASH + '/photo-1580582932707-520aed937b7b?w=1200&h=600&fit=crop',
  students: UNSPLASH + '/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
  library: UNSPLASH + '/photo-1524995997946-a1c2e315a42f?w=800&h=400&fit=crop',
  computer: UNSPLASH + '/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  field: UNSPLASH + '/photo-1575361204480-aadea25e6e68?w=800&h=400&fit=crop',
  mosque: UNSPLASH + '/photo-1561715276-a2d1c0e9c7f0?w=800&h=400&fit=crop',
  mpls: UNSPLASH + '/photo-1523050854058-8df90110c7f1?w=1200&h=800&fit=crop',
  ceremony: UNSPLASH + '/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop',
  museum: UNSPLASH + '/photo-1566125885819-e7e9c7ad90e5?w=1200&h=800&fit=crop',
  pramuka: UNSPLASH + '/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop',
  graduation: UNSPLASH + '/photo-1523050854058-8df90110c7f1?w=1200&h=800&fit=crop',
  dance: UNSPLASH + '/photo-1547153760-18fc8636b6c2?w=1200&h=800&fit=crop',
  teacher1: UNSPLASH + '/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop',
  teacher2: UNSPLASH + '/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
  teacher3: UNSPLASH + '/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
  teacher4: UNSPLASH + '/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
  teacher5: UNSPLASH + '/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  teacher6: UNSPLASH + '/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  teacher7: UNSPLASH + '/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  teacher8: UNSPLASH + '/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  teacher9: UNSPLASH + '/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
  teacher10: UNSPLASH + '/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
  photo1: UNSPLASH + '/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop',
  photo2: UNSPLASH + '/photo-1523050854058-8df90110c7f1?w=600&h=600&fit=crop',
  photo3: UNSPLASH + '/photo-1517486808906-6ca8b3f04846?w=600&h=600&fit=crop',
  photo4: UNSPLASH + '/photo-1559027615-cd4628902d4a?w=600&h=600&fit=crop',
  slide1: UNSPLASH + '/photo-1580582932707-520aed937b7b?w=1400&h=600&fit=crop',
  slide2: UNSPLASH + '/photo-1523050854058-8df90110c7f1?w=1400&h=600&fit=crop',
  slide3: UNSPLASH + '/photo-1503676260728-1c00da094a0b?w=1400&h=600&fit=crop',
  achievement1: UNSPLASH + '/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop',
  achievement2: UNSPLASH + '/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop',
  logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991234.png'
};

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: 'school_profile',
    multipleStatements: true
  });

  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  const tables = ['settings','banners','messages','ppdb','social_media','contacts','sliders','testimonials','faqs','downloads','videos','gallery_images','galleries','events','announcements','news','news_categories','programs','facilities','achievements','student_statistics','staffs','teachers','school_profiles','menus','users','roles'];
  for (const t of tables) await conn.query('TRUNCATE TABLE `' + t + '`');
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('Truncated OK');

  await conn.query("INSERT INTO roles (id, name, description) VALUES (1,'superadmin','Akses penuh'),(2,'admin','Manajemen konten'),(3,'operator','Input data')");
  await conn.query("INSERT INTO users (id, role_id, name, email, password, status) VALUES (1,1,'Super Admin','superadmin@school.sch.id','$2b$10$b/fJrTDrCCaeuqCTN.fP2e0xLyK6Ci1oUGdo1euFk32iMD/3cWP3y','active'),(2,2,'Admin Sekolah','admin@school.sch.id','$2b$10$b/fJrTDrCCaeuqCTN.fP2e0xLyK6Ci1oUGdo1euFk32iMD/3cWP3y','active')");

  await conn.query("INSERT INTO settings (`key`, `value`, `group`, `type`) VALUES ('school_name','SDN Contoh Bangsa','general','text'),('phone','(021) 1234-5678','general','text'),('email','info@sdcontoh.sch.id','general','text'),('address','Jl. Pendidikan No. 1, Kelurahan Maju, Kecamatan Sejahtera, Kota Pendidikan','general','textarea'),('about_us','SDN Contoh Bangsa adalah sekolah dasar unggulan yang berkomitmen mencetak generasi berprestasi, berkarakter, dan berakhlak mulia melalui pendidikan berkualitas dan pembelajaran inovatif.','general','textarea'),('vision','Terwujudnya peserta didik yang beriman, berilmu, berkarakter, dan berdaya saing global.','general','textarea'),('mission','Sekolah unggulan mencetak generasi berprestasi dan berakhlak mulia.','general','textarea'),('facebook_url','https://facebook.com/sdcontohbangsa','social','text'),('instagram_url','https://instagram.com/sdcontohbangsa','social','text'),('youtube_url','https://youtube.com/@sdcontohbangsa','social','text')");

  await conn.query("INSERT INTO menus (id, name, slug, url, sort_order, position, status) VALUES (1,'Beranda','beranda','/',1,'header','active'),(2,'Profil','profil','/profil',2,'header','active'),(3,'Guru','guru','/guru',3,'header','active'),(4,'Prestasi','prestasi','/prestasi',4,'header','active'),(5,'Berita','berita','/berita',5,'header','active'),(6,'Galeri','galeri','/galeri',6,'header','active'),(7,'PPDB','ppdb','/ppdb',7,'header','active'),(8,'Kontak','kontak','/kontak',8,'header','active')");

  await conn.query("INSERT INTO school_profiles (id, school_name, npsn, address, village, district, city, province, postal_code, phone, email, website) VALUES (1,'SDN Contoh Bangsa','12345678','Jl. Pendidikan No. 1','Kelurahan Maju','Kecamatan Sejahtera','Kota Pendidikan','Provinsi Belajar','12345','(021) 1234-5678','info@sdcontoh.sch.id','https://sdcontoh.sch.id')");

  // Teachers with photos
  const teacherData = [
    [1,"'Drs. H. Ahmad Syahputra, M.Pd.'","'198001012005011001'","'Kepala Sekolah'","'Kepala Sekolah'","'S2 Pendidikan'","'L'","'081234567890'","'ahmad@sdcontoh.sch.id'","'"+images.teacher1+"'"],
    [2,"'Dra. Siti Nurhaliza, M.Pd.'","'198103152006042002'","'Guru Kelas'","'Wali Kelas VI'","'S2 Pendidikan'","'P'","'081234567891'","'siti@sdcontoh.sch.id'","'"+images.teacher2+"'"],
    [3,"'Bambang Supriyadi, S.Pd.'","'198205202007013003'","'Matematika'","'Guru Mapel'","'S1 Pendidikan Matematika'","'L'","'081234567892'","'bambang@sdcontoh.sch.id'","'"+images.teacher3+"'"],
    [4,"'Rina Marlina, S.Pd.'","'198307252008022004'","'Guru Kelas'","'Wali Kelas V'","'S1 PGSD'","'P'","'081234567893'","'rina@sdcontoh.sch.id'","'"+images.teacher4+"'"],
    [5,"'Dedi Kusnadi, S.Pd.I.'","'198408302009033005'","'Pendidikan Agama'","'Guru Mapel'","'S1 PAI'","'L'","'081234567894'","'dedi@sdcontoh.sch.id'","'"+images.teacher5+"'"],
    [6,"'Fitri Handayani, S.Pd.'","'198510052010044006'","'Guru Kelas'","'Wali Kelas IV'","'S1 PGSD'","'P'","'081234567895'","'fitri@sdcontoh.sch.id'","'"+images.teacher6+"'"],
    [7,"'Agus Wijaya, S.Pd.'","'198611102011055007'","'Penjaskes'","'Guru Mapel'","'S1 Penjaskes'","'L'","'081234567896'","'agus@sdcontoh.sch.id'","'"+images.teacher7+"'"],
    [8,"'Dewi Sartika, S.Pd.'","'198712152012066008'","'Guru Kelas'","'Wali Kelas III'","'S1 PGSD'","'P'","'081234567897'","'dewi@sdcontoh.sch.id'","'"+images.teacher8+"'"],
    [9,"'Hendra Gunawan, S.Pd.'","'198801202013077009'","'Bahasa Inggris'","'Guru Mapel'","'S1 Pendidikan Bahasa Inggris'","'L'","'081234567898'","'hendra@sdcontoh.sch.id'","'"+images.teacher9+"'"],
    [10,"'Nurul Aini, S.Pd.'","'198902252014088010'","'Guru Kelas'","'Wali Kelas II'","'S1 PGSD'","'P'","'081234567899'","'nurul@sdcontoh.sch.id'","'"+images.teacher10+"'"]
  ];
  for (const t of teacherData) {
    await conn.query('INSERT INTO teachers (id, name, nip, subject, position, education, gender, phone, email, photo, status) VALUES ('+t.join(',')+",'active')");
  }

  await conn.query("INSERT INTO news_categories (id, name, slug, status) VALUES (1,'Kegiatan Sekolah','kegiatan-sekolah','active'),(2,'Prestasi','prestasi','active'),(3,'Pengumuman','pengumuman','active'),(4,'Ekstrakurikuler','ekstrakurikuler','active')");

  // News with thumbnails
  await conn.query("INSERT INTO news (id, category_id, title, slug, content, thumbnail, author, status, published_at) VALUES (1,1,'Kegiatan MPLS Tahun Ajaran 2025/2026','kegiatan-mpls-2025','<p>Masa Pengenalan Lingkungan Sekolah (MPLS) tahun ajaran 2025/2026 telah dilaksanakan pada tanggal 15-17 Juli 2025. Kegiatan ini diikuti oleh 120 siswa baru dengan penuh antusias. Berbagai kegiatan menarik seperti pengenalan guru, pengenalan fasilitas sekolah, dan permainan edukatif telah dilaksanakan.</p><p>Kami berharap siswa baru dapat beradaptasi dengan baik dan meraih prestasi selama belajar di SDN Contoh Bangsa.</p>','"+images.mpls+"','Admin','published','2025-07-15 08:00:00'),(2,1,'Upacara Hari Kemerdekaan RI ke-80','upacara-hari-kemerdekaan-80','<p>SDN Contoh Bangsa menggelar upacara peringatan Hari Ulang Tahun Kemerdekaan Republik Indonesia ke-80 pada 17 Agustus 2025. Seluruh siswa, guru, dan staff mengikuti upacara dengan khidmat.</p><p>Setelah upacara, dilaksanakan berbagai perlombaan tradisional seperti balap karung, makan kerupuk, dan tarik tambang yang diikuti oleh siswa dengan meriah.</p>','"+images.ceremony+"','Admin','published','2025-08-17 07:00:00'),(3,1,'Karya Wisata Siswa ke Museum Nasional','karya-wisata-museum-nasional','<p>Sebanyak 180 siswa kelas V dan VI mengikuti kegiatan karya wisata ke Museum Nasional pada tanggal 10 September 2025. Kegiatan ini bertujuan untuk menambah wawasan siswa tentang sejarah dan budaya bangsa.</p><p>Siswa sangat antusias mengamati berbagai koleksi sejarah yang dipamerkan.</p>','"+images.museum+"','Admin','published','2025-09-10 08:00:00'),(4,4,'Tim Pramuka Raih Juara Umum','pramuka-juara-umum','<p>Tim Pramuka SDN Contoh Bangsa berhasil meraih juara umum dalam Lomba Tingkat Regu Pramuka Siaga Tingkat Kecamatan Sejahtera. Prestasi ini diraih setelah melalui berbagai perlombaan seperti pioneering, sandi, dan keterampilan Pramuka.</p>','"+images.pramuka+"','Admin','published','2025-11-20 08:00:00'),(5,3,'Pengumuman Kelulusan Kelas VI Tahun 2025','kelulusan-2025','<p>Seluruh siswa kelas VI tahun ajaran 2024/2025 dinyatakan LULUS 100%. Pengumuman kelulusan dapat dilihat di papan pengumuman sekolah mulai pukul 10.00 WIB.</p><p>Pengambilan ijazah dapat dilakukan mulai tanggal 15 Juni 2025 di ruang Tata Usaha.</p>','"+images.graduation+"','Admin','published','2025-06-10 09:00:00'),(6,4,'Ekstrakurikuler Seni Tari Tradisional','seni-tari','<p>Ekstrakurikuler Seni Tari Tradisional SDN Contoh Bangsa kembali aktif setiap hari Sabtu. Siswa diajarkan berbagai tarian daerah seperti Tari Saman, Tari Pendet, dan Tari Jaipong. Saat ini terdapat 35 siswa yang aktif mengikuti ekstrakurikuler ini.</p>','"+images.dance+"','Admin','published','2025-09-01 09:00:00')");

  await conn.query("INSERT INTO announcements (id, title, slug, content, priority, status, published_at) VALUES (1,'Pembagian Raport Semester Genap','pembagian-raport','Pembagian raport semester genap akan dilaksanakan pada hari Sabtu, 22 Juni 2025 pukul 08.00 WIB. Orang tua/wali murid diharapkan hadir tepat waktu.','normal','published','2025-06-15 08:00:00'),(2,'Libur Hari Raya Idul Adha','libur-idul-adha','Libur Hari Raya Idul Adha 1446 H jatuh pada tanggal 7-8 Juni 2025. Sekolah akan kembali aktif pada tanggal 9 Juni 2025.','normal','published','2025-06-01 08:00:00'),(3,'Jadwal PPDB Gelombang 2','ppdb-gel-2','Pendaftaran PPDB Gelombang 2 akan dibuka mulai 1 Juli 2025. Kuota terbatas, segera daftarkan putra-putri Anda.','important','published','2025-06-25 08:00:00')");

  await conn.query("INSERT INTO events (id, title, slug, description, start_date, end_date, location, status) VALUES (1,'MPLS 2025','mpls-2025','Masa Pengenalan Lingkungan Sekolah','2025-07-15','2025-07-17','Lapangan SDN Contoh Bangsa','completed'),(2,'HUT RI ke-80','hut-ri-80','Upacara dan perlombaan','2025-08-17','2025-08-17','Lapangan SDN Contoh Bangsa','upcoming'),(3,'Pentas Seni Akhir Tahun','pentas-seni','Pertunjukan seni siswa','2025-12-20','2025-12-20','Aula SDN Contoh Bangsa','upcoming')");

  await conn.query("INSERT INTO achievements (id, title, category, `rank`, level, year, photo, description, status) VALUES (1,'Juara 1 Olimpiade Matematika','akademik','Juara 1','kota',2025,'"+images.achievement1+"','Atas nama Budi Prasetyo, siswa kelas VI','active'),(2,'Juara 1 Pramuka Siaga','non-akademik','Juara 1','kecamatan',2025,'"+images.achievement2+"','Regu Pramuka Siaga SDN Contoh Bangsa','active'),(3,'Juara 3 Lomba Tahfidz','non-akademik','Juara 3','kota',2025,'"+images.achievement1+"','Atas nama Siti Aisyah, siswa kelas V','active')");

  await conn.query("INSERT INTO facilities (id, name, description, total, status, sort_order) VALUES (1,'Ruang Kelas','Ruang belajar nyaman dengan LCD proyektor',12,'active',1),(2,'Perpustakaan','Perpustakaan dengan koleksi 2000+ buku',1,'active',2),(3,'Laboratorium Komputer','Lab komputer dengan 30 unit PC',1,'active',3),(4,'Lapangan Olahraga','Lapangan multifungsi untuk olahraga',1,'active',4),(5,'Mushola','Tempat ibadah yang nyaman',1,'active',5)");

  await conn.query("INSERT INTO galleries (id, title, slug, status) VALUES (1,'Kegiatan Sekolah','kegiatan','active')");
  await conn.query("INSERT INTO gallery_images (id, gallery_id, image, caption, sort_order) VALUES (1,1,'"+images.photo1+"','MPLS 2025',1),(2,1,'"+images.photo2+"','Upacara Bendera',2),(3,1,'"+images.photo3+"','HUT RI',3),(4,1,'"+images.photo4+"','Pramuka',4)");

  await conn.query("INSERT INTO sliders (id, title, subtitle, button_text, button_url, image, sort_order, status) VALUES (1,'Selamat Datang di SDN Contoh Bangsa','Mencetak generasi berprestasi, berkarakter, dan berakhlak mulia','Profil Sekolah','/profil','"+images.slide1+"',1,'active'),(2,'PPDB Tahun Ajaran 2025/2026','Daftarkan putra-putri Anda segera! Kuota terbatas.','Daftar Sekarang','/ppdb','"+images.slide2+"',2,'active'),(3,'Prestasi Membanggakan','Raihan prestasi siswa di berbagai bidang','Lihat Prestasi','/prestasi','"+images.slide3+"',3,'active')");

  await conn.query("INSERT INTO videos (id, title, slug, url, platform, category, status) VALUES (1,'Profil SDN Contoh Bangsa','profil-sekolah','https://www.youtube.com/watch?v=example','youtube','Profil','active')");
  await conn.query("INSERT INTO downloads (id, title, slug, file, file_type, category, status) VALUES (1,'Formulir PPDB','form-ppdb','/uploads/documents/form.pdf','pdf','form','active'),(2,'Kalender Akademik','kalender','/uploads/documents/kalender.pdf','pdf','document','active')");
  await conn.query("INSERT INTO social_media (id, platform, icon, url, sort_order, status) VALUES (1,'Facebook','facebook','https://facebook.com/sdcontohbangsa',1,'active'),(2,'Instagram','instagram','https://instagram.com/sdcontohbangsa',2,'active'),(3,'YouTube','youtube','https://youtube.com/@sdcontohbangsa',3,'active')");
  await conn.query("INSERT INTO faqs (id, question, answer, category, sort_order, status) VALUES (1,'Bagaimana cara mendaftar PPDB?','Pendaftaran PPDB dilakukan secara online melalui website sekolah. Silakan klik menu PPDB.','PPDB',1,'active'),(2,'Kapan jadwal PPDB dibuka?','PPDB dibuka setiap tahun pada bulan Maret-Juni. Informasi jadwal lengkap ada di menu Pengumuman.','PPDB',2,'active'),(3,'Jam berapa sekolah dimulai?','Sekolah dimulai pukul 07.00 WIB dan berakhir pukul 12.30 WIB. Khusus Jumat sampai pukul 11.00.','Akademik',3,'active'),(4,'Bagaimana cara menghubungi sekolah?','Hubungi (021) 1234-5678 atau datang ke alamat sekolah pada jam kerja.','Kontak',4,'active')");
  await conn.query("INSERT INTO testimonials (id, name, origin, content, rating, status) VALUES (1,'Bapak Agus Santoso','Orang Tua Siswa','Saya sangat puas dengan kualitas pendidikan di SDN Contoh Bangsa. Anak saya mengalami perkembangan signifikan.',5,'active'),(2,'Ibu Rina Permata','Orang Tua Siswa','Guru-guru sangat profesional dan perhatian. Fasilitas sekolah juga sangat memadai.',5,'active'),(3,'Bapak Dedi Hermawan','Orang Tua Siswa','Kegiatan ekstrakurikulernya sangat bagus. Anak saya mengembangkan bakatnya di bidang seni.',4,'active'),(4,'Ibu Siti Maesyaroh','Orang Tua Siswa','Sekolah memiliki lingkungan yang nyaman dan aman. Saya merekomendasikan SDN Contoh Bangsa.',5,'active')");
  await conn.query("INSERT INTO ppdb (registration_number, student_name, gender, religion, place_of_birth, date_of_birth, parent_phone, status, registered_at) VALUES ('PPDB/2025/001','Ahmad Fauzi','L','Islam','Jakarta','2018-05-12','081234567001','approved','2025-01-15 08:30:00'),('PPDB/2025/002','Siti Khadijah','P','Islam','Jakarta','2019-01-20','081234567002','pending','2025-01-20 10:00:00')");
  await conn.query("INSERT INTO messages (name, email, subject, message, status) VALUES ('Hendra Gunawan','hendra@email.com','Informasi PPDB','Saya ingin menanyakan informasi mengenai jadwal PPDB dan persyaratan yang diperlukan.','read'),('Dewi Lestari','dewi@email.com','Ekstrakurikuler','Mohon info jadwal ekstrakurikuler tari untuk siswa kelas 3.','unread')");
  await conn.query("INSERT INTO contacts (address, phone, email, working_hours) VALUES ('Jl. Pendidikan No. 1','(021) 1234-5678','info@sdcontoh.sch.id','Senin - Jumat: 07:00 - 16:00 WIB')");

  console.log('Seed berhasil!');
  const checks = ['teachers','news','announcements','events','achievements','sliders','faqs','testimonials','ppdb','settings','menus','facilities'];
  for (const t of checks) {
    const [rows] = await conn.query('SELECT COUNT(*) as total FROM `' + t + '`');
    console.log(t + ':', rows[0].total);
  }
  await conn.end();
})().catch(e => { console.log('Error:', e.message); process.exit(1); });
