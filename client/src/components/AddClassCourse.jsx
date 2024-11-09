import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../pages/Layout";
import styles from "../style";
import { useNavigate } from 'react-router-dom';

const AddClassCourse = () => {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch classes and courses when component mounts
  useEffect(() => {
    const fetchClassesAndCourses = async () => {
      try {
        const classResponse = await axios.get('http://localhost:3001/classes');
        const courseResponse = await axios.get('http://localhost:3001/courses');

        setClasses(classResponse.data.data);
        setCourses(courseResponse.data.data);
      } catch (err) {
        setError('Error loading data!');
      }
    };
    fetchClassesAndCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedCourse) {
      setError('Please select both class and course!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/classcourse', {
        ccCrsId: selectedCourse,
        ccCssId: selectedClass,
      });

      console.log("Server Response:", response.data);

      if (response.data.code === "200" && response.data.status === "success") {
        alert('Mata Kuliah - Kelas Baru Berhasil Ditambahkan!');
        setSelectedClass('');
        setSelectedCourse('');
        setError('');
        
        navigate('/classcourse');
      } else {
        setError('Gagal untuk membuat mata kuliah - kelas baru');
      }
    } catch (err) {
      setError('Error creating class-course relationship!');
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Buat Mata Kuliah - Kelas</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)} // Back button
      >
        Kembali
      </button>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Pilih Mata Kuliah</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Pilih Mata Kuliah</option>
            {courses.map((course) => (
              <option key={course.crsId} value={course.crsId}>
                {course.crsCourseName} ({course.crsCode})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pilih Kelas</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Pilih Kelas</option>
            {classes.map((cls) => (
              <option key={cls.cssId} value={cls.cssId}>
                {cls.cssClassName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Buat
        </button>
      </form>
    </Layout>
  );
};

export default AddClassCourse;