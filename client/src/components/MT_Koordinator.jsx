import React, { useEffect, useState } from "react";
import styles from "../style";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TaskPDFDocument from "../components/pdf/TaskPDFDocument";
import { useSelector } from "react-redux";

const MT_Koordinator = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { user } = useSelector((state) => state.auth); // Get current user data from Redux

  useEffect(() => {
    if (user && user.data) {
      getTasksByRole(user.data.usrId);
    }
  }, [user]);

  useEffect(() => {
    filterTasks();
  }, [selectedMonth, selectedYear, tasks]);

  // Fetch tasks based on usrId and role_id
  const getTasksByRole = async (usrId) => {
    try {
      let role_id;
      if (usrId === 1) {
        role_id = 3; // Set role_id to 3 if usrId is 1
      } else if (usrId === 2) {
        role_id = 4; // Set role_id to 4 if usrId is 2
      }

      if (!role_id) {
        console.error("Invalid usrId for payroll data fetch");
        return;
      }

      const response = await axios.get(`http://localhost:3001/task/role/${role_id}`);
      if (Array.isArray(response.data.data)) {
        // Sort tasks from newest to oldest based on tsk_created
        const sortedTasks = response.data.data.sort(
          (a, b) => new Date(b.tsk_created) - new Date(a.tsk_created)
        );
        setTasks(sortedTasks);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (selectedMonth) {
      filtered = filtered.filter(
        (task) => new Date(task.tsk_created).getMonth() + 1 === parseInt(selectedMonth)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (task) => new Date(task.tsk_created).getFullYear() === parseInt(selectedYear)
      );
    }
    setFilteredTasks(filtered);
  };

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Manajemen Tugas</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-2">
        {/* Month Filter */}
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

        {/* Year Filter */}
        <select
          className="border px-4 py-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">-- Pilih Tahun --</option>
          {[2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse bg-white mb-6">
          <thead>
            <tr className="bg-[#7b2cbf]">
              <th className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm">No</th>
              {["Tanggal", "Mata Kuliah", "Kelas", "Nama Asisten", "Nama Tugas", "Deskripsi Tugas", "Catatan"].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <tr key={task.tsk_id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {isNaN(new Date(task.tsk_created).getTime())
                      ? "Invalid Date"
                      : format(new Date(task.tsk_created), "dd MMMM yyyy", { locale: id })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.course_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left max-w-xs">{task.class_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left max-w-xs">{task.user_fullname || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.tsk_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.description || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{task.notes || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada tugas untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PDF Button */}
      <div className="bottom-4 left-4 z-50">
        {selectedMonth && selectedYear ? (
          <PDFDownloadLink
            document={<TaskPDFDocument tasks={filteredTasks} />}
            fileName="Manajemen_Tugas.pdf"
          >
            {({ loading }) =>
              loading ? "Loading PDF..." : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
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

export default MT_Koordinator;