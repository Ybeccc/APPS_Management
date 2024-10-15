import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListAM = () => {
  const [assistants, setAssistants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAssistants();
  }, []);

  const getAssistants = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      console.log("Response from API:", response.data); // Log the API response

      // Access the array of assistants from the response object
      if (Array.isArray(response.data.data)) {
        setAssistants(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      {Array.isArray(assistants) && assistants.length > 0 ? (
        assistants.map((assistant) => (
          <div key={assistant.usrId} className="bg-white border rounded-lg w-[222px] mr-5 mb-5 flex flex-col"> 
            {/* Card Content */}
            <div className="flex-1 p-4">
              <h3 className="font-poppins font-semibold text-lg">{assistant.usrFullName}</h3>
              <p className="font-poppins font-normal text-[12px] text-gray-600">{assistant.usrNim}</p>
            </div>

            {/* Button Section */}
            <div className="p-4">
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-blue-600 mr-2"
                  onClick={() => navigate(`/kehadiran/detail/${assistant.usrId}`)}>
                  kehadiran
                </button>

                <button
                  className="bg-indigo-600 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-indigo-700"
                  onClick={() => navigate(`/manajementugas/detail/${assistant.usrId}`)}>
                  tugas
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Tidak ada Asisten.</div> // Optional: Show a message if no assistants
      )}
    </div>
  );
};

export default ListAM;