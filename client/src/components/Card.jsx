import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const Card = ({
  posterId,
  posterImg,
  posterTitle,
  posterDescription,
  posterPrice,  
  posterCount,
  incrementCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const handleDownload = () => {
    //Create a new anchor element
    const link = document.createElement("a");

    //Set the href attribute to the poster image
    link.href = posterImg;

    //Set the download attribute to the poster title
    link.download = `${posterTitle}.jpg`;

    //Append the anchor element to the body
    document.body.appendChild(link);

    //Click the anchor element
    link.click();

    //Remove the anchor element from the body
    document.body.removeChild(link);
  };

  const handleCartBtn = () => {
    incrementCount();
  };


  return (
    <div className="shadow-md h-auto rounded-md px-2 py-2 bg-amber-200 min-w-[200px] lg:min-w-[150px] sm:h-[500px] flex flex-col border-2 border-amber-400">
      <img
        src={posterImg}
        alt={posterTitle}
        className="rounded-lg cursor-pointer hover:scale-105 border border-blue-500 border-opacity-50"
        onClick={() => setIsExpanded(true)}
      />
      <h2 className="text-xl m-auto font-bold">{posterTitle}</h2>
      <p className="text-xl m-auto font-bold text-indigo-700 font-jersey">Click on image to download</p>
      <p className="italic m-auto">{posterDescription}</p>
      

      <div className="flex justify-between items-center mt-auto">
        <p className="text-xl text-gray-900">{`$${posterPrice}`}</p>
        <p className="m-auto bg-violet-900 text-white w-10 p-2 rounded-full text-center">{posterCount}</p>
        <button
          className="flex hover:cursor-pointer  bg-amber-500 rounded-lg p-2"
          onClick={handleCartBtn}
        >
          Cart
          <MdAdd className="text-2xl" />
        </button>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              className="absolute top-0 right-0 m-2 text-black"
              onClick={() => setIsExpanded(false)}
            >
              <MdCancel className="text-2xl bg-white" />
            </button>
            <img
              src={posterImg}
              alt={posterTitle}
              className="rounded-lg cursor-pointer w-[500px] h-[500px]"
            />
            <button
              className="flex items-center gap-2 mt-2 px-4 py-2 bg-blue-500  text-white rounded-md"
              onClick={handleDownload}
            >
              <p>Download</p>
              <IoMdDownload />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
