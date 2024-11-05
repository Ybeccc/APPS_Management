import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from "./Layout";
import styles from "../style";

const BuatAkun = () => {
  // Access the auth state from Redux
  const auth = useSelector((state) => state.auth);

  // Debugging line to check if auth data is available
  console.log("Auth data:", auth);

  const [formData, setFormData] = useState({
    usrFullName: '',
    usrUsername: '',
    usrPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if auth data is available to avoid undefined errors
    if (!auth || !auth.user || !auth.user.data) {
      console.error("Auth data is not available");
      alert("Failed to create user. Please log in again.");
      return;
    }

    const currentUserId = auth.user.data.usrId;
    const createdBy = auth.user.data.usrUsername;

    const usrRoleId = currentUserId === 1 ? 3 : currentUserId === 2 ? 4 : null;

    const dataToSave = {
      usrRoleId,
      usrFullName: formData.usrFullName,
      usrUsername: formData.usrUsername,
      usrPassword: formData.usrPassword,
      usrStatus: 'active',
      usrCreatedBy: createdBy,
    };

    try {
      const response = await axios.post('http://localhost:3001/users', dataToSave);
      if (response.data.code === "200" && response.data.status === "success") {
        alert('User created successfully!');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <Layout>
      <h2 className={`${styles.heading2} mb-6`}>Buat Akun</h2>
      <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="usrFullName"
              placeholder="Enter full name"
              value={formData.usrFullName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="usrUsername"
              placeholder="Enter username"
              value={formData.usrUsername}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="usrPassword"
              placeholder="Enter password"
              value={formData.usrPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </Layout>
  );
};

export default BuatAkun;