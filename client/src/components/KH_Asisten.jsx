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
  const [attendanceData, setAttendanceData] = useState({ attAptId: '', attCreatedBy: '' }); // Define attendance data fields
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
      setAttendanceData((prev) => ({ ...prev, attCreatedBy: user.data.usrId })); // Set creator based on usrId
    }
  }, [user]);
  
  const fetchAppointments = async (usrId) => {
    try {
      console.log("Fetching appointments for usrId:", usrId); // Debugging log
      const response = await axios.get(`http://localhost:3001/appointment/user/${usrId}`);
      console.log("Full fetched response:", response.data); // Log the entire response
  
      // Adjust this if needed based on actual response structure
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
    console.log("Appointments state after fetch:", appointments); // Debugging log
  }, [appointments]);
  

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendance');
      console.log('Fetched attendance data:', response.data);
      setRecentActivities(response.data.recentActivities || []); // Ensure it defaults to an empty array
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setRecentActivities([]); // Set to empty array in case of error
    }
  };

  const handleCheckIn = async () => {
    if (!attendanceData.attAptId) {
      alert('Please select an appointment before checking in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/attendance', {
        attAptId: attendanceData.attAptId, // Use selected appointment ID
        attCheckIn: new Date().getTime(),
        attCreatedBy: attendanceData.attCreatedBy, // Use user ID as creator
      });

      setCurrentAttendanceId(response.data.attId); // Track the created attendance ID for check-out
      fetchAttendanceData(); // Refresh the attendance data
      alert('Check-in successful!');
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in.');
    }
  };

  const handleCheckOut = async () => {
    if (!currentAttendanceId) {
      alert('Check-in is required before check-out.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/attendance/update', {
        attId: currentAttendanceId,
        attCheckOut: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      });

      setCurrentAttendanceId(null); // Reset the attendance ID after check-out
      fetchAttendanceData(); // Refresh the attendance data
      alert('Check-out successful!');
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
            disabled={currentAttendanceId !== null} // Disable if already checked in
          >
            Check-in
          </button>
          <button
            onClick={handleCheckOut}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
            disabled={currentAttendanceId === null} // Disable if not checked in
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