import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { LogOut } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import styles from "../style";

const PROFILE_Asisten = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.data?.usrId;

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    nim: '',
    bankAccount: '',
    bankAccountNumber: '',
    status: '',
  });
  const [appointments, setAppointments] = useState([]);
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
          setError('Error fetching user data: Invalid response code');
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
        console.error('Error:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/appointment/user/${userId}`);
        console.log('Appointments Response Data:', response.data);

        if (parseInt(response.data.code, 10) === 200) {
          setAppointments(response.data.data);
        } else {
          setError('Error fetching appointments data: Invalid response code');
        }
      } catch (error) {
        setError(`Error fetching appointments data: ${error.message}`);
        console.error('Error:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchAppointments();
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(LogOut());

    alert('Logout berhasil! Anda akan dialihkan ke halaman Login.');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3001/appointment/${appointmentId}`);
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appointment) => appointment.apt_id !== appointmentId)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
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

      <h1 className={`${styles.heading2} mb-6 text-center`}>Profile Asisten</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header for the Profile Box */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Profile Asisten</h2>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ 
            { label: 'Full Name', value: formData.fullName },
            { label: 'Username', value: formData.username },
            { label: 'NIM', value: formData.nim },
            { label: 'Bank Account', value: formData.bankAccount },
            { label: 'Bank Account Number', value: formData.bankAccountNumber },
            { label: 'Status', value: formData.status },
          ].map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-sm">
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Buttons */}
      <div className="flex justify-center mt-6 mb-6 space-x-4">
        <button
          onClick={() => navigate('/resetpassword')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Reset Password
        </button>
        <button
          onClick={() => navigate('/profile/edit')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header for Daftar Assist Mata Kuliah */}
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Daftar Mata Kuliah</h2>

        {/* Display Appointments */}
        <div className="grid grid-cols-1 gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  {appointment.course_name} - {appointment.class_name}
                </span>
                <button
                  onClick={() => handleDeleteAppointment(appointment.apt_id)}
                  className="text-red-500 hover:text-red-600 transition flex items-center"
                >
                  <FaTrash /> {/* Trash icon from react-icons */}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No appointments found.</div>
          )}
        </div>
      </div>
      
      {/* Add Appointment Button */}
      <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/appointment/add')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Tambah Mata Kuliah
          </button>
        </div>
    </div>
  );
};

export default PROFILE_Asisten;