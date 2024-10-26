import styles from './style';
import { stats } from './constants';
import Button from './components/Button';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { jumbotron2 } from './assets';

const Pendaftaran = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        {/* =====JUMBOTRON SECTION===== */}
        <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
          <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                    <span className="text-gradient">Pendaftaran</span> {" "}
                </h1>
            </div>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Daftar sekarang untuk menjadi asisten praktikum atau asisten mahasiswa. 
            Ikuti langkah-langkahnya dan kirimkan aplikasi Anda segera untuk mendapatkan pengalaman berharga dan meningkatkan perjalanan akademis Anda.
            </p>

          </div>

          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron2} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>
        </section>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>

        {/* =====PERSYARATAN A.PRAKTIKUM SECTION===== */}
        <section id="requirements" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
          <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

          <div className="w-full flex flex-col items-start sm:mb-16 mb-6 relative z-[1]">
            <h1 className={styles.heading2}>
              Persyaratan Asisten Praktikum
            </h1>
            <div className="w-full mt-6">
              <p className={`${styles.paragraph} text-left`}>
                1. Terdaftar sebagai mahasiswa aktif FTI Untar minimal semester 3. <br className="sm:block hidden" /> {" "}
                2. Telah lulus mata kuliah terkait dengan nilai minimal A. <br className="sm:block hidden" /> {" "}
                3. Memiliki kemampuan komunikasi yang baik untuk membimbing dan menjelaskan materi. <br className="sm:block hidden" /> {" "}
                4. Menguasai tools dan bahasa pemrograman yang digunakan dalam praktikum. <br className="sm:block hidden" /> {" "}
                5. Bersedia meluangkan waktu selama semester berjalan untuk membantu pelaksanaan praktikum.
              </p>
            </div>
            <Button styles="mt-10" />
          </div>
        </section>

        {/* =====PERSYARATAN A.MAHASISWA SECTION===== */}
        <section id="requirements" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
          <div className="w-full flex flex-col items-start sm:mb-16 mb-6 relative z-[1]">
            <h1 className={styles.heading2}>
              Persyaratan Asisten Mahasiswa
            </h1>
            <div className="w-full mt-6">
              <p className={`${styles.paragraph} text-left`}>
                1. Terdaftar sebagai mahasiswa aktif FTI Untar minimal semester 3. <br className="sm:block hidden" /> {" "}
                2. Mampu memecahkan masalah teknis terkait dengan perangkat keras dan perangkat lunak yang digunakan di laboratorium. <br className="sm:block hidden" /> {" "}
                3. Bersedia bekerja secara disiplin dan bertanggung jawab sesuai jadwal yang ditentukan oleh laboratorium. <br className="sm:block hidden" /> {" "}
                4. Mampu bekerja dalam tim, menjaga etika kerja yang baik, dan mematuhi aturan laboratorium. <br className="sm:block hidden" /> {" "}
                5. Bersedia meluangkan waktu selama semester berjalan untuk membantu koordinator laboran.
              </p>
            </div>
            <Button styles="mt-10" />
          </div>
        </section>

        {/* =====TAHAPAN PENDAFTARAN SECTION===== */}
        <section className={`${styles.flexCenter} flex-col bg-black-gradient-2 rounded-[20px] sm:mb-20 mb-6`}>
          <h1 className={`${styles.heading2} text-center mt-5`}>
            Tahapan Pendaftaran
          </h1>
          <div className="flex flex-row flex-wrap justify-center mt-5 mb-5">
            {stats.map((stat) => (
              <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-2`}>
                <h4 className="font-poppins font-semibold xs:text-[30px] text-[25px] xs:leading-[40px] leading-[35px] text-gradient whitespace-nowrap"> {/* Added whitespace-nowrap */}
                  {stat.title}
                </h4>
                <p className="font-poppins font-normal xs:text-[18px] text-[14px] xs:leading-[24px] leading-[20px] text-white ml-3">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer/>
      </div>
    </div>

  </div>
)

export default Pendaftaran