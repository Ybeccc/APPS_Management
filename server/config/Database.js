import { Pool } from 'pg';

// Create a new pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vacancy-dbs',
    password: 'admin',
    port: 5432,
});

// Test the connection
(async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully.');
        client.release(); // Release the client back to the pool
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Export the pool
export default pool;
