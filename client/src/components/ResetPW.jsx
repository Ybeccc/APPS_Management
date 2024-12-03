import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import axios from 'axios';
import styles from "../style";
import Layout from "../pages/Layout";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPW = () => {
  const userId = useSelector((state) => state.auth.user.data.usrId); // Access usrId from Redux
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    try {
      // Send API request with user ID in the URL
      const response = await axios.post(`http://localhost:3001/users/update/password/${userId}`, {
        oldPassword,
        newPassword,
      });

      if (response.data.code === "200" && response.data.status === "success") {
        alert("Password Berhasil Diubah!");
        navigate("/profile");
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

  const toggleVisibility = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Reset Password</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}>Kembali</button>

      <form onSubmit={handleResetPassword}>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password Lama</label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Masukkan Password Lama"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => toggleVisibility(setShowOldPassword)}
            >
              {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password Baru</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Masukkan Password Baru"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => toggleVisibility(setShowNewPassword)}
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Konfirmasi Password Baru</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Masukkan Password Baru"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => toggleVisibility(setShowConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
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