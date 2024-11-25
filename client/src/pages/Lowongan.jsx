import React, { useEffect, useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import axios from "axios";
import Layout from "./Layout";
import styles from "../style";

const Lowongan = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to convert the file path to a relative URL
  const getFileUrl = (filePath) => {
    if (!filePath) return "";
    // Extract path after "uploads" directory
    const pathAfterUploads = filePath.split("uploads")[1];
    // Return the relative path for the file
    return pathAfterUploads ? `/uploads${pathAfterUploads}` : "";
  };

  // Fetch applicants from the server
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3001/applicant");
        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          setApplicants(response.data.data.data);
        } else {
          setError("Failed to fetch applicants. Invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setError("An error occurred while fetching applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // Loading and error handling
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Layout>
      <h1 className={styles.heading2}>Daftar Calon Asisten</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-[#7b2cbf] text-white text-center border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Program Studi</th>
              <th className="px-4 py-2">Akt</th>
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">CV</th>
              <th className="px-4 py-2">KHS</th>
              <th className="px-4 py-2">Tanggal Pendaftaran</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => {
              // Generate URLs for files using the helper function
              const suratLamaranUrl = getFileUrl(applicant.aplSuratLamaran);
              const cvUrl = getFileUrl(applicant.aplCv);
              const khsUrl = getFileUrl(applicant.aplKhs);

              return (
                <tr
                  key={applicant.aplId}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b`}
                >
                  <td className="px-4 py-2">{applicant.aplId}</td>
                  <td className="px-4 py-2">{applicant.aplName}</td>
                  <td className="px-4 py-2">{applicant.aplNim}</td>
                  <td className="px-4 py-2">{applicant.aplEmail}</td>
                  <td className="px-4 py-2">{applicant.aplProdi}</td>
                  <td className="px-4 py-2">{applicant.aplAkt}</td>
                  {/* Links to files with relative URLs */}
                  <td className="px-4 py-2">
                    <a
                      href={suratLamaranUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillFilePdf size={24} className="inline-block" />
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillFilePdf size={24} className="inline-block" />
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={khsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillFilePdf size={24} className="inline-block" />
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(applicant.aplCreatedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Lowongan;