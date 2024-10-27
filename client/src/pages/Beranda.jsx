import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Beranda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

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
      <Welcome />
    </Layout>
  );
};

export default Beranda;