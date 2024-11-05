import React from 'react';
import { useSelector } from 'react-redux';
import styles from "../style";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2 className={styles.heading2}>
        Selamat Datang, {user && user.data ? user.data.usrFullName : 'Guest'}
      </h2>
    </div>
  );
}

export default Welcome;