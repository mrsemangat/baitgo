-- Site settings table for configurable values (pixel ID, GTM, etc.)
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz default now()
);

-- Only admins can manage settings
alter table public.site_settings enable row level security;

create policy "Admins can manage settings" on public.site_settings
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Allow server-side read without auth (for layout.tsx)
create policy "Service role can read settings" on public.site_settings
  for select using (true);

-- Seed default keys
insert into public.site_settings (key, value) values
  ('meta_pixel_id', ''),
  ('gtm_id', ''),
  ('site_name', 'BaitGo')
on conflict (key) do nothing;
