import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { LogOut } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import styles from "../style";
import { FaUserEdit, FaUserPlus } from 'react-icons/fa';

const PROFILE_Koordinator = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/practicumast');
        const activeUsersData = Array.isArray(response.data.data)
          ? response.data.data.filter(user => user.usrStatus === 'active')
          : [];
          
        setActiveUsers(activeUsersData);
      } catch (error) {
        console.error('Failed to fetch active users:', error);
        setActiveUsers([]);
      }
    };

    fetchActiveUsers();
  }, []);

  const handleLogout = () => {
    dispatch(LogOut());

    alert('Logout berhasil! Anda akan dialihkan ke halaman Login.');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleCreateAccount = () => {
    navigate('/createaccount');
  };

  const handleEditUser = (userId) => {
    navigate(`/edituserstatus/${userId}`);
  };

  return (
    <div className="p-6">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute mt-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <h1 className={`${styles.heading2} mb-6 text-center`}>Profile Koordinator</h1>

      {/* List of Active Users */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Active Users</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <li
                  key={user.usrId}
                  className="py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <div>
                    <span className="text-gray-700 font-medium">{index + 1}. {user.usrFullName}</span>
                    <p className="text-gray-500 text-sm">NIM: {user.usrNim}</p>
                  </div>
                  <button
                    onClick={() => handleEditUser(user.usrId)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow flex items-center gap-1 hover:bg-yellow-600 transition"
                  >
                    <FaUserEdit /> Ubah Status
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No active users found.</p>
            )}
          </ul>
        </div>
      </div>
      
      {/* Create Account Button */}
      <button
        onClick={handleCreateAccount}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow flex items-center gap-2 hover:bg-blue-600 transition"
      >
        <FaUserPlus /> Buat Akun
      </button>
    </div>
  );
};

export default PROFILE_Koordinator;