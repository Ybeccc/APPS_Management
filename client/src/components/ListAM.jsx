import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ListAM = ({ content, name, title, img }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="bg-white border rounded-lg w-[222px] mr-5 mb-5 flex flex-col"> {/* Added flex-col to stack items vertically */}
      <img src={img} alt={name} className="w-full h-[150px] object-cover rounded-t-lg" />

      {/* Card Content */}
      <div className="flex-1 p-4">
        <h3 className="font-poppins font-semibold text-lg">{name}</h3>
        <p className="font-poppins font-normal text-[12px] text-gray-600">{title}</p>
        <p className="font-poppins font-normal text-[14px] mt-5">{content}</p>
      </div>

      {/* Button Section */}
      <div className="p-4">
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-blue-600 mr-2"
            onClick={() => navigate('/kehadiran/detail')}
          >
            kehadiran
          </button>

          <button
            className="bg-indigo-600 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-indigo-700"
            onClick={() => navigate('/manajementugas/detail')}
          >
            tugas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListAM;
