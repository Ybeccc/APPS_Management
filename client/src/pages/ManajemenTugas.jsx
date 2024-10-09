import React, { useState } from "react";
import Layout from "./Layout";
import styles from '../style';

const ManajemenTugas = () => {
  const [data] = useState([
    { date: "2024-10-01", name: "John Doe", course: "Oracle Database Administrator", class: "A", task: "Homework 1", note: "Complete by Friday" },
    { date: "2024-10-02", name: "Jane Smith", course: "Database Systems", class: "B", task: "Lab Report", note: "Due next Monday" },
    { date: "2024-09-15", name: "Michael Brown", course: "Data Mining", class: "C", task: "Project Proposal", note: "Review with team" },
    { date: "2023-10-03", name: "Emily White", course: "Database Administration", class: "A", task: "Presentation", note: "Due on Wednesday" },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Handle dropdown change for month and year
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Filter data by selected month and year
  const filteredData = data.filter(row => {
    const rowDate = new Date(row.date);
    const rowMonth = rowDate.getMonth() + 1; // getMonth() is zero-indexed
    const rowYear = rowDate.getFullYear();

    return (
      (selectedMonth ? rowMonth === parseInt(selectedMonth) : true) &&
      (selectedYear ? rowYear === parseInt(selectedYear) : true)
    );
  });

  return (
    <Layout>
      <h1 className={`${styles.heading2}`}>
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

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6 mt-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">Tanggal</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Nama</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Mata Kuliah</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-24">Kelas</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">Deskripsi Tugas</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.date}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.name}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.course}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.class}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.task}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Add Row
        </button>
      </div>
      <div className="bottom-4 left-4 z-50">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Generate PDF
        </button>
      </div>
    </Layout>
  );
};

export default ManajemenTugas;