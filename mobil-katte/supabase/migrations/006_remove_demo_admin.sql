-- 006_remove_demo_admin.sql
-- Hapus akun admin demo (admin@mobilkatte.com) dari database.
-- Akun admin baru bisa ditambahkan via SQL editor (tabel public.admins).
delete from public.admins where email = 'admin@mobilkatte.com';
delete from public.settings where key = 'admin_email' and value = 'admin@mobilkatte.com';