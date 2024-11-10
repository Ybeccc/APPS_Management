import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";

const TugasDaftarAsisten = () => {
  const { id: usrId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/task/user/${usrId}`);
      if (response.data && response.data.status === 'success') {
        const sortedData = response.data.data.sort((a, b) => new Date(b.tsk_created) - new Date(a.tsk_created));
        setTasks(sortedData);
        setFilteredTasks(sortedData);
      } else {
        console.error('Error fetching tasks:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
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

      {/* Dropdowns for Month and Year */}
      <div className="flex space-x-4 mb-4">
        <select 
          value={month} 
          onChange={handleMonthChange} 
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">-- Pilih Bulan --</option>
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maret</option>
          <option value="4">April</option>
          <option value="5">Mei</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">Agustus</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>

        <select 
          value={year} 
          onChange={handleYearChange} 
          className="border border-gray-300 px-4 py-2 rounded"
        >
          <option value="">-- Pilih Tahun --</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

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
    </Layout>
  );
};

export default TugasDaftarAsisten;