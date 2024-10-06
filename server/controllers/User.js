import pool from '../config/Database.js';
import argon2 from 'argon2';

export const getAllUser = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM users.user');
        
        // Send back the result rows as JSON
        return res.status(200).json(response);
    } catch (error) {
        // Handle errors
        return res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    const {fullname, username, password, confPassword, role, status} = req.body;
    if(password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak sesuai"});
    const hashPassword = await argon2.hash(password);
    try {
        await username.create({
            fullname: fullname,
            username: username,
            password: hashPassword,
            role: role,
            status: status
        });
        res.status(201).json({ msg: "Register Berhasil"})
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
};