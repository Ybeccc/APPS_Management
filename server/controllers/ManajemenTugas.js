import pool from '../config/Database.js'; // Import the pool instance

export const getAllTask = async (req, res) => {
    try {
        const response = await pool.findAll();
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};