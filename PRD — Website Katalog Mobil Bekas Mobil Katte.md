# PRD — Website Katalog Mobil Bekas Mobil Katte

## 1. Informasi Produk

**Nama Produk:** Mobil Katte  
**Jenis Produk:** Website katalog jual beli mobil bekas  
**Target Pengguna:** Calon pembeli mobil bekas dan admin/pengelola showroom  
**Platform:** Web responsive — Desktop, Tablet, Mobile  
**Bahasa:** Bahasa Indonesia

### Tujuan Utama

Membangun website katalog mobil bekas yang memungkinkan calon pembeli:

- Melihat daftar mobil tanpa harus login.
- Mencari mobil berdasarkan nama/kendaraan.
- Memfilter berdasarkan rentang harga.
- Melihat detail kendaraan.
- Mengetahui tahun kendaraan.
- Mengetahui status pajak kendaraan.
- Mengetahui brand dan tipe kendaraan.

Admin dapat:

- Login ke halaman administrator.
- Menambah kendaraan.
- Melihat data kendaraan.
- Mengubah data kendaraan.
- Menghapus kendaraan.
- Mengelola foto kendaraan.
- Mengelola status kendaraan.

---

# 2. Konsep Website

Website dibagi menjadi 2 area utama:

### A. Public Website

Dapat diakses oleh semua orang tanpa login.

Contoh:

`mobilkatte.com`

User dapat:

1. Melihat homepage.
2. Melihat katalog mobil.
3. Mencari kendaraan.
4. Filter harga.
5. Filter brand.
6. Filter tahun.
7. Melihat detail mobil.
8. Menghubungi penjual/admin.

### B. Admin Dashboard

Hanya dapat diakses setelah login.

Contoh:

`mobilkatte.com/admin`

Admin dapat melakukan CRUD terhadap data kendaraan.

---

# 3. Struktur Halaman

## Public

### 3.1 Homepage

Bagian:

- Logo Mobil Katte
- Menu Home
- Katalog Mobil
- Tentang Kami
- Kontak
- Tombol pencarian
- Hero/banner utama
- Search kendaraan
- Filter harga
- Mobil terbaru
- Mobil pilihan
- Call To Action
- Footer

Contoh headline:

**"Temukan Mobil Bekas Impianmu di Mobil Katte"**

Subheadline:

**"Pilihan mobil bekas berkualitas dengan informasi kendaraan yang transparan."**

---

# 4. Halaman Katalog

URL:

`/mobil`

Menampilkan seluruh kendaraan yang tersedia.

Setiap mobil ditampilkan dalam bentuk card.

### Card Mobil

Informasi:

- Foto mobil
- Brand
- Nama mobil
- Type
- Tahun
- Harga
- Status pajak
- Tombol "Lihat Detail"

Contoh:

**Toyota Avanza**

Type: 1.5 G  
Tahun: 2022  
Harga: Rp 215.000.000  
Pajak: Aktif

[ Lihat Detail ]

---

# 5. Sistem Pencarian

User tidak perlu login untuk melakukan pencarian.

### Search berdasarkan kendaraan

Input:

`Cari mobil, brand, atau tipe...`

Contoh pencarian:

- Avanza
- Toyota
- Honda
- Brio
- Xpander
- Innova

Sistem mencari berdasarkan:

- Nama mobil
- Brand
- Type

---

# 6. Filter Harga

User dapat mencari berdasarkan range harga.

### Pilihan cepat

- Di bawah Rp100 juta
- Rp100–150 juta
- Rp150–200 juta
- Rp200–300 juta
- Rp300–500 juta
- Di atas Rp500 juta

### Custom Range

User dapat menentukan:

**Harga Minimum**

Rp ________

**Harga Maksimum**

Rp ________

Contoh:

Rp150.000.000 — Rp250.000.000

Kemudian klik:

**Terapkan Filter**

---

# 7. Filter Tambahan

Agar katalog lebih mudah digunakan, sistem sebaiknya menyediakan:

### Brand

Contoh:

- Toyota
- Honda
- Mitsubishi
- Daihatsu
- Suzuki
- Nissan
- Mazda
- Hyundai
- Kia
- Wuling
- BMW
- Mercedes-Benz
- dll.

### Tahun

Contoh:

- 2026
- 2025
- 2024
- 2023
- 2022
- 2021
- dst.

### Status Pajak

- Pajak Aktif
- Pajak Tidak Aktif

### Urutan

- Terbaru
- Harga Termurah
- Harga Termahal
- Tahun Terbaru

---

# 8. Detail Kendaraan

URL:

`/mobil/{slug}`

Contoh:

`/mobil/toyota-avanza-1-5-g-2022`

Halaman detail menampilkan:

## Informasi Utama

**Toyota Avanza**

Type: 1.5 G  
Tahun: 2022  
Harga: Rp215.000.000

Status:

**Pajak Aktif**

---

## Galeri Foto

Minimal:

- Foto depan
- Foto belakang
- Foto samping
- Foto interior
- Foto dashboard
- Foto mesin
- Foto lainnya

Admin dapat mengupload beberapa foto.

---

# 9. Spesifikasi Kendaraan

Data yang disarankan:

| Field | Contoh |
|---|---|
| Brand | Toyota |
| Nama Mobil | Avanza |
| Type | 1.5 G |
| Tahun | 2022 |
| Harga | Rp215.000.000 |
| Transmisi | Automatic |
| Bahan Bakar | Bensin |
| Kilometer | 35.000 KM |
| Warna | Hitam |
| Pajak | Aktif |
| Kondisi | Bekas |
| Plat | DD |
| Lokasi | Makassar |

Field tambahan dapat dikembangkan kemudian.

---

# 10. Tombol Kontak

Pada halaman detail kendaraan terdapat tombol:

**Hubungi Mobil Katte**

Pilihan:

- WhatsApp
- Telepon
- Form kontak

Contoh tombol utama:

**Tanya Mobil Ini**

Ketika diklik, WhatsApp dapat membuka pesan otomatis:

> Halo Mobil Katte, saya tertarik dengan Toyota Avanza 1.5 G Tahun 2022 dengan harga Rp215.000.000.

---

# 11. Admin Login

URL:

`/admin/login`

Admin wajib login sebelum masuk dashboard.

Input:

- Email / Username
- Password

Tombol:

**Login**

### Keamanan

- Password disimpan dalam bentuk hash.
- Session/token admin harus aman.
- Halaman admin tidak dapat diakses user biasa.
- Logout tersedia.
- Proteksi terhadap brute-force login.
- Validasi input.
- Role/permission dapat dikembangkan untuk multi-admin.

---

# 12. Admin Dashboard

Setelah login:

`/admin/dashboard`

Dashboard menampilkan statistik:

### Total Mobil

`125`

### Mobil Aktif

`110`

### Pajak Aktif

`95`

### Pajak Tidak Aktif

`15`

### Total Nilai Inventory

`Rp XX.XXX.XXX.XXX`

---

# 13. Menu Admin

Sidebar:

- Dashboard
- Data Mobil
- Tambah Mobil
- Brand
- Foto Mobil
- Pengaturan
- Logout

---

# 14. CRUD Data Mobil

## CREATE — Tambah Mobil

Admin klik:

**+ Tambah Mobil**

Form:

### Informasi Mobil

- Brand
- Nama Mobil
- Type
- Tahun
- Harga
- Kilometer
- Transmisi
- Bahan Bakar
- Warna
- Kondisi
- Status Pajak
- Lokasi
- Deskripsi

### Foto

Admin dapat upload:

- Foto utama
- Foto depan
- Foto belakang
- Foto samping
- Foto interior
- Foto dashboard
- Foto mesin
- Foto lainnya

Tombol:

**Simpan Mobil**

---

# 15. READ — Data Mobil

Admin dapat melihat tabel:

| Foto | Mobil | Type | Tahun | Harga | Pajak | Status | Action |
|---|---|---|---:|---:|---|---|---|
| Foto | Toyota Avanza | 1.5 G | 2022 | 215 Juta | Aktif | Tersedia | Edit/Delete |
| Foto | Honda Brio | Satya | 2021 | 145 Juta | Aktif | Tersedia | Edit/Delete |

Fitur:

- Search
- Filter brand
- Filter harga
- Filter tahun
- Filter status
- Pagination

---

# 16. UPDATE — Edit Mobil

Admin dapat mengubah:

- Brand
- Nama mobil
- Type
- Tahun
- Harga
- Kilometer
- Transmisi
- Bahan bakar
- Warna
- Pajak
- Foto
- Deskripsi
- Status kendaraan

Tombol:

**Update Mobil**

---

# 17. DELETE — Hapus Mobil

Admin dapat menghapus kendaraan.

Sebelum dihapus, tampilkan konfirmasi:

**"Apakah Anda yakin ingin menghapus kendaraan ini?"**

Pilihan:

**Batal**

**Hapus**

Sebaiknya sistem menggunakan **soft delete**, sehingga data tidak langsung hilang permanen dari database.

---

# 18. Status Kendaraan

Setiap mobil memiliki status:

- Tersedia
- Terjual
- Dipesan
- Tidak Aktif

Jika kendaraan terjual:

Card dapat menampilkan label:

**TERJUAL**

Mobil tetap dapat disimpan dalam database untuk histori.

---

# 19. Status Pajak

Field:

`pajak_status`

Nilai:

- Aktif
- Tidak Aktif

Opsional dikembangkan menjadi:

- Aktif
- Tidak Aktif
- Jatuh Tempo

Informasi yang dapat ditambahkan:

`Pajak berlaku sampai: 15 Desember 2026`

---

# 20. Database

Database yang disarankan:

**PostgreSQL** atau **MySQL**

Struktur utama:

### users

| Field | Type |
|---|---|
| id | UUID / BIGINT |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR HASH |
| role | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Role:

- admin
- super_admin

---

# 21. Tabel Brands

### brands

| Field | Type |
|---|---|
| id | UUID / BIGINT |
| name | VARCHAR |
| slug | VARCHAR |
| logo | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Contoh:

Toyota  
Honda  
Mitsubishi  
Daihatsu

---

# 22. Tabel Cars

### cars

| Field | Type |
|---|---|
| id | UUID / BIGINT |
| brand_id | FK |
| name | VARCHAR |
| type | VARCHAR |
| slug | VARCHAR |
| year | INT |
| price | BIGINT |
| mileage | INT |
| transmission | VARCHAR |
| fuel | VARCHAR |
| color | VARCHAR |
| tax_status | VARCHAR |
| tax_expired_at | DATE |
| condition | VARCHAR |
| location | VARCHAR |
| description | TEXT |
| status | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |
| deleted_at | TIMESTAMP |

---

# 23. Tabel Car Images

### car_images

| Field | Type |
|---|---|
| id | UUID / BIGINT |
| car_id | FK |
| image_url | TEXT |
| is_primary | BOOLEAN |
| sort_order | INT |
| created_at | TIMESTAMP |

Relasi:

`Brand → Cars → Car Images`

Satu brand memiliki banyak mobil.

Satu mobil memiliki banyak foto.

---

# 24. API / Backend

Backend minimal menyediakan:

### Public API

`GET /api/cars`

Menampilkan katalog mobil.

`GET /api/cars/{slug}`

Menampilkan detail mobil.

`GET /api/brands`

Menampilkan daftar brand.

`GET /api/cars/search`

Pencarian kendaraan.

Parameter contoh:

`keyword=avanza`

`min_price=150000000`

`max_price=250000000`

`brand=toyota`

`year=2022`

`tax_status=active`

---

# 25. Admin API

Endpoint:

`POST /api/admin/login`

`POST /api/admin/cars`

`GET /api/admin/cars`

`GET /api/admin/cars/{id}`

`PUT /api/admin/cars/{id}`

`DELETE /api/admin/cars/{id}`

`POST /api/admin/cars/{id}/images`

Semua endpoint admin harus membutuhkan autentikasi.

---

# 26. Contoh Request Filter

User melakukan pencarian:

**Toyota Avanza dengan harga Rp150–250 juta**

Request:

`GET /api/cars?keyword=avanza&min_price=150000000&max_price=250000000`

Server mengembalikan daftar mobil yang sesuai.

---

# 27. Pagination

Katalog jangan langsung mengambil seluruh database.

Gunakan pagination.

Contoh:

`page=1`

`limit=20`

Hasil:

**Menampilkan 1–20 dari 125 kendaraan**

Tombol:

`← Sebelumnya`

`1 2 3 4 5`

`Berikutnya →`

---

# 28. UI/UX

## Gaya Visual

Brand:

**MOBIL KATTE**

Konsep:

- Modern
- Profesional
- Bersih
- Automotive
- Premium tetapi mudah digunakan

### Homepage

Struktur:

**Navbar**

Logo Mobil Katte

Home | Katalog | Tentang | Kontak

**Hero**

> Temukan Mobil Bekas Pilihanmu

Search Bar

> Cari mobil, brand atau tipe...

Filter Harga

**Mobil Pilihan**

Card kendaraan

**Mobil Terbaru**

Card kendaraan

**Mengapa Mobil Katte?**

- Informasi kendaraan jelas
- Pilihan mobil beragam
- Harga transparan
- Mudah menghubungi penjual

**Footer**

Mobil Katte  
Katalog Mobil Bekas

Kontak  
WhatsApp  
Alamat  
Social Media

---

# 29. Responsive Design

Website harus optimal di:

### Desktop

- Grid 4 card
- Sidebar filter
- Dashboard admin penuh

### Tablet

- Grid 2–3 card

### Mobile

- Grid 1–2 card
- Filter menggunakan drawer/modal
- Search berada di bagian atas
- Tombol WhatsApp mudah dijangkau

---

# 30. SEO

Setiap kendaraan harus memiliki halaman SEO-friendly.

Contoh:

`mobilkatte.com/mobil/toyota-avanza-1-5-g-2022`

Meta title:

**Toyota Avanza 1.5 G 2022 Rp215 Juta | Mobil Katte**

Meta description:

**Toyota Avanza 1.5 G tahun 2022, pajak aktif, harga Rp215 juta. Lihat foto dan detail kendaraan di Mobil Katte.**

Tambahkan:

- Sitemap
- Robots.txt
- Open Graph
- Schema kendaraan/product jika sesuai
- URL slug yang bersih

---

# 31. Keamanan

Wajib:

- HTTPS
- Password hashing
- Authentication
- Authorization
- Validasi input
- SQL injection protection
- XSS protection
- CSRF protection jika menggunakan cookie/session
- Rate limit login
- Validasi upload gambar
- Pembatasan ukuran file
- Validasi MIME type
- Admin route protection

User publik **tidak memiliki akses CRUD**.

---

# 32. Upload Foto

Rekomendasi:

- JPG
- JPEG
- PNG
- WebP

Ukuran maksimal misalnya:

**5 MB/foto**

Foto otomatis dapat:

- Resize
- Compress
- Generate thumbnail
- WebP conversion

Foto utama digunakan sebagai thumbnail katalog.

---

# 33. Search Experience

Ketika user mengetik:

`Toyota`

Sistem dapat menampilkan:

**Toyota Avanza**

**Toyota Innova**

**Toyota Fortuner**

**Toyota Rush**

User kemudian memilih kendaraan.

Search sebaiknya menggunakan:

- Full-text search sederhana pada MVP.
- Debounce pada frontend.
- Index database pada field pencarian.
- Fuzzy search dapat ditambahkan pada versi berikutnya.

---

# 34. MVP — Versi Pertama

Prioritas pertama:

### Public

- [ ] Homepage
- [ ] Katalog mobil
- [ ] Detail mobil
- [ ] Search kendaraan
- [ ] Filter harga
- [ ] Filter brand
- [ ] Filter tahun
- [ ] Status pajak
- [ ] WhatsApp contact
- [ ] Responsive mobile

### Admin

- [ ] Login
- [ ] Dashboard
- [ ] CRUD mobil
- [ ] CRUD brand
- [ ] Upload foto
- [ ] Status mobil
- [ ] Status pajak
- [ ] Logout

### Database

- [ ] Users
- [ ] Brands
- [ ] Cars
- [ ] Car Images

---

# 35. Fitur Versi 2

Setelah MVP berjalan, dapat ditambahkan:

- Favorit mobil
- Compare mobil
- Login customer
- Simulasi kredit
- Kalkulator cicilan
- Booking test drive
- Form inquiry
- Notifikasi WhatsApp
- Integrasi Google Maps
- Statistik kendaraan paling dilihat
- Statistik inquiry
- Dashboard penjualan
- Multi-admin
- Riwayat perubahan harga
- Riwayat kendaraan terjual
- Export Excel
- Import kendaraan melalui Excel

---

# 36. Fitur Versi 3

Pengembangan lebih lanjut:

- Sistem CRM
- Leads management
- Follow-up customer
- Integrasi marketplace
- Integrasi Facebook/Instagram
- Auto posting kendaraan
- AI untuk membuat deskripsi kendaraan
- Rekomendasi mobil berdasarkan budget
- Perbandingan kendaraan
- Sistem appraisal kendaraan
- Sistem stok showroom
- Laporan penjualan

---

# 37. Acceptance Criteria

Website dianggap memenuhi MVP apabila:

### User

1. User dapat membuka website tanpa login.
2. User dapat melihat katalog mobil.
3. User dapat mencari kendaraan.
4. User dapat mencari berdasarkan brand.
5. User dapat menggunakan filter harga minimum dan maksimum.
6. User dapat memfilter tahun.
7. User dapat melihat status pajak.
8. User dapat membuka detail kendaraan.
9. User dapat melihat foto kendaraan.
10. User dapat menghubungi Mobil Katte.

### Admin

1. Admin dapat login.
2. User tanpa login tidak dapat membuka dashboard admin.
3. Admin dapat menambah mobil.
4. Admin dapat melihat mobil.
5. Admin dapat mengedit mobil.
6. Admin dapat menghapus/menonaktifkan mobil.
7. Admin dapat upload foto.
8. Admin dapat menentukan status pajak.
9. Admin dapat menentukan status kendaraan.
10. Data yang diubah admin langsung tersimpan ke database.

---

# 38. Rekomendasi Tech Stack

Untuk membuat website modern dan mudah dikembangkan:

### Frontend

**Next.js + TypeScript**

### UI

**Tailwind CSS**

### Backend

Bisa menggunakan:

**Next.js API / Node.js**

atau

**Laravel**

### Database

**PostgreSQL**

### Authentication

**Auth.js / Laravel Sanctum**

tergantung backend yang dipilih.

### Storage Foto

- S3-compatible storage
- Cloudinary
- Supabase Storage

### Deployment

Frontend/backend:

- Vercel atau server VPS

Database:

- PostgreSQL managed database

---

# 39. Arsitektur Sederhana

```text
                  USER
                   │
                   ▼
          ┌─────────────────┐
          │   MOBIL KATTE   │
          │  Public Website │
          └────────┬────────┘
                   │
                   ▼
              REST API
                   │
                   ▼
             PostgreSQL
                   ▲
                   │
              Admin API
                   ▲
                   │
          ┌────────┴────────┐
          │  ADMIN LOGIN    │
          │    DASHBOARD    │
          └─────────────────┘
```

---

# 40. Struktur Folder yang Disarankan

```text
mobil-katte/
│
├── app/
│   ├── page
│   ├── mobil/
│   ├── mobil/[slug]/
│   └── admin/
│       ├── login/
│       ├── dashboard/
│       ├── cars/
│       └── brands/
│
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── CarCard
│   ├── SearchBar
│   ├── PriceFilter
│   └── AdminSidebar
│
├── lib/
│   ├── database
│   ├── auth
│   └── storage
│
├── api/
│   ├── cars
│   ├── brands
│   └── admin
│
└── public/
    └── assets/
```

---

# 41. Prioritas Pengembangan

## Phase 1 — Foundation

1. Setup project.
2. Setup database.
3. Setup authentication admin.
4. Buat tabel database.
5. Buat API.

## Phase 2 — Admin

1. Login admin.
2. Dashboard.
3. CRUD brand.
4. CRUD mobil.
5. Upload foto.
6. Status mobil.
7. Status pajak.

## Phase 3 — Public Website

1. Homepage.
2. Katalog.
3. Search.
4. Filter harga.
5. Filter brand.
6. Filter tahun.
7. Detail mobil.
8. WhatsApp.

## Phase 4 — Testing

1. Test login.
2. Test CRUD.
3. Test search.
4. Test filter.
5. Test upload.
6. Test mobile.
7. Test security.
8. Test performance.

## Phase 5 — Launch

1. Domain.
2. HTTPS.
3. Production database.
4. Storage foto.
5. Backup database.
6. Monitoring.
7. SEO.
8. Google Search Console.

---

# 42. Definisi Selesai

MVP Mobil Katte dianggap selesai apabila:

**Public**

`User → Website → Cari Mobil → Filter Harga → Pilih Mobil → Lihat Detail → Hubungi Mobil Katte`

dan

**Admin**

`Admin → Login → Dashboard → Tambah/Edit/Hapus Mobil → Upload Foto → Data tersimpan Database → Data tampil di Website`

Dengan demikian, **user tidak perlu membuat akun sama sekali**, sedangkan seluruh pengelolaan database dilakukan melalui **Admin Dashboard yang terlindungi login**.

---

# 43. Prinsip Utama Produk

**Mobil Katte = katalog mobil bekas yang cepat, sederhana, transparan, dan mudah dihubungi.**

Fokus MVP bukan membuat marketplace yang rumit, tetapi membuat:

**"Orang datang → menemukan mobil → melihat harga & kondisi → tertarik → langsung menghubungi Mobil Katte."**