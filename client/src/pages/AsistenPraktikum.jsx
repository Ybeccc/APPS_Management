import React from 'react';
import Layout from './Layout';
import styles from '../style';
import ListAM from '../components/ListAM';

const AsistenMahasiswa = () => {
  return (
    <Layout>
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-6 mb-4 relative z-[1]">
        <h1 className={`${styles.heading2}`}>
          Daftar Asisten Praktikum
        </h1>
      </div>
      <ListAM />
    </Layout>
  );
};

export default AsistenMahasiswa;