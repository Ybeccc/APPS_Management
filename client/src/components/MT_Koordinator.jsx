import React, { useEffect, useState } from "react";
import Layout from "../pages/Layout"; // Layout wrapper component
import styles from "../style"; // Importing external styles if required
import axios from "axios";

const MT_Koordinator = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/task");
      if (Array.isArray(response.data.data)) {
        setTasks(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const filteredData = tasks.filter((task) => {
    const taskDate = new Date(task.tsk_created_at);
    const taskMonth = taskDate.getMonth() + 1;
    const taskYear = taskDate.getFullYear();
    return (
      (selectedMonth ? taskMonth === parseInt(selectedMonth) : true) &&
      (selectedYear ? taskYear === parseInt(selectedYear) : true)
    );
  });

  return (
    <div className="p-2">
      <h1 className={`${styles.heading2} mb-6`}>
        Manajemen Tugas
      </h1>

      {/* Filter Section */}
      <div className="mb-6 flex gap-4">
        {/* Filter by Month */}
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        {/* Filter by Year */}
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">All Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6 mt-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">
                Tanggal
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">
                Nama
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">
                Mata Kuliah
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-24">
                Kelas
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">
                Deskripsi Tugas
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {new Date(row.tsk_created_at).toLocaleDateString()}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {row.user_fullname}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {row.course_name}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {row.class_name}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {row.tsk_description}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {row.tsk_notes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada tugas untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PDF Button */}
      <div className="bottom-4 left-4 z-50">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default MT_Koordinator;