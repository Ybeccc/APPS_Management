import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPenggajian = () => {
  const { id } = useParams(); // Get the payroll ID from the URL
  const [fullname, setFullname] = useState('');
  const [nominal, setNominal] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the payroll data by ID when the component loads
    axios.get(`http://localhost:3001/payrolls/${id}`)
      .then((response) => {
        const { prlUserId, prlNominal, prlPayrollStatus } = response.data; // Adjust based on your API response structure
        setFullname(prlUserId); // Set the fullname to the user ID or name as necessary
        setNominal(prlNominal);
        setStatus(prlPayrollStatus);
      })
      .catch((error) => console.error('Error fetching payroll data:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/update/payrolls`, { // Change to PUT for update
        nominal,
        status,
      });
      alert('Gaji berhasil diperbarui!');
      navigate('/penggajian'); // Navigate back to payroll list
    } catch (error) {
      console.error('Error updating payroll:', error);
      alert('Terjadi kesalahan saat memperbarui gaji.');
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Gaji</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border rounded-lg shadow-md p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nama Asisten</label>
              <input
                type="text"
                value={fullname}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nominal</label>
                <input
                  type="number"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Masukkan Nominal"
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
              >
                <option value="pending">Pending</option>
                <option value="approved">Done</option>
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