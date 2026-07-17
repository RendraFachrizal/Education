# UI/UX Guidelines Document

## Website Profil Sekolah Dasar (SD)

---

**Dokumen**: UI_UX - User Interface & User Experience Guidelines
**Proyek**: Website Profil Sekolah Dasar
**Versi**: 1.0
**Tanggal**: 2025-01-01
**Status**: Draft

---

## Daftar Isi

1. [Design System](#1-design-system)
2. [Layout](#2-layout)
3. [Halaman Public](#3-halaman-public)
4. [Halaman Admin](#4-halaman-admin)
5. [Wireframe](#5-wireframe)
6. [Responsive](#6-responsive)
7. [UX Guideline](#7-ux-guideline)

---

## 1. Design System

### 1.1 Primary Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| --color-primary | #1A56DB (Biru) | Tombol utama, link, header aktif |
| --color-primary-dark | #1340A0 | Hover state, active state |
| --color-primary-light | #E1EFFE | Background ringan, badge |

Palet biru dipilih karena melambangkan kepercayaan, profesionalisme, dan ketenangan - cocok untuk institusi pendidikan.

### 1.2 Secondary Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| --color-secondary | #0E9F6E (Hijau) | Tombol sukses, status aktif, aksen PPDB |
| --color-secondary-dark | #057A55 | Hover state |
| --color-secondary-light | #DEF7EC | Background sukses |

Hijau melambangkan pertumbuhan, pendidikan, dan kesegaran.

### 1.3 Accent Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| --color-accent | #F59E0B (Kuning) | Badge prestasi, peringatan, highlight |
| --color-accent-dark | #D97706 | Hover state |
| --color-accent-light | #FEF3C7 | Background peringatan |

Kuning melambangkan prestasi, optimisme, dan kreativitas.

### 1.4 Neutral Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| --color-white | #FFFFFF | Background utama |
| --color-gray-50 | #F9FAFB | Background section |
| --color-gray-100 | #F3F4F6 | Background card, input |
| --color-gray-200 | #E5E7EB | Border, divider |
| --color-gray-300 | #D1D5DB | Border input |
| --color-gray-400 | #9CA3AF | Placeholder text |
| --color-gray-500 | #6B7280 | Secondary text |
| --color-gray-600 | #4B5563 | Body text |
| --color-gray-700 | #374151 | Heading text |
| --color-gray-800 | #1F2937 | Dark text |
| --color-gray-900 | #111827 | Text terdark |
| --color-black | #000000 | |


### 1.5 Semantic Color

| Token | Value | Penggunaan |
|-------|-------|------------|
| --color-success | #0E9F6E | Sukses, berhasil |
| --color-warning | #F59E0B | Peringatan |
| --color-error | #E02424 | Error, gagal |
| --color-info | #1A56DB | Informasi |

### 1.6 Typography

**Font Utama: Inter**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

**Scale Typography:**

| Level | Size | Weight | Line Height | Penggunaan |
|-------|------|--------|-------------|------------|
| --text-xs | 0.75rem (12px) | 400 | 1.5 | Caption, small text |
| --text-sm | 0.875rem (14px) | 400 | 1.5 | Body small, meta |
| --text-base | 1rem (16px) | 400 | 1.5 | Body text paragraf |
| --text-lg | 1.125rem (18px) | 500 | 1.5 | Lead text |
| --text-xl | 1.25rem (20px) | 600 | 1.4 | Subheading kecil |
| --text-2xl | 1.5rem (24px) | 600 | 1.3 | Subheading |
| --text-3xl | 1.875rem (30px) | 700 | 1.3 | Heading h3 |
| --text-4xl | 2.25rem (36px) | 700 | 1.2 | Heading h2 |
| --text-5xl | 3rem (48px) | 800 | 1.2 | Heading h1, hero |
| --text-6xl | 3.75rem (60px) | 800 | 1.1 | Hero besar |

### 1.7 Spacing

Menggunakan skala 4px.

| Token | Value | Contoh Penggunaan |
|-------|-------|-------------------|
| --space-1 | 0.25rem (4px) | Gap kecil antar icon dan text |
| --space-2 | 0.5rem (8px) | Padding button, gap card element |
| --space-3 | 0.75rem (12px) | Padding input |
| --space-4 | 1rem (16px) | Gap antar card, padding card |
| --space-5 | 1.25rem (20px) | Margin antar section kecil |
| --space-6 | 1.5rem (24px) | Padding container |
| --space-8 | 2rem (32px) | Gap section |
| --space-10 | 2.5rem (40px) | Margin heading |
| --space-12 | 3rem (48px) | Padding section besar |
| --space-16 | 4rem (64px) | Margin section |
| --space-20 | 5rem (80px) | Padding hero |
| --space-24 | 6rem (96px) | Margin antar halaman |

### 1.8 Border Radius

| Token | Value | Penggunaan |
|-------|-------|------------|
| --radius-none | 0 | Tabel, header |
| --radius-sm | 0.125rem (2px) | Badge kecil |
| --radius-md | 0.375rem (6px) | Tombol, input |
| --radius-lg | 0.5rem (8px) | Card, modal |
| --radius-xl | 0.75rem (12px) | Card besar |
| --radius-2xl | 1rem (16px) | Modal besar |
| --radius-full | 9999px | Avatar, pill |

### 1.9 Shadow

| Token | Value | Penggunaan |
|-------|-------|------------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Card ringan |
| --shadow-md | 0 4px 6px rgba(0,0,0,0.07) | Card, dropdown |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Modal, sidebar |
| --shadow-xl | 0 20px 25px rgba(0,0,0,0.15) | Floating element |

### 1.10 Icon

Menggunakan SVG inline atau icon font.

**Rekomendasi:** Lucide React (lucide-react) untuk icon yang konsisten.

**Ukuran Icon:**

| Size | Value | Penggunaan |
|------|-------|------------|
| --icon-sm | 16px | Inline dengan text |
| --icon-md | 20px | Tombol, menu item |
| --icon-lg | 24px | Icon section, card |
| --icon-xl | 32px | Icon hero, feature |
| --icon-2xl | 48px | Icon halaman |

### 1.11 Grid System

Menggunakan CSS Grid dengan 12 kolom.

```css
--grid-cols: 12;
--grid-gap: 1.5rem;
--container-max: 1200px;
--container-padding: 1rem;
```

**Container Width:**

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile (< 768px) | 100% | 1rem |
| Tablet (768px - 1024px) | 100% | 1.5rem |
| Desktop (> 1024px) | 1200px | 2rem |

### 1.12 Breakpoints

```css
/* Mobile First */
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;

/* Media Queries */
/* sm */ @media (min-width: 640px) { ... }
/* md */ @media (min-width: 768px) { ... }
/* lg */ @media (min-width: 1024px) { ... }
/* xl */ @media (min-width: 1280px) { ... }
```

---

## 2. Layout

### 2.1 Layout Halaman Public

```text
+----------------------------------------------------------+
| HEADER                                                    |
| [Logo] [School Name]         [Navbar Menu] [Search]      |
+----------------------------------------------------------+
| HERO / SLIDER                                             |
| +------------------------------------------------------+ |
| |  Gambar Slider dengan Teks dan Tombol CTA            | |
| +------------------------------------------------------+ |
+----------------------------------------------------------+
| CONTENT                                                   |
| +------------------------------------------------------+ |
| |  Section 1: Sambutan / Statistik                      | |
| |  Section 2: Berita Terbaru (Grid 3 kolom)            | |
| |  Section 3: Prestasi (Grid)                          | |
| |  Section 4: Pengumuman                               | |
| |  Section 5: Galeri (Grid)                            | |
| |  Section 6: Testimoni (Carousel)                     | |
| |  Section 7: Google Maps + Kontak                     | |
| +------------------------------------------------------+ |
+----------------------------------------------------------+
| FOOTER                                                    |
| [Logo] [Alamat & Kontak] [Menu Cepat] [Social Media]    |
| [Copyright]                                               |
+----------------------------------------------------------+
```

### 2.2 Layout Halaman Admin

```text
+----------------------------------------------------------+
| [Hamburger] [Logo] [Dashboard Title]    [User] [Notif]  |
+------------------+---------------------------------------+
|                  |                                        |
| SIDEBAR          |  CONTENT AREA                          |
|                  |                                        |
| [Dashboard]      |  +----------------------------------+  |
| [Profil Sekolah] |  |  PAGE HEADER                     |  |
| [Guru]           |  |  [Title] [Breadcrumb] [Btn Add]  |  |
| [Staff]          |  +----------------------------------+  |
| [Berita]         |  |  TABLE / FORM / CONTENT           |  |
| [Pengumuman]     |  |                                   |  |
| [Agenda]         |  |                                   |  |
| [Prestasi]       |  |                                   |  |
| [Galeri]         |  |                                   |  |
| [Video]          |  |                                   |  |
| [Download]       |  +----------------------------------+  |
| [Slider]         |                                        |
| [Banner]         |                                        |
| [Menu]           |                                        |
| [Footer]         |                                        |
| [PPDB]           |                                        |
| [Testimoni]      |                                        |
| [FAQ]            |                                        |
| [User]           |                                        |
| [Setting]        |                                        |
| [Logout]         |                                        |
|                  |                                        |
+------------------+---------------------------------------+
```

### 2.3 Komponen Layout Utama

**Header (Public):**
- Logo sekolah (kiri)
- Nama sekolah
- Navigasi utama (tengah)
- Tombol search (kanan)
- Tombol PPDB (kanan - CTA)
- Sticky header saat scroll

**Footer (Public):**
- Grid 4 kolom:
  - Kolom 1: Logo + Deskripsi singkat
  - Kolom 2: Navigasi cepat (link)
  - Kolom 3: Informasi kontak
  - Kolom 4: Social media + newsletter
- Copyright bar (bawah)

**Sidebar (Admin):**
- Logo sekolah
- Menu navigasi (accordion untuk submenu)
- User profile (bawah)
- Logout button

---

## 3. Halaman Public

### 3.1 Home Page

**Komponen:**
1. **Hero Slider** - Slider full-width dengan overlay teks dan tombol CTA
2. **Sambutan** - Foto kepala sekolah + kutipan sambutan singkat
3. **Statistik** - Angka jumlah siswa, guru, prestasi, fasilitas
4. **Berita Terbaru** - Grid 3 kolom berita dengan thumbnail
5. **Prestasi** - Grid prestasi dengan badge juara
6. **Pengumuman** - List pengumuman penting
7. **Galeri Preview** - Grid foto dengan link ke galeri
8. **Testimoni** - Carousel testimoni orang tua/alumni
9. **Mitra/Partner** - Logo instansi terkait
10. **Google Maps** - Embed peta lokasi
11. **Footer** - Informasi lengkap

### 3.2 Profile Page

**Layout:**
- Tab horizontal untuk navigasi sub-halaman:
  - Sambutan Kepala Sekolah
  - Sejarah
  - Visi Misi
  - Struktur Organisasi
- Setiap tab menampilkan konten yang relevan

### 3.3 Teachers Page

**Layout:**
- Grid card (3-4 kolom desktop, 2 kolom tablet, 1 kolom mobile)
- Setiap card: foto, nama, mapel, jabatan
- Filter dropdown (berdasarkan mapel/jabatan)
- Search bar

### 3.4 Achievements Page

**Layout:**
- Grid card prestasi
- Filter: Tahun, Kategori (akademik/non-akademik)
- Card: judul, badge juara, tingkat, tahun, foto

### 3.5 News Page

**Layout:**
- Grid berita (3 kolom desktop, 2 tablet, 1 mobile)
- Card: thumbnail, kategori, judul, tanggal, excerpt
- Pagination
- Sidebar: kategori, berita populer, arsip

**Detail Berita:**
- Featured image (hero)
- Breadcrumb
- Judul, meta (penulis, tanggal, kategori)
- Konten (prose styling)
- Share buttons
- Berita terkait (3 card)

### 3.6 Gallery Page

**Layout:**
- Grid album foto
- Klik album → halaman detail dengan grid foto
- Lightbox untuk foto full-size

### 3.7 PPDB Page

**Layout:**
- Hero section info PPDB
- Timeline/gelombang pendaftaran
- Persyaratan checklist
- Tombol "Daftar Sekarang" → form pendaftaran
- Cek status pendaftaran

**Form PPDB:**
- Multi-step form
- Step 1: Data calon siswa
- Step 2: Data orang tua
- Step 3: Upload dokumen
- Step 4: Konfirmasi dan submit

### 3.8 Contact Page

**Layout:**
- Split layout: form kontak (kiri) + info kontak & maps (kanan)
- Form: nama, email, telepon, subjek, pesan
- Info: alamat, telepon, email, jam kerja
- Google Maps embed full-width di bawah

### 3.9 FAQ Page

**Layout:**
- Kategori FAQ (tab/pill)
- Accordion item: pertanyaan (click) → jawaban (expand)
- Search FAQ

---

## 4. Halaman Admin

### 4.1 Dashboard Admin

**Komponen:**
- Stat Cards (total berita, guru, pendaftar, pesan)
- Grafik batis (jumlah pengunjung/aktivitas)
- Tabel aktivitas terbaru
- Daftar pesan belum dibaca
- Kalender agenda

### 4.2 CRUD Table

**Layout Umum Tabel:**
```text
+----------------------------------------------------------+
| [Judul Halaman]                    [Search] [Tambah Data] |
+----------------------------------------------------------+
| [Filter dropdown] [Filter dropdown] [Export]             |
+----------------------------------------------------------+
| # | Nama | Status | Tanggal | Aksi                       |
|---|------|--------|---------|------                       |
| 1 | ...  | Aktif  | 01/01  | Edit | Hapus               |
| 2 | ...  | Draft  | 02/01  | Edit | Hapus               |
+----------------------------------------------------------+
| [Pagination: Prev 1 2 3 ... Next]                        |
+----------------------------------------------------------+
```

### 4.3 CRUD Form

**Layout Umum Form:**
```text
+----------------------------------------------------------+
| [Judul Form: Tambah/Edit Data]                            |
+----------------------------------------------------------+
| [Tabs/Fields]                                             |
|                                                          |
| Nama:      [________________________]                    |
| Kategori:  [Dropdown ▼]                                   |
| Konten:    [WYSIWYG Editor]                               |
| Thumbnail: [Choose File] [Preview]                       |
| Status:    [Active] [Draft]                               |
|                                                          |
+----------------------------------------------------------+
| [Simpan] [Batal]                                          |
+----------------------------------------------------------+
```

### 4.4 Login Page Admin

**Layout:**
```text
+----------------------------------------------------------+
|                                                          |
|                    [Logo Sekolah]                         |
|                    [Nama Sekolah]                         |
|                                                          |
|              +---------------------------+               |
|              |     Login Admin            |               |
|              |                           |               |
|              |  Email:                   |               |
|              |  [________________]       |               |
|              |                           |               |
|              |  Password:                |               |
|              |  [________________]       |               |
|              |                           |               |
|              |  [x] Remember Me          |               |
|              |                           |               |
|              |  [Masuk]                  |               |
|              |                           |               |
|              +---------------------------+               |
|                                                          |
+----------------------------------------------------------+
```

---

## 5. Wireframe

### 5.1 Wireframe Desktop - Home Page

```text
+--------------------------------------------------------------------+
| [Logo] SDN Contoh Bangsa          [Beranda] [Profil] [Berita] 🖂   |
|                                    [Galeri] [PPDB] [Kontak]        |
+--------------------------------------------------------------------+
|                                                                      |
| ╔══════════════════════════════════════════════════════════════════╗ |
| ║                                                                  ║ |
| ║                    HERO SLIDER                                   ║ |
| ║    "Selamat Datang di SDN Contoh Bangsa"                         ║ |
| ║    [Teks Subtitle]                                               ║ |
| ║    [          Info PPDB         ]  [   Profil Sekolah   ]        ║ |
| ║                                                                  ║ |
| ║                     ●  ○  ○                                      ║ |
| ╚══════════════════════════════════════════════════════════════════╝ |
|                                                                      |
|  STATISTIK:                                                          |
|  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                            |
|  │ 500+  │  │ 30+  │  │ 100+ │  │ 20+  │                            |
|  │ Siswa │  │ Guru │  │Pres- │  │ Fasi-│                            |
|  │       │  │      │  │ tasi │  │litas │                            |
|  └──────┘  └──────┘  └──────┘  └──────┘                            |
|                                                                      |
|  ── BERITA TERBARU ──────────────────── [Lihat Semua →]             |
|  ┌──────────┐  ┌──────────┐  ┌──────────┐                           |
|  │ 📷 THUMB │  │ 📷 THUMB │  │ 📷 THUMB │                           |
|  │ Judul    │  │ Judul    │  │ Judul    │                           |
|  │ Berita.. │  │ Berita.. │  │ Berita.. │                           |
|  └──────────┘  └──────────┘  └──────────┘                           |
|                                                                      |
|  ── PRESTASI TERBARU ──────────────── [Lihat Semua →]               |
|  ┌──────────┐  ┌──────────┐  ┌──────────┐                           |
|  │🥇 Juara 1│  │🥈 Juara 2│  │🥉 Juara 3│                           |
|  │ Nasional │  │ Provinsi │  │ Kota     │                           |
|  └──────────┘  └──────────┘  └──────────┘                           |
|                                                                      |
|  ── TESTIMONI ─────────────────────────────────────                   |
|  ╔══════════════════════════════════════════════════╗               |
|  ║  "Sekolah ini sangat baik dalam mendidik anak"  ║               |
|  ║                    — Orang Tua Siswa            ║               |
|  ╚══════════════════════════════════════════════════╝               |
|                                                                      |
|  ── LOKASI KAMI ─────────────────────────────────────               |
|  ╔══════════════════════════════════════════════════╗               |
|  ║              GOOGLE MAPS EMBED                   ║               |
|  ╚══════════════════════════════════════════════════╝               |
+--------------------------------------------------------------------+
| [Logo] SDN Contoh Bangsa  |  Menu:        |  Kontak:               |
| Jl. Pendidikan No.1       |  • Beranda    |  Telp: 021-123456      |
| Jakarta Selatan           |  • Profil     |  Email: info@sd.sch.id |
|                           |  • Berita     |                        |
| © 2025 SDN Contoh Bangsa  |  • PPDB       |  [FB] [IG] [YT]       |
+--------------------------------------------------------------------+
```

### 5.2 Wireframe Mobile - Home Page

```text
+----------------------------+
| [☰] SDN Contoh Bangsa [🔍] |
+----------------------------+
|                            |
| ╔════════════════════════╗ |
| ║       HERO SLIDER      ║ |
| ║   "Selamat Datang"     ║ |
| ║   [Info PPDB]          ║ |
| ╚════════════════════════╝ |
|                            |
|  STATISTIK:               |
|  ┌────┐ ┌────┐            |
|  │500+│ │30+ │            |
|  │Sisw│ │Guru│            |
|  └────┘ └────┘            |
|  ┌────┐ ┌────┐            |
|  │100+│ │20+ │            |
|  │Pres│ │Fasi│            |
|  └────┘ └────┘            |
|                            |
|  ── BERITA ── [→]         |
|  ┌────────────────────┐   |
|  │ 📷 THUMB           │   |
|  │ Judul Berita...    │   |
|  └────────────────────┘   |
|  ┌────────────────────┐   |
|  │ 📷 THUMB           │   |
|  │ Judul Berita...    │   |
|  └────────────────────┘   |
|                            |
|  ── PRESTASI ── [→]      |
|  ┌────────────────────┐   |
|  │🥇 Juara 1 Nasional │   |
|  └────────────────────┘   |
|  ┌────────────────────┐   |
|  │🥈 Juara 2 Provinsi │   |
|  └────────────────────┘   |
|                            |
|  ── TESTIMONI ──          |
|  ╔══════════════════════╗ |
|  ║ "Testimoni orang tua"║ |
|  ╚══════════════════════╝ |
|                            |
|  ── MAPS ──               |
|  ╔══════════════════════╗ |
|  ║      MAPS EMBED      ║ |
|  ╚══════════════════════╝ |
+----------------------------+
| [Logo]                    |
| SDN Contoh Bangsa         |
| Jl. Pendidikan No.1       |
| Jakarta Selatan           |
|                           |
| Menu:                     |
| • Beranda                 |
| • Profil                  |
| • Berita                  |
| • PPDB                    |
| • Kontak                  |
|                           |
| [FB] [IG] [YT]            |
| © 2025 SDN Contoh Bangsa  |
+----------------------------+
```

### 5.3 Wireframe Admin - Dashboard

```text
+------------------------------------------------------+
| [☰] SDN Contoh Bangsa       Admin [👤] [🔔] [🚪]   |
+----------+-------------------------------------------+
|          |                                           |
| 📊 Dasb  |  SELAMAT DATANG, ADMIN                   |
| 🏫 Profl |                                           |
| 👨‍🏫 Guru  |  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        |
| 👥 Staff |  │ 25  │ │ 12  │ │ 150 │ │ 5   │        |
| 📰 Berita|  │Berita│ │ Guru│ │Penda│ │Pesan│        |
| 📢 Pengum|  └─────┘ └─────┘ └─────┘ └─────┘        |
| 📅 Agenda|                                           |
| 🏆 Pres- |  ── GRAFIK KUNJUNGAN ──                  |
| 🖼️ Galeri|  ╔═══════════════════════════════════╗    |
| 🎬 Video |  ║       CHART / GRAFIK              ║    |
| 📥 Downl |  ╚═══════════════════════════════════╝    |
| 🎠 Slider|                                           |
| 🏷️ Banner|  ── AKTIVITAS TERBARU ──                  |
| 📋 Menu  |  • Admin 1 menambahkan berita         |
| 📌 Footer|  • Admin 2 mengupdate profil           |
| 📝 PPDB  |  • Admin 1 menghapus galeri            |
| 💬 Testi |                                           |
| ❓ FAQ   |  ── PESAN BARU ──                         |
| 👥 User  |  Budi: "Apakah pendaftaran dibuka?"   |
| ⚙️ Setng |  Siti: "Info biaya sekolah"            |
|          |                                           |
+----------+-------------------------------------------+
```

### 5.4 Wireframe Admin - Form CRUD

```text
+------------------------------------------------------+
| [☰] Kelola Berita > Tambah Berita                    |
+----------+-------------------------------------------+
|          |                                           |
| [Sidebar]|  +-------------------------------------+  |
|          |  |  TAMBAH BERITA                       |  |
|          |  +-------------------------------------+  |
|          |                                           |
|          |  Judul Berita:                            |
|          |  [__________________________________]    |
|          |                                           |
|          |  Kategori:     Status:                    |
|          |  [Prestasi  ▼] [● Published] [○ Draft]  |
|          |                                           |
|          |  Konten:                                  |
|          |  ┌─────────────────────────────────────┐  |
|          |  │ [B] [I] [U] [H1] [Link] [Image]     │  |
|          |  │─────────────────────────────────────│  |
|          |  │  Tulis konten berita di sini...      │  |
|          |  │                                       │  |
|          |  └─────────────────────────────────────┘  |
|          |                                           |
|          |  Thumbnail:                               |
|          |  [Pilih File] [📷 Preview Image]          |
|          |                                           |
|          |  SEO Settings (Opsional):                  |
|          |  Meta Title: [__________________]         |
|          |  Meta Desc:  [__________________]         |
|          |                                           |
|          |  [  Simpan  ]  [  Batal  ]               |
|          |                                           |
+----------+-------------------------------------------+
```

---

## 6. Responsive

### 6.1 Desktop (≥ 1024px)

| Elemen | Desktop |
|--------|---------|
| Container | 1200px, centered |
| Grid | 12 columns dengan gap 1.5rem |
| Navigation | Horizontal menu full |
| Hero | Full-width slider dengan overlay |
| Berita Grid | 3 columns |
| Footer | 4 columns |
| Sidebar Admin | Always visible (250px width) |

### 6.2 Tablet (768px - 1023px)

| Elemen | Tablet |
|--------|--------|
| Container | 100% width, padding 1.5rem |
| Grid | 8 columns |
| Navigation | Menu items collapsed sebagai dropdown |
| Hero | Slider height dikurangi |
| Berita Grid | 2 columns |
| Footer | 2 columns |
| Sidebar Admin | Collapsible (hamburger toggle) |

### 6.3 Mobile (< 768px)

| Elemen | Mobile |
|--------|--------|
| Container | 100% width, padding 1rem |
| Grid | 4 columns (mostly full-width) |
| Navigation | Hamburger menu (slide-in drawer) |
| Hero | Single slide, smaller text |
| Berita Grid | 1 column |
| Card Grid | 1 column |
| Footer | 1 column |
| Sidebar Admin | Off-canvas (overlay) |
| Tombol | Touch-friendly (min 44px) |
| Font Size | Minimum 16px (cegah zoom iOS) |

### 6.4 Responsive Breakpoints (CSS)

```css
/* Base: Mobile first */

/* Tablet */
@media (min-width: 768px) {
  .container { max-width: 100%; padding: 0 1.5rem; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; padding: 0 2rem; }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
}
```

---

## 7. UX Guideline

### 7.1 Accessibility

| Aspek | Implementasi |
|-------|--------------|
| Semantic HTML | Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Alt Text | Semua gambar memiliki alt text deskriptif |
| ARIA Labels | Tambahkan aria-label pada icon button dan form |
| Focus State | Semua elemen interaktif memiliki visible focus ring |
| Keyboard Navigation | Semua fungsi dapat diakses dengan keyboard (Tab, Enter, Escape) |
| Color Contrast | Minimum contrast ratio 4.5:1 untuk text normal, 3:1 untuk text besar |
| Skip Link | Tambahkan "Skip to Content" link di halaman public |
| Screen Reader | Gunakan aria-live untuk notifikasi dinamis |
| Form Labels | Setiap input memiliki `<label>` yang jelas |

### 7.2 Consistency

| Aspek | Implementasi |
|-------|--------------|
| Design System | Gunakan CSS custom properties yang konsisten |
| Component | Komponen reusable (Button, Card, Modal) memiliki tampilan seragam |
| Spacing | Gunakan spacing scale yang konsisten di seluruh halaman |
| Typography | Heading scale dan font weight yang konsisten |
| Icon | Gunakan satu set icon yang sama (Lucide) |
| Button Style | Tombol memiliki style yang konsisten: primary, secondary, outline, ghost |
| Form Style | Input, select, textarea memiliki style yang seragam |

### 7.3 Feedback

| State | Implementasi |
|-------|--------------|
| Hover | Tombol berubah warna/opacity saat hover (transition 200ms) |
| Active | Tombol memberikan efek "press" saat diklik |
| Focus | Input dan tombol memiliki ring warna biru saat focus |
| Loading | Spinner/skeleton screen saat data dimuat |
| Success | Toast hijau dengan icon checkmark (+ auto dismiss 3 detik) |
| Error | Toast merah dengan icon X (+ pesan error jelas) |
| Warning | Toast kuning dengan icon warning |
| Empty State | Ilustrasi + pesan "Belum ada data" + CTA |
| Disabled | Tombol/input tampil dengan opacity 50% + cursor not-allowed |

### 7.4 Loading State

| Komponen | Implementasi |
|----------|--------------|
| Halaman | Skeleton screen (placeholder shimmer) |
| Tabel | Rows skeleton (5 baris animasi) |
| Card Grid | Card skeleton dengan animasi pulse |
| Button | Spinner kecil + text "Memproses..." |
| Image | Placeholder dengan blur effect (LQIP) |
| Pagination | Disable tombol selama loading |
| Form Submit | Button disabled + spinner sampai selesai |

### 7.5 Empty State

```text
+---------------------------+
|                           |
|       [📭 Illustration]   |
|                           |
|   Belum Ada Data          |
|   Belum ada berita yang   |
|   ditambahkan.            |
|                           |
|   [Tambah Berita Pertama] |
|                           |
+---------------------------+
```

### 7.6 Error State

```text
+---------------------------+
|       [⚠️ Error Icon]     |
|                           |
|   Gagal Memuat Data       |
|   Terjadi kesalahan saat  |
|   mengambil data. Coba    |
|   lagi.                   |
|                           |
|   [🔄 Coba Lagi]          |
|                           |
+---------------------------+
```

### 7.7 Success State

| Aksi | Feedback |
|------|----------|
| Simpan data | Toast: "Data berhasil disimpan" (hijau) |
| Hapus data | Toast: "Data berhasil dihapus" (hijau) |
| Login | Redirect ke dashboard + toast "Selamat datang" |
| Upload file | Toast: "File berhasil diupload" (hijau) + preview |
| Kirim pesan | Toast: "Pesan berhasil dikirim" (hijau) |
| PPDB daftar | Halaman sukses + nomor pendaftaran |

### 7.8 Animation & Transition

```css
/* Durasi */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Implementasi */
.button {
  transition: background-color var(--duration-normal) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.card {
  transition: transform var(--duration-slow) var(--ease-out),
              box-shadow var(--duration-slow) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 7.9 Touch Targets (Mobile)

| Elemen | Minimum Size |
|--------|--------------|
| Tombol | 44px x 44px |
| Link | 44px height |
| Input field | 44px height |
| Icon clickable | 44px hit area (icon 24px + padding) |
| Menu item | 48px height |
| Radio/Checkbox | 44px hit area |
| Accordion header | 48px height |

### 7.10 Best Practices

1. **Mobile First** - Desain dimulai dari mobile, kemudian ditingkatkan untuk tablet dan desktop.
2. **Progressive Enhancement** - Fitur dasar berfungsi di semua browser, fitur lanjutan di browser modern.
3. **Optimasi Gambar** - Gunakan format WebP dengan fallback JPEG/PNG. Ukuran maksimal 200KB per gambar.
4. **Lazy Loading** - Gambar di bawah fold menggunakan `loading="lazy"`.
5. **Debounce Search** - Pencarian menggunakan debounce 300ms.
6. **Pagination** - 10-12 item per halaman untuk admin, 9-12 untuk publik.
7. **Form Validation** - Validasi real-time (on blur) + validasi on submit.
8. **Error Prevention** - Konfirmasi sebelum hapus, auto-save draft.
9. **404 Page** - Halaman 404 yang ramah dengan navigasi kembali.
10. **Maintenance Mode** - Halaman maintenance saat website sedang diperbarui.

---

## 8. CSS Code Standards

### 8.1 CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #1A56DB;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  
  /* Spacing */
  --space-4: 1rem;
  
  /* Layout */
  --container-max: 1200px;
}
```

### 8.2 Naming Convention

Menggunakan BEM (Block Element Modifier):

```css
/* Block */
.card { }

/* Element */
.card__image { }
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card--horizontal { }
.card--dark { }
```

### 8.3 File Organization (CSS)

```text
styles/
├── base/
│   ├── reset.css       # CSS reset
│   ├── typography.css   # Typography styles
│   └── variables.css    # CSS custom properties
├── components/
│   ├── button.css
│   ├── card.css
│   ├── form.css
│   ├── modal.css
│   ├── table.css
│   └── toast.css
├── layouts/
│   ├── header.css
│   ├── footer.css
│   ├── sidebar.css
│   └── grid.css
├── pages/
│   ├── home.css
│   ├── news.css
│   ├── gallery.css
│   └── admin-dashboard.css
├── utils/
│   ├── animations.css
│   └── utilities.css
├── main.css            # Import all CSS files
└── responsive.css      # Media queries
```

---

## 9. Dokumen Terkait

- [Product Requirement Document](./PRD.md)
- [System Design Document](./SYSTEM_DESIGN.md)
- [Database Design](./DATABASE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Roadmap](./ROADMAP.md)

---
