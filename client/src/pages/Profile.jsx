import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

import PROFILE_Koordinator from "../components/PROFILE_Koordinator";
import PROFILE_Asisten from "../components/PROFILE_Asisten";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1 || user.data.usrRoleId === 2) && (
        <PROFILE_Koordinator />
      )}
      {user && (user.data.usrRoleId === 3 || user.data.usrRoleId === 4) && (
        <PROFILE_Asisten />
      )}
    </Layout>
  );
};

export default Profile;