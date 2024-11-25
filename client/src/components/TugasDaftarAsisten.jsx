import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TaskPDFDocument from "../components/pdf/TaskPDFDocument";

const TugasDaftarAsisten = () => {
  const { id: usrId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3001/task/user/${usrId}`);
      if (response.data && response.data.status === 'success') {
        const sortedData = response.data.data.sort((a, b) => new Date(b.tsk_created) - new Date(a.tsk_created));
        setTasks(sortedData);
        setFilteredTasks(sortedData);
      } else {
        setError('Error fetching tasks: ' + response.data.message);
      }
    } catch (error) {
      setError('Error fetching tasks: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    filterData(e.target.value, year);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    filterData(month, e.target.value);
  };

  const filterData = (selectedMonth, selectedYear) => {
    const filtered = tasks.filter(task => {
      const date = new Date(task.tsk_created);
      const taskMonth = date.getMonth() + 1;
      const taskYear = date.getFullYear();
      return (
        (!selectedMonth || taskMonth === parseInt(selectedMonth)) &&
        (!selectedYear || taskYear === parseInt(selectedYear))
      );
    });
    setFilteredTasks(filtered);
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Daftar Tugas Asisten</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)} // Back button
      >
        Kembali
      </button>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Loading Spinner */}
      {isLoading && <div className="text-blue-500 mb-4">Loading data...</div>}

      {/* Dropdowns for Month and Year */}
      <div className="flex space-x-4 mb-4">
        <select 
          value={month} 
          onChange={handleMonthChange} 
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">-- Pilih Bulan --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>

        <select 
          value={year} 
          onChange={handleYearChange} 
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">-- Pilih Tahun --</option>
          {[2024, 2023, 2022].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Task Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr style={{ backgroundColor: '#7b2cbf', color: 'white' }}>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Tanggal Dibuat</th>
            <th className="border px-4 py-2">Mata Kuliah</th>
            <th className="border px-4 py-2">Kelas</th>
            <th className="border px-4 py-2">Deskripsi</th>
            <th className="border px-4 py-2">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={task.tsk_id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(task.tsk_created).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="border px-4 py-2 text-center">{task.course_name}</td>
                <td className="border px-4 py-2 text-center">{task.class_name}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">Tidak ada tugas ditemukan</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditional PDF Button */}
      <div className="mt-4">
        {month && year ? (
          <PDFDownloadLink
            document={<TaskPDFDocument data={filteredTasks} />}
            fileName={`Task_Report_${year}_${month}.pdf`}
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
    </Layout>
  );
};

export default TugasDaftarAsisten;