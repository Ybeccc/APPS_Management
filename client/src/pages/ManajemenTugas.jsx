import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

import MT_Asisten from "../components/MT_Asisten";
import MT_Koordinator from "../components/MT_Koordinator";

const ManajemenTugas = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1 || user.data.usrRoleId === 2) && (
        <MT_Koordinator />
      )}
      {user && (user.data.usrRoleId === 3 || user.data.usrRoleId === 4) && (
        <MT_Asisten />
      )}
    </Layout>
  );
};

export default ManajemenTugas;