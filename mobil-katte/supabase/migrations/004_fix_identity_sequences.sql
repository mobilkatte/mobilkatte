-- 004_fix_identity_sequences.sql
-- Migrasi perbaikan: sinkronkan identity sequence setelah seed dengan id eksplisit
-- (lihat 002). Tanpa ini, INSERT baru akan bentrok "duplicate key ... cars_pkey".
select setval(pg_get_serial_sequence('public.brands', 'id'), (select coalesce(max(id), 1) from public.brands));
select setval(pg_get_serial_sequence('public.cars', 'id'), (select coalesce(max(id), 1) from public.cars));
select setval(pg_get_serial_sequence('public.car_photos', 'id'), (select coalesce(max(id), 1) from public.car_photos));
select setval(pg_get_serial_sequence('public.admins', 'id'), (select coalesce(max(id), 1) from public.admins));