import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Layout from "./Layout";
import styles from '../style';

const DetailManajemenTugas = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [data] = useState([
    { date: "2024-10-01", name: "John Doe", course: "Oracle Database Administrator", class: "A", task: "Homework 1", note: "Complete by Friday" },
    { date: "2024-10-02", name: "Jane Smith", course: "Database Systems", class: "B", task: "Lab Report", note: "Due next Monday" },
    { date: "2024-09-15", name: "Michael Brown", course: "Data Mining", class: "C", task: "Project Proposal", note: "Review with team" },
    { date: "2023-10-03", name: "Emily White", course: "Database Administration", class: "A", task: "Presentation", note: "Due on Wednesday" },
  ]);

  // Function to go back to the previous menu
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <h1 className={`${styles.heading2}`}>
        Manajemen Tugas
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6 mt-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-10">No</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">Tanggal</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Nama</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Mata Kuliah</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-24">Kelas</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">Deskripsi Tugas</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="font-poppins border border-black px-4 text-[14px]">{index + 1}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.date}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.name}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.course}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.class}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.task}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Back Button */}
      <div className="mt-6">
        <button onClick={handleBack} className="bg-blue-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </Layout>
  );
};

export default DetailManajemenTugas;
