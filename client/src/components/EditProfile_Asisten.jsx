import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../style";
import Layout from "../pages/Layout";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile_Asisten = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.data?.usrId; // Extract the user ID from Redux
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    nim: '',
    bankAccount: '',
    bankAccountNumber: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError("User ID is missing. Cannot fetch user data.");
          return;
        }

        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        if (response.data.code === "200") {
          const userData = response.data.data;
          setFormData({
            fullName: userData.usrFullName || '',
            username: userData.usrUsername || '',
            nim: userData.usrNim || '',
            bankAccount: userData.usrBankAccount || '',
            bankAccountNumber: userData.usrBankAccountNumber || '',
          });
        } else {
          setError("Error fetching user data: " + response.data.message);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data: " + err.message);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        setError("User ID is missing. Cannot update profile.");
        return;
      }

      // Send all form data to the backend
      const response = await axios.post(`http://localhost:3001/user/update/${userId}`, {
        fullName: formData.fullName,
        username: formData.username,
        nim: formData.nim,
        bankAccount: formData.bankAccount,
        bankAccountNumber: formData.bankAccountNumber,
        operation: 'updateProfile', // Indicate the operation type
      });

      if (response.data.code === "200" && response.data.status === "success") {
        alert("Profile successfully updated!");
        navigate("/profile");
      } else {
        alert(`Failed to update profile: ${response.data.message || "Unknown error."}`);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error updating profile: " + err.message);
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Edit Profile</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>

      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NIM</label>
          <input
            type="text"
            value={formData.nim}
            onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank</label>
          <input
            type="text"
            value={formData.bankAccount}
            onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nomor Rekening</label>
          <input
            type="text"
            value={formData.bankAccountNumber}
            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Profile
        </button>
      </form>

      {/* Feedback messages */}
      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </Layout>
  );
};

export default EditProfile_Asisten;