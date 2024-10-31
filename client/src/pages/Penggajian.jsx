import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

import PR_Asisten from '../components/PR_Asisten';
import PR_Koordinator from '../components/PR_Koordinator';

const Penggajian = () => {
  const { user } = useSelector((state) => state.auth); // Get user info from Redux

  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1 || user.data.usrRoleId === 2) && (
        <PR_Koordinator />
      )}
      {user && (user.data.usrRoleId === 3 || user.data.usrRoleId === 4) && (
        <PR_Asisten />
      )}
    </Layout>
  );
};

export default Penggajian;