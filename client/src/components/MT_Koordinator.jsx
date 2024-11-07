import React, { useEffect, useState } from "react";
import styles from "../style";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TaskPDFDocument from "../components/pdf/TaskPDFDocument";

const MT_Koordinator = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [selectedMonth, selectedYear, tasks]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/task");
      if (Array.isArray(response.data.data)) {
        // Sort tasks from newest to oldest based on tskCreatedAt
        const sortedTasks = response.data.data.sort(
          (a, b) => new Date(b.tskCreatedAt) - new Date(a.tskCreatedAt)
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
        (task) => new Date(task.tskCreatedAt).getMonth() + 1 === parseInt(selectedMonth)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (task) => new Date(task.tskCreatedAt).getFullYear() === parseInt(selectedYear)
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
          <option value="">Pilih Bulan</option>
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
          <option value="">Pilih Tahun</option>
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
              {["Tanggal", "Nama Tugas", "Deskripsi Tugas", "Catatan", "Nama Asisten"].map((header, index) => (
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
              filteredTasks.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {isNaN(new Date(row.tskCreatedAt).getTime())
                      ? "Invalid Date"
                      : format(new Date(row.tskCreatedAt), "dd MMMM yyyy", { locale: id })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.tskTaskName || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left max-w-xs">{row.tskDescription || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left max-w-xs">{row.tskNotes || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.tskCreatedBy || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
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