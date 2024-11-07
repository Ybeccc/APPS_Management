import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import styles from "../style";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TaskPDFAssistantDoc from "../components/pdf/TaskPDFAssistantDoc";
import logo from '../assets/logo.png';

const MT_Asisten = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data && user.data.usrId) {
      fetchTasks(user.data.usrId);
    }
  }, [user]);

  const fetchTasks = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/task/user/${usrId}`);
      console.log("Tasks fetched:", response.data);

      if (response.data.data) {
        const sortedTasks = response.data.data.sort((a, b) => new Date(b.tsk_created) - new Date(a.tsk_created));
        setTasks(sortedTasks);
        setFilteredTasks(sortedTasks); // Initially set filtered tasks to all tasks
      } else {
        setTasks([]);
        setFilteredTasks([]); // Ensure filtered tasks are empty
        console.warn("No tasks found for the user.");
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

  useEffect(() => {
    filterTasks();
  }, [selectedMonth, selectedYear, tasks]);

  const handleGeneratePDF = () => {
    console.log(`Generating PDF for ${selectedMonth} ${selectedYear}`);
  };

  return (
    <div className="p-0">
      <h1 className={styles.heading2}>Manajemen Tugas</h1>
      <Link to="/manajementugas/tambah">
        <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
          + Tambah Tugas
        </button>
      </Link>

      <div className="flex space-x-4 mb-2">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 px-4 py-2 mr-2"
        >
          <option value="">Pilih Bulan</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 px-4 py-2"
        >
          <option value="">Pilih Tahun</option>
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - 2 + i; // 2 past, 1 current, 2 future
            return (
              <option key={i} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#7b2cbf]">
              {["No", "Tanggal", "Nama Mata Kuliah", "Kelas", "Deskripsi Tugas", "Catatan", "Nama Asisten", "Edit"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <tr key={task.tsk_id}>
                  <td className="py-2 px-4 border-r text-center text-sm">{index + 1}</td>
                  <td className="border px-4 py-2 text-center text-sm">
                    {new Date(task.tsk_created).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2 text-center text-sm">
                    {task.course_name}
                  </td>
                  <td className="border px-4 py-2 text-center text-sm">
                    {task.class_name}
                  </td>
                  <td className="border px-4 py-2 max-w-xs text-sm">
                    {task.description}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {task.notes}
                  </td>
                  <td className="border px-4 py-2 text-center text-sm">
                    {task.user_fullname}
                  </td>
                  <td className="border px-4 py-2 text-center text-sm">
                    <div className="flex justify-center">
                      <button
                        className="flex items-center text-green-500 hover:text-green-700 transition"
                        onClick={() => {
                          console.log("Navigating to edit task with ID:", task.tsk_id);
                          navigate(`/manajementugas/edit/${task.tsk_id}`);
                        }}
                      >
                        <FaEdit className="mr-1" /> Ubah
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-sm">
                  Tidak ada data untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PDF Button */}
      <div className="bottom-4 left-4 z-50 mt-5">
        {selectedMonth && selectedYear ? (
          <PDFDownloadLink
            document={
              <TaskPDFAssistantDoc
                tasks={filteredTasks}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            }
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

export default MT_Asisten;