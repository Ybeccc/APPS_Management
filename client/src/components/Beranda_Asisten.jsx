import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Welcome from './Welcome';

const Beranda_Asisten = () => {
  const userId = useSelector(state => state.auth.user.data.usrId);

  const [attendanceData, setAttendanceData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:3001/attendance/user/${userId}`)
      .then(response => {
        if (response.data.status === "success") {
          setAttendanceData(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching attendance data:', error));

    axios.get(`http://localhost:3001/task/user/${userId}`)
      .then(response => {
        if (response.data.status === "success") {
          setTaskData(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching task data:', error));

    axios.get(`http://localhost:3001/payroll/user/${userId}`)
      .then(response => {
        if (response.data.status === "success") {
          setPayrollData(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching payroll data:', error));
  }, [userId]);

  const getCurrentMonthYear = () => {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const isCurrentMonthYear = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const taskCountByCourse = taskData
    .filter(task => isCurrentMonthYear(task.tsk_created))
    .reduce((acc, task) => {
      acc[task.course_name] = (acc[task.course_name] || 0) + 1;
      return acc;
    }, {});

  const filteredPayrollData = payrollData.filter(payroll => isCurrentMonthYear(payroll.created_date));

  return (
    <div className="p-0">
      <Welcome />
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Rekap Kehadiran ({getCurrentMonthYear()})</h2>
        {attendanceData.length > 0 ? (
          attendanceData.map((attendance, index) => (
            <div key={index} className="p-4 mb-4 bg-[#caf0f8] border rounded-lg shadow">
              <div className="flex">
                <span className="font-semibold w-48">Nama Lengkap</span>
                <span className="mr-2">:</span>
                <span>{attendance.username}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48">Mata Kuliah - Kelas</span>
                <span className="mr-2">:</span>
                <span>{attendance.coursename} - {attendance.classname}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-48">Jumlah Kehadiran</span>
                <span className="mr-2">:</span>
                <span>{attendance.appointmentcount}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 mb-4 bg-[#d7e3fc] border rounded-lg shadow">
            <p>Belum ada Data</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Rekap Tugas ({getCurrentMonthYear()})</h2>
        {Object.keys(taskCountByCourse).length > 0 ? (
          Object.entries(taskCountByCourse).map(([courseName, count], index) => (
            <div key={index} className="p-4 mb-4 bg-[#ffeedd] border rounded-lg shadow">
              <div className="flex">
                <span className="font-semibold w-32">Mata Kuliah</span>
                <span className="mr-2">:</span>
                <span>{courseName}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Jumlah Tugas</span>
                <span className="mr-2">:</span>
                <span>{count}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 mb-4 bg-[#ffeedd] border rounded-lg shadow">
            <p>Belum ada Data</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Rekap Penggajian ({getCurrentMonthYear()})</h2>
        {filteredPayrollData.length > 0 ? (
          filteredPayrollData.map((payroll, index) => (
            <div key={index} className="p-4 mb-4 bg-[#d8f3dc] border rounded-lg shadow">
              <div className="flex">
                <span className="font-semibold w-32">Tanggal</span>
                <span className="mr-2">:</span>
                <span>{new Date(payroll.created_date).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Nama Lengkap</span>
                <span className="mr-2">:</span>
                <span>{payroll.user_fullname}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Bank</span>
                <span className="mr-2">:</span>
                <span>{payroll.user_ba} - {payroll.user_ba_number}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Nominal</span>
                <span className="mr-2">:</span>
                <span>Rp{payroll.nominal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Status</span>
                <span className="mr-2">:</span>
                <span>{payroll.payroll_status}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 mb-4 bg-[#d8f3dc] border rounded-lg shadow">
            <p>Belum ada Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beranda_Asisten;