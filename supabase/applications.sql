-- Таблица заявок формы «Запишись в команду».
-- Запусти в Supabase → SQL Editor (один раз) для нового проекта AFF.

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  last_name   text,
  phone       text not null,
  age         text,
  direction   text,          -- kids | students | clubs
  format      text,          -- flag | tackle
  question    text,
  created_at  timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

-- Безопасность: включаем RLS и НЕ добавляем политик для anon/authenticated.
-- Сервер пишет service_role-ключом, который обходит RLS, поэтому запись
-- работает только из нашего server/api, а публичного доступа к данным нет.
alter table public.applications enable row level security;
