import React, { useEffect, useState } from "react";
import styles from "../style";
import axios from "axios";

import { format } from "date-fns";
import { id } from "date-fns/locale";

const MT_Koordinator = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/task");
      if (Array.isArray(response.data.data)) {
        console.log("Task data received:", response.data.data);
        setTasks(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Manajemen Tugas</h1>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse bg-white mb-6 mt-6">
          <thead>
          <tr className="bg-[#7b2cbf]">
            {[
              "Tanggal", "Nama Tugas", "Deskripsi Tugas", "Catatan", "Nama Asisten"
            ].map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-center text-white font-semibold text-sm"
              >
                {header}
              </th>
            ))}
          </tr>

          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    {/* Format the date to Bahasa Indonesia */}
                    {isNaN(new Date(row.tskCreatedAt).getTime())
                      ? "Invalid Date"
                      : format(new Date(row.tskCreatedAt), "dd MMMM yyyy", {
                          locale: id,
                        })}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {row.tskTaskName || "N/A"}
                  </td>
                  <td className="border px-4 py-2 max-w-xs">
                    {row.tskDescription || "N/A"}
                  </td>
                  <td className="border px-4 py-2 max-w-xs">
                    {row.tskNotes || "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {row.tskCreatedBy || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada tugas untuk ditampilkan.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PDF Button */}
      <div className="bottom-4 left-4 z-50">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default MT_Koordinator;