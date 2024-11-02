import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from "../style";

const PROFILE_Asisten = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.data?.usrId;

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    nim: '',
    bankAccount: '',
    bankAccountNumber: '',
    status: '',
    createdBy: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID is not available in the store');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        console.log('API Response:', response.data);

        if (response.data.code == 200) { 
          const userData = response.data.data;
          setFormData({
            fullName: userData.usrFullName || '',
            username: userData.usrUsername || '',
            nim: userData.usrNim || '',
            bankAccount: userData.usrBankAccount || '',
            bankAccountNumber: userData.usrBankAccountNumber || '',
            status: userData.usrStatus || '',
            createdBy: userData.usrCreatedBy || '',
            createdAt: userData.usrCreatedAt || '',
          });
        } else {
          setError('Error fetching user data: Invalid response code');
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = () => {
    // Dispatch a logout action or handle logout logic here
    // For example: dispatch(logoutAction());
    console.log("User logged out");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-0">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute mt-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <h1 className={`${styles.heading2} mb-6`}>Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', value: formData.fullName },
            { label: 'Username', value: formData.username },
            { label: 'NIM', value: formData.nim },
            { label: 'Bank Account', value: formData.bankAccount },
            { label: 'Bank Account Number', value: formData.bankAccountNumber },
            { label: 'Status', value: formData.status },
            { label: 'Created By', value: formData.createdBy },
            { label: 'Created At', value: new Date(formData.createdAt).toLocaleString() },
          ].map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-sm">
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
      >
        Reset Password
      </button>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
      >
        Update Profile
      </button>
    </div>
  );
};

export default PROFILE_Asisten;