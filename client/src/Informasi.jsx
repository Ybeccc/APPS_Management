import styles, { layout } from "./style";

import Navbar from './components/Navbar';
import Business from './components/Business';
import CTA from './components/CTA';
import Footer from './components/Footer';

import { jumbotron3, asmahasiswa, aspraktikum } from './assets';

const Informasi = () => (
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
                    Fakultas <br className="sm:block hidden" /> {" "}
                    <span className="text-gradient">Teknologi Informasi</span> {" "}
                    UNTAR <br className="sm:block hidden" /> {" "}
                </h1>
            </div>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Jelajahi informasi seputar Asisten Praktikum atau Asisten Mahasiswa di FTI Untar. 
            Lihat posisi yang tersedia dan mulailah perjalanan Anda untuk menjadi salah satu aspek kesuksesan akademis!
            </p>

          </div>

          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron3} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>
        </section>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        {/* =====ASISTEN PRAKTIKUM SECTION===== */}
        <section id="product" className={layout.sectionReverse}>
          <div className={layout.sectionImgReverse}>
            <img src={aspraktikum} alt="aspraktikum" className="w-[100%] h-[100%] relative z-[5]" />
            <div className="absolute z-[0] w-[50%] h-[70%] -left-1/2 bottom-0 rounded-full pink__gradient" />
            <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[70%] right-20 bottom-20 blue__gradient" />
          </div>

          <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
              Asisten Praktikum
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Asisten Praktikum adalah mahasiswa yang membantu dosen dalam perkuliahan praktikum. 
            Mereka memiliki tanggung jawab untuk meningkatkan pemahaman mahasiswa akan pembelajaran praktikum dan membantu mahasiswa yang kesulitan dengan menjawab pertanyaan yang diajukan.
            </p>
          </div>
        </section>
        
        {/* =====ASISTEN MAHASISWA SECTION===== */}
        <section className={layout.section}>
          <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
              Asisten Mahasiswa
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Asisten Mahasiswa adalah mahasiswa yang khusus bekerja dalam mendukung aspek operasional dan teknis laboratorium. 
            Mereka memiliki tanggung jawab untuk menjaga lingkungan laboratorium, memastikan semua peralatan berfungsi dengan baik, dan melakukan perawatan rutin pada alat laboratorium.
            </p>
          </div>

          <div className={layout.sectionImg}>
            <img src={asmahasiswa} alt="asmahasiswa" className="w-[100%] h-[100%]"/>
            <div className="absolute z-[0] w-[50%] h-[70%] -right-1/2 bottom-0 rounded-full pink__gradient" />
            <div className="absolute z-[3] -right-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
          </div>
        </section>

        <Business/>
        <CTA/>
        <Footer/>
      </div>
    </div>

  </div>
)

export default Informasi