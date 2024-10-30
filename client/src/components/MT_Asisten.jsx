import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import axios from "axios";
import styles from "../style"; // Import external styles

const MT_Asisten = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Use navigate to route to TambahTugas page

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/task");
      if (Array.isArray(response.data.data)) {
        setTasks(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEdit = (task) => {
    // Redirect to a dedicated Edit page, or handle editing inline
    navigate(`/edit-task/${task.tskId}`, { state: task });
  };

  const handleAddTask = () => {
    navigate("/manajementugas/tambah"); // Redirect to the Add Task page
  };

  return (
    <div className="p-4">
      <h1 className={`${styles.heading2} mb-6`}>Manajemen Tugas</h1>

      <div className="flex justify-between mb-6">
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tambah Tugas
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">
                Tanggal
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">
                Nama
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">
                Mata Kuliah
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-24">
                Kelas
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">
                Deskripsi Tugas
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">
                Catatan
              </th>
              <th className="font-poppins border border-black bg-white px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {new Date(task.tsk_created_at).toLocaleDateString()}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {task.user_fullname}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {task.course_name}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {task.class_name}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {task.tsk_description}
                  </td>
                  <td className="font-poppins border border-black px-4 text-[14px]">
                    {task.tsk_notes}
                  </td>
                  <td className="font-poppins border border-black px-4">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada tugas untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MT_Asisten;