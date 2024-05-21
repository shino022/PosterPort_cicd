import { MdAdd } from "react-icons/md";

const Card = ({
  posterId,
  posterImg,
  posterTitle,
  posterDescription,
  posterPrice,
}) => {
  return (
    <div className="shadow-md rounded-md px-2 py-2 bg-slate-400 min-w-[200px] lg:min-w-[150px]">
      <img src={posterImg} alt={posterTitle} className="rounded-lg" />
      <h2>{posterTitle}</h2>
      <p className="italic">{posterDescription}</p>
      <div className="flex justify-between items-center">
        <p className="text-xl">{`$${posterPrice}`}</p>
        <button
          className="flex hover:cursor-pointer bg-amber-500 rounded-lg p-2"
          onClick={() => console.log(posterId)}
        >
          Cart 
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Card;
