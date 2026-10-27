-- Таблица заявок формы «Стать тренером» (курс переподготовки / сертификации).
-- Запусти в Supabase → SQL Editor (один раз).

create table if not exists public.coach_applications (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  last_name   text,
  phone       text not null,
  email       text not null,
  education    text,          -- higher | college | school
  question    text,
  created_at  timestamptz not null default now()
);

create index if not exists coach_applications_created_at_idx
  on public.coach_applications (created_at desc);

-- Безопасность: включаем RLS и НЕ добавляем политик для anon/authenticated.
-- Сервер пишет service_role-ключом, который обходит RLS, поэтому запись
-- работает только из нашего server/api, а публичного доступа к данным нет.
alter table public.coach_applications enable row level security;
