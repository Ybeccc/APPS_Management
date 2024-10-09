import React, { useState } from 'react';
import Layout from './Layout';
import styles from '../style';

const Penggajian = () => {
  const [data] = useState([
    { date: "2024-10-01", fullname: "John Doe", bankaccount: "Oracle Database Administrator", bankaccountno: "A", status: "Pending"},
    { date: "2024-10-02", fullname: "Jane Smith", bankaccount: "Database Systems", bankaccountno: "B", status: "Pending" },
    { date: "2024-09-15", fullname: "Michael Brown", bankaccount: "Data Mining", bankaccountno: "C", status: "Done" },
    { date: "2023-10-03", fullname: "Emily White", bankaccount: "Database Administration", bankaccountno: "A", status: "Done"},
  ]);

  return (
    <Layout>
      <h1 className={`${styles.heading2}`}>
        Penggajian
      </h1>

      {/* Add "+ payroll" button */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          + Payroll
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white mb-6 mt-6">
          <thead>
            <tr>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-28">Tanggal</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Nama</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-40">Nama Bank</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-24">Nomor Rekening</th>
              <th className="font-poppins border border-black bg-white px-4 py-2 w-64">Status</th>  
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.date}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.fullname}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.bankaccount}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.bankaccountno}</td>
                <td className="font-poppins border border-black px-4 text-[14px]">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Penggajian;
