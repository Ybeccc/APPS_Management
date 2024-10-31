import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

import KH_Asisten from '../components/KH_Asisten';
import KH_Koordinator from '../components/KH_Koordinator';

const Kehadiran = () => {
  const { user } = useSelector((state) => state.auth); // Get user info from Redux

  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1 || user.data.usrRoleId === 2) && (
        <KH_Koordinator />
      )}
      {user && (user.data.usrRoleId === 3 || user.data.usrRoleId === 4) && (
        <KH_Asisten />
      )}
    </Layout>
  );
};

export default Kehadiran;