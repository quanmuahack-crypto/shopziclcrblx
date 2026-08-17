-- ShopZiCiCRBLX backend for Supabase
-- Run this file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer','admin');
create type public.deposit_status as enum ('pending','approved','rejected');
create type public.order_status as enum ('pending','working','completed','cancelled');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  email text,
  role public.user_role not null default 'customer',
  balance bigint not null default 0 check (balance >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.deposits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  card_type text not null,
  amount bigint not null check (amount > 0),
  serial text not null,
  card_code text not null,
  status public.deposit_status not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  service_name text not null,
  package_name text not null,
  price bigint not null check (price > 0),
  game_username text,
  game_password text,
  extra_data text,
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.balance_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount bigint not null,
  balance_after bigint not null,
  type text not null,
  note text,
  reference_id uuid,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  icon text,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  name text not null,
  price bigint not null check (price > 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(coalesce(new.email,''),'@',1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- The current shop uses username-auth instead of Supabase Auth on the browser.
-- This RPC is intentionally limited to creating a PENDING deposit only.
-- It cannot approve a deposit or change any balance. Admin approval remains
-- protected by admin_review_deposit().
create or replace function public.submit_deposit_request(
  p_user_id uuid,
  p_card_type text,
  p_amount bigint,
  p_serial text,
  p_card_code text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if not exists (select 1 from public.profiles where id = p_user_id) then
    raise exception 'user_not_found';
  end if;

  if p_amount <= 0 then
    raise exception 'invalid_amount';
  end if;

  if length(trim(coalesce(p_serial,''))) = 0
     or length(trim(coalesce(p_card_code,''))) = 0 then
    raise exception 'missing_card_data';
  end if;

  insert into public.deposits(user_id, card_type, amount, serial, card_code, status)
  values (p_user_id, trim(p_card_type), p_amount, trim(p_serial), trim(p_card_code), 'pending')
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_deposit_request(uuid,text,bigint,text,text) from public;
grant execute on function public.submit_deposit_request(uuid,text,bigint,text,text) to anon, authenticated;

authority definer

create or replace function public.admin_adjust_balance(
  p_user_id uuid,
  p_amount bigint,
  p_note text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance bigint;
  v_new_balance bigint;
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  select balance into v_balance
  from public.profiles
  where id = p_user_id
  for update;

  if v_balance is null then
    raise exception 'user_not_found';
  end if;

  v_new_balance := v_balance + p_amount;
  if v_new_balance < 0 then
    raise exception 'insufficient_balance';
  end if;

  update public.profiles
  set balance = v_new_balance
  where id = p_user_id;

  insert into public.balance_transactions(user_id, amount, balance_after, type, note, created_by)
  values (p_user_id, p_amount, v_new_balance, 'admin_adjustment', p_note, auth.uid());

  return v_new_balance;
end;
$$;

grant execute on function public.admin_adjust_balance(uuid,bigint,text) to authenticated;

create or replace function public.admin_review_deposit(
  p_deposit_id uuid,
  p_approve boolean,
  p_reason text default null
)
returns public.deposit_status
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deposit public.deposits%rowtype;
  v_new_balance bigint;
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  select * into v_deposit
  from public.deposits
  where id = p_deposit_id
  for update;

  if v_deposit.id is null then
    raise exception 'deposit_not_found';
  end if;

  if v_deposit.status <> 'pending' then
    return v_deposit.status;
  end if;

  if p_approve then
    update public.profiles
    set balance = balance + v_deposit.amount
    where id = v_deposit.user_id
    returning balance into v_new_balance;

    insert into public.balance_transactions(user_id, amount, balance_after, type, note, reference_id, created_by)
    values (v_deposit.user_id, v_deposit.amount, v_new_balance, 'card_deposit', 'Duyệt thẻ cào', v_deposit.id, auth.uid());

    update public.deposits
    set status = 'approved', reviewed_by = auth.uid(), reviewed_at = now()
    where id = v_deposit.id;

    return 'approved';
  else
    update public.deposits
    set status = 'rejected', reviewed_by = auth.uid(), reviewed_at = now(), rejection_reason = p_reason
    where id = v_deposit.id;

    return 'rejected';
  end if;
end;
$$;

grant execute on function public.admin_review_deposit(uuid,boolean,text) to authenticated;

create or replace function public.admin_set_order_status(
  p_order_id uuid,
  p_status public.order_status
)
returns public.order_status
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not_admin';
  end if;

  update public.orders
  set status = p_status, updated_at = now()
  where id = p_order_id;

  return p_status;
end;
$$;

grant execute on function public.admin_set_order_status(uuid,public.order_status) to authenticated;

alter table public.profiles enable row level security;
alter table public.deposits enable row level security;
alter table public.orders enable row level security;
alter table public.balance_transactions enable row level security;
alter table public.services enable row level security;
alter table public.service_packages enable row level security;

drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists deposits_self_insert on public.deposits;
create policy deposits_self_insert on public.deposits
for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists deposits_self_select on public.deposits;
create policy deposits_self_select on public.deposits
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists orders_self_select on public.orders;
create policy orders_self_select on public.orders
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists balance_transactions_self_select on public.balance_transactions;
create policy balance_transactions_self_select on public.balance_transactions
for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists services_public_select on public.services;
create policy services_public_select on public.services
for select to anon, authenticated
using (active = true or public.is_admin());

drop policy if exists service_packages_public_select on public.service_packages;
create policy service_packages_public_select on public.service_packages
for select to anon, authenticated
using (active = true or public.is_admin());

-- IMPORTANT: after creating your account, promote only your own admin account:
-- update public.profiles set role='admin' where email='YOUR_ADMIN_EMAIL';
