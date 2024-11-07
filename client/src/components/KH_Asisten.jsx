import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../style';
import { useSelector } from "react-redux"; 

const KH_Asisten = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentAttendanceId, setCurrentAttendanceId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [attendanceData, setAttendanceData] = useState({ attAptId: '', attCreatedBy: '' });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);

    const timer = setInterval(() => {
      const now = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setCurrentTime(now.toLocaleTimeString('id-ID', options));
    }, 1000);

    if (user && user.data) {
      fetchAppointments(user.data.usrId);
      fetchTodayAttendance(user.data.usrId);
      setAttendanceData((prev) => ({ ...prev, attCreatedBy: user.data.usrId }));
    }

    return () => clearInterval(timer);
  }, [user]);

  const fetchAppointments = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/appointment/user/${usrId}`);
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  };

  const fetchTodayAttendance = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/attendance/today/${usrId}`);
      setRecentActivities(response.data.data || []);
    } catch (error) {
      console.error("Error fetching today's attendance data:", error);
      setRecentActivities([]);
    }
  };

  const calculateDuration = (checkIn, checkOut) => {
    // Check if both checkIn and checkOut are provided
    if (!checkIn || !checkOut) return 'N/A';
  
    // If time-only strings are provided, prepend today’s date
    const todayDate = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format of today
    const start = new Date(`${todayDate}T${checkIn}`);
    const end = new Date(`${todayDate}T${checkOut}`);
  
    // Validate if start and end are valid dates
    if (isNaN(start) || isNaN(end)) return 'N/A';
  
    // Calculate the duration in milliseconds
    const diffMs = end - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
    return `${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
  };  

  const handleCheckIn = async () => {
    if (!attendanceData.attAptId) {
      alert('Please select an appointment before checking in.');
      return;
    }

    try {
      const payload = {
        attAptId: parseInt(attendanceData.attAptId, 10),
        attCreatedBy: attendanceData.attCreatedBy,
        usrId: user.data.usrId,
      };

      const response = await axios.post('http://localhost:3001/attendance/in', payload);

      if (response.data && response.data.data && response.data.data.attId) {
        setCurrentAttendanceId(response.data.data.attId);
      } else {
        console.error("attId not found in response");
      }

      fetchTodayAttendance(attendanceData.attCreatedBy);
      alert('Check-in successful!');
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in.');
    }
  };

  const handleCheckOut = async () => {
    if (!attendanceData.attAptId || !user.data.usrId) {
      alert('Check-in is required before check-out.');
      return;
    }

    try {
      const payload = {
        attAptId: parseInt(attendanceData.attAptId, 10),
        usrId: user.data.usrId,
      };

      const response = await axios.post('http://localhost:3001/attendance/out', payload);

      if (response.data.code === '200') {
        alert('Check-out successful!');
      } else {
        alert('Failed to check out.');
      }

      setCurrentAttendanceId(null);
      fetchTodayAttendance(attendanceData.attCreatedBy);
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to check out.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="p-0">
      <h1 className={styles.heading2}>Kehadiran</h1>

      <div className="bg-white w-full p-6 rounded-lg shadow mb-6">
        <label htmlFor="attAptId" className="block font-semibold mb-2">
          Pilih Mata Kuliah - Kelas:
        </label>
        <select
          name="attAptId"
          value={attendanceData.attAptId}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          required
        >
          <option value="">Select Course - Class</option>
          {appointments.map((appointment) => (
            <option key={appointment.apt_id} value={appointment.apt_id}>
              {`${appointment.course_name} - ${appointment.class_name}`}
            </option>
          ))}
        </select>

        <p className="text-gray-700 mb-2">{currentDate}</p>
        <p className="text-lg font-semibold text-gray-800">Waktu Saat Ini (WIB): {currentTime}</p>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleCheckIn}
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
            disabled={currentAttendanceId !== null}
          >
            Check-in
          </button>
          <button
            onClick={handleCheckOut}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition"
            disabled={currentAttendanceId === null}
          >
            Check-out
          </button>
        </div>
      </div>

      <div className="bg-white w-full p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center border-b py-3 text-sm">
              <div>
                <p className="font-medium text-gray-800">
                  {`${activity.course_name} - ${activity.class}`}
                </p>
                <p className="text-gray-600">{currentDate}</p>
              </div>
              <div className="text-right">
                <p>Check-in: {activity.check_in || 'N/A'}</p>
                <p>Check-out: {activity.check_out || 'N/A'}</p>
                <p>Duration: {calculateDuration(activity.check_in, activity.check_out)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No recent activities found.</p>
        )}
      </div>
    </div>
  );
};

export default KH_Asisten;