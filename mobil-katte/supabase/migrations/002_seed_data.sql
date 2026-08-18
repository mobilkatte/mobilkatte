-- 002_seed_data.sql
-- Seed awal: brands, 12 mobil, foto, admin, dan settings.
-- Menggantikan seluruh mockupData (CARS/PHOTOS) yang sebelumnya di JS.

insert into public.brands (id, name) values
  (1, 'Toyota'),
  (2, 'Honda'),
  (3, 'Mitsubishi'),
  (4, 'Daihatsu'),
  (5, 'Audi'),
  (6, 'BMW'),
  (7, 'BYD'),
  (8, 'Chery'),
  (9, 'Chevrolet'),
  (10, 'Ford'),
  (11, 'Hyundai'),
  (12, 'Isuzu'),
  (13, 'Jeep'),
  (14, 'Kia'),
  (15, 'Lexus'),
  (16, 'Mazda'),
  (17, 'Mercedes-Benz'),
  (18, 'MG'),
  (19, 'Mini'),
  (20, 'Nissan'),
  (21, 'Porsche'),
  (22, 'Subaru'),
  (23, 'Suzuki'),
  (24, 'Wuling');

insert into public.cars (
  id, slug, brand_id, name, type, year, price, mileage, transmission, fuel,
  color, tax_status, tax_expired_at, condition, location, plate, video_url,
  description, status, featured, created_at
) values
  (1, 'toyota-avanza-1-5-g-2022', 1, 'Avanza', '1.5 G', 2022, 215000000, 35000,
   'Automatic', 'Bensin', 'Hitam', 'Aktif', '15 Desember 2026', 'Bekas', 'Makassar', 'DD 1234 AB',
   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   'Toyota Avanza 1.5 G tahun 2022 dengan pajak aktif. Kondisi interior dan eksterior sangat terawat, masih garansi pabrik, perawatan rutin di bengkel resmi. Surat-surat lengkap dan siap balik nama.',
   'Tersedia', true, '2026-08-10T00:00:00+07:00'),

  (2, 'honda-brio-satya-2021', 2, 'Brio', 'Satya', 2021, 145000000, 42000,
   'Manual', 'Bensin', 'Putih', 'Aktif', '20 Januari 2027', 'Bekas', 'Makassar', 'DD 5678 CD', null,
   'Honda Brio Satya yang irit dan lincah. Cocok untuk penggunaan harian di dalam kota. Mesin halus, AC dingin, ban masih bagus, dan servis berkala selalu tercatat.',
   'Tersedia', true, '2026-08-08T00:00:00+07:00'),

  (3, 'mitsubishi-xpander-ultimate-2023', 3, 'Xpander', 'Ultimate', 2023, 278000000, 21000,
   'Automatic', 'Bensin', 'Silver', 'Aktif', '10 Maret 2027', 'Bekas', 'Makassar', 'DD 9012 EF', null,
   'Mitsubishi Xpander Ultimate dengan fitur lengkap: head unit layar, kamera mundur, dan smart key. Mobil masih dalam kondisi prima dengan kilometer rendah.',
   'Tersedia', true, '2026-08-05T00:00:00+07:00'),

  (4, 'toyota-innova-venturer-2022', 1, 'Innova', 'Venturer', 2022, 385000000, 38000,
   'Automatic', 'Diesel', 'Putih', 'Aktif', '05 Juni 2027', 'Bekas', 'Makassar', 'DD 3456 GH', null,
   'Toyota Innova Venturer diesel, nyaman untuk keluarga dan bisnis. Perawatan berkala rutin, jok kulit bersih, dan mesin diesel yang bertenaga namun tetap irit.',
   'Dipesan', true, '2026-08-02T00:00:00+07:00'),

  (5, 'toyota-fortuner-grx-2021', 1, 'Fortuner', 'GRX', 2021, 498000000, 52000,
   'Automatic', 'Diesel', 'Hitam', 'Aktif', '30 September 2026', 'Bekas', 'Makassar', 'DD 7890 IJ', null,
   'Toyota Fortuner GRX diesel, SUV tangguh untuk segala medan. Mesin bertenaga, suspensi empuk, dan fitur keselamatan lengkap. Pajak masih aktif.',
   'Tersedia', false, '2026-07-28T00:00:00+07:00'),

  (6, 'toyota-rush-trd-2020', 1, 'Rush', 'TRD Sportivo', 2020, 232000000, 61000,
   'Automatic', 'Bensin', 'Abu-abu', 'Tidak Aktif', null, 'Bekas', 'Makassar', 'DD 1122 KL', null,
   'Toyota Rush TRD Sportivo, bodi gagah dengan ground clearance tinggi. Pajak perlu diperpanjang (tidak aktif). Harga sudah disesuaikan. Surat lengkap.',
   'Tersedia', false, '2026-07-22T00:00:00+07:00'),

  (7, 'honda-civic-turbo-rs-2019', 2, 'Civic', 'Turbo RS', 2019, 325000000, 70000,
   'CVT', 'Bensin', 'Merah', 'Aktif', '12 November 2026', 'Bekas', 'Makassar', 'DD 3344 MN', null,
   'Honda Civic Turbo RS, sedan sporty dengan performa mesin turbo yang responsif. Interior premium, audio bagus, dan perawatan terjaga.',
   'Terjual', false, '2026-07-15T00:00:00+07:00'),

  (8, 'honda-city-rs-2020', 2, 'City', 'RS', 2020, 218000000, 45000,
   'CVT', 'Bensin', 'Hitam', 'Aktif', '18 Agustus 2026', 'Bekas', 'Makassar', 'DD 5566 OP', null,
   'Honda City RS dengan tampilan sporty dan irit bahan bakar. Cocok untuk mobilitas harian maupun perjalanan luar kota.',
   'Tersedia', false, '2026-07-10T00:00:00+07:00'),

  (9, 'honda-jazz-rs-2018', 2, 'Jazz', 'RS', 2018, 178000000, 78000,
   'CVT', 'Bensin', 'Putih', 'Aktif', '22 Februari 2027', 'Bekas', 'Makassar', 'DD 7788 QR', null,
   'Honda Jazz RS hatchback yang lincah dan praktis. Bagasi luas ala magic seat, perawatan mudah, dan suku cadang melimpah.',
   'Tersedia', false, '2026-07-02T00:00:00+07:00'),

  (10, 'toyota-avanza-veloz-2024', 1, 'Avanza', 'Veloz', 2024, 248000000, 12000,
   'Automatic', 'Bensin', 'Silver', 'Aktif', '08 Mei 2027', 'Bekas', 'Makassar', 'DD 9900 ST', null,
   'Toyota Avanza Veloz terbaru dengan desain modern dan fitur keselamatan lengkap. Kilometer sangat rendah, masih seperti baru.',
   'Tersedia', false, '2026-06-28T00:00:00+07:00'),

  (11, 'dacia-duster-1-6-2020', 4, 'Duster', '1.6 X-Point', 2020, 168000000, 56000,
   'Manual', 'Bensin', 'Orange', 'Aktif', '14 Juli 2026', 'Bekas', 'Makassar', 'DD 1213 UV', null,
   'SUV compact yang tangguh dengan harga terjangkau. Ground clearance tinggi, mesin bandel, dan konsumsi BBM cukup irit.',
   'Tersedia', false, '2026-06-20T00:00:00+07:00'),

  (12, 'honda-crv-turbo-2023', 2, 'CR-V', '1.5 Turbo Prestige', 2023, 528000000, 18000,
   'CVT', 'Bensin', 'Hitam', 'Aktif', '25 April 2027', 'Bekas', 'Makassar', 'DD 1415 WX', null,
   'Honda CR-V Turbo Prestige, SUV premium dengan kabin luas dan fitur Honda Sensing. Kondisi mulus, pajak aktif, garansi masih berlaku.',
   'Tersedia', false, '2026-06-12T00:00:00+07:00');

insert into public.car_photos (car_id, photo_url, sort_order)
select c.id, p.url, p.ord
from (
  values
    ('toyota-avanza-1-5-g-2022', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=70', 0),
    ('toyota-avanza-1-5-g-2022', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70', 1),
    ('toyota-avanza-1-5-g-2022', 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70', 2),
    ('toyota-avanza-1-5-g-2022', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70', 3),
    ('toyota-avanza-1-5-g-2022', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70', 4),
    ('honda-brio-satya-2021', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=70', 0),
    ('honda-brio-satya-2021', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70', 1),
    ('honda-brio-satya-2021', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70', 2),
    ('mitsubishi-xpander-ultimate-2023', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=70', 0),
    ('mitsubishi-xpander-ultimate-2023', 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70', 1),
    ('mitsubishi-xpander-ultimate-2023', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70', 2),
    ('toyota-innova-venturer-2022', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=70', 0),
    ('toyota-innova-venturer-2022', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70', 1),
    ('toyota-innova-venturer-2022', 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70', 2),
    ('toyota-fortuner-grx-2021', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=70', 0),
    ('toyota-fortuner-grx-2021', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70', 1),
    ('toyota-fortuner-grx-2021', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70', 2),
    ('toyota-rush-trd-2020', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=70', 0),
    ('toyota-rush-trd-2020', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70', 1),
    ('honda-civic-turbo-rs-2019', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=70', 0),
    ('honda-civic-turbo-rs-2019', 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70', 1),
    ('honda-city-rs-2020', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=70', 0),
    ('honda-city-rs-2020', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70', 1),
    ('honda-jazz-rs-2018', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=70', 0),
    ('honda-jazz-rs-2018', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70', 1),
    ('toyota-avanza-veloz-2024', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=900&q=70', 0),
    ('toyota-avanza-veloz-2024', 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&q=70', 1),
    ('toyota-avanza-veloz-2024', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=70', 2),
    ('dacia-duster-1-6-2020', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=70', 0),
    ('dacia-duster-1-6-2020', 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=900&q=70', 1),
    ('honda-crv-turbo-2023', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=70', 0),
    ('honda-crv-turbo-2023', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=70', 1)
) as p(slug, url, ord)
join public.cars c on c.slug = p.slug;

-- Admin demo (password: admin123)
insert into public.admins (email, password_hash, name) values
  ('admin@mobilkatte.com', 'acd3bf24958fd53321deb122fcde621d3f1b0f2fd27e212330f449eab2d0b20d', 'Administrator');

-- Settings aplikasi
insert into public.settings (key, value) values
  ('wa_number', '6281234567890'),
  ('admin_email', 'admin@mobilkatte.com');

-- Sinkronkan identity sequence (id dimasukkan eksplisit, sequence tidak ikut naik).
select setval(pg_get_serial_sequence('public.brands', 'id'), (select coalesce(max(id), 1) from public.brands));
select setval(pg_get_serial_sequence('public.cars', 'id'), (select coalesce(max(id), 1) from public.cars));
select setval(pg_get_serial_sequence('public.car_photos', 'id'), (select coalesce(max(id), 1) from public.car_photos));
select setval(pg_get_serial_sequence('public.admins', 'id'), (select coalesce(max(id), 1) from public.admins));