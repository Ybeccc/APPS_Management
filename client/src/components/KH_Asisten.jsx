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
      // Set recentActivities with the "data" array from the response
      setRecentActivities(response.data.data || []);
    } catch (error) {
      console.error("Error fetching today's attendance data:", error);
      setRecentActivities([]);
    }
  };  

  const handleCheckIn = async () => {
    if (!attendanceData.attAptId) {
      alert('Please select an appointment before checking in.');
      return;
    }
  
    try {
      // Ensure the payload matches the expected structure
      const payload = {
        attAptId: parseInt(attendanceData.attAptId, 10), // Convert to integer if needed
        attCreatedBy: attendanceData.attCreatedBy, // Assuming this is a string
        usrId: user.data.usrId, // Pass the usrId from the user state
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
        attAptId: parseInt(attendanceData.attAptId, 10), // Convert to integer if needed
        usrId: user.data.usrId, // Include usrId from the user state
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
    <div className="flex">
      <div className="w-3/4 p-6">
        <h1 className={`${styles.heading2} mb-6`}>Kehadiran</h1>

        <div className="space-y-1 mb-10">
          <label htmlFor="attAptId" className="block font-semibold">
            Pilih Mata Kuliah - Kelas:
          </label>
          <select
            name="attAptId"
            value={attendanceData.attAptId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Select Course - Class</option>
            {appointments.map((appointment) => (
              <option key={appointment.apt_id} value={appointment.apt_id}>
                {`${appointment.course_name} - ${appointment.class_name}`}
              </option>
            ))}
          </select>
        </div>

        <p>{currentDate}</p>
        <p className="text-lg font-semibold mt-2">Waktu Saat Ini (WIB): {currentTime}</p>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleCheckIn}
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
            disabled={currentAttendanceId !== null}
          >
            Check-in
          </button>
          <button
            onClick={handleCheckOut}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
            disabled={currentAttendanceId === null}
          >
            Check-out
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-medium">
                    {`${activity.course_name} - ${activity.class}`}
                  </p>
                  <p>{currentDate}</p> {/* Assuming currentDate is today's date, as the API returns only today's attendance */}
                </div>
                <div>
                  <p>Check-in: {activity.check_in || 'N/A'}</p>
                  <p>Check-out: {activity.check_out || 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No recent activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KH_Asisten;