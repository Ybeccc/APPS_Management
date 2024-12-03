import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from your API endpoint with Axios
    axios.get('http://localhost:3001/allappointment')
      .then(response => {
        if (response.data.status === "success") {
          setAppointments(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <Layout>
      <h1 className={`${styles.heading2} mb-4`}>Daftar Mata Kuliah Asisten</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}>Kembali</button>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-[#7b2cbf]">
              <th className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm">No</th>
              {["Status", "Nama Lengkap", "Mata Kuliah", "Kelas"].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {appointments.map((appointment, index) => (
              <tr key={appointment.aptid} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6 text-center">{appointment.usrstatus}</td>
                <td className="py-3 px-6 text-center">{appointment.usrfullname}</td>
                <td className="py-3 px-6 text-center">{appointment.coursename}</td>
                <td className="py-3 px-6 text-center">{appointment.classname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate('/appointment/add')}
        >
          Buat Mata Kuliah Asisten Baru
        </button>
      </div>
    </Layout>
  );
};

export default Appointment;