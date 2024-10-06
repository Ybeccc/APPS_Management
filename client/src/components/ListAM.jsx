const ListAM = ({ content, name, title, img }) => {
    return (
        <div className="bg-white border rounded-lg w-[222px] mr-5 mb-5 flex flex-col"> {/* Added flex-col to stack items vertically */}
            {/* Image on top */}
            <img src={img} alt={name} className="w-full h-[150px] object-cover rounded-t-lg" />

            {/* Card Content */}
            <div className="flex-1 p-4"> {/* flex-1 allows this div to take up remaining space */}
                <h3 className="font-poppins font-semibold text-lg">{name}</h3>
                <p className="font-poppins font-normal text-[12px] text-gray-600">{title}</p>
                <p className="font-poppins font-normal text-[14px] mt-5">{content}</p>
            </div>

            {/* Buttons at the bottom */}
            <div className="p-4"> {/* Add padding for buttons */}
                <div className="flex justify-between"> {/* Changed justify-around to justify-between for equal spacing */}
                    <button className="bg-blue-500 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-blue-600 mr-2"> {/* w-full for equal button width */}
                        kehadiran
                    </button>
                    <button className="bg-indigo-600 text-white text-sm font-medium py-2 w-full rounded-lg hover:bg-indigo-700"> {/* w-full for equal button width */}
                        tugas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListAM;
