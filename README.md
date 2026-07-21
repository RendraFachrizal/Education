# Website Profil Sekolah Dasar (SD)

Website profil sekolah dasar modern, responsif, dan mudah dikelola. Dibangun dengan **Express.js** (backend), **React.js** (frontend), dan **MySQL** (database).

## Fitur Utama

- Halaman publik: Beranda, Profil, Guru, Berita, Galeri, PPDB, Kontak, FAQ
- Panel admin dengan login JWT
- CRUD untuk seluruh konten website
- Upload file (gambar dan dokumen)
- Responsive design (desktop, tablet, mobile)
- SEO Friendly

## Teknologi

| Layer | Teknologi |
|-------|-----------|
| Backend | Node.js, Express.js, JWT, Multer |
| Frontend | React.js, Vite, React Router |
| Database | MySQL 8+ |
| Lainnya | REST API, CSS3 murni, dotenv |

## Struktur Project

```
school-profile/
├── backend/        # Express.js REST API + database + deploy
├── frontend/       # React.js application
└── docs/           # Documentation
```

## Cara Menjalankan

### Prerequisites

- Node.js 18+
- MySQL 8+
- npm

### GitHub Codespace (Auto Setup)

Proyek ini sudah dilengkapi konfigurasi **devcontainer** untuk GitHub Codespace:

1. Klik tombol **"Code" > "Open with Codespaces"** di repository GitHub
2. Tunggu hingga container selesai dibangun (~1-2 menit)
3. Semua dependensi, database, dan environment akan ter-setup otomatis
4. Jalankan kedua server:

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Setup Manual (Local)

#### Backend

```bash
cd backend
cp .env.example .env
# Edit .env dengan konfigurasi database Anda
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

#### Database

```bash
# Import schema
mysql -u root -p school_profile < backend/database/schema.sql

# Import seed data
mysql -u root -p school_profile < backend/database/seed.sql
```

## Dokumentasi Lengkap

Seluruh dokumentasi tersedia di folder [docs/](./docs/):

- [PRD](./docs/PRD.md) - Product Requirement Document
- [System Design](./docs/SYSTEM_DESIGN.md) - Desain Sistem
- [Database](./docs/DATABASE.md) - Desain Database
- [UI/UX](./docs/UI_UX.md) - Panduan UI/UX
- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Struktur Project
- [Roadmap](./docs/ROADMAP.md) - Roadmap Implementasi

## Lisensi

Hak Cipta © 2025 - Proyek ini bersifat internal sekolah.
