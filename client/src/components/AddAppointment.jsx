import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../style";
import Layout from "../pages/Layout";

const AddAppointment = () => {
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses and classes on component mount
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        setCourses(response.data.data); // Access 'data' array directly
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses.");
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/classes');
        setClasses(response.data.data); // Access 'data' array directly
      } catch (error) {
        console.error("Error fetching classes:", error);
        alert("Failed to load classes.");
      }
    };

    fetchCourses();
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedClass) {
      alert("Please select both a course and a class.");
      return;
    }

    try {
      // Make the appointment creation request
      const response = await axios.post('http://localhost:3001/appointment', {
        courseId: selectedCourse,
        classId: selectedClass,
      });

      if (response.data.code === "200" && response.data.status === "success") {
        alert("Appointment created successfully!");
        navigate('/appointments'); // Navigate to the appointments page (adjust as needed)
      } else {
        alert(`Failed to create appointment: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("An error occurred while creating the appointment.");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="course" className="block font-semibold mb-2">Select Course:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course.crsId} value={course.crsId}>
                {course.crsCourseName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="class" className="block font-semibold mb-2">Select Class:</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls.cssId} value={cls.cssId}>
                {cls.cssClassName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Create Appointment
        </button>
      </form>
    </Layout>
  );
};

export default AddAppointment;