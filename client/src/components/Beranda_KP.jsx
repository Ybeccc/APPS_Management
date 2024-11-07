import React from 'react';
import Welcome from "./Welcome";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Beranda_KP = () => {
  const navigate = useNavigate();

  return (
    <div className="p-0">
      <Welcome />

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 rounded"
        onClick={() => navigate('/classcourse')}
      >
        Daftar Mata Kuliah dan Kelas
      </button>

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate('/appointment')}
      >
        Daftar Mata Kuliah Asisten
      </button>

    </div>
  );
}

export default Beranda_KP;