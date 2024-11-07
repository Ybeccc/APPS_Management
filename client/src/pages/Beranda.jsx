import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

import Beranda_KP from "../components/Beranda_KP";
import Beranda_KL from "../components/Beranda_KL";

const Beranda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Dispatching getMe"); // Debug log
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
      if (isError) {
          console.log("Error detected, navigating to login page"); // Debug log
          navigate("/");
      }
  }, [isError, navigate]);


  return (
    <Layout>
      {/* Conditional rendering based on user role */}
      {user && (user.data.usrRoleId === 1) && (
        <Beranda_KP />
      )}
      {user && (user.data.usrRoleId === 2) && (
        <Beranda_KL />
      )}
    </Layout>
  );
};

export default Beranda;