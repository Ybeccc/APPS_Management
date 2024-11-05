import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; 
import Layout from "./Layout";

const EditTugas = () => {
  const { tskId } = useParams();
  const [task, setTask] = useState({
    tskTaskName: "",
    tskDescription: "",
    tskNotes: "",
    tskAptId: "",
    tskCreatedBy: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data && tskId) {
      fetchTaskDetails(tskId);
      fetchAppointments(user.data.usrId);
    } else {
      console.error("User data or task ID is missing.");
      alert("Invalid task ID or user not logged in.");
      navigate("/manajementugas");
    }
  }, [user, tskId]);

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:3001/task/${taskId}`);
      const taskData = response.data.data;
      console.log("Fetched Task Data:", taskData); 

      setTask({
        tskTaskName: taskData.tskTaskName,
        tskDescription: taskData.tskDescription,
        tskNotes: taskData.tskNotes,
        tskAptId: taskData.tskAptId,
        tskCreatedBy: taskData.tskCreatedBy,
      });
      setIsLoading(false); // Set loading to false after task data is set
    } catch (error) {
      console.error("Error fetching task details:", error);
      alert("Gagal mengambil data tugas.");
    }
  };

  const fetchAppointments = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/appointment/user/${usrId}`);
      setAppointments(response.data.data);
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
  
    if (!task.tskTaskName || !task.tskDescription || !task.tskAptId) {
      alert("Semua kolom wajib diisi.");
      return;
    }
  
    try {
      // Sending the task data with tskId included from useParams
      const response = await axios.post("http://localhost:3001/task/update", {
        tskId: tskId,  // Pass tskId from URL params
        tskTaskName: task.tskTaskName,
        tskDescription: task.tskDescription,
        tskNotes: task.tskNotes,
        tskAptId: task.tskAptId,
        tskCreatedBy: task.tskCreatedBy
      });
  
      console.log("Task updated:", response.data);
  
      if (response.data.code === "200" && response.data.status === "success") {
        alert("Tugas berhasil diupdate!");
        navigate("/manajementugas");
      } else {
        alert(`Gagal memperbarui tugas: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Terjadi kesalahan saat memperbarui tugas.");
    }
  };  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Edit Tugas</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>
      <form key={tskId} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="tskAptId" className="block font-semibold">
            Pilih Mata Kuliah - Kelas:
          </label>
          <select
            name="tskAptId"
            value={task.tskAptId || ""}
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

        <div className="space-y-1">
          <label htmlFor="tskTaskName" className="block font-semibold">
            Nama Tugas:
          </label>
          <input
            type="text"
            name="tskTaskName"
            value={task.tskTaskName || ""}
            onChange={handleChange}
            placeholder="Masukkan Nama Tugas"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="tskDescription" className="block font-semibold">
            Deskripsi:
          </label>
          <textarea
            name="tskDescription"
            value={task.tskDescription || ""}
            onChange={handleChange}
            placeholder="Masukkan Deskripsi Tugas"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="tskNotes" className="block font-semibold">
            Catatan (Optional):
          </label>
          <input
            type="text"
            name="tskNotes"
            value={task.tskNotes || ""}
            onChange={handleChange}
            placeholder="Masukkan Catatan Tambahan"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </Layout>
  );
};

export default EditTugas;