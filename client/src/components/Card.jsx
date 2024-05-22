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

  return (
    <div className="shadow-md rounded-md px-2 py-2 bg-slate-400 min-w-[200px] lg:min-w-[150px]">
      <img
        src={posterImg}
        alt={posterTitle}
        className="rounded-lg cursor-pointer hover:scale-105"
        onClick={() => setIsExpanded(true)}
      />
      <h2>{posterTitle}</h2>
      <p className="italic">{posterDescription}</p>
      <div className="flex justify-between items-center">
        <p className="text-xl">{`$${posterPrice}`}</p>
        <button
          className="flex hover:cursor-pointer  bg-amber-500 rounded-lg p-2"
          onClick={() => console.log(posterId)}
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
