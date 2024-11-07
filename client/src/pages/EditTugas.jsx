import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import styles from "../style";

const EditTugas = () => {
  const { id } = useParams(); // Using 'id' as the parameter
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
    console.log("Received id from URL:", id); // Debugging
    if (user && user.data && id) {
      fetchTaskDetails(id);
      fetchAppointments(user.data.usrId);
    } else {
      console.error("User data or task ID is missing.");
      alert("Invalid task ID or user not logged in.");
      navigate("/manajementugas");
    }
  }, [user, id]);

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:3001/task/${taskId}`);
      const taskData = response.data.data;
      console.log("Fetched Task Data:", taskData);

      if (taskData) {
        setTask({
          tskTaskName: taskData.tskTaskName,
          tskDescription: taskData.tskDescription,
          tskNotes: taskData.tskNotes,
          tskAptId: taskData.tskAptId,
          tskCreatedBy: taskData.tskCreatedBy,
        });
      } else {
        console.warn("Task data not found for ID:", taskId);
        alert("Task data not found. Please check the task ID.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching task details:", error);
      alert("Failed to fetch task data. Please try again later.");
      setIsLoading(false);
    }
  };

  const fetchAppointments = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/appointment/user/${usrId}`);
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointment data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.tskTaskName || !task.tskDescription || !task.tskAptId) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/task/update/${id}`, {
        tskAptId: task.tskAptId,
        tskTaskName: task.tskTaskName,
        tskDescription: task.tskDescription,
        tskNotes: task.tskNotes,
        tskCreatedBy: task.tskCreatedBy,
      });

      console.log("Task updated:", response.data);

      if (response.data.code === "200" && response.data.status === "success") {
        alert("Task successfully updated!");
        navigate("/manajementugas");
      } else {
        alert(`Failed to update task: ${response.data.message || "Unknown error."}`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("An error occurred while updating the task.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className={styles.heading2}>Edit Tugas</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>
      <form key={id} onSubmit={handleSubmit} className="space-y-4">
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
            <option value="">Pilih Mata Kuliah - Kelas</option>
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
            placeholder="Enter Task Name"
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
            placeholder="Enter Task Description"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="tskNotes" className="block font-semibold">
            Catatan:
          </label>
          <input
            type="text"
            name="tskNotes"
            value={task.tskNotes || ""}
            onChange={handleChange}
            placeholder="Enter Additional Notes"
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