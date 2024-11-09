import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/classes')
      .then((response) => {
        if (response.data.code === "200") {
          // Sort classes alphabetically by `cssClassName`
          const sortedClasses = response.data.data.sort((a, b) =>
            a.cssClassName.localeCompare(b.cssClassName)
          );
          setClasses(sortedClasses);
        } else {
          setError('Error fetching classes');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching classes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading Classes...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <Layout>
      <h1 className={`${styles.heading2} text-2xl mb-6`}>Available Classes</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {classes.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Tidak ada kelas.</p>
        ) : (
          classes.map((classItem) => (
            <div key={classItem.cssId} className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition">
              <h2 className="text-lg font-medium text-gray-800">Kelas {classItem.cssClassName}</h2>
            </div>
          ))
        )}
      </div>

      <div className="flex">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate('/class/add')}
        >
          Buat Kelas Baru
        </button>
      </div>
    </Layout>
  );
};

export default Class;