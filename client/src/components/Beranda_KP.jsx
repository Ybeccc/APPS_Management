import React, { useEffect, useState } from 'react';
import Welcome from "./Welcome";
import { useNavigate } from 'react-router-dom';

const Beranda_KP = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/course/listassistant/3');
        const data = await response.json();
        if (data.status === "success") {
          setCourses(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-0">
      <Welcome />

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 rounded hover:bg-blue-600 transition"
        onClick={() => navigate('/course')}
      >
        Daftar Mata Kuliah
      </button>

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 rounded hover:bg-blue-600 transition"
        onClick={() => navigate('/class')}
      >
        Daftar Kelas
      </button>

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 mr-5 rounded hover:bg-blue-600 transition"
        onClick={() => navigate('/classcourse')}
      >
        Daftar Mata Kuliah dan Kelas
      </button>

      <button 
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 transition"
        onClick={() => navigate('/appointment')}
      >
        Daftar Mata Kuliah Asisten
      </button>

      {/* Course List Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Mata Kuliah dan Asisten</h2>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
                <h3 className="text-lg font-medium mb-2">{course.course_name}</h3>
                <ul className="list-disc list-inside">
                  {course.list_assistants.split(', ').map((assistant, i) => (
                    <li key={i}>{assistant}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default Beranda_KP;