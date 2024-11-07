import React, { useState } from 'react';
import axios from 'axios';
import styles from "../style";
import Layout from "../pages/Layout";
import { useNavigate } from 'react-router-dom';

const ResetPW = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/update/users', {
        email,
        newPassword,
        operation: 'resetPassword' // Indicate that this is a password reset
      });

      if (response.data.code === 200) {
        setMessage("Password reset successful!");
        setError('');
      } else {
        setError("Error resetting password: " + response.data.message);
        setMessage('');
      }
    } catch (error) {
      setError("Error resetting password: " + error.message);
      setMessage('');
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Reset Password</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}>Kembali</button>

      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Reset Password
        </button>
      </form>
      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </Layout>
  );
};

export default ResetPW;