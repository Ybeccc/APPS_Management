import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const TambahTugas = () => {
  const [task, setTask] = useState({
    tskTaskName: "",
    tskDescription: "",
    tskNotes: "",
    tskAptId: "", // Appointment ID (maps to the selected course)
  });
  const [courses, setCourses] = useState([]); // Holds course data from the appointment API
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointment/role/2" // Adjust role ID as needed
      );
      setCourses(response.data.data); // Assuming response.data.data contains the course appointments
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/task", task);
      navigate("/mt-asisten"); // Redirect to the tasks list after submission
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tambah Tugas</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Dropdown */}
        <div className="space-y-1">
          <label htmlFor="tskAptId" className="block font-semibold">
            Pilih Mata Kuliah:
          </label>
          <select
            name="tskAptId"
            value={task.tskAptId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.user_nim}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Task Name */}
        <div className="space-y-1">
          <label htmlFor="tskTaskName" className="block font-semibold">
            Nama Tugas:
          </label>
          <input
            type="text"
            name="tskTaskName"
            value={task.tskTaskName}
            onChange={handleChange}
            placeholder="Masukkan Nama Tugas"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Task Description */}
        <div className="space-y-1">
          <label htmlFor="tskDescription" className="block font-semibold">
            Deskripsi:
          </label>
          <textarea
            name="tskDescription"
            value={task.tskDescription}
            onChange={handleChange}
            placeholder="Masukkan Deskripsi Tugas"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Task Notes */}
        <div className="space-y-1">
          <label htmlFor="tskNotes" className="block font-semibold">
            Catatan (Optional):
          </label>
          <input
            type="text"
            name="tskNotes"
            value={task.tskNotes}
            onChange={handleChange}
            placeholder="Masukkan Catatan Tambahan"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tambah Tugas
        </button>
      </form>
    </Layout>
  );
};

export default TambahTugas;