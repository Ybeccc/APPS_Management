import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from "../style";

const PR_Asisten = () => {
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usrId = useSelector((state) => state.auth.user.data.usrId);

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/payroll/user/${usrId}`);
        const result = response.data;

        if (response.status === 200) {
          setPayrollData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch payroll data');
      } finally {
        setLoading(false);
      }
    };

    if (usrId) {
      fetchPayrollData();
    } else {
      setLoading(false);
    }
  }, [usrId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-0">
      <h1 className={`${styles.heading2} mb-6`}>Penggajian</h1>
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex mb-2">
          <span className="font-semibold w-40">Nama Penerima</span>
          <span>:  {payrollData?.[0]?.user_fullname || 'N/A'}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-semibold w-40">Bank Penerima</span>
          <span>:  {payrollData?.[0]?.user_ba || 'N/A'}</span>
        </div>
        <div className="flex">
          <span className="font-semibold w-40">Nomor Rekening</span>
          <span>:  {payrollData?.[0]?.user_ba_number || 'N/A'}</span>
        </div>
      </div>

      {payrollData && payrollData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-[#7b2cbf] text-white">
                <th className="py-2 px-4 border-r">No</th>
                <th className="py-2 px-4 border-r">Tanggal Pembayaran</th>
                <th className="py-2 px-4 border-r">Nominal</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((payroll, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="py-2 px-4 border-r">{index + 1}</td>
                  <td className="py-2 px-4 border-r">
                    {new Date(payroll.created_date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="py-2 px-4 border-r">
                    Rp{payroll.nominal.toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {payroll.payroll_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">No payroll data found.</div>
      )}
    </div>
  );
};

export default PR_Asisten;