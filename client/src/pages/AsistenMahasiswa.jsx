import React from 'react'
import Layout from './Layout'
import styles from '../style'
import { studentList } from "../constants";
import ListAM from '../components/ListAM'

const AsistenMahasiswa = () => {
  return (
    <Layout>
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-6 mb-4 relative z-[1]">
        <h1 className={`${styles.heading2}`}>
          Daftar Asisten Praktikum
        </h1>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {studentList.map((card) => <ListAM key={card.id} {...card} />)}
      </div>
    </Layout>
  )
}

export default AsistenMahasiswa