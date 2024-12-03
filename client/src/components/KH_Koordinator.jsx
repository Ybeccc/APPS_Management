import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import styles from "../style";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendancePDFDocument from "../components/pdf/AttendancePDFDocument";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const KH_Koordinator = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data) {
      fetchAttendanceData(user.data.usrId);
    }
  }, [user]);

  useEffect(() => {
    filterData();
  }, [selectedMonth, selectedYear, data]);

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
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
        setData(sortedData);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "-";
    const checkInDate = new Date(`1970-01-01T${checkIn}Z`);
    const checkOutDate = new Date(`1970-01-01T${checkOut}Z`);
    const diff = (checkOutDate - checkInDate) / 1000; // Difference in seconds

    if (diff < 0) return "-"; // Check if duration is negative

    const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(diff % 60)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const filterData = () => {
    let filtered = data;
    if (selectedMonth) {
      filtered = filtered.filter(
        (item) => new Date(item.created_date).getMonth() + 1 === parseInt(selectedMonth)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (item) => new Date(item.created_date).getFullYear() === parseInt(selectedYear)
      );
    }
    setFilteredData(filtered);
  };

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Kehadiran</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-2">
        <select
          className="border px-4 py-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">-- Pilih Bulan --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {format(new Date(0, i), "MMMM", { locale: id })}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">-- Pilih Tahun --</option>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#7b2cbf] text-white">
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-sm">No</th>
              {["Tanggal", "Nama Asisten", "Mata Kuliah", "Kelas", "Check-in", "Check-out", "Durasi"].map((header, index) => (
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
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Tidak ada kehadiran untuk ditampilkan.
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
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
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {calculateDuration(row.check_in, row.check_out)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Conditional PDF Button */}
      <div className="mt-4">
        {selectedMonth && selectedYear ? (
          <PDFDownloadLink
            document={<AttendancePDFDocument data={filteredData} />}
            fileName="Attendance_Report.pdf"
          >
            {({ loading }) =>
              loading ? "Loading PDF..." : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded transition">
                  Generate PDF
                </button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
            Pilih Bulan dan Tahun untuk melakukan Generate PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default KH_Koordinator;