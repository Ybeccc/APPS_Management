import React, { useState } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const EditPenggajian = ({ assistantName, initialNominal, initialStatus }) => {
  const [nominal, setNominal] = useState(initialNominal);
  const [status, setStatus] = useState(initialStatus);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log({ nominal, status });
    // Optionally navigate back to the previous page
    navigate(-1);
  };

  return (
    <Layout>
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Gaji</h1>

        <form onSubmit={handleSubmit}>
            {/* Form Table */}
            <div className="bg-white border rounded-lg shadow-md p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Asisten</label>
                <input 
                type="text" 
                value={assistantName}
                readOnly // Make assistant name read-only
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 bg-gray-100" // Gray background for read-only field
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
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

// Example usage:
// <EditGaji assistantName="Asisten 1" initialNominal={1000000} initialStatus="pending" />

export default EditPenggajian;