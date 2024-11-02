import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import styles from "../style";

const KH_Koordinator = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data) {
      fetchAttendanceData(user.data.usrId);
    }
  }, [user]);

  const fetchAttendanceData = async (usrId) => {
    try {
      const role_id = usrId === 1 ? 3 : usrId === 2 ? 4 : null;

      if (!role_id) {
        console.error("Invalid usrId for attendance data fetch");
        return;
      }

      const response = await axios.get(`http://localhost:3001/attendance/role/${role_id}`);
      console.log('Attendance Data:', response.data);

      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Function to format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Kehadiran</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#7b2cbf] text-white">
              {["Tanggal", "Nama Asisten", "Mata Kuliah", "Kelas", "Check-in", "Check-out"].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-center font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  -
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {formatDate(row.created_date) || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.user_fullname || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.course_name || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.class_name || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.check_in || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.check_out || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          onClick={() => {
            alert('Generate PDF feature coming soon!');
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default KH_Koordinator;