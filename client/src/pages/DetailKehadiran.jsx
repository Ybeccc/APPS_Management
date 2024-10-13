import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const DetailKehadiran = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">Detail Kehadiran</h1>

        {/* Month Dropdown */}
        <div className="mb-6">
          <select className="border border-gray-300 rounded px-4 py-2 w-40">
            <option value="january">Pilih Bulan</option>
            <option value="january">Januari</option>
            <option value="february">Februari</option>
            {/* Add other months here */}
          </select>
        </div>

        {/* Attendance Stats */}
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <span className="block text-lg">hadir</span>
            <span className="text-4xl font-bold">1</span>
          </div>
          <div className="text-center">
            <span className="block text-lg">tidak hadir</span>
            <span className="text-4xl font-bold">2</span>
          </div>
        </div>

        <hr className="mb-6" />

        {/* Recent Activity */}
        <h2 className="text-xl font-bold mb-4">Aktivitas Terbaru</h2>
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <span className="block text-gray-500">Check-in</span>
              <span>Senin, 01 Januari 2024</span>
            </div>
            <span>09:00</span>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <span className="block text-gray-500">Check-Out</span>
              <span>Senin, 01 Januari 2024</span>
            </div>
            <span>09:00</span>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <span className="block text-gray-500">Check-in</span>
              <span>Senin, 01 Januari 2024</span>
            </div>
            <span>09:00</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </Layout>
  );
};

export default DetailKehadiran;
