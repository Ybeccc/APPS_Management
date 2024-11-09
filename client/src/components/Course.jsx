import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/courses')
      .then((response) => {
        if (response.data.code === "200") {
          setCourses(response.data.data);
        } else {
          setError('Error fetching courses');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching courses');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading Courses...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <Layout>
      <h1 className={`${styles.heading2} text-2xl mb-6`}>Daftar Mata Kuliah</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)} // Back button
      >Kembali</button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {courses.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Tidak ada mata kuliah.</p>
        ) : (
          courses.map((course) => (
            <div key={course.crsId} className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition">
              <h2 className="text-lg font-medium text-gray-800">{course.crsCourseName}</h2>
              <p className="text-sm text-gray-600 mt-1">Kode MK: {course.crsCode}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate('/course/add')}
        >
          Buat Mata Kuliah Baru
        </button>
      </div>
    </Layout>
  );
};

export default Course;