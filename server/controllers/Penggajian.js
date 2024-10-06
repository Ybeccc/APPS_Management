import pool from '../config/Database.js'; // Import the pool instance

export const getAllPayroll = async (req, res) => {
    try {
        // Use the pool to query the database
        const result = await pool.query('SELECT * FROM users.payroll');
        
        // Send back the result rows as JSON
        return res.status(200).json(result.rows);
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
};

export const createPayroll = async (req, res) => {
};

export const updatePayroll = async (req, res) => {
};

export const deletePayroll = async (req, res) => {
};