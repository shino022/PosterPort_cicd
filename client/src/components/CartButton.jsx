import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
  return (
    <button className="flex justify-center items-center gap-2 bg-white text-black m-2 rounded-md p-2 cursor-pointer hover:scale-105">
        Simulate Cart 
        <FaShoppingCart className="text-xl" />
    </button>
  )
}

export default CartButton
