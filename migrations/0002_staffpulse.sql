-- StaffPulse workspace: per-user company directory + activity.
create table if not exists profiles (
  user_id    text primary key,
  role       text not null default 'admin',
  org_name   text not null default 'Northwind People',
  created_at timestamptz not null default now()
);

create table if not exists employees (
  id          serial primary key,
  user_id     text not null,
  first_name  text not null,
  last_name   text not null,
  title       text not null,
  department  text not null,
  email       text not null,
  location    text not null,
  status      text not null default 'active',
  start_date  date not null default current_date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists employees_user_id_idx on employees (user_id);

create table if not exists activity (
  id         serial primary key,
  user_id    text not null,
  action     text not null,
  detail     text not null,
  created_at timestamptz not null default now()
);
create index if not exists activity_user_id_idx on activity (user_id);
