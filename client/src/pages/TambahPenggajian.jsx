import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TambahPenggajian = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [nominal, setNominal] = useState('');
  const [status, setStatus] = useState('pending');
  const [assistants, setAssistants] = useState([]); // State to hold assistant list
  const navigate = useNavigate();

  // Function to fetch assistants based on usrRoleId
  const fetchAssistants = async (roleId) => {
    try {
      const endpoint = roleId === 1 
        ? 'http://localhost:3001/practicumast' 
        : 'http://localhost:3001/studentast';
      const response = await axios.get(endpoint);
      
      // Check if response is successful and data is an array
      if (response.data.code === "200" && response.data.status === "success") {
        setAssistants(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        setAssistants([]); // Set an empty array if no data
      }
    } catch (error) {
      console.error('Error fetching assistants:', error);
      setAssistants([]); // Fallback to empty array on error
    }
  };

  // Initial fetch when component mounts, assuming `usrRoleId` is known here
  useEffect(() => {
    const usrRoleId = 1; // Change this to 2 if you need to fetch student assistants
    fetchAssistants(usrRoleId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/payrolls', {
        fullname: selectedAssistant,
        nominal,
        status,
      });
      alert('Gaji berhasil ditambahkan!');
      navigate('/penggajian'); // Navigate back to payroll list
    } catch (error) {
      console.error('Error adding payroll:', error);
      alert('Terjadi kesalahan saat menambahkan gaji.');
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tambah Gaji</h1>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Asisten</label>
                <select
                  value={selectedAssistant}
                  onChange={(e) => setSelectedAssistant(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
                  required
                >
                  <option value="">Pilih Asisten</option>
                  {Array.isArray(assistants) && assistants.map((assistant, index) => (
                    <option key={index} value={assistant.usrFullName}>
                      {assistant.usrFullName}
                    </option>
                  ))}
                </select>
              </div>

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

export default TambahPenggajian;