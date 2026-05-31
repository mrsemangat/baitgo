-- BaitGo Database Schema
-- Run this on your Supabase project

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  city text,
  departure_date date,
  plan text default 'free' check (plan in ('free', 'premium')),
  premium_activated_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- DOA FAVORITES
-- =============================================
create table public.doa_favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  doa_id text not null,
  created_at timestamptz default now(),
  unique(user_id, doa_id)
);

alter table public.doa_favorites enable row level security;

create policy "Users can manage own favorites" on public.doa_favorites
  for all using (auth.uid() = user_id);

-- =============================================
-- IBADAH PROGRESS (tawaf/sa'i counter state)
-- =============================================
create table public.ibadah_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  tahap_id text not null,
  counter_value int default 0,
  completed boolean default false,
  completed_at timestamptz,
  notes text,
  updated_at timestamptz default now(),
  unique(user_id, tahap_id)
);

alter table public.ibadah_progress enable row level security;

create policy "Users can manage own ibadah progress" on public.ibadah_progress
  for all using (auth.uid() = user_id);

-- =============================================
-- CHECKLIST ITEMS
-- =============================================
create table public.checklist_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  item_id text not null,
  checked boolean default false,
  checked_at timestamptz,
  unique(user_id, item_id)
);

alter table public.checklist_progress enable row level security;

create policy "Users can manage own checklist" on public.checklist_progress
  for all using (auth.uid() = user_id);

-- =============================================
-- ITINERARY
-- =============================================
create table public.itineraries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null default 'Itinerary Umroh Saya',
  template_id text,
  days jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.itineraries enable row level security;

create policy "Users can manage own itineraries" on public.itineraries
  for all using (auth.uid() = user_id);

-- =============================================
-- COST ESTIMATES (saved calculations)
-- =============================================
create table public.cost_estimates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text default 'Estimasi Biaya',
  config jsonb not null,
  result jsonb not null,
  created_at timestamptz default now()
);

alter table public.cost_estimates enable row level security;

create policy "Users can manage own estimates" on public.cost_estimates
  for all using (auth.uid() = user_id);

-- =============================================
-- TRAVEL NOTES
-- =============================================
create table public.travel_notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  content text,
  flight_number text,
  hotel_makkah text,
  hotel_madinah text,
  travel_agent text,
  emergency_contact text,
  updated_at timestamptz default now()
);

alter table public.travel_notes enable row level security;

create policy "Users can manage own notes" on public.travel_notes
  for all using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function update_updated_at();
create trigger itineraries_updated_at before update on public.itineraries
  for each row execute function update_updated_at();
create trigger notes_updated_at before update on public.travel_notes
  for each row execute function update_updated_at();
