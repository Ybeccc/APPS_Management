import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [crsCourseName, setCrsCourseName] = useState('');
  const [crsCode, setCrsCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!crsCourseName || crsCourseName.length > 100) {
      setError('Course name is required and must be under 100 characters.');
      return;
    }
    if (!crsCode || crsCode.length > 7) {
      setError('Course code is required and must be under 7 characters.');
      return;
    }

    try {
      // Send POST request to add a new course
      const response = await axios.post('http://localhost:3001/courses', { crsCourseName, crsCode });
      
      console.log("Server Response:", response.data);
      
      setCrsCourseName('');
      setCrsCode('');
      setError('');
      alert('Mata Kuliah Baru Berhasil Ditambahkan!');
      
      navigate('/course');
      
    } catch (err) {
      const serverError = err.response?.data?.message || 'Error adding course!';
      setError(serverError);
      console.error("Error Response:", err.response?.data);
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Buat Mata Kuliah Baru</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)} // Back button
      >
        Kembali
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Mata Kuliah</label>
          <input
            type="text"
            value={crsCourseName}
            onChange={(e) => setCrsCourseName(e.target.value)}
            placeholder="Masukkan Nama Mata Kuliah"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kode Mata Kuliah</label>
          <input
            type="text"
            value={crsCode}
            onChange={(e) => setCrsCode(e.target.value)}
            placeholder="Masukkan Kode Mata Kuliah"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Buat
        </button>
      </form>
    </Layout>
  );
};

export default AddCourse;