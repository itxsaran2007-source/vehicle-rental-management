const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

async function seed() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        console.log('Seeding database...');
        
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash('user123', saltRounds);
        const adminHash = await bcrypt.hash('admin123', saltRounds);

        // Clear existing users (optional, but good for clean state)
        // await pool.query('DELETE FROM users');

        // Insert a regular user
        await pool.query(
            'INSERT IGNORE INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            ['Demo User', 'user@gmail.com', passwordHash, '1234567890', 'user']
        );

        // Insert an admin user
        await pool.query(
            'INSERT IGNORE INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            ['System Admin', 'admin@drivex.com', adminHash, '0987654321', 'admin']
        );

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await pool.end();
    }
}

seed();
