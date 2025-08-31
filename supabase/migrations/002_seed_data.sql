
-- Seed data untuk semua tabel
-- Disable RLS untuk sementara selama seeding
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;

-- Insert Users
INSERT INTO users (id, email, full_name, company_name, role, permissions) VALUES
('USR001', 'admin@vena.pictures', 'Andi Vena', 'Vena Pictures', 'Admin', NULL),
('USR002', 'member@vena.pictures', 'Rina Asisten', 'Vena Pictures', 'Member', ARRAY['Manajemen Klien', 'Proyek', 'Kalender', 'Perencana Media Sosial']);

-- Insert Clients
INSERT INTO clients (id, name, email, phone, whatsapp, instagram, status, client_type, last_contact, portal_access_id, since) VALUES
('CLI001', 'Budi & Sinta', 'budi.sinta@email.com', '081234567890', '6281234567890', '@budi.sinta.wedding', 'Active', 'Individual', NOW() - INTERVAL '5 days', 'portal-budi-sinta-1a2b', '2023-05-15'),
('CLI002', 'PT Sejahtera Abadi', 'hrd@sejahtera.co.id', '021-555-0123', '62215550123', NULL, 'Active', 'Company', NOW() - INTERVAL '60 days', 'portal-sejahtera-abadi-3c4d', '2023-02-20'),
('CLI004', 'Dewi & Rian', 'dewi.rian@email.com', '081298765432', '6281298765432', NULL, 'Active', 'Individual', NOW(), 'portal-dewi-rian-7g8h', NOW() - INTERVAL '10 days'),
('CLI005', 'Farhan & Aisyah', 'farhan.aisyah@email.com', '085712345678', '6285712345678', NULL, 'Active', 'Individual', NOW() - INTERVAL '2 days', 'portal-farhan-aisyah-9i0j', '2023-08-01'),
('CLI006', 'Agung & Bella (The Senjaya)', 'agung.senjaya@email.com', '081333444555', '6281333444555', '@thesenjayastory', 'Active', 'Individual', NOW() - INTERVAL '1 day', 'portal-agung-bella-1k2l', '2023-09-20'),
('CLI007', 'Rina & Doni', 'rina.doni@email.com', '081212123434', '6281212123434', NULL, 'Active', 'Individual', NOW(), 'portal-rina-doni-3k4l', NOW() - INTERVAL '3 days'),
('CLI008', 'CV Maju Jaya', 'marketing@majujaya.com', '031-888-999', '6231888999', NULL, 'Inactive', 'Company', NOW() - INTERVAL '90 days', 'portal-majujaya-5m6n', '2023-11-10'),
('CLI009', 'Kevin & Laura', 'kevin.laura@email.com', '081812341234', '6281812341234', NULL, 'Lost', 'Individual', NOW() - INTERVAL '40 days', 'portal-kevinlaura-7o8p', '2023-10-05');

-- Insert Packages
INSERT INTO packages (id, name, price, category, physical_items, digital_items, processing_time, default_printing_cost, default_transport_cost, photographers, videographers) VALUES
('PKG001', 'Paket Pernikahan Silver', 12000000, 'Pernikahan', 
 '[{"name": "Album Cetak Eksklusif 20x30cm 20 Halaman", "price": 850000}, {"name": "Cetak Foto 16R + Bingkai Minimalis (2pcs)", "price": 400000}]',
 ARRAY['Semua file foto (JPG) hasil seleksi', '1 Video highlight (3-5 menit)'],
 '30 hari kerja', 850000, 500000, '2 Fotografer', '1 Videografer'),
('PKG002', 'Paket Pernikahan Gold', 25000000, 'Pernikahan',
 '[{"name": "Album Cetak Premium 25x30cm 30 Halaman", "price": 1500000}, {"name": "Cetak Foto 20R + Bingkai Premium (2pcs)", "price": 750000}, {"name": "Box Kayu Eksklusif + Flashdisk 64GB", "price": 500000}]',
 ARRAY['Semua file foto (JPG) tanpa seleksi', '1 Video sinematik (5-7 menit)', 'Video Teaser 1 menit untuk sosmed'],
 '45 hari kerja', 1500000, 1000000, '2 Fotografer', '2 Videografer'),
('PKG003', 'Paket Acara Korporat', 8000000, 'Korporat',
 '[]',
 ARRAY['Dokumentasi foto (JPG)', '1 Video dokumentasi (10-15 menit)'],
 '14 hari kerja', 0, 300000, '1 Fotografer', '1 Videografer'),
('PKG004', 'Paket Lamaran', 5000000, 'Lamaran',
 '[]',
 ARRAY['Semua file foto (JPG) hasil seleksi', '1 Video highlight (1-2 menit)'],
 '14 hari kerja', 0, 200000, '1 Fotografer', NULL),
('PKG005', 'Paket Prewedding', 6500000, 'Prewedding',
 '[{"name": "Cetak Foto Kanvas 40x60cm", "price": 600000}]',
 ARRAY['50 foto edit high-resolution', '1 video sinematik 1 menit'],
 '21 hari kerja', 600000, 400000, '1 Fotografer', '1 Videografer');

-- Insert Projects
INSERT INTO projects (id, name, client_id, status, project_type, start_date, end_date, total_value) VALUES
('PRJ001', 'Pernikahan Budi & Sinta', 'CLI001', 'Editing', 'Pernikahan', NOW() + INTERVAL '30 days', NOW() + INTERVAL '60 days', 13500000),
('PRJ002', 'Gathering Tahunan PT SA', 'CLI002', 'Selesai', 'Korporat', NOW() - INTERVAL '60 days', NOW() - INTERVAL '46 days', 8000000),
('PRJ004', 'Lamaran Dewi & Rian', 'CLI004', 'Dikonfirmasi', 'Lamaran', NOW() + INTERVAL '7 days', NOW() + INTERVAL '21 days', 5000000),
('PRJ005', 'Akad Nikah Farhan & Aisyah', 'CLI005', 'Revisi', 'Pernikahan', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', 13000000),
('PRJ007', 'Resepsi Agung & Bella (The Senjaya)', 'CLI006', 'Cetak', 'Pernikahan', NOW() - INTERVAL '45 days', NOW(), 25650000),
('PRJ008', 'Lamaran Rina & Doni', 'CLI007', 'Persiapan', 'Lamaran', NOW() + INTERVAL '20 days', NOW() + INTERVAL '34 days', 5000000),
('PRJ009', 'Product Shoot CV Maju Jaya', 'CLI008', 'Selesai', 'Produk', NOW() - INTERVAL '80 days', NOW() - INTERVAL '70 days', 7500000),
('PRJ010', 'Prewedding Kevin & Laura', 'CLI009', 'Dibatalkan', 'Prewedding', NOW() - INTERVAL '50 days', NOW() - INTERVAL '29 days', 8000000),
('PRJ011', 'Resepsi Budi & Sinta (Dibatalkan)', 'CLI001', 'Dibatalkan', 'Pernikahan', NOW() + INTERVAL '90 days', NOW() + INTERVAL '135 days', 25000000);

-- Insert Leads
INSERT INTO leads (id, name, contact_channel, location, status, date, notes, whatsapp) VALUES
('LEAD001', 'Calon Klien - Erika', 'Instagram', 'Surabaya', 'New', NOW(), 'Menanyakan paket prewedding untuk bulan Desember.', NULL),
('LEAD002', 'Bapak Hendra (Korporat)', 'Website', 'Jakarta', 'New', NOW() - INTERVAL '5 days', 'Butuh penawaran resmi untuk acara ulang tahun perusahaan.', NULL),
('LEAD003', 'Dewi & Rian', 'Website', 'Yogyakarta', 'New', NOW() - INTERVAL '11 days', 'Dikonversi secara otomatis dari formulir pemesanan publik. Proyek: Lamaran Dewi & Rian. Klien ID: CLI004', NULL),
('LEAD004', 'Rina & Doni', 'Instagram', 'Depok', 'New', NOW() - INTERVAL '4 days', 'Dikonversi secara otomatis dari formulir pemesanan publik. Proyek: Lamaran Rina & Doni. Klien ID: CLI007', NULL),
('LEAD005', 'Kevin & Laura', 'Referensi', 'Bromo', 'New', NOW() - INTERVAL '56 days', 'Dikonversi. Proyek: Prewedding Kevin & Laura. Klien ID: CLI009', NULL),
('LEAD006', 'Sarah (Wedding Planner)', 'Telepon', 'Bali', 'New', NOW() - INTERVAL '15 days', 'Sudah dapat vendor lain yang lebih murah.', NULL);

-- Insert Transactions
INSERT INTO transactions (id, project_id, client_id, amount, transaction_type, status, date, description) VALUES
('TRN001', 'PRJ001', 'CLI001', 6750000, 'Income', 'Pending', NOW() - INTERVAL '25 days', 'DP Proyek Pernikahan Budi & Sinta'),
('TRN002', NULL, NULL, 28000000, 'Expense', 'Pending', NOW() - INTERVAL '35 days', 'Pembelian Lensa Kamera Sony GM 50mm f1.2'),
('TRN003', 'PRJ002', 'CLI002', 8000000, 'Income', 'Pending', NOW() - INTERVAL '61 days', 'Pelunasan Gathering PT SA'),
('TRN004', 'PRJ004', 'CLI004', 2500000, 'Income', 'Pending', NOW() - INTERVAL '10 days', 'DP Proyek Lamaran Dewi & Rian'),
('TRN005', 'PRJ005', 'CLI005', 6500000, 'Income', 'Pending', NOW() - INTERVAL '18 days', 'Pelunasan Akad Nikah Farhan & Aisyah'),
('TRN006', 'PRJ002', 'CLI002', 3500000, 'Expense', 'Pending', NOW() - INTERVAL '61 days', 'Pembayaran Fee Freelancer - Acara PT SA'),
('TRN007', 'PRJ007', 'CLI006', 3500000, 'Expense', 'Pending', NOW() - INTERVAL '47 days', 'Biaya Transportasi - Proyek Agung & Bella'),
('TRN008', 'PRJ007', 'CLI006', 1500000, 'Expense', 'Pending', NOW() - INTERVAL '46 days', 'Biaya Cetak Album - Proyek Agung & Bella'),
('TRN009', 'PRJ005', 'CLI005', 300000, 'Expense', 'Pending', NOW() - INTERVAL '19 days', 'Biaya Konsumsi Tim - Proyek Farhan & Aisyah'),
('TRN010', NULL, NULL, 850000, 'Expense', 'Pending', NOW() - INTERVAL '5 days', 'Langganan Adobe Creative Cloud'),
('TRN011', 'PRJ007', 'CLI006', 5250000, 'Expense', 'Pending', NOW() - INTERVAL '46 days', 'Biaya Fee Freelancer - Proyek Agung & Bella');

-- Insert Team Members
INSERT INTO team_members (id, name, email, phone, role, specialization, hourly_rate, portal_access_id) VALUES
('TM001', 'Andi Pratama', 'andi.p@freelance.com', '081111111111', 'Fotografer', 'Wedding Photography', 1500000, 'freelancer-andi-pratama'),
('TM002', 'Citra Lestari', 'citra.l@freelance.com', '082222222222', 'Videografer', 'Cinematic Videography', 2000000, 'freelancer-citra-lestari'),
('TM003', 'Doni Firmansyah', 'doni.f@freelance.com', '083333333333', 'Editor', 'Video & Photo Editing', 1000000, 'freelancer-doni-firmansyah'),
('TM004', 'Rian Hidayat', 'rian.h@freelance.com', '084444444444', 'Asisten Fotografer', 'Photography Assistant', 500000, 'freelancer-rian-hidayat'),
('TM005', 'Fira Anjani', 'fira.a@freelance.com', '085555555555', 'MUA & Asisten', 'Makeup & Assistant', 750000, 'freelancer-fira-anjani'),
('TM006', 'Eka Wijaya', 'eka.w@freelance.com', '086666666666', 'Pilot Drone', 'Drone Operations', 1200000, 'freelancer-eka-wijaya');

-- Insert Assets
INSERT INTO assets (id, name, category, purchase_date, purchase_price, serial_number, status, notes) VALUES
('ASSET001', 'Kamera Sony A7 IV', 'Kamera', '2023-01-10', 35000000, 'SN-A74-001', 'Available', NULL),
('ASSET002', 'Lensa Sony GM 24-70mm f2.8', 'Lensa', '2023-01-10', 25000000, NULL, 'Available', 'Digunakan untuk proyek Budi & Sinta'),
('ASSET003', 'Drone DJI Mavic 3 Pro', 'Drone', '2023-06-15', 32000000, NULL, 'Available', 'Perbaikan gimbal setelah hard landing.'),
('ASSET004', 'MacBook Pro M2 Max', 'Komputer', '2023-03-20', 45000000, NULL, 'Available', 'Digunakan oleh Doni F. untuk editing'),
('ASSET005', 'Godox AD600 Pro', 'Pencahayaan', '2022-11-01', 12000000, 'SN-AD600-012', 'Available', NULL);

-- Create additional tables for complete functionality

-- Client Feedback table
CREATE TABLE IF NOT EXISTS client_feedback (
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
CREATE TABLE IF NOT EXISTS contracts (
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
CREATE TABLE IF NOT EXISTS promo_codes (
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
CREATE TABLE IF NOT EXISTS sops (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    category text not null,
    content text not null,
    last_updated timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

-- Social Media Posts table
CREATE TABLE IF NOT EXISTS social_media_posts (
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
CREATE TABLE IF NOT EXISTS add_ons (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    price numeric(10,2) not null,
    created_at timestamp with time zone default now()
);

-- Financial Pockets table
CREATE TABLE IF NOT EXISTS financial_pockets (
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
CREATE TABLE IF NOT EXISTS cards (
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
CREATE TABLE IF NOT EXISTS team_project_payments (
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
CREATE TABLE IF NOT EXISTS notifications (
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

-- Insert Client Feedback
INSERT INTO client_feedback (id, client_id, client_name, satisfaction, rating, feedback, date) VALUES
('CF001', 'CLI001', 'Budi & Sinta', 'Sangat Puas', 5, 'Pelayanan sangat memuaskan, hasil foto dan video sangat bagus. Tim sangat profesional dan komunikatif.', NOW() - INTERVAL '5 days'),
('CF002', 'CLI002', 'PT Sejahtera Abadi', 'Puas', 4, 'Dokumentasi acara perusahaan berjalan lancar, hasil sesuai ekspektasi. Waktu pengerjaan tepat waktu.', NOW() - INTERVAL '50 days'),
('CF003', 'CLI006', 'Agung & Bella (The Senjaya)', 'Sangat Puas', 5, 'Hasil editing foto dan video melebihi ekspektasi! Tim sangat kreatif dan detail. Recommended!', NOW() - INTERVAL '2 days'),
('CF004', 'CLI005', 'Farhan & Aisyah', 'Puas', 4, 'Pelayanan baik, namun ada sedikit keterlambatan dalam proses editing. Overall puas dengan hasilnya.', NOW() - INTERVAL '10 days');

-- Insert Contracts
INSERT INTO contracts (id, contract_number, client_id, project_id, signing_date, signing_location, client_name1, client_address1, client_phone1, shooting_duration, guaranteed_photos, album_details, digital_files_format, personnel_count, delivery_timeframe, dp_date, final_payment_date, cancellation_policy, jurisdiction) VALUES
('CTR001', 'VP/CTR/2024/001', 'CLI001', 'PRJ001', '2024-01-15', 'Jakarta', 'Budi Santoso', 'Jl. Mawar No. 15, Jakarta Selatan', '081234567890', '8 jam (07:00 - 15:00)', 'Minimal 200 foto edited', 'Album premium 25x30cm, 20 halaman', 'JPG High Resolution + RAW (atas permintaan)', '3 orang (2 fotografer, 1 videografer)', '30 hari kerja', '2024-01-20', '2024-02-20', 'Pembatalan 7 hari sebelum acara: 50% refund. Kurang dari 7 hari: tidak ada refund.', 'Jakarta Pusat'),
('CTR002', 'VP/CTR/2024/002', 'CLI004', 'PRJ004', '2024-02-10', 'Yogyakarta', 'Dewi Sari', 'Jl. Malioboro No. 25, Yogyakarta', '081298765432', '4 jam (17:00 - 21:00)', 'Minimal 100 foto edited', 'Tidak ada album fisik', 'JPG High Resolution', '2 orang (1 fotografer, 1 videografer)', '14 hari kerja', '2024-02-15', '2024-03-01', 'Pembatalan 3 hari sebelum acara: 30% refund. Kurang dari 3 hari: tidak ada refund.', 'Yogyakarta'),
('CTR003', 'VP/CTR/2024/003', 'CLI006', 'PRJ007', '2024-01-05', 'Bali', 'Agung Senjaya', 'Jl. Sunset Road No. 88, Bali', '081333444555', '12 jam (10:00 - 22:00)', 'Minimal 500 foto edited', 'Album premium 30x40cm, 40 halaman + box kayu', 'JPG High Resolution + Video 4K', '5 orang (3 fotografer, 2 videografer)', '45 hari kerja', '2024-01-10', '2024-03-01', 'Pembatalan 14 hari sebelum acara: 70% refund. Kurang dari 14 hari: 30% refund.', 'Denpasar, Bali');

-- Insert Promo Codes
INSERT INTO promo_codes (id, code, discount_type, discount_value, is_active, usage_count, max_usage, expiry_date) VALUES
('PC001', 'NEWCLIENT10', 'percentage', 10, true, 5, 50, NOW() + INTERVAL '90 days'),
('PC002', 'WEDDING2024', 'fixed', 1000000, true, 12, 100, '2024-12-31'),
('PC003', 'DISKON500K', 'fixed', 500000, false, 20, 20, NOW() - INTERVAL '30 days'),
('PC004', 'PREWED15', 'percentage', 15, true, 3, 25, NOW() + INTERVAL '60 days');

-- Insert SOPs
INSERT INTO sops (id, title, category, content, last_updated) VALUES
('SOP001', 'Prosedur Pemotretan Pernikahan', 'Pernikahan', '# Prosedur Pemotretan Pernikahan\n\n## Persiapan (H-1)\n- Charge semua baterai kamera dan peralatan\n- Backup memory card dan format ulang\n- Siapkan checklist equipment\n\n## Hari H\n- Datang minimal 30 menit sebelum acara\n- Brief dengan koordinator acara\n- Setup equipment dan test lighting\n\n## Saat Pemotretan\n- Ikuti rundown acara\n- Ambil candid dan formal shots\n- Koordinasi dengan videografer\n\n## Pasca Pemotretan\n- Backup file segera\n- Quick preview untuk klien\n- Upload ke cloud storage', NOW() - INTERVAL '30 days'),
('SOP002', 'Alur Editing Foto & Video', 'Editing', '# Alur Editing Foto & Video\n\n## Seleksi Foto\n- Pilih foto terbaik dari setiap momen penting\n- Hapus foto blur atau duplikat\n- Kategorikan berdasarkan sesi (akad, resepsi, dll)\n\n## Color Grading\n- Gunakan preset yang konsisten\n- Sesuaikan exposure dan contrast\n- Pastikan skin tone natural\n\n## Final Output\n- Export dalam format JPG untuk klien\n- Simpan file RAW untuk arsip\n- Upload ke Google Drive klien', NOW() - INTERVAL '15 days'),
('SOP003', 'Komunikasi dengan Klien', 'Umum', '# Komunikasi dengan Klien\n\n## Respon Time\n- WhatsApp: Maksimal 2 jam (jam kerja)\n- Email: Maksimal 6 jam (jam kerja)\n- Instagram DM: Maksimal 4 jam\n\n## Tone Komunikasi\n- Gunakan bahasa formal namun ramah\n- Selalu konfirmasi detail penting\n- Berikan update progress secara berkala\n\n## Follow Up\n- Follow up lead baru dalam 24 jam\n- Update progress proyek setiap 3 hari\n- Reminder pembayaran H-3 dari deadline', NOW() - INTERVAL '10 days');

-- Insert Social Media Posts
INSERT INTO social_media_posts (id, project_id, client_name, post_type, platform, scheduled_date, caption, status, notes) VALUES
('SMP001', 'PRJ002', 'PT Sejahtera Abadi', 'Instagram Feed', 'Instagram', NOW() + INTERVAL '3 days', 'Throwback to the amazing annual gathering of PT Sejahtera Abadi! #VenaCorporate #EventDocumentation', 'Scheduled', NULL),
('SMP002', 'PRJ001', 'Budi & Sinta', 'Instagram Story', 'Instagram', NOW() + INTERVAL '5 days', 'Another beautiful moment captured from Budi & Sinta''s wedding. ✨ #VenaWedding #WeddingInspiration', 'Draft', NULL),
('SMP003', 'PRJ007', 'Agung & Bella (The Senjaya)', 'Instagram Reels', 'Instagram', NOW() - INTERVAL '30 days', 'The magical reception of Agung & Bella. What a night to remember! 💍 #BaliWedding #LuxuryWedding #VenaPictures', 'Posted', NULL),
('SMP004', 'PRJ005', 'Farhan & Aisyah', 'TikTok Video', 'TikTok', NOW() + INTERVAL '7 days', 'Sneak peek dari akad nikah Farhan & Aisyah yang intimate dan penuh makna 💕 #VenaPictures #WeddingTikTok', 'Draft', 'Perlu approval dari klien dulu');

-- Insert Add-ons
INSERT INTO add_ons (id, name, price) VALUES
('ADDON001', 'Same Day Edit Video', 2500000),
('ADDON002', 'Aerial Drone Shot', 1500000),
('ADDON003', 'Jasa MUA Profesional', 1000000),
('ADDON004', 'Album Tambahan untuk Orang Tua', 1200000),
('ADDON005', 'Live Streaming Setup', 3000000),
('ADDON006', 'Photo Booth dengan Props', 1800000);

-- Insert Financial Pockets
INSERT INTO financial_pockets (id, name, description, icon, pocket_type, amount, goal_amount, source_card_id) VALUES
('POCKET001', 'Anggaran Operasional ' || TO_CHAR(NOW(), 'Month YYYY'), 'Dana untuk pengeluaran bulanan.', 'clipboard-list', 'Expense', 2000000, 15000000, 'CARD001'),
('POCKET002', 'Dana Darurat', 'Dana cadangan untuk kebutuhan mendesak.', 'lock', 'Locked', 25000000, 50000000, NULL),
('POCKET003', 'Nabung Upgrade Peralatan', 'Menabung untuk membeli peralatan baru.', 'piggy-bank', 'Saving', 8500000, 75000000, 'CARD001'),
('POCKET004', 'Pool Hadiah Freelancer', 'Dana untuk memberikan hadiah kepada freelancer berkinerja baik.', 'star', 'Reward Pool', 3000000, NULL, 'CARD001');

-- Insert Cards
INSERT INTO cards (id, card_holder_name, bank_name, card_type, last_four_digits, expiry_date, balance, color_gradient) VALUES
('CARD_CASH', 'Kas Perusahaan', 'Tunai', 'Tunai', 'CASH', NULL, 13700000, 'from-slate-100 to-slate-300'),
('CARD001', 'Vena Pictures', 'WBank', 'Debit', '3090', '12/26', 85500000, 'from-blue-500 to-sky-400'),
('CARD002', 'Vena Pictures', 'VISA', 'Kredit', '8872', '08/25', -28850000, 'from-gray-700 to-gray-900');

-- Insert Team Project Payments
INSERT INTO team_project_payments (id, project_id, team_member_name, team_member_id, date, status, fee, reward) VALUES
('TPP001', 'PRJ001', 'Andi Pratama', 'TM001', NOW() - INTERVAL '25 days', 'Unpaid', 1500000, 50000),
('TPP002', 'PRJ001', 'Citra Lestari', 'TM002', NOW() - INTERVAL '25 days', 'Unpaid', 2000000, 75000),
('TPP003', 'PRJ002', 'Andi Pratama', 'TM001', NOW() - INTERVAL '61 days', 'Paid', 1500000, 100000),
('TPP004', 'PRJ002', 'Doni Firmansyah', 'TM003', NOW() - INTERVAL '61 days', 'Paid', 1000000, 50000),
('TPP005', 'PRJ007', 'Citra Lestari', 'TM002', NOW() - INTERVAL '47 days', 'Unpaid', 2500000, 150000),
('TPP006', 'PRJ007', 'Eka Wijaya', 'TM006', NOW() - INTERVAL '47 days', 'Unpaid', 1200000, 80000),
('TPP007', 'PRJ005', 'Fira Anjani', 'TM005', NOW() - INTERVAL '18 days', 'Unpaid', 750000, 30000);

-- Insert Notifications
INSERT INTO notifications (id, title, message, timestamp, is_read, icon, link_view) VALUES
('NOTIF001', 'Proyek Baru Dikonfirmasi', 'Proyek "Lamaran Dewi & Rian" telah dikonfirmasi oleh klien.', NOW() - INTERVAL '2 hours', false, 'lead', 'Proyek'),
('NOTIF002', 'Deadline Mendekat', 'Proyek "Pernikahan Budi & Sinta" deadline dalam 7 hari.', NOW() - INTERVAL '1 day', false, 'deadline', 'Proyek'),
('NOTIF003', 'Pembayaran Diterima', 'DP sebesar Rp 6.500.000 dari Farhan & Aisyah telah diterima.', NOW() - INTERVAL '18 days', true, 'payment', 'Keuangan'),
('NOTIF004', 'Feedback Klien Baru', 'Budi & Sinta memberikan rating 5 bintang untuk proyeknya.', NOW() - INTERVAL '5 days', false, 'feedback', 'Laporan Klien'),
('NOTIF005', 'Revisi Diselesaikan', 'Doni Firmansyah telah menyelesaikan revisi untuk proyek Farhan & Aisyah.', NOW() - INTERVAL '3 hours', false, 'revision', 'Proyek');

-- Enable RLS for new tables
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_pockets ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables
CREATE POLICY "Users can view all client_feedback when authenticated" ON client_feedback FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all contracts when authenticated" ON contracts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all promo_codes when authenticated" ON promo_codes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all sops when authenticated" ON sops FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all social_media_posts when authenticated" ON social_media_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all add_ons when authenticated" ON add_ons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all financial_pockets when authenticated" ON financial_pockets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all cards when authenticated" ON cards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all team_project_payments when authenticated" ON team_project_payments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view all notifications when authenticated" ON notifications FOR ALL USING (auth.role() = 'authenticated');

-- Insert Profile/Settings
INSERT INTO profiles (id, user_id, company_name, owner_name, phone, email, address, website, instagram, bank_account_name, bank_name, bank_account_number) VALUES
('PROF001', 'USR001', 'Vena Pictures', 'Andi Vena', '081234567890', 'hello@vena.pictures', 'Jl. Kreatif No. 123, Jakarta Selatan 12345', 'https://vena.pictures', '@vena.pictures', 'Vena Pictures', 'Bank Central Asia', '1234567890');

-- Re-enable RLS for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_pockets ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
