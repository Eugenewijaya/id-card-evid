# 🪪 3D Executive Digital Business Card & Smart ID Pass

Website kartu nama digital 3D interaktif dengan model Smart ID Pass / Executive Pass bernuansa minimalis ala Apple. Dilengkapi animasi 3D tilt fisik, efek glossy/hologram, panel admin mandiri (`/admin`), dan integrasi Resend API untuk pengiriman kartu nama otomatis via email.

---

## ✨ Fitur Utama

- **3D Tilt & Flip Interactive**: Efek kartu fisik 3D responsif mengikuti kursor / sentuhan layar dengan fisika spring (*Framer Motion*).
- **Executive Smart ID Pass Design**: Dilengkapi Smart Chip logam, simbol NFC Wireless, indikator status aktif, kode barcode sekuriti, nomor identitas resmi, dan *magnetic stripe*.
- **5 Pilihan Tema Kartu**:
  - *Obsidian Black* (Onyx Black Matte Pass)
  - *Apple Titanium* (Frosted Platinum Pass)
  - *Cyber Hologram* (Prismatic Iridescent Fintech Pass)
  - *Royal Sapphire* (Executive Navy Pass)
  - *Emerald Wealth* (Signature Emerald Pass)
- **Kontrol Penuh dari Admin Dashboard (`/admin`)**:
  - Pilihan tema kartu dikontrol terpusat dari admin.
  - CRUD lengkap: Biodata, Foto & Logo (via URL hosting), Portfolio, Layanan (*Services*), dan Media Sosial.
  - Pengaturan Resend API Key dan kustomisasi warna aksen.
- **Kirim Kartu via Email (Resend API)**: Pengunjung dapat menginput email untuk menerima kartu nama resmi dengan salam pembuka, ringkasan profil, dan tombol chat WhatsApp langsung.
- **Tanpa Database Rumit**: Menggunakan penyimpanan JSON terstruktur (`data/profile.json`), ringan dan sangat cepat.

---

## 🚀 Panduan Menjalankan di Lokal

### 1. Clone & Install Dependensi
```bash
git clone https://github.com/Eugenewijaya/id-card-evid.git
cd id-card-evid
npm install
```

### 2. Konfigurasi Environment Variables
Salin `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi konfigurasi di `.env.local`:
```env
ADMIN_PASSWORD_HASH=
JWT_SECRET=your-random-jwt-secret
RESEND_API_KEY=your_resend_api_key_here
```
*(Catatan: Jika `ADMIN_PASSWORD_HASH` dibiarkan kosong, password default admin adalah `admin`)*.

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser di:
- **Halaman Utama**: [http://localhost:3000](http://localhost:3000)
- **Panel Admin**: [http://localhost:3000/admin](http://localhost:3000/admin) (Password: `admin`)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animasi 3D**: Framer Motion
- **Email Service**: Resend API
- **Autentikasi**: JWT & Bcrypt
- **Data Persistence**: JSON File Storage
