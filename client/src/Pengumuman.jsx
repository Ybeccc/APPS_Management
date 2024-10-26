import styles from './style';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { jumbotron1 } from './assets';

const Pengumuman = () => (
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
                    <span className="text-gradient">Pengumuman</span> {" "}
                </h1>
            </div>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Ikuti terus pengumuman terbaru mengenai lowongan kerja dan hasil seleksi untuk posisi asisten praktikum dan asisten mahasiswa. 
            Jangan lewatkan berita penting apa pun!
            </p>

          </div>

          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron1} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>
        </section>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>

        {/* =====PENGUMUMAN A.PRAKTIKUM SECTION===== */}
        <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
          <div className="flex-1 flex flex-col">
            <h2 className={styles.heading2}>Penerimaan Asisten Praktikum</h2>
            <p className={`${styles.paragraph} mt-5`}>
              Selamat dan sukses kepada asisten praktikum yang terpilih. Temukan NIM Anda dibawah ini. Untuk informasi selanjutnya, silakan hubungi koordinator praktikum.
            </p>
          </div>
        </section>

        {/* =====PENGUMUMAN A.MAHASISWA SECTION===== */}
        <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
          <div className="flex-1 flex flex-col">
            <h2 className={styles.heading2}>Penerimaan Asisten Mahasiswa</h2>
            <p className={`${styles.paragraph} mt-5`}>
              Selamat dan sukses kepada asisten mahasiswa yang terpilih. Temukan NIM Anda dibawah ini. Untuk informasi selanjutnya, silakan hubungi koordinator laboran.
            </p>
          </div>
        </section>

        <Footer/>
      </div>
    </div>

  </div>
)

export default Pengumuman