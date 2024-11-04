import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import styles from '../style';

import ListAP from '../components/ListAP';

const AsistenPraktikum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.data.usrRoleId !== 1) {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-6 mb-4 relative z-[1]">
        <h1 className={`${styles.heading2}`}>
          Daftar Asisten Praktikum
        </h1>
      </div>
      <ListAP />
    </Layout>
  );
};

export default AsistenPraktikum;