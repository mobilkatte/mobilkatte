-- 005_settings_content.sql
-- Seed nilai default pengaturan konten (Tentang Kami, Kontak, WhatsApp).
-- Dipakai halaman admin /admin/settings dan situs publik.

insert into public.settings (key, value) values
  ('wa_number', '6281234567890'),
  ('contact_phone', '+62 812-3456-7890'),
  ('contact_address', 'Jl. Mobil Katte No. 88, Makassar'),
  ('about_kicker', 'Kenapa Kami'),
  ('about_title', 'Mengapa Mobil Katte?'),
  ('about_subtitle', 'Kami membuat jual beli mobil bekas jadi mudah, jelas, dan terpercaya.'),
  ('about_description', 'Katalog mobil bekas yang cepat, sederhana, transparan, dan mudah dihubungi. Temukan mobil bekas berkualitas dengan informasi kendaraan yang jelas.'),
  ('about_card1_title', 'Informasi Jelas'),
  ('about_card1_desc', 'Setiap mobil dilengkapi data lengkap: tahun, pajak, kilometer, hingga kondisi kendaraan.'),
  ('about_card2_title', 'Pilihan Beragam'),
  ('about_card2_desc', 'Ratusan mobil dari 12+ brand ternama dengan berbagai tipe dan rentang harga.'),
  ('about_card3_title', 'Harga Transparan'),
  ('about_card3_desc', 'Harga tertera jelas di setiap unit. Tanpa biaya tersembunyi, apa adanya.'),
  ('about_card4_title', 'Mudah Dihubungi'),
  ('about_card4_desc', 'Hubungi kami langsung lewat WhatsApp dengan satu klik dari halaman mobil.')
on conflict (key) do nothing;