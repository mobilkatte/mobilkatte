-- 003_rls_policies.sql
-- Row Level Security.
-- API menggunakan service role key sehingga menembus RLS (bypass).
-- Policy berikut hanya sebagai lapisan keamanan tambahan untuk akses publik.

alter table public.brands enable row level security;
alter table public.cars enable row level security;
alter table public.car_photos enable row level security;
alter table public.admins enable row level security;
alter table public.settings enable row level security;

-- Baca publik
create policy "brands public select"
  on public.brands for select to anon, authenticated using (true);

create policy "cars public select"
  on public.cars for select to anon, authenticated using (deleted_at is null);

create policy "car_photos public select"
  on public.car_photos for select to anon, authenticated using (true);

create policy "settings public select"
  on public.settings for select to anon, authenticated using (true);

-- Tidak ada policy INSERT/UPDATE/DELETE publik:
-- hanya service role yang dapat menulis data.