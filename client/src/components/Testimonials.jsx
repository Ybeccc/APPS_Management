import { practicumList, studentList } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    {/* =====DAFTAR ASISTEN PRAKTIKUM SECTION===== */}
    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h1 className={`${styles.heading2} text-center mt-5`}>
        Daftar Asisten Praktikum
      </h1>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {practicumList.map((card) => <FeedbackCard key={card.id} {...card} />)}
    </div>

    {/* =====DAFTAR ASISTEN MAHASISWA SECTION===== */}
    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 mt-20 relative z-[1]">
      <h1 className={`${styles.heading2} text-center mt-5`}>
        Daftar Asisten Mahasiswa
      </h1>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {studentList.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Testimonials;