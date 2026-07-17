-- ========================================
-- Database: school_profile
-- Website Profil Sekolah Dasar
-- ========================================

CREATE DATABASE IF NOT EXISTS school_profile
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_profile;

-- ========================================
-- 1. ROLES
-- ========================================
CREATE TABLE roles (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 2. USERS
-- ========================================
CREATE TABLE users (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  role_id INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  last_login DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role_id),
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. MENUS
-- ========================================
CREATE TABLE menus (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  url VARCHAR(255) NULL,
  parent_id INT(11) NULL,
  icon VARCHAR(100) NULL,
  sort_order INT(3) NOT NULL DEFAULT 0,
  position ENUM('header','footer','both') NOT NULL DEFAULT 'header',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_menus_parent (parent_id),
  INDEX idx_menus_sort (sort_order),
  CONSTRAINT fk_menus_parent FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. SCHOOL PROFILES
-- ========================================
CREATE TABLE school_profiles (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  school_name VARCHAR(200) NOT NULL,
  npsn VARCHAR(20) NULL,
  address TEXT NOT NULL,
  village VARCHAR(100) NULL,
  district VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  province VARCHAR(100) NULL,
  postal_code VARCHAR(10) NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(100) NULL,
  website VARCHAR(100) NULL,
  logo VARCHAR(255) NULL,
  logo_white VARCHAR(255) NULL,
  favicon VARCHAR(255) NULL,
  vision TEXT NULL,
  mission TEXT NULL,
  history TEXT NULL,
  principal_speech TEXT NULL,
  principal_name VARCHAR(100) NULL,
  principal_photo VARCHAR(255) NULL,
  principal_qualification VARCHAR(100) NULL,
  organization_structure TEXT NULL,
  google_maps_link VARCHAR(500) NULL,
  google_maps_embed TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 5. TEACHERS
-- ========================================
CREATE TABLE teachers (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  nip VARCHAR(30) NULL UNIQUE,
  subject VARCHAR(100) NULL,
  position VARCHAR(100) NULL,
  education VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(100) NULL,
  gender ENUM('L','P') NULL,
  bio TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_teachers_status (status),
  INDEX idx_teachers_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 6. STAFFS
-- ========================================
CREATE TABLE staffs (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  nip VARCHAR(30) NULL UNIQUE,
  position VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(100) NULL,
  gender ENUM('L','P') NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_staffs_status (status),
  INDEX idx_staffs_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 7. STUDENT STATISTICS
-- ========================================
CREATE TABLE student_statistics (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  year YEAR(4) NOT NULL,
  total_students INT(6) NOT NULL DEFAULT 0,
  male_count INT(6) NOT NULL DEFAULT 0,
  female_count INT(6) NOT NULL DEFAULT 0,
  total_class INT(3) NOT NULL DEFAULT 0,
  note TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_statistics_year (year),
  INDEX idx_statistics_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 8. ACHIEVEMENTS
-- ========================================
CREATE TABLE achievements (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  category ENUM('akademik','non-akademik') NOT NULL,
  rank VARCHAR(50) NULL,
  level ENUM('sekolah','kecamatan','kota','provinsi','nasional','internasional') NOT NULL,
  year YEAR(4) NOT NULL,
  photo VARCHAR(255) NULL,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_achievements_category (category),
  INDEX idx_achievements_level (level),
  INDEX idx_achievements_year (year),
  INDEX idx_achievements_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 9. FACILITIES
-- ========================================
CREATE TABLE facilities (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  description TEXT NULL,
  total INT(3) NOT NULL DEFAULT 1,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_facilities_status (status),
  INDEX idx_facilities_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 10. PROGRAMS
-- ========================================
CREATE TABLE programs (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  description TEXT NULL,
  type ENUM('akademik','ekstrakurikuler','keagamaan','keterampilan') NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_programs_type (type),
  INDEX idx_programs_status (status),
  INDEX idx_programs_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 11. NEWS CATEGORIES
-- ========================================
CREATE TABLE news_categories (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_categories_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 12. NEWS
-- ========================================
CREATE TABLE news (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  category_id INT(11) NULL,
  content LONGTEXT NOT NULL,
  thumbnail VARCHAR(255) NULL,
  author VARCHAR(100) NOT NULL,
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  views INT(10) NOT NULL DEFAULT 0,
  published_at DATETIME NULL,
  meta_title VARCHAR(200) NULL,
  meta_description TEXT NULL,
  meta_keywords TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_news_category (category_id),
  INDEX idx_news_status (status),
  INDEX idx_news_published (published_at),
  FULLTEXT idx_news_search (title, content),
  CONSTRAINT fk_news_category FOREIGN KEY (category_id) REFERENCES news_categories(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 13. ANNOUNCEMENTS
-- ========================================
CREATE TABLE announcements (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  priority ENUM('normal','important','urgent') NOT NULL DEFAULT 'normal',
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  expired_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_announcements_priority (priority),
  INDEX idx_announcements_status (status),
  INDEX idx_announcements_published (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 14. EVENTS
-- ========================================
CREATE TABLE events (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NULL,
  location VARCHAR(200) NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  start_time TIME NULL,
  end_time TIME NULL,
  photo VARCHAR(255) NULL,
  status ENUM('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_events_date (start_date),
  INDEX idx_events_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 15. GALLERIES
-- ========================================
CREATE TABLE galleries (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NULL,
  cover VARCHAR(255) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_galleries_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 16. GALLERY IMAGES
-- ========================================
CREATE TABLE gallery_images (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  gallery_id INT(11) NOT NULL,
  image VARCHAR(255) NOT NULL,
  caption VARCHAR(200) NULL,
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_gallery_images_gallery (gallery_id),
  INDEX idx_gallery_images_sort (sort_order),
  CONSTRAINT fk_gallery_images_gallery FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 17. VIDEOS
-- ========================================
CREATE TABLE videos (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  url VARCHAR(500) NOT NULL,
  embed_url VARCHAR(500) NULL,
  platform ENUM('youtube','vimeo','other') NOT NULL DEFAULT 'youtube',
  thumbnail VARCHAR(255) NULL,
  description TEXT NULL,
  category VARCHAR(100) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_videos_status (status),
  INDEX idx_videos_category (category),
  INDEX idx_videos_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 18. DOWNLOADS
-- ========================================
CREATE TABLE downloads (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  file VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NULL,
  file_size INT(10) NULL DEFAULT 0,
  category VARCHAR(100) NULL,
  description TEXT NULL,
  download_count INT(10) NOT NULL DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_downloads_status (status),
  INDEX idx_downloads_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 19. FAQS
-- ========================================
CREATE TABLE faqs (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) NULL,
  sort_order INT(3) NOT NULL DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faqs_status (status),
  INDEX idx_faqs_category (category),
  INDEX idx_faqs_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 20. TESTIMONIALS
-- ========================================
CREATE TABLE testimonials (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  origin VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  content TEXT NOT NULL,
  rating TINYINT(1) NOT NULL DEFAULT 5,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_status (status),
  INDEX idx_testimonials_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 21. SLIDERS
-- ========================================
CREATE TABLE sliders (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NULL,
  subtitle TEXT NULL,
  button_text VARCHAR(100) NULL,
  button_url VARCHAR(255) NULL,
  image VARCHAR(255) NOT NULL,
  image_mobile VARCHAR(255) NULL,
  sort_order INT(3) NOT NULL DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sliders_status (status),
  INDEX idx_sliders_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 22. BANNERS
-- ========================================
CREATE TABLE banners (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NULL,
  image VARCHAR(255) NOT NULL,
  url VARCHAR(255) NULL,
  position ENUM('top','bottom','sidebar','content') NOT NULL DEFAULT 'sidebar',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  start_date DATE NULL,
  end_date DATE NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_banners_position (position),
  INDEX idx_banners_status (status),
  INDEX idx_banners_date (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 23. CONTACTS
-- ========================================
CREATE TABLE contacts (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  address TEXT NULL,
  phone VARCHAR(20) NULL,
  phone_2 VARCHAR(20) NULL,
  email VARCHAR(100) NULL,
  email_2 VARCHAR(100) NULL,
  whatsapp VARCHAR(20) NULL,
  google_maps_link VARCHAR(500) NULL,
  google_maps_embed TEXT NULL,
  working_hours VARCHAR(200) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 24. MESSAGES
-- ========================================
CREATE TABLE messages (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NULL,
  subject VARCHAR(200) NULL,
  message TEXT NOT NULL,
  status ENUM('unread','read','replied') NOT NULL DEFAULT 'unread',
  read_by INT(11) NULL,
  read_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_messages_status (status),
  INDEX idx_messages_read (read_by),
  INDEX idx_messages_created (created_at),
  CONSTRAINT fk_messages_read_by FOREIGN KEY (read_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 25. PPDB
-- ========================================
CREATE TABLE ppdb (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  registration_number VARCHAR(20) NOT NULL UNIQUE,
  student_name VARCHAR(100) NOT NULL,
  place_of_birth VARCHAR(100) NULL,
  date_of_birth DATE NULL,
  gender ENUM('L','P') NOT NULL,
  religion VARCHAR(50) NULL,
  address TEXT NULL,
  village VARCHAR(100) NULL,
  district VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  province VARCHAR(100) NULL,
  postal_code VARCHAR(10) NULL,
  previous_school VARCHAR(100) NULL,
  father_name VARCHAR(100) NULL,
  father_education VARCHAR(50) NULL,
  father_occupation VARCHAR(100) NULL,
  mother_name VARCHAR(100) NULL,
  mother_education VARCHAR(50) NULL,
  mother_occupation VARCHAR(100) NULL,
  parent_phone VARCHAR(20) NOT NULL,
  parent_email VARCHAR(100) NULL,
  file_birth_certificate VARCHAR(255) NULL,
  file_family_card VARCHAR(255) NULL,
  file_photo VARCHAR(255) NULL,
  file_previous_report VARCHAR(255) NULL,
  registration_phase VARCHAR(50) NULL,
  status ENUM('pending','verified','approved','rejected','waiting_list') NOT NULL DEFAULT 'pending',
  notes TEXT NULL,
  registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_ppdb_status (status),
  INDEX idx_ppdb_registered (registered_at),
  INDEX idx_ppdb_name (student_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 26. SOCIAL MEDIA
-- ========================================
CREATE TABLE social_media (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(50) NOT NULL,
  icon VARCHAR(100) NULL,
  url VARCHAR(500) NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  sort_order INT(3) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_social_media_status (status),
  INDEX idx_social_media_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 27. SETTINGS
-- ========================================
CREATE TABLE settings (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` LONGTEXT NULL,
  `group` VARCHAR(50) NULL DEFAULT 'general',
  `type` VARCHAR(50) NULL DEFAULT 'text',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_settings_group (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 28. LOGS
-- ========================================
CREATE TABLE logs (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  user_id INT(11) NULL,
  action VARCHAR(50) NOT NULL,
  module VARCHAR(50) NOT NULL,
  record_id INT(11) NULL,
  description TEXT NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_logs_user (user_id),
  INDEX idx_logs_action (action),
  INDEX idx_logs_module (module),
  INDEX idx_logs_created (created_at),
  CONSTRAINT fk_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
