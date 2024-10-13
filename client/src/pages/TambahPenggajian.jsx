import React, { useState } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to navigate back or submit

const TambahPenggajian = () => {
  const [selectedAssistant, setSelectedAssistant] = useState('');
  const [nominal, setNominal] = useState('');
  const [status, setStatus] = useState('pending'); // Default status
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log({ selectedAssistant, nominal, status });
  };

  return (
    <Layout>
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tambah Gaji</h1>

        <form onSubmit={handleSubmit}>
            {/* Form Table */}
            <div className="bg-white border rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Assistant Selection */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Nama Asisten</label>
                <select 
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
                >
                    <option value="">Pilih Asisten</option>
                    <option value="assistant1">Asisten 1</option>
                    <option value="assistant2">Asisten 2</option>
                    {/* Add more options as needed */}
                </select>
                </div>

                {/* Nominal Input */}
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

            {/* Status Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3"
                >
                <option value="pending">pending</option>
                <option value="approved">done</option>
                </select>
            </div>

            {/* Save Button */}
            <div className="mt-6">
                <button type="submit" className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
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
