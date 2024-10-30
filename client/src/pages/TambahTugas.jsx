import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector to get user info from Redux
import Layout from "./Layout";

const TambahTugas = () => {
  const [task, setTask] = useState({
    tskTaskName: "",
    tskDescription: "",
    tskNotes: "",
    tskAptId: "", // Store the selected apt_id
    tskCreatedBy: "", // Store the user ID (creator)
  });

  const [appointments, setAppointments] = useState([]); // Store fetched appointments
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get the authenticated user info from Redux

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();

    // Set the user ID as the creator (tskCreatedBy)
    if (user && user.data) {
      setTask((prev) => ({ ...prev, tskCreatedBy: user.data.usrId }));
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointment/user/3" // Replace 3 with dynamic user_id if needed
      );
      setAppointments(response.data.data); // Store the fetched appointments
      console.log("Appointments fetched:", response.data.data); // Debug log
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Gagal mengambil data appointment.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!task.tskTaskName || !task.tskDescription || !task.tskAptId) {
      alert("Semua kolom wajib diisi.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/task", task);
      console.log("Task created:", response.data); // Debug log
  
      // Check if the response code is 200 and status is 'success'
      if (response.data.code === "200" && response.data.status === "success") {
        alert("Tugas berhasil ditambahkan!");
        navigate("/manajementugas"); // Redirect to tasks list after success
      } else {
        // If the response is not a success, show the error message
        alert(`Gagal menambahkan tugas: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Terjadi kesalahan saat menambahkan tugas.");
    }
  };
  

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tambah Tugas</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Appointment Dropdown */}
        <div className="space-y-1">
          <label htmlFor="tskAptId" className="block font-semibold">
            Pilih Mata Kuliah - Kelas:
          </label>
          <select
            name="tskAptId"
            value={task.tskAptId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          >
            <option value="">Select Course - Class</option>
            {appointments.map((appointment) => (
              <option key={appointment.apt_id} value={appointment.apt_id}>
                {`${appointment.course_name} - ${appointment.class_name}`}
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