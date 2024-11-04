import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TambahPenggajian = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [nominal, setNominal] = useState('');
  const [status, setStatus] = useState('pending');
  const [assistants, setAssistants] = useState([]);
  const navigate = useNavigate();

  // Get the current usrRoleId and usrUsername from the Redux state
  const usrRoleId = useSelector((state) => state.auth.user.data.usrRoleId);
  const usrUsername = useSelector((state) => state.auth.user.data.usrUsername);

  const fetchAssistants = async (roleId) => {
    try {
      const endpoint = roleId === 1 
        ? 'http://localhost:3001/practicumast' 
        : roleId === 2 
        ? 'http://localhost:3001/studentast' 
        : null;

      if (!endpoint) {
        console.warn('Invalid usrRoleId, no endpoint selected.');
        setAssistants([]);
        return;
      }

      const response = await axios.get(endpoint);

      if (response.data.code === "200" && response.data.status === "success") {
        setAssistants(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        setAssistants([]);
      }
    } catch (error) {
      console.error('Error fetching assistants:', error);
      setAssistants([]);
    }
  };

  useEffect(() => {
    if (usrRoleId) {
      fetchAssistants(usrRoleId);
    }
  }, [usrRoleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creating the payload with usrUsername for prlCreatedBy
      const payload = {
        prlUserId: selectedAssistant, // Ensure this is the correct ID for the assistant
        prlNominal: nominal,
        prlPayrollStatus: status,
        prlCreatedBy: usrUsername // Dynamically set the creator's username
      };

      const response = await axios.post('http://localhost:3001/payrolls', payload);
      console.log('Server response:', response.data);
      console.log('Payload being sent:', payload);

      if (response.status === 200 || response.status === 201) {
        alert('Gaji berhasil ditambahkan!');
        navigate('/penggajian');
      } else {
        alert('Terjadi kesalahan saat menambahkan gaji. Mohon periksa kembali.');
      }
    } catch (error) {
      console.error('Error adding payroll:', error);
      alert('Terjadi kesalahan saat menambahkan gaji.');
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tambah Gaji</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => navigate(-1)} // Back button
        >
          Kembali
        </button>

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
                  {assistants.map((assistant, index) => (
                    // Set the value to assistant.usrId instead of assistant.usrFullName
                    <option key={index} value={assistant.usrId}>
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