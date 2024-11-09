import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const ClassCourse = () => {
  const [classCourses, setClassCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/allclasscourse')
      .then(response => {
        if (response.data.code === "200" && response.data.status === "success") {
          const sortedData = response.data.data.sort((a, b) => 
            a.appointment_name.localeCompare(b.appointment_name)
          );
          setClassCourses(sortedData);
          setError(null);
        } else {
          setError("Failed to load class courses");
        }
      })
      .catch(err => {
        setError("An error occurred while fetching data");
      });
  }, []);

  return (
    <Layout>
        <h1 className={`${styles.heading2} mb-4`}>Daftar Mata Kuliah dan Kelas</h1>
        <button
            className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
            onClick={() => navigate(-1)} // Back button
        >
            Kembali
        </button>

      {/* Error Message */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-6">
          {/* Class Courses List */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classCourses.map((course, index) => (
              <li 
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <span className="text-lg font-medium">{course.appointment_name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Create Class Course Button */}
      <button 
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        onClick={() => navigate('/classcourse/add')}
      >
        Buat Mata Kuliah - Kelas
      </button>
    </Layout>
  );
}

export default ClassCourse;