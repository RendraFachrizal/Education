# Project Structure Document

## Website Profil Sekolah Dasar (SD)

---

**Dokumen**: PROJECT_STRUCTURE - Project Structure & Coding Convention
**Proyek**: Website Profil Sekolah Dasar
**Versi**: 1.0
**Tanggal**: 2025-01-01
**Status**: Draft

---

## Daftar Isi

1. [Struktur Project Utama](#1-struktur-project-utama)
2. [Struktur Backend](#2-struktur-backend)
3. [Struktur Frontend](#3-struktur-frontend)
4. [Struktur Database](#4-struktur-database)
5. [Standar Penamaan File](#5-standar-penamaan-file)
6. [Coding Convention](#6-coding-convention)
7. [Git Flow & Branch Strategy](#7-git-flow--branch-strategy)
8. [Environment Variable](#8-environment-variable)
9. [Package Utama Backend](#9-package-utama-backend)
10. [Package Utama Frontend](#10-package-utama-frontend)

---

## 1. Struktur Project Utama

```text
school-profile/
├── backend/                    # Backend Express.js + database + deploy
├── frontend/                   # Frontend React.js
├── docs/                       # Dokumentasi proyek
├── .gitignore                  # File yang diabaikan git
├── .prettierrc                 # Prettier code formatter
└── README.md                   # Dokumentasi utama proyek
```

### 1.1 Penjelasan Folder Utama

| Folder | Fungsi |
|--------|--------|
| `backend/` | Aplikasi backend menggunakan Express.js - REST API, autentikasi, upload file, database SQL, dan konfigurasi deployment |
| `frontend/` | Aplikasi frontend menggunakan React.js - UI publik dan admin panel |
| `docs/` | Dokumentasi lengkap proyek (PRD, System Design, Database, UI/UX, Roadmap) |

---

## 2. Struktur Backend

### 2.1 Struktur Folder Lengkap

```text
backend/
├── controllers/
│   ├── authController.js
│   ├── profileController.js
│   ├── teacherController.js
│   ├── staffController.js
│   ├── studentStatisticController.js
│   ├── achievementController.js
│   ├── facilityController.js
│   ├── programController.js
│   ├── newsController.js
│   ├── categoryController.js
│   ├── announcementController.js
│   ├── eventController.js
│   ├── galleryController.js
│   ├── videoController.js
│   ├── downloadController.js
│   ├── faqController.js
│   ├── testimonialController.js
│   ├── sliderController.js
│   ├── bannerController.js
│   ├── menuController.js
│   ├── footerController.js
│   ├── contactController.js
│   ├── messageController.js
│   ├── ppdbController.js
│   ├── socialMediaController.js
│   ├── settingController.js
│   ├── userController.js
│   ├── uploadController.js
│   ├── dashboardController.js
│   └── logController.js
│
├── models/
│   ├── User.js
│   ├── Role.js
│   ├── Menu.js
│   ├── SchoolProfile.js
│   ├── Teacher.js
│   ├── Staff.js
│   ├── StudentStatistic.js
│   ├── Achievement.js
│   ├── Facility.js
│   ├── Program.js
│   ├── News.js
│   ├── Category.js
│   ├── Announcement.js
│   ├── Event.js
│   ├── Gallery.js
│   ├── GalleryImage.js
│   ├── Video.js
│   ├── Download.js
│   ├── Faq.js
│   ├── Testimonial.js
│   ├── Slider.js
│   ├── Banner.js
│   ├── Contact.js
│   ├── Message.js
│   ├── Ppdb.js
│   ├── SocialMedia.js
│   ├── Setting.js
│   └── Log.js
│
├── routes/
│   ├── index.js                   # Router utama
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   ├── teacherRoutes.js
│   ├── staffRoutes.js
│   ├── achievementRoutes.js
│   ├── facilityRoutes.js
│   ├── programRoutes.js
│   ├── newsRoutes.js
│   ├── categoryRoutes.js
│   ├── announcementRoutes.js
│   ├── eventRoutes.js
│   ├── galleryRoutes.js
│   ├── videoRoutes.js
│   ├── downloadRoutes.js
│   ├── faqRoutes.js
│   ├── testimonialRoutes.js
│   ├── sliderRoutes.js
│   ├── bannerRoutes.js
│   ├── menuRoutes.js
│   ├── footerRoutes.js
│   ├── contactRoutes.js
│   ├── messageRoutes.js
│   ├── ppdbRoutes.js
│   ├── socialMediaRoutes.js
│   ├── settingRoutes.js
│   ├── userRoutes.js
│   ├── uploadRoutes.js
│   ├── dashboardRoutes.js
│   └── logRoutes.js
│
├── middlewares/
│   ├── authMiddleware.js          # Verifikasi JWT token
│   ├── uploadMiddleware.js        # Konfigurasi Multer upload
│   ├── validateMiddleware.js      # Validasi input (express-validator)
│   ├── errorMiddleware.js         # Global error handler
│   ├── cacheMiddleware.js         # Response caching
│   └── rateLimitMiddleware.js     # Rate limiting
│
├── services/
│   ├── authService.js
│   ├── uploadService.js
│   ├── emailService.js
│   ├── slugService.js
│   └── logService.js
│
├── validators/
│   ├── authValidator.js
│   ├── newsValidator.js
│   ├── teacherValidator.js
│   ├── ppdbValidator.js
│   └── userValidator.js
│
├── config/
│   ├── database.js                # Koneksi MySQL (mysql2)
│   ├── env.js                     # Load environment variables
│   └── logger.js                  # Winston logger config
│
├── database/
│   ├── schema.sql                 # Full database schema
│   ├── seed.sql                   # Full seed data
│   ├── drop.sql                   # DROP ALL TABLES
│   ├── migrations/                # SQL migration files
│   └── seeds/                     # SQL seed files
│
├── deploy/
│   ├── deploy.sh                  # Deployment script
│   └── nginx.conf                 # Nginx production config
│
├── uploads/
│   ├── images/
│   │   ├── photos/                # Foto guru, staff, siswa
│   │   ├── thumbnails/            # Thumbnail berita
│   │   ├── sliders/               # Gambar slider
│   │   ├── banners/               # Gambar banner
│   │   ├── galleries/             # Foto galeri
│   │   └── logos/                 # Logo sekolah
│   └── documents/
│       ├── ppdb/                  # Dokumen PPDB
│       └── downloads/             # File download publik
│
├── public/
│   ├── images/                    # Gambar statis
│   ├── favicon.ico                # Favicon
│   ├── robots.txt                 # Robots.txt untuk SEO
│   └── sitemap.xml                # Sitemap untuk SEO
│
├── logs/
│   ├── access.log                 # HTTP access log
│   ├── error.log                  # Error log
│   └── combined.log               # Combined log
│
├── utils/
│   ├── response.js                # Standarisasi response API
│   ├── slugify.js                 # Generate URL slug
│   ├── dateHelper.js              # Format tanggal
│   ├── fileHelper.js             # Manipulasi file
│   ├── pagination.js              # Helper pagination
│   └── constants.js               # Konstanta aplikasi
│
├── templates/
│   └── email/                     # Template email
│
├── app.js                         # Inisialisasi aplikasi Express
├── server.js                      # Entry point server
├── package.json
├── .env                           # Environment variables (tidak di-commit)
├── .env.example                   # Contoh environment variables
└── .eslintrc.json                 # Konfigurasi ESLint
```

### 2.2 Fungsi Masing-Masing Folder

#### `controllers/`

Berisi fungsi-fungsi yang menangani request dan response HTTP.

**Aturan:**
- Satu file controller per modul
- Nama fungsi menggunakan camelCase
- Setiap fungsi menerima (req, res, next)
- Response menggunakan helper `utils/response.js`

**Contoh:**
```javascript
// controllers/newsController.js
const newsService = require('../services/newsService');

const index = async (req, res, next) => { ... };
const show = async (req, res, next) => { ... };
const store = async (req, res, next) => { ... };
const update = async (req, res, next) => { ... };
const destroy = async (req, res, next) => { ... };

module.exports = { index, show, store, update, destroy };
```

#### `models/`

Berisi class/fungsi untuk interaksi dengan database.

**Aturan:**
- Satu file model per tabel database
- Nama file singular dengan huruf kapital di awal (PascalCase)
- Setiap model mengekspor fungsi query statis

**Contoh:**
```javascript
// models/News.js
const db = require('../config/database');

class News {
  static async findAll(params) { ... }
  static async findById(id) { ... }
  static async findBySlug(slug) { ... }
  static async create(data) { ... }
  static async update(id, data) { ... }
  static async delete(id) { ... }
}

module.exports = News;
```

#### `routes/`

Berisi definisi endpoint API.

**Aturan:**
- Satu file route per modul
- Menggunakan Express Router
- Route dilindungi dengan middleware auth jika perlu
- Router utama (`index.js`) menggabungkan semua route

**Contoh:**
```javascript
// routes/newsRoutes.js
const router = require('express').Router();
const controller = require('../controllers/newsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', controller.index);           // Public
router.get('/:slug', controller.show);       // Public
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;
```

#### `middlewares/`

Berisi fungsi middleware Express.

**authMiddleware.js:**
- Verifikasi JWT token dari header Authorization
- Decode token dan inject user ke req.user
- Return 401 jika token tidak valid/expired

**uploadMiddleware.js:**
- Konfigurasi Multer
- Filter tipe file (gambar: jpg, png, webp; dokumen: pdf)
- Batas ukuran file
- Generate nama file unik

**validateMiddleware.js:**
- Validasi input menggunakan express-validator
- Sanitasi input
- Return 400 jika validasi gagal

**errorMiddleware.js:**
- Global error handler
- Tangani error yang tidak tertangkap
- Return response error yang konsisten

#### `services/`

Berisi business logic aplikasi.

**Aturan:**
- Memisahkan business logic dari controller
- Service memanggil model
- Service bisa memanggil service lain
- Tidak langsung berinteraksi dengan req/res

#### `config/`

Berisi konfigurasi aplikasi.

**database.js:**
```javascript
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool;
```

#### `utils/`

Berisi fungsi utilitas.

**response.js:**
```javascript
const success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const error = (res, message = 'Error', statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = { success, error };
```

---

## 3. Struktur Frontend

### 3.1 Struktur Folder Lengkap

```text
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   └── SearchInput.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── PublicHeader.jsx
│   │   │   ├── PublicFooter.jsx
│   │   │   ├── PublicNavbar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   │
│   │   └── ui/
│   │       ├── Toast.jsx
│   │       ├── Alert.jsx
│   │       ├── Tabs.jsx
│   │       ├── Accordion.jsx
│   │       ├── Lightbox.jsx
│   │       ├── Slider.jsx
│   │       ├── HeroSlider.jsx
│   │       ├── CardGrid.jsx
│   │       ├── StatCard.jsx
│   │       ├── Timeline.jsx
│   │       ├── DataTable.jsx
│   │       ├── FormField.jsx
│   │       ├── FileUpload.jsx
│   │       ├── ImagePreview.jsx
│   │       ├── ConfirmDialog.jsx
│   │       ├── ChartWidget.jsx
│   │       └── ActivityLog.jsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── PrincipalSpeechPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── VisionMissionPage.jsx
│   │   │   ├── OrganizationPage.jsx
│   │   │   ├── TeachersPage.jsx
│   │   │   ├── StaffsPage.jsx
│   │   │   ├── AchievementsPage.jsx
│   │   │   ├── FacilitiesPage.jsx
│   │   │   ├── ProgramsPage.jsx
│   │   │   ├── NewsPage.jsx
│   │   │   ├── NewsDetailPage.jsx
│   │   │   ├── AnnouncementsPage.jsx
│   │   │   ├── AnnouncementDetailPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── EventDetailPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── GalleryDetailPage.jsx
│   │   │   ├── VideosPage.jsx
│   │   │   ├── DownloadsPage.jsx
│   │   │   ├── PPDBPage.jsx
│   │   │   ├── PPDBRegisterPage.jsx
│   │   │   ├── PPDBCheckPage.jsx
│   │   │   ├── FAQPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── ProfilePage.jsx
│   │       ├── SchoolProfilePage.jsx
│   │       ├── TeachersManagementPage.jsx
│   │       ├── TeacherFormPage.jsx
│   │       ├── StaffsManagementPage.jsx
│   │       ├── StaffFormPage.jsx
│   │       ├── NewsManagementPage.jsx
│   │       ├── NewsFormPage.jsx
│   │       ├── CategoriesManagementPage.jsx
│   │       ├── AnnouncementsManagementPage.jsx
│   │       ├── EventsManagementPage.jsx
│   │       ├── AchievementsManagementPage.jsx
│   │       ├── GalleriesManagementPage.jsx
│   │       ├── GalleryFormPage.jsx
│   │       ├── VideosManagementPage.jsx
│   │       ├── DownloadsManagementPage.jsx
│   │       ├── SlidersManagementPage.jsx
│   │       ├── BannersManagementPage.jsx
│   │       ├── MenusManagementPage.jsx
│   │       ├── FooterManagementPage.jsx
│   │       ├── PPDBSettingsPage.jsx
│   │       ├── PPDBRegistrantsPage.jsx
│   │       ├── PPDBRegistrantDetailPage.jsx
│   │       ├── TestimonialsManagementPage.jsx
│   │       ├── FAQsManagementPage.jsx
│   │       ├── MessagesPage.jsx
│   │       ├── UsersManagementPage.jsx
│   │       ├── UserFormPage.jsx
│   │       ├── SettingsPage.jsx
│   │       └── LogsPage.jsx
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── AdminLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── useForm.js
│   │   ├── usePagination.js
│   │   ├── useDebounce.js
│   │   ├── useMediaQuery.js
│   │   ├── useLocalStorage.js
│   │   └── useClickOutside.js
│   │
│   ├── services/
│   │   ├── api.js                    # Axios instance + interceptor
│   │   ├── authService.js
│   │   ├── profileService.js
│   │   ├── teacherService.js
│   │   ├── staffService.js
│   │   ├── achievementService.js
│   │   ├── newsService.js
│   │   ├── announcementService.js
│   │   ├── eventService.js
│   │   ├── galleryService.js
│   │   ├── videoService.js
│   │   ├── downloadService.js
│   │   ├── faqService.js
│   │   ├── testimonialService.js
│   │   ├── ppdbService.js
│   │   ├── contactService.js
│   │   ├── uploadService.js
│   │   ├── dashboardService.js
│   │   └── settingService.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── hero-bg.jpg
│   │   │   ├── default-avatar.png
│   │   │   ├── empty-state.svg
│   │   │   ├── error-state.svg
│   │   │   └── not-found.svg
│   │   ├── fonts/
│   │   │   └── inter/               # Font Inter (jika self-hosted)
│   │   └── icons/
│   │       └── sprite.svg            # SVG sprite
│   │
│   ├── styles/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   └── variables.css
│   │   ├── components/
│   │   │   ├── button.css
│   │   │   ├── card.css
│   │   │   ├── form.css
│   │   │   ├── modal.css
│   │   │   ├── table.css
│   │   │   └── toast.css
│   │   ├── layouts/
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── sidebar.css
│   │   │   └── grid.css
│   │   ├── pages/
│   │   │   ├── home.css
│   │   │   ├── news.css
│   │   │   ├── gallery.css
│   │   │   └── admin.css
│   │   ├── utils/
│   │   │   ├── animations.css
│   │   │   └── utilities.css
│   │   ├── main.css                   # Import semua CSS
│   │   └── responsive.css             # Media queries
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── formatDate.js
│   │   ├── validators.js
│   │   └── formatters.js
│   │
│   └── routes/
│       ├── index.jsx                  # Konfigurasi Router utama
│       ├── PublicRoutes.jsx           # Route untuk publik
│       ├── AdminRoutes.jsx            # Route untuk admin
│       └── ProtectedRoute.jsx         # Route yang dilindungi auth
│
├── package.json
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── vite.config.js                     # Vite configuration
└── index.html                         # Entry point HTML
```

### 3.2 Fungsi Masing-Masing Folder

| Folder | Fungsi |
|--------|--------|
| `components/common/` | Komponen reusable yang digunakan di banyak halaman |
| `components/layout/` | Komponen layout (header, footer, navbar, sidebar) |
| `components/ui/` | Komponen UI spesifik (slider, lightbox, chart) |
| `pages/public/` | Halaman untuk pengunjung website |
| `pages/admin/` | Halaman panel admin |
| `layouts/` | Layout wrapper untuk public dan admin |
| `hooks/` | Custom React hooks |
| `services/` | Layanan API untuk komunikasi dengan backend |
| `context/` | React Context untuk state global |
| `assets/` | File statis (gambar, font, icon) |
| `styles/` | File CSS dengan struktur BEM |
| `utils/` | Fungsi utilitas frontend |
| `routes/` | Konfigurasi routing React Router |

---

## 4. Struktur Database

```text
backend/database/
├── migrations/
│   ├── 001_create_roles_table.sql
│   ├── 002_create_users_table.sql
│   ├── 003_create_school_profiles_table.sql
│   ├── 004_create_teachers_table.sql
│   ├── 005_create_staffs_table.sql
│   ├── 006_create_student_statistics_table.sql
│   ├── 007_create_achievements_table.sql
│   ├── 008_create_facilities_table.sql
│   ├── 009_create_programs_table.sql
│   ├── 010_create_news_categories_table.sql
│   ├── 011_create_news_table.sql
│   ├── 012_create_announcements_table.sql
│   ├── 013_create_events_table.sql
│   ├── 014_create_galleries_table.sql
│   ├── 015_create_gallery_images_table.sql
│   ├── 016_create_videos_table.sql
│   ├── 017_create_downloads_table.sql
│   ├── 018_create_faqs_table.sql
│   ├── 019_create_testimonials_table.sql
│   ├── 020_create_sliders_table.sql
│   ├── 021_create_banners_table.sql
│   ├── 022_create_contacts_table.sql
│   ├── 023_create_messages_table.sql
│   ├── 024_create_ppdb_table.sql
│   ├── 025_create_social_media_table.sql
│   ├── 026_create_settings_table.sql
│   ├── 027_create_menus_table.sql
│   └── 028_create_logs_table.sql
│
├── seeds/
│   ├── 001_seed_roles.sql
│   ├── 002_seed_admin_user.sql
│   ├── 003_seed_settings.sql
│   ├── 004_seed_menus.sql
│   └── 005_seed_school_profile.sql
│
├── schema.sql                 # Full database schema (CREATE ALL)
├── seed.sql                   # Full seed data (INSERT ALL)
└── drop.sql                   # DROP ALL TABLES (reset)
```

---

## 5. Standar Penamaan File

### 5.1 Backend

| Jenis | Convention | Contoh |
|-------|-----------|--------|
| Controller | camelCase | `newsController.js` |
| Model | PascalCase | `News.js` |
| Route | camelCase | `newsRoutes.js` |
| Middleware | camelCase | `authMiddleware.js` |
| Service | camelCase | `authService.js` |
| Validator | camelCase | `newsValidator.js` |
| Config | camelCase | `database.js` |
| Util | camelCase | `slugify.js` |
| Migration | numeric_prefix + snake_case | `011_create_news_table.sql` |
| Seed | numeric_prefix + snake_case | `002_seed_admin_user.sql` |

### 5.2 Frontend

| Jenis | Convention | Contoh |
|-------|-----------|--------|
| Component (JSX) | PascalCase | `Button.jsx`, `NewsCard.jsx` |
| Page (JSX) | PascalCase | `HomePage.jsx` |
| Hook | camelCase + prefix 'use' | `useAuth.js` |
| Service | camelCase | `newsService.js` |
| Context | PascalCase + suffix 'Context' | `AuthContext.jsx` |
| CSS | kebab-case | `button.css` |
| Asset | kebab-case | `default-avatar.png` |
| Util | camelCase | `formatDate.js` |
| Route config | PascalCase | `ProtectedRoute.jsx` |

### 5.3 Database

| Jenis | Convention | Contoh |
|-------|-----------|--------|
| Table Name | snake_case, plural | `news`, `teachers`, `school_profiles` |
| Column Name | snake_case | `category_id`, `published_at`, `sort_order` |
| Primary Key | `id` | `id` |
| Foreign Key | `table_name_singular_id` | `category_id`, `user_id` |
| Index Name | `idx_table_column` | `idx_news_status` |
| Unique Key | `uq_table_column` | `uq_users_email` |

---

## 6. Coding Convention

### 6.1 JavaScript/Node.js

```javascript
// 1. Gunakan const dan let, hindari var
const name = 'John';
let counter = 0;

// 2. Nama variabel dan fungsi menggunakan camelCase
const fullName = 'John Doe';
function getUserData() { }

// 3. Nama class menggunakan PascalCase
class UserModel { }

// 4. Nama konstanta menggunakan UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// 5. Gunakan template literals
const message = `Hello, ${name}!`;

// 6. Gunakan arrow function
const getData = () => { ... };

// 7. Destructuring object
const { name, email } = user;

// 8. Spread operator
const newObj = { ...oldObj, name: 'New' };

// 9. Async/await untuk asynchronous
async function fetchData() {
  try {
    const result = await someAsyncFunction();
    return result;
  } catch (error) {
    throw error;
  }
}

// 10. Export module dengan destructing
module.exports = { function1, function2 };
```

### 6.2 React.js

```jsx
// 1. Functional component dengan arrow function
const Button = ({ children, variant, onClick }) => {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// 2. Gunakan hooks (useState, useEffect, dll)
const [data, setData] = useState([]);
useEffect(() => { fetchData(); }, []);

// 3. PropTypes atau TypeScript untuk type checking
Button.propTypes = {
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

// 4. Export default untuk component
export default Button;

// 5. Conditional rendering dengan short-circuit
{isLoading && <Loading />}
{error ? <Error /> : <Data />}

// 6. Mapping array untuk render list
{items.map(item => <Item key={item.id} {...item} />)}

// 7. Event handler dengan prefix 'handle'
const handleSubmit = (e) => { ... };

// 8. State management dengan context/redux
const { user, login } = useAuth();
```

### 6.3 CSS

```css
/* 1. BEM Naming Convention */
.block { }
.block__element { }
.block--modifier { }

/* 2. Gunakan CSS custom properties */
color: var(--color-primary);

/* 3. Group properties secara logis */
.card {
  /* Positioning */
  position: relative;
  z-index: 1;
  
  /* Box model */
  display: flex;
  padding: var(--space-4);
  
  /* Typography */
  font-size: var(--text-base);
  line-height: 1.5;
  
  /* Visual */
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  /* Animation */
  transition: transform var(--duration-normal);
}

/* 4. Mobile first media queries */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
```

### 6.4 SQL

```sql
-- 1. Keywords UPPERCASE
SELECT * FROM users WHERE status = 'active';

-- 2. Tabel dan kolom lowercase snake_case
SELECT id, full_name FROM teachers WHERE status = 'active';

-- 3. Indentasi untuk query kompleks
SELECT 
  n.id,
  n.title,
  n.created_at,
  c.name AS category_name
FROM news n
LEFT JOIN news_categories c ON n.category_id = c.id
WHERE n.status = 'published'
  AND n.published_at <= NOW()
ORDER BY n.published_at DESC
LIMIT 10;

-- 4. Gunakan prepared statement
-- ? placeholder untuk parameter
```

---

## 7. Git Flow & Branch Strategy

### 7.1 Branch Strategy

```text
main (production)
  └── develop (staging)
       ├── feature/login
       ├── feature/news-crud
       ├── feature/gallery-upload
       ├── bugfix/fix-pagination
       ├── hotfix/critical-security-fix
       └── release/v1.0.0
```

### 7.2 Branch Naming Convention

| Branch Type | Format | Contoh |
|-------------|--------|--------|
| Main | `main` | Branch produksi |
| Develop | `develop` | Branch development |
| Feature | `feature/nama-fitur` | `feature/login-auth` |
| Bugfix | `bugfix/deskripsi-bug` | `bugfix/fix-pagination` |
| Hotfix | `hotfix/deskripsi-hotfix` | `hotfix/critical-security` |
| Release | `release/v.x.x` | `release/v1.0.0` |

### 7.3 Git Workflow

```bash
# 1. Clone repository
git clone https://github.com/username/school-profile.git

# 2. Buat branch feature dari develop
git checkout develop
git checkout -b feature/news-crud

# 3. Commit changes
git add .
git commit -m "feat: add news CRUD functionality"

# 4. Push branch
git push origin feature/news-crud

# 5. Buat Pull Request ke develop
# PR title: "feat: add news CRUD functionality"

# 6. Setelah direview dan disetujui, merge ke develop
git checkout develop
git merge feature/news-crud

# 7. Untuk rilis, merge develop ke main
git checkout main
git merge develop
git tag v1.0.0
git push origin main --tags
```

### 7.4 Commit Message Convention (Conventional Commits)

```
<type>(<scope>): <subject>

types:
  feat:     Fitur baru
  fix:      Perbaikan bug
  docs:     Perubahan dokumentasi
  style:    Perubahan formatting (tidak mengubah logic)
  refactor: Refactoring kode
  test:     Menambah/memperbaiki test
  chore:    Tugas maintenance
  perf:     Perbaikan performa
  config:   Perubahan konfigurasi

contoh:
  feat(news): add news CRUD functionality
  fix(auth): fix token expired handling
  docs: update README with installation guide
  style(button): fix button alignment
  refactor(api): simplify response handler
  test(login): add login validation test
  chore: update dependencies
```

### 7.5 Code Review Checklist

- [ ] Kode mengikuti coding convention
- [ ] Tidak ada console.log (kecuali debugging)
- [ ] Error handling sudah benar
- [ ] Validasi input sudah lengkap
- [ ] Security (SQL Injection, XSS) sudah dicegah
- [ ] Tidak ada kode duplikat
- [ ] Nama variabel dan fungsi jelas
- [ ] Komentar hanya jika perlu
- [ ] Unit test sudah ditambahkan (jika ada)
- [ ] Documentation sudah diupdate

---

## 8. Environment Variable

### 8.1 Backend (.env)

```env
# =====================
# APP CONFIGURATION
# =====================
APP_NAME=SchoolProfile
APP_PORT=5000
APP_ENV=development
APP_URL=http://localhost:5000
NODE_ENV=development

# =====================
# DATABASE CONFIGURATION
# =====================
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=school_profile
DB_CONNECTION_LIMIT=10

# =====================
# JWT CONFIGURATION
# =====================
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this
JWT_REFRESH_EXPIRES_IN=7d

# =====================
# UPLOAD CONFIGURATION
# =====================
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=2097152
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp
ALLOWED_DOC_TYPES=pdf,doc,docx,xls,xlsx

# =====================
# CORS CONFIGURATION
# =====================
CORS_ORIGIN=http://localhost:5173

# =====================
# SMTP CONFIGURATION (Email)
# =====================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@school.sch.id

# =====================
# RATE LIMIT
# =====================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# =====================
# LOGGING
# =====================
LOG_LEVEL=dev
LOG_DIR=./logs
```

### 8.2 Frontend (.env)

```env
# =====================
# API CONFIGURATION
# =====================
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SDN Profile
VITE_APP_URL=http://localhost:5173

# =====================
# FEATURE FLAGS
# =====================
VITE_ENABLE_PPDB=true
VITE_ENABLE_MAINTENANCE=false

# =====================
# GOOGLE MAPS
# =====================
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# =====================
# ANALYTICS (optional)
# =====================
VITE_GA_ID=
```

### 8.3 .env.example

File `.env.example` disimpan di repository (tanpa nilai sensitif) sebagai referensi.

---

## 9. Package Utama Backend

### 9.1 Dependencies

| Package | Versi | Fungsi |
|---------|-------|--------|
| express | ^4.18 | Framework web Node.js |
| mysql2 | ^3.6 | Driver MySQL dengan promise support |
| jsonwebtoken | ^9.0 | Generate dan verifikasi JWT |
| bcryptjs | ^2.4 | Hashing password |
| multer | ^1.4 | Middleware upload file |
| cors | ^2.8 | Cross-Origin Resource Sharing |
| helmet | ^7.1 | Security headers |
| morgan | ^1.10 | HTTP request logger |
| winston | ^3.11 | Logger untuk error dan info |
| dotenv | ^16.3 | Load environment variables |
| express-validator | ^7.0 | Validasi input |
| express-rate-limit | ^7.1 | Rate limiting |
| slugify | ^1.6 | Generate URL slug |
| sharp | ^0.33 | Optimasi gambar (resize, kompresi) |
| fs-extra | ^11.1 | Extended file system methods |
| date-fns | ^3.3 | Manipulasi tanggal |
| uuid | ^9.0 | Generate unique ID |
| nodemailer | ^6.9 | Kirim email |

### 9.2 Dev Dependencies

| Package | Versi | Fungsi |
|---------|-------|--------|
| nodemon | ^3.0 | Auto-restart server saat development |
| eslint | ^8.56 | Linter JavaScript |
| prettier | ^3.2 | Code formatter |

---

## 10. Package Utama Frontend

### 10.1 Dependencies

| Package | Versi | Fungsi |
|---------|-------|--------|
| react | ^18.2 | Library UI React |
| react-dom | ^18.2 | React DOM rendering |
| react-router-dom | ^6.22 | Routing React |
| axios | ^1.6 | HTTP client untuk API |
| lucide-react | ^0.344 | Library icon |
| date-fns | ^3.3 | Manipulasi tanggal |
| react-quill | ^2.0 | WYSIWYG editor |
| react-helmet-async | ^2.0 | Manajemen head (SEO) |
| sweetalert2 | ^11.10 | Alert dan konfirmasi dialog |

### 10.2 Dev Dependencies

| Package | Versi | Fungsi |
|---------|-------|--------|
| vite | ^5.1 | Build tool (pengganti CRA) |
| @vitejs/plugin-react | ^4.2 | Vite plugin untuk React |
| eslint | ^8.56 | Linter JavaScript |
| prettier | ^3.2 | Code formatter |
| eslint-plugin-react | ^7.33 | ESLint rules untuk React |

---

## 11. Dokumen Terkait

- [Product Requirement Document](./PRD.md)
- [System Design Document](./SYSTEM_DESIGN.md)
- [Database Design](./DATABASE.md)
- [UI/UX Guidelines](./UI_UX.md)
- [Roadmap](./ROADMAP.md)

---
