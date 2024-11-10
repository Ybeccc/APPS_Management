import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../style";
import Layout from "../pages/Layout";

const AddAppointment = () => {
  const [classCourses, setClassCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedClassCourse, setSelectedClassCourse] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/allclasscourse');
        if (response.data.code === "200") {
          setClassCourses(response.data.data);
        } else {
          alert("Failed to load class courses.");
        }
      } catch (error) {
        console.error("Error fetching class courses:", error);
        alert("Failed to load class courses.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/practicumast');
        if (response.data.code === "200") {
          setUsers(response.data.data);
        } else {
          alert("Failed to load users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
      }
    };

    fetchClassCourses();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClassCourse || !selectedUser) {
      alert("Please select both a class course and a user.");
      return;
    }

    console.log("Selected Class Course ID:", selectedClassCourse);
    console.log("Selected Practicum Assistant ID:", selectedUser);

    try {
      const response = await axios.post('http://localhost:3001/appointment', {
        aptCcId: selectedClassCourse,
        aptUsrId: selectedUser,
      });
      console.log("API Response:", response);

      if (response.data.code === "200" && response.data.status === "success") {
        alert("Appointment created successfully!");
        navigate('/appointment');
      } else {
        alert(`Failed to create appointment: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error.response || error.message);
      alert(`An error occurred while creating the appointment. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <Layout>
      <h2 className={styles.heading2}>Buat Mata Kuliah Asisten Baru</h2>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}>Kembali</button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="classcourse" className="block font-semibold mb-2">Pilih Mata Kuliah - Kelas:</label>
          <select
            id="classcourse"
            value={selectedClassCourse}
            onChange={(e) => setSelectedClassCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">-- Pilih Mata Kuliah - Kelas --</option>
            {classCourses.map((course) => (
              <option key={course.cc_id} value={course.cc_id}> {/* Correct ID field: cc_id */}
                {course.appointment_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="user" className="block font-semibold mb-2">Pilih Asisten Praktikum:</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">-- Pilih Asisten Praktikum --</option>
            {users.map((user) => (
              <option key={user.usrId} value={user.usrId}> {/* Correct ID field: usrId */}
                {user.usrFullName} (NIM: {user.usrNim || 'N/A'})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Buat
        </button>
      </form>
    </Layout>
  );
};

export default AddAppointment;