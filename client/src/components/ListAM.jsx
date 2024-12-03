import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListAP = () => {
  const [assistants, setAssistants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAssistants(4);
  }, []);

  const getAssistants = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:3001/appointment/role/${roleId}`);
      console.log("Response from API:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setAssistants(response.data.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setAssistants([]);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
      setAssistants([]);
    }
  };

  return (
    <div className="flex flex-wrap">
      {Array.isArray(assistants) && assistants.length > 0 ? (
        assistants.map((assistant) => (
          <div key={assistant.assistant_id} className="bg-white border rounded-lg w-[222px] mr-5 mb-5 flex flex-col"> 
            {/* Card Content */}
            <div className="flex-1 p-4">
              <h3 className="font-poppins font-semibold text-lg">{assistant.assistant_name}</h3>
              <p className="font-poppins font-normal text-[12px] text-gray-600 mt-5">{assistant.course_name}</p>
            </div>

            {/* Button Section */}
            <div className="p-4">
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-blue-600 mr-2"
                  onClick={() => navigate(`/kehadiran/asisten/${assistant.assistant_id}`)}>
                  Kehadiran
                </button>

                <button
                  className="bg-indigo-600 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-indigo-700"
                  onClick={() => navigate(`/tugas/asisten/${assistant.assistant_id}`)}>
                  Tugas
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Tidak ada Asisten.</div>
      )}
    </div>
  );
};

export default ListAP;