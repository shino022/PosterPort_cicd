import { MdAdd } from "react-icons/md";

const Card = ({ posterId, posterImg, posterTitle, posterDescription, posterPrice }) => {
  return (
    <div className="shadow-md rounded-md px-2 py-2 bg-slate-400 lg:min-w-[150px]">
      <img src={posterImg} alt={posterTitle} className="rounded-lg" />
      <h2>{posterTitle}</h2>
      <p className="italic">{posterDescription}</p>
      <div className="flex justify-between items-center">
        <p className="text-xl">{`$${posterPrice}`}</p>
        <MdAdd className="text-2xl hover:cursor-pointer" onClick={()=>console.log(posterId)}/>
      </div>
    </div>
  );
};

export default Card;
