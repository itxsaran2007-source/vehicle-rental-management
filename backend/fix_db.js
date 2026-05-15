const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function fix() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'drivex_rental',
    });

    try {
        console.log('Checking vehicles table structure...');
        const [rows] = await connection.query('DESCRIBE vehicles');
        const columns = rows.map(r => r.Field);

        if (!columns.includes('transmission')) {
            console.log('Adding transmission column...');
            await connection.query('ALTER TABLE vehicles ADD COLUMN transmission VARCHAR(50) DEFAULT "Automatic"');
        }

        if (!columns.includes('description')) {
            console.log('Adding description column...');
            await connection.query('ALTER TABLE vehicles ADD COLUMN description TEXT');
        }

        console.log('Database schema updated successfully.');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await connection.end();
    }
}

fix();
