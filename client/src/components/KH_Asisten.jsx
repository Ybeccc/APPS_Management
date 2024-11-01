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

    fetchAttendanceData();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user && user.data) {
      fetchAppointments(user.data.usrId);
      setAttendanceData((prev) => ({ ...prev, attCreatedBy: user.data.usrId }));
    }
  }, [user]);
  
  const fetchAppointments = async (usrId) => {
    try {
      console.log("Fetching appointments for usrId:", usrId);
      const response = await axios.get(`http://localhost:3001/appointment/user/${usrId}`);
      console.log("Full fetched response:", response.data);
  
      if (response.data && response.data.data) {
        setAppointments(response.data.data);
      } else {
        console.error("No appointment data found in response:", response.data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  };  
  
  useEffect(() => {
    console.log("Appointments state after fetch:", appointments);
  }, [appointments]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendance');
      console.log('Fetched attendance data:', response.data);
      setRecentActivities(response.data.recentActivities || []);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setRecentActivities([]);
    }
  };

  const formatTime = (date) => {
    return date.toTimeString().split(' ')[0]; // Format to HH:MM:SS
  };

  const handleCheckIn = async () => {
    if (!attendanceData.attAptId) {
      alert('Please select an appointment before checking in.');
      return;
    }
  
    try {
      const payload = {
        attAptId: attendanceData.attAptId,
        attCheckIn: formatTime(new Date()), // Format time as HH:MM:SS
        attCreatedBy: attendanceData.attCreatedBy,
      };
      console.log("Check-in payload:", payload);
  
      const response = await axios.post('http://localhost:3001/attendance', payload);
      console.log("Check-in response:", response.data);

      // Set currentAttendanceId if attId is returned
      if (response.data && response.data.data && response.data.data.attId) {
        setCurrentAttendanceId(response.data.data.attId);
        console.log("Set currentAttendanceId:", response.data.data.attId);
      } else {
        console.error("attId not found in response");
      }

      fetchAttendanceData(); // Refresh the attendance data
      alert('Check-in successful!');
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in.');
    }
  };

  const handleCheckOut = async () => {
    console.log("currentAttendanceId before check-out:", currentAttendanceId);
    
    if (!currentAttendanceId) {
      alert('Check-in is required before check-out.');
      return;
    }
  
    try {
      const payload = {
        attId: currentAttendanceId,
        attCheckOut: formatTime(new Date()), // Format time as HH:MM:SS
      };
      console.log("Check-out payload:", payload);
  
      const response = await axios.post('http://localhost:3001/attendance/update', payload);
      console.log("Check-out response:", response.data); // Log the response
  
      if (response.data.code === '200') {
        alert('Check-out successful!');
      } else {
        alert('Failed to check out.'); // Show error if update was not successful
      }
  
      setCurrentAttendanceId(null); // Reset the attendance ID after check-out
      fetchAttendanceData(); // Refresh the attendance data
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to check out.');
    }
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Monitor changes to currentAttendanceId for debugging purposes
  useEffect(() => {
    console.log("currentAttendanceId updated:", currentAttendanceId);
  }, [currentAttendanceId]);

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
                  <p className="font-medium">{activity.type === 'check-in' ? 'Check-in' : 'Check-out'}</p>
                  <p>{new Date(activity.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}</p>
                </div>
                <p>{new Date(activity.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
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