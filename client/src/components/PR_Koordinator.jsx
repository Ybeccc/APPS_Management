import React, { useState, useEffect } from 'react';
import styles from '../style';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from "react-redux";

const PR_Koordinator = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data) {
      fetchPayrollData(user.data.usrId);
    }
  }, [user]);

  const fetchPayrollData = async (usrId) => {
    try {
      const role_id = usrId === 1 ? 3 : usrId === 2 ? 4 : null;

      if (!role_id) {
        console.error("Invalid usrId for payroll data fetch");
        return;
      }

      const response = await axios.get(`http://localhost:3001/payroll/role/${role_id}`);
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    }
  };

  const handleDelete = (user_ba_number) => {
    axios.delete(`http://localhost:3001/delete/payroll/${user_ba_number}`)
      .then(() => {
        setData(data.filter((item) => item.user_ba_number !== user_ba_number));
        alert('Data berhasil dihapus');
      })
      .catch((error) => console.error('Error deleting payroll:', error));
  };

  // Format date to Indonesian format DD MMMM YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Penggajian</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          onClick={() => navigate('/penggajian/tambah')}
        >
          + Gaji
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#7b2cbf]">
              {["No", "Tanggal", "Nama", "Nominal", "Status", "Edit", "Delete"].map((header, index) => (
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
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada data gaji yang tersedia
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {formatDate(row.created_date)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.user_fullname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {formatCurrency(row.nominal)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.payroll_status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button
                        className="flex items-center text-green-500 hover:text-green-700 transition"
                        onClick={() => navigate(`/penggajian/edit/${row.user_ba_number}`)}
                      >
                        <FaEdit className="mr-1" /> Ubah
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(row.user_ba_number)}
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
    </div>
  )
}

export default PR_Koordinator;