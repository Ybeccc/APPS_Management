import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../style";

const EditPenggajian = () => {
  const { id } = useParams();
  const [prlNominal, setPrlNominal] = useState('');
  const [prlPayrollStatus, setPrlPayrollStatus] = useState('pending');
  const [prlUserId, setPrlUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/payrolls/${id}`)
      .then((response) => {
        console.log('Payroll Data:', response.data);
        const payroll = response.data.data;
        setPrlNominal(payroll.prlNominal || '');
        setPrlPayrollStatus(payroll.prlPayrollStatus || 'pending');
        setPrlUserId(payroll.prlUserId);
      })
      .catch((error) => console.error('Error fetching payroll data:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/payrolls/update/${id}`, {
        prlUserId,
        prlNominal,
        prlPayrollStatus,
      });
      alert('Gaji berhasil diperbarui!');
      navigate('/penggajian');
    } catch (error) {
      console.error('Error updating payroll:', error);
      alert('Terjadi kesalahan saat memperbarui gaji.');
    }
  };

  return (
    <Layout>
      <div className="p-0">
        <h1 className={styles.heading2}>Edit Gaji</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        >
          Kembali
        </button>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nominal</label>
                <input
                  type="number"
                  value={prlNominal}
                  onChange={(e) => setPrlNominal(e.target.value)}
                  placeholder="Masukkan Nominal"
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={prlPayrollStatus}
                onChange={(e) => setPrlPayrollStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <div className="mt-6">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPenggajian;