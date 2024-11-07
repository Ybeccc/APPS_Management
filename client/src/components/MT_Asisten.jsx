import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import styles from "../style";

const MT_Asisten = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.data && user.data.usrId) {
      fetchTasks(user.data.usrId);
    }
  }, [user]);

  const fetchTasks = async (usrId) => {
    try {
      const response = await axios.get(`http://localhost:3001/task/user/${usrId}`);
      console.log("Tasks fetched:", response.data);

      if (response.data.data) {
        setTasks(response.data.data);
      } else {
        setTasks([]);
        console.warn("No tasks found for the user.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="p-0">
      <h1 className={styles.heading2}>Manajemen Tugas</h1>
      <Link to="/manajementugas/tambah">
        <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
          + Tambah Tugas
        </button>
      </Link>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#7b2cbf]">
              {["Tanggal", "Nama Mata Kuliah", "Kelas", "Deskripsi Tugas", "Catatan", "Nama Asisten", "Edit"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    {new Date(task.tsk_created).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {task.course_name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {task.class_name}
                  </td>
                  <td className="border px-4 py-2 max-w-xs">
                    {task.description}
                  </td>
                  <td className="border px-4 py-2">
                    {task.notes}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {task.user_fullname}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <button
                        className="flex items-center text-green-500 hover:text-green-700 transition"
                        onClick={() => {
                          console.log("Navigating to edit task with ID:", task.usrid); // Use the usrid
                          navigate(`/manajementugas/edit/${task.usrid}`);
                        }}
                      >
                        <FaEdit className="mr-1" /> Ubah
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
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