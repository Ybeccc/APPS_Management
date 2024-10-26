import styles from './style';

import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

import { jumbotron4 } from './assets';

const Asisten = () => (
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
                    <span className="text-gradient">Asisten</span> {" "}
                </h1>
            </div>

            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Berikut merupakan daftar Asisten Praktikum dan Asisten Mahasiswa 2024/2025.
            Anda dapat melihat nama, peran, dan mata kuliah yang ditugaskan kepada asisten.
            </p>

          </div>

          <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={jumbotron4} alt="billing" className="w-[100%] h-[100%] realtive z-[5]" />
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>
        </section>
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Testimonials/>
        <CTA/>
        <Footer/>
      </div>
    </div>

  </div>
)

export default Asisten