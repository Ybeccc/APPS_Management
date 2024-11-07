import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiList } from 'react-icons/fi';
import { MdGroups, MdOutlinePersonOutline, MdPayment, MdOutlineHomeWork } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { logo } from '../assets';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    // Sidebar links with 'requiredRole' specifying access level
    const SIDEBAR_LINKS = [
        { id: 1, path: "/beranda", name: "Beranda", icon: FiHome },
        { id: 2, path: "/asistenpraktikum", name: "Asisten Praktikum", icon: MdGroups, requiredRole: 1 },
        { id: 3, path: "/asistenmahasiswa", name: "Asisten Mahasiswa", icon: MdGroups, requiredRole: 2 },
        { id: 4, path: "/kehadiran", name: "Kehadiran", icon: FiCheckCircle },
        { id: 5, path: "/manajementugas", name: "Manajemen Tugas", icon: FiList },
        { id: 6, path: "/penggajian", name: "Penggajian", icon: MdPayment },
        { id: 7, path: "/lowongan", name: "Lowongan", icon: MdOutlineHomeWork, requiredRole: 1 },
        { id: 8, path: "/profile", name: "Profile", icon: MdOutlinePersonOutline },
    ];

    return (
        <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>
            <div>
                <img src={logo} alt="logo" className='w-28 hidden md:flex ml-5' />
            </div>
            <ul className='mt-6 space-y-6'>
                {SIDEBAR_LINKS.map((link) => (
                    (!link.requiredRole || link.requiredRole === user?.data?.usrRoleId) && (
                        <li 
                            key={link.id} 
                            className={`font-poppins font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${location.pathname === link.path ? "bg-indigo-100 text-indigo-500" : ""}`}
                        >
                            <Link to={link.path} className='flex justify-center md:justify-start md:space-x-4'>
                                <span>{<link.icon />}</span>
                                <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
                            </Link>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;