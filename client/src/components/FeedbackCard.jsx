const FeedbackCard = ({ content, name, title, img }) => (
  <div className="flex justify-between flex-col px-3 py-5 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">

    <div className="flex flex-row">
      <img src={img} alt={name} className="w-[55px] h-[55px] rounded-full" />
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
          {title}
        </p>
      </div>
    </div>
    <p className="font-poppins font-normal text-[18px] leading-[32px] text-white my-10">
      {content}
    </p>
  </div>
);


export default FeedbackCard;