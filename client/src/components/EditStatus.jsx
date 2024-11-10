import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../style";
import Layout from "../pages/Layout";

const EditStatus = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [status, setStatus] = useState("Active"); // Default status to "Active"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/users/update/status/${id}`, {
        usrStatus: status, // Send the selected status
      });
      alert("Status berhasil diperbarui!");
      navigate("/profile"); // Redirect to the users page (or another page)
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };

  return (
    <Layout>
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className={styles.heading2}>
          Edit Status Pengguna
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Simpan Status
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditStatus;