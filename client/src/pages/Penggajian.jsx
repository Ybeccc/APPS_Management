import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import styles from '../style';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Penggajian = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/payrolls')
      .then((response) => {
        const payrollData = Array.isArray(response.data) ? response.data : response.data.data || [];
        setData(payrollData);
      })
      .catch((error) => console.error('Error fetching payroll data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/payrolls/${id}`)
      .then(() => {
        setData(data.filter((item) => item.prlId !== id));
        alert('Data berhasil dihapus');
      })
      .catch((error) => console.error('Error deleting payroll:', error));
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
  };

  return (
    <Layout>
      <h1 className={`${styles.heading2} mb-6`}>Penggajian</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          onClick={() => navigate('/penggajian/tambah')}
        >
          + Gaji
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {["Tanggal", "Nama", "Nominal", "Status", "Edit", "Delete"].map((header, index) => (
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
                  Tidak ada data gaji yang tersedia
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.prlId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">{formatDate(row.prlCreatedAt)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">{row.prlUserId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">{row.prlNominal}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">{row.prlPayrollStatus}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center"> {/* Center the button */}
                    <div className="flex justify-center"> {/* Flex container for centering */}
                      <button
                        className="flex items-center text-green-500 hover:text-green-700 transition"
                        onClick={() => navigate(`/penggajian/edit/${row.prlId}`)}
                      >
                        <FaEdit className="mr-1" /> Ubah
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center"> {/* Center the button */}
                    <div className="flex justify-center"> {/* Flex container for centering */}
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(row.prlId)}
                      >
                        <FaTrash className="mr-1" /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Penggajian;