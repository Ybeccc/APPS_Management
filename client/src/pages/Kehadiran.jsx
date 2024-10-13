import React, { useState } from "react";
import Layout from "./Layout";
import styles from '../style';

const Kehadiran = () => {
  const [data] = useState([
    { date: "2024-10-01", name: "John Doe", course: "Oracle Database Administrator", class: "A", checkin: "08:00:00", checkout: "10:00:00" },
    { date: "2024-10-02", name: "Jane Smith", course: "Database Systems", class: "B", checkin: "08:00:00", checkout: "10:00:00" },
    { date: "2024-09-15", name: "Michael Brown", course: "Data Mining", class: "C", checkin: "08:00:00", checkout: "10:00:00" },
    { date: "2023-10-03", name: "Emily White", course: "Database Administration", class: "A", checkin: "08:00:00", checkout: "10:00:00" },
  ]);

  return (
    <Layout>
      <h1 className={`${styles.heading2}`}>
        Kehadiran
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6 mt-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-20">Tanggal</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Nama</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Mata Kuliah</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-20">Kelas</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">Check-in</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">Check-out</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.date}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.name}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.course}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.class}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.checkin}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.checkout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bottom-4 left-4 z-50">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Generate PDF
        </button>
      </div>
    </Layout>
  );
};

export default Kehadiran;