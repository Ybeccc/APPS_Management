import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";

import PROFILE_KP from "../components/PROFILE_KP";
import PROFILE_KL from "../components/PROFILE_KL";
import PROFILE_Asisten from "../components/PROFILE_Asisten";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1) && (
        <PROFILE_KP />
      )}
      {user && (user.data.usrRoleId === 2) && (
        <PROFILE_KL />
      )}
      {user && (user.data.usrRoleId === 3 || user.data.usrRoleId === 4) && (
        <PROFILE_Asisten />
      )}
    </Layout>
  );
};

export default Profile;