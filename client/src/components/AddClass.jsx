import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const [cssClassName, setCssClassName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/classes', { cssClassName });
      setCssClassName('');
      setError('');
      alert('Class added successfully!');
    } catch (err) {
      setError('Error adding class!');
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Buat Kelas Baru</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)} // Back button
      >
        Kembali
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Kelas</label>
          <input
            type="text"
            value={cssClassName}
            onChange={(e) => setCssClassName(e.target.value)}
            placeholder="Masukkan Nama Kelas"
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

export default AddClass;