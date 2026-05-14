-- ============================================================
--  DriveX Vehicle Rental Management System
--  MySQL Database Setup Script
--  Run this file in MySQL Workbench:
--    File > Open SQL Script > select this file > Execute (⚡)
-- ============================================================

-- Create & use the database
CREATE DATABASE IF NOT EXISTS drivex_rental
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE drivex_rental;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100)        NOT NULL,
    email       VARCHAR(150)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,   -- store hashed passwords (bcrypt)
    phone       VARCHAR(20),
    role        ENUM('user','admin') NOT NULL DEFAULT 'user',
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: locations  (pickup/drop-off hubs)
-- ============================================================
CREATE TABLE IF NOT EXISTS locations (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    address     VARCHAR(255),
    city        VARCHAR(100),
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: vehicles
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicles (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150)                       NOT NULL,
    category        ENUM('car','bike','bus')            NOT NULL,
    fuel_type       ENUM('Petrol','Diesel','Electric')  NOT NULL DEFAULT 'Petrol',
    seats           INT                                NOT NULL DEFAULT 2,
    price_per_day   DECIMAL(10,2)                      NOT NULL,
    image_url       VARCHAR(500),
    is_available    TINYINT(1)                         NOT NULL DEFAULT 1,
    created_at      TIMESTAMP                          DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT            NOT NULL,
    vehicle_id          INT            NOT NULL,
    location_id         INT            NOT NULL,
    pickup_datetime     DATETIME       NOT NULL,
    return_datetime     DATETIME       NOT NULL,
    total_days          INT            GENERATED ALWAYS AS
                            (DATEDIFF(return_datetime, pickup_datetime)) STORED,
    total_price         DECIMAL(10,2)  NOT NULL,
    payment_method      ENUM('UPI','Paytm','GPay') NOT NULL,
    payment_status      ENUM('Pending','Paid','Failed','Refunded') NOT NULL DEFAULT 'Pending',
    booking_status      ENUM('Confirmed','Cancelled','Completed')  NOT NULL DEFAULT 'Confirmed',
    booking_reference   VARCHAR(20)    NOT NULL UNIQUE,
    created_at          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_bookings_user    FOREIGN KEY (user_id)    REFERENCES users(id)     ON DELETE CASCADE,
    CONSTRAINT fk_bookings_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)  ON DELETE CASCADE,
    CONSTRAINT fk_bookings_loc     FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE: payments  (audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    booking_id      INT            NOT NULL,
    amount          DECIMAL(10,2)  NOT NULL,
    payment_method  ENUM('UPI','Paytm','GPay') NOT NULL,
    transaction_id  VARCHAR(100),
    status          ENUM('Success','Failed','Pending') NOT NULL DEFAULT 'Pending',
    paid_at         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE: admin_users  (dedicated admin accounts)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(100) NOT NULL UNIQUE,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SEED DATA: locations
-- ============================================================
INSERT INTO locations (name, address, city) VALUES
    ('Downtown Hub',        '12 Main Street, Central District', 'Chennai'),
    ('International Airport','Airport Road, Terminal 2',         'Chennai'),
    ('Westside Branch',      '45 West Avenue, Nungambakkam',     'Chennai');

-- ============================================================
-- SEED DATA: vehicles  — CARS (IDs 1-10)
-- ============================================================
INSERT INTO vehicles (id, name, category, fuel_type, seats, price_per_day, image_url) VALUES
(1,  'Aston Martin DB11', 'car', 'Petrol',   4,  420.00,
     'https://th.bing.com/th/id/OIP.Zylk-C5D9XX0wt89EwjSMgHaEG?w=329&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3p'),

(2,  'Porsche 911',       'car', 'Petrol',   2,  250.00,
     'data:image/webp;base64,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'),

(3,  'Tesla Model S',     'car', 'Electric', 5,  180.00,
     'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop'),

(4,  'Audi RS e-tron',    'car', 'Electric', 4,  220.00,
     'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop'),

(5,  'Range Rover Sport', 'car', 'Diesel',   5,  160.00,
     'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop'),

(6,  'Ferrari F8',        'car', 'Petrol',   2,  550.00,
     'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop'),

(7,  'BMW M4 Competition','car', 'Petrol',   4,  150.00,
     'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop'),

(8,  'Nissan GT-R',       'car', 'Petrol',   4,  280.00,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nissan_GT-R_01.JPG/800px-Nissan_GT-R_01.JPG'),

(9,  'Chevrolet Corvette','car', 'Petrol',   2,  200.00,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2020_Chevrolet_Corvette_C8_Stingray.jpg/800px-2020_Chevrolet_Corvette_C8_Stingray.jpg'),

(10, 'Jaguar F-Type',     'car', 'Petrol',   2,  210.00,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2015_Jaguar_F-Type_V6_Supercharged_Automatic_3.0_Front.jpg/800px-2015_Jaguar_F-Type_V6_Supercharged_Automatic_3.0_Front.jpg');

-- ============================================================
-- SEED DATA: vehicles  — BIKES (IDs 11-16)
-- ============================================================
INSERT INTO vehicles (id, name, category, fuel_type, seats, price_per_day, image_url) VALUES
(11, 'Yamaha YZF R1',     'bike', 'Petrol', 2,  80.00,
     'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop'),

(12, 'Kawasaki Ninja H2', 'bike', 'Petrol', 2, 120.00,
     'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop'),

(13, 'Ducati Panigale V4','bike', 'Petrol', 2, 110.00,
     'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800&auto=format&fit=crop'),

(14, 'BMW S1000RR',        'bike', 'Petrol', 2, 100.00,
     'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop'),

(15, 'Harley Iron 883',   'bike', 'Petrol', 2,  90.00,
     'https://images.unsplash.com/photo-1558981033-0f0309284409?q=80&w=800&auto=format&fit=crop'),

(16, 'Suzuki Hayabusa',   'bike', 'Petrol', 2, 130.00,
     'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=800&auto=format&fit=crop');

-- ============================================================
-- SEED DATA: vehicles  — BUSES (IDs 24-26)
-- ============================================================
INSERT INTO vehicles (id, name, category, fuel_type, seats, price_per_day, image_url) VALUES
(24, 'Volvo Luxury Bus',   'bus', 'Diesel', 40, 400.00,
     'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'),

(25, 'Mercedes Tourismo',  'bus', 'Diesel', 45, 450.00,
     'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop'),

(26, 'Scania Touring',     'bus', 'Diesel', 42, 420.00,
     'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop');

-- ============================================================
-- SEED DATA: admin user
-- Password below is a bcrypt hash of "Admin@123"
-- Change this in production!
-- ============================================================
INSERT INTO admin_users (username, email, password) VALUES
('admin', 'admin@drivex.com',
 '$2b$10$abcdefghijklmnopqrstuvuJz0TGDt3eC1.VdRCxM5fJklgSwjkKq');

-- ============================================================
-- SEED DATA: demo users  (passwords are bcrypt hash of "User@123")
-- ============================================================
INSERT INTO users (full_name, email, password, phone, role) VALUES
('Alice Johnson', 'alice@example.com',
 '$2b$10$abcdefghijklmnopqrstuvuJz0TGDt3eC1.VdRCxM5fJklgSwjkKq', '9876543210', 'user'),
('Bob Smith',     'bob@example.com',
 '$2b$10$abcdefghijklmnopqrstuvuJz0TGDt3eC1.VdRCxM5fJklgSwjkKq', '9876543211', 'user');

-- ============================================================
-- SEED DATA: sample bookings
-- ============================================================
INSERT INTO bookings
    (user_id, vehicle_id, location_id, pickup_datetime, return_datetime,
     total_price, payment_method, payment_status, booking_status, booking_reference)
VALUES
(1, 7,  1, '2026-05-15 09:00:00', '2026-05-17 09:00:00',
    300.00, 'UPI',   'Paid',    'Confirmed', 'DX-2026-0001'),

(2, 3,  2, '2026-05-18 10:00:00', '2026-05-20 10:00:00',
    360.00, 'GPay',  'Paid',    'Confirmed', 'DX-2026-0002'),

(1, 12, 3, '2026-05-22 08:00:00', '2026-05-23 08:00:00',
    120.00, 'Paytm', 'Pending', 'Confirmed', 'DX-2026-0003');

-- ============================================================
-- SEED DATA: sample payments
-- ============================================================
INSERT INTO payments (booking_id, amount, payment_method, transaction_id, status) VALUES
(1, 300.00, 'UPI',   'UPI20260515001', 'Success'),
(2, 360.00, 'GPay',  'GPAY20260518002','Success'),
(3, 120.00, 'Paytm', NULL,             'Pending');

-- ============================================================
-- USEFUL QUERIES (for testing in MySQL Workbench)
-- ============================================================

-- View all vehicles
-- SELECT * FROM vehicles ORDER BY category, id;

-- View all bookings with user & vehicle details
-- SELECT
--     b.booking_reference,
--     u.full_name       AS customer,
--     v.name            AS vehicle,
--     l.name            AS pickup_location,
--     b.pickup_datetime,
--     b.return_datetime,
--     b.total_days,
--     b.total_price,
--     b.payment_method,
--     b.booking_status
-- FROM bookings b
-- JOIN users    u ON b.user_id    = u.id
-- JOIN vehicles v ON b.vehicle_id = v.id
-- JOIN locations l ON b.location_id = l.id;

-- View available vehicles only
-- SELECT * FROM vehicles WHERE is_available = 1;

-- View all payments
-- SELECT p.*, b.booking_reference FROM payments p JOIN bookings b ON p.booking_id = b.id;

-- ============================================================
-- UPDATE .env to use this database:
--   DB_HOST=localhost
--   DB_USER=root
--   DB_PASSWORD=your_mysql_password
--   DB_NAME=drivex_rental
-- ============================================================
