import React from 'react'

import styles from '../style';
import { jumbotron1 } from '../assets';

const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                    Fakultas <br className="sm:block hidden" /> {" "}
                    <span className="text-gradient">Teknologi Informasi</span> {" "}
                    ub <br className="sm:block hidden" /> {" "}
                </h1>
            </div>

            {/* <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full">
                Payment Method
            </h1> */}
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Jelajahi informasi seputar Asisten Praktikum atau Asisten Mahasiswa di FTI Untar. 
            Lihat posisi yang tersedia dan mulailah perjalanan Anda untuk menjadi salah satu aspek kesuksesan akademis!
            </p>

        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron1} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        </div>
    </section>
)

export default Hero