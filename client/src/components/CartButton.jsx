import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
  return (
    <button className="flex justify-center items-center gap-2 bg-white text-black m-2 rounded-md p-2 cursor-pointer">
        Go to Cart 
        <FaShoppingCart className="text-2xl" />
    </button>
  )
}

export default CartButton
