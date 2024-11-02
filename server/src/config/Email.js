const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider's service (e.g., Gmail, Outlook, etc.)
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

module.exports = transporter;