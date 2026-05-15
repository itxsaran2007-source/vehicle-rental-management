const pool = require('./config/db');

async function test() {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await pool.getConnection();
        console.log('Connected successfully!');

        console.log('Testing query...');
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Query successful, solution is:', rows[0].solution);

        // Optional: Check if vehicles table exists
        const [tables] = await connection.query("SHOW TABLES LIKE 'vehicles'");
        if (tables.length > 0) {
            console.log("Table 'vehicles' exists.");
        } else {
            console.log("Table 'vehicles' DOES NOT exist. You may need to run migrations.");
        }

    } catch (error) {
        console.error('Database test failed:');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        
        if (error.code === 'ETIMEDOUT') {
            console.log('\nTIP: A connection timeout usually means you need to add your IP address to the Aiven "Allowed IPs" whitelist.');
        }
    } finally {
        if (connection) connection.release();
    }
}

test();
