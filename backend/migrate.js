const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const pool = require('./config/db');

async function migrate() {
    console.log('Starting migration...');
    
    try {
        const sqlPath = path.join(__dirname, '../database/drivex_database.sql');
        let sql = fs.readFileSync(sqlPath, 'utf8');

        // Remove CREATE DATABASE and USE statements to stay in 'defaultdb'
        sql = sql.replace(/CREATE DATABASE IF NOT EXISTS drivex_rental/g, '-- CREATE DATABASE removed');
        sql = sql.replace(/USE drivex_rental;/g, '-- USE removed');

        const connection = await pool.getConnection();
        console.log('Connected to Aiven MySQL.');

        // mysql2/promise pool.query doesn't support multiple statements by default
        // We need to split the SQL by semicolons or use a different approach
        // For simplicity, we'll split by ';' (this is naive but often works for simple schemas)
        
        const statements = sql.split(/;(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/);

        for (let statement of statements) {
            const trimmed = statement.trim();
            if (trimmed) {
                try {
                    await connection.query(trimmed);
                } catch (err) {
                    console.error('Error executing statement:');
                    console.error(trimmed.substring(0, 100) + '...');
                    console.error('Error:', err.message);
                }
            }
        }

        console.log('Migration completed successfully.');
        connection.release();
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        process.exit();
    }
}

migrate();
