-- Bright Way Dental Clinic — booking requests
-- Run once in the Supabase SQL editor (Project → SQL Editor → New query).
-- The public website may only INSERT a pending request. It can never read,
-- update, or delete rows: no SELECT/UPDATE/DELETE policy is defined, so RLS
-- denies those for the anon role by default.

create extension if not exists pgcrypto;

create table if not exists public.appointments (
  id             uuid        primary key default gen_random_uuid(),
  created_at     timestamptz not null    default now(),
  full_name      text        not null    check (char_length(btrim(full_name)) between 2 and 120),
  phone          text        not null    check (char_length(btrim(phone)) between 5 and 40),
  email          text        not null    check (position('@' in email) > 1 and char_length(email) <= 200),
  treatment      text        not null    check (treatment in (
                   'general','cosmetic','implants','orthodontics','whitening',
                   'rootCanal','pediatric','emergency','other')),
  preferred_date date,
  preferred_time text        not null    default 'any'
                                         check (preferred_time in ('any','morning','afternoon','evening')),
  message        text                    check (message is null or char_length(message) <= 2000),
  locale         text        not null    default 'en' check (locale in ('en','ar')),
  status         text        not null    default 'pending'
                                         check (status in ('pending','confirmed','cancelled'))
);

create index if not exists appointments_created_at_idx on public.appointments (created_at desc);
create index if not exists appointments_status_idx     on public.appointments (status);

alter table public.appointments enable row level security;

-- Public site: INSERT only, and only as a pending en/ar request.
drop policy if exists "public can request an appointment" on public.appointments;
create policy "public can request an appointment"
  on public.appointments
  for insert
  to anon
  with check (status = 'pending' and locale in ('en','ar'));

-- No SELECT / UPDATE / DELETE policy is intentional. Clinic staff read and
-- manage rows from the Supabase dashboard (service role), never from the browser.
