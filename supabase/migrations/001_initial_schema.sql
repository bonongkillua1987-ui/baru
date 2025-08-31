
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  full_name text not null,
  company_name text,
  role text not null default 'Member' check (role in ('Admin', 'Member')),
  permissions text[],
  created_at timestamp with time zone default now()
);

-- Clients table
create table clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  since timestamp with time zone default now(),
  instagram text,
  status text not null default 'Active',
  client_type text not null default 'Individual',
  last_contact timestamp with time zone default now(),
  portal_access_id text unique not null default uuid_generate_v4()::text,
  created_at timestamp with time zone default now()
);

-- Projects table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  client_id uuid references clients(id) on delete cascade,
  status text not null default 'Planning',
  project_type text not null,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  total_value numeric(10,2) default 0,
  created_at timestamp with time zone default now()
);

-- Packages table
create table packages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric(10,2) not null,
  category text not null,
  physical_items jsonb default '[]',
  digital_items text[] default '{}',
  processing_time text,
  default_printing_cost numeric(10,2),
  default_transport_cost numeric(10,2),
  photographers text,
  videographers text,
  cover_image text,
  created_at timestamp with time zone default now()
);

-- Leads table
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  contact_channel text not null,
  location text not null,
  status text not null default 'New',
  date timestamp with time zone default now(),
  notes text,
  whatsapp text,
  created_at timestamp with time zone default now()
);

-- Transactions table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  amount numeric(10,2) not null,
  transaction_type text not null,
  status text not null default 'Pending',
  date timestamp with time zone default now(),
  description text,
  created_at timestamp with time zone default now()
);

-- Team members table
create table team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null,
  phone text,
  role text not null,
  specialization text,
  hourly_rate numeric(10,2),
  portal_access_id text unique not null default uuid_generate_v4()::text,
  created_at timestamp with time zone default now()
);

-- Assets table
create table assets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  purchase_date timestamp with time zone default now(),
  purchase_price numeric(10,2) not null,
  serial_number text,
  status text not null default 'Available',
  notes text,
  created_at timestamp with time zone default now()
);

-- Client Feedback table
create table client_feedback (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references clients(id) on delete cascade,
  client_name text not null,
  satisfaction text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  feedback text not null,
  date timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Contracts table
create table contracts (
  id uuid default uuid_generate_v4() primary key,
  contract_number text unique not null,
  client_id uuid references clients(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  signing_date timestamp with time zone not null,
  signing_location text not null,
  client_name1 text not null,
  client_address1 text not null,
  client_phone1 text not null,
  client_name2 text,
  client_address2 text,
  client_phone2 text,
  shooting_duration text not null,
  guaranteed_photos text not null,
  album_details text not null,
  digital_files_format text not null,
  other_items text,
  personnel_count text not null,
  delivery_timeframe text not null,
  dp_date timestamp with time zone not null,
  final_payment_date timestamp with time zone not null,
  cancellation_policy text not null,
  jurisdiction text not null,
  vendor_signature text,
  client_signature text,
  created_at timestamp with time zone default now()
);

-- Promo Codes table
create table promo_codes (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(10,2) not null,
  is_active boolean default true,
  usage_count integer default 0,
  max_usage integer,
  expiry_date timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- SOPs table
create table sops (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  content text not null,
  last_updated timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Social Media Posts table
create table social_media_posts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  client_name text not null,
  post_type text not null,
  platform text not null,
  scheduled_date timestamp with time zone not null,
  caption text not null,
  media_url text,
  status text not null default 'Draft',
  notes text,
  created_at timestamp with time zone default now()
);

-- Add-ons table
create table add_ons (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric(10,2) not null,
  created_at timestamp with time zone default now()
);

-- Financial Pockets table
create table financial_pockets (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  icon text not null,
  pocket_type text not null,
  amount numeric(10,2) default 0,
  goal_amount numeric(10,2),
  lock_end_date timestamp with time zone,
  source_card_id text,
  created_at timestamp with time zone default now()
);

-- Cards table
create table cards (
  id uuid default uuid_generate_v4() primary key,
  card_holder_name text not null,
  bank_name text not null,
  card_type text not null,
  last_four_digits text not null,
  expiry_date text,
  balance numeric(10,2) default 0,
  color_gradient text not null,
  created_at timestamp with time zone default now()
);

-- Team Project Payments table
create table team_project_payments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade,
  team_member_name text not null,
  team_member_id uuid references team_members(id) on delete cascade,
  date timestamp with time zone default now(),
  status text not null default 'Unpaid',
  fee numeric(10,2) not null,
  reward numeric(10,2),
  created_at timestamp with time zone default now()
);

-- Notifications table
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  timestamp timestamp with time zone default now(),
  is_read boolean default false,
  icon text not null,
  link_view text,
  link_action jsonb,
  created_at timestamp with time zone default now()
);

-- Profile/Settings table
create table profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  company_name text not null,
  owner_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  website text,
  instagram text,
  bank_account_name text,
  bank_name text,
  bank_account_number text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table users enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table packages enable row level security;
alter table leads enable row level security;
alter table transactions enable row level security;
alter table team_members enable row level security;
alter table assets enable row level security;
alter table client_feedback enable row level security;
alter table contracts enable row level security;
alter table promo_codes enable row level security;
alter table sops enable row level security;
alter table social_media_posts enable row level security;
alter table add_ons enable row level security;
alter table financial_pockets enable row level security;
alter table cards enable row level security;
alter table team_project_payments enable row level security;
alter table notifications enable row level security;
alter table profiles enable row level security;

-- Create policies for authenticated users
create policy "Users can view all data when authenticated" on users for select using (auth.role() = 'authenticated');
create policy "Users can view all clients when authenticated" on clients for all using (auth.role() = 'authenticated');
create policy "Users can view all projects when authenticated" on projects for all using (auth.role() = 'authenticated');
create policy "Users can view all packages when authenticated" on packages for all using (auth.role() = 'authenticated');
create policy "Users can view all leads when authenticated" on leads for all using (auth.role() = 'authenticated');
create policy "Users can view all transactions when authenticated" on transactions for all using (auth.role() = 'authenticated');
create policy "Users can view all team members when authenticated" on team_members for all using (auth.role() = 'authenticated');
create policy "Users can view all assets when authenticated" on assets for all using (auth.role() = 'authenticated');
create policy "Users can view all client_feedback when authenticated" on client_feedback for all using (auth.role() = 'authenticated');
create policy "Users can view all contracts when authenticated" on contracts for all using (auth.role() = 'authenticated');
create policy "Users can view all promo_codes when authenticated" on promo_codes for all using (auth.role() = 'authenticated');
create policy "Users can view all sops when authenticated" on sops for all using (auth.role() = 'authenticated');
create policy "Users can view all social_media_posts when authenticated" on social_media_posts for all using (auth.role() = 'authenticated');
create policy "Users can view all add_ons when authenticated" on add_ons for all using (auth.role() = 'authenticated');
create policy "Users can view all financial_pockets when authenticated" on financial_pockets for all using (auth.role() = 'authenticated');
create policy "Users can view all cards when authenticated" on cards for all using (auth.role() = 'authenticated');
create policy "Users can view all team_project_payments when authenticated" on team_project_payments for all using (auth.role() = 'authenticated');
create policy "Users can view all notifications when authenticated" on notifications for all using (auth.role() = 'authenticated');
create policy "Users can view all profiles when authenticated" on profiles for all using (auth.role() = 'authenticated');

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, company_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'company_name',
    coalesce(new.raw_user_meta_data->>'role', 'Member')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
