import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../style";
import Layout from "../pages/Layout";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile_Asisten = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.data?.usrId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    nim: '',
    bankAccount: '',
    bankAccountNumber: '',
    status: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        if (parseInt(response.data.code, 10) === 200) {
          const userData = response.data.data;
          setFormData({
            fullName: userData.usrFullName || '',
            username: userData.usrUsername || '',
            nim: userData.usrNim || '',
            bankAccount: userData.usrBankAccount || '',
            bankAccountNumber: userData.usrBankAccountNumber || '',
            status: userData.usrStatus || '',
          });
        } else {
          setError("Error fetching user data.");
        }
      } catch (error) {
        setError("Error fetching user data: " + error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/update/users', {
        ...formData,
        operation: 'updateProfile' // Indicate that this is a profile update
      });
      
      if (response.data.code === 200) {
        setMessage("Profile updated successfully!");
        setError('');
      } else {
        setError("Error updating profile: " + response.data.message);
        setMessage('');
      }
    } catch (error) {
      setError("Error updating profile: " + error.message);
      setMessage('');
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Edit Profile</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}>Kembali</button>
        
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
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
          <label className="block text-gray-700">Bank Account</label>
          <input
            type="text"
            value={formData.bankAccount}
            onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Account Number</label>
          <input
            type="text"
            value={formData.bankAccountNumber}
            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </Layout>
  );
};

export default EditProfile_Asisten;