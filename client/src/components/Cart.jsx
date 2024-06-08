// const Cart = () => {
//   return <div className="flex justify-center bg-gray-300 w-full h-[100vh]">
//     <div className="bg-yellow-300 w-[70%] min-w-[350px]">
//         fill
//     </div>
//   </div>;
// };

// export default Cart;

import { useEffect, useState } from "react";
import posters from "../data/posters.js";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const Cart = ({ counts, incrementCount, decrementCount }) => {
  // Create a list of posters that are actually in the cart
  const cartItems = posters.filter((poster) => counts[poster.id] > 0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((poster) => {
      newTotal += counts[poster.id] * poster.price;
    });
    setCartTotal(newTotal.toFixed(2));
  }, [counts, cartItems]);

  return (
    <div className="flex justify-center w-full min-h-[100vh]">
      <div className="bg-amber-500 w-[70%] min-w-[350px] px-4 pb-2 opacity-95">
        <h2 className="text-white text-center m-2 text-3xl">YOUR CART</h2>
        <Link to="/" style={{ display: "inline-block" }}>
          <button className="flex group justify-center items-center gap-1 text-xl text-amber-500 bg-indigo-600 p-2 rounded-md hover:bg-indigo-700">
            HOME <RxArrowTopRight className="group-hover:rotate-45" />
          </button>
        </Link>
        {cartItems.length > 0 ? (
          <div>
            <ul className="text-white grid grid-cols-1 md:grid-cols-2 gap-2 text-xl">
              {cartItems.map((poster) => (
                <div className="w-full bg-gray-500 p-2 mt-2 rounded-md border-2 border-indigo-700">
                  <li
                    key={poster.id}
                    className="flex items-center gap-1 md:gap-16"
                  >
                    <div>
                      <h3>{poster.title}</h3>
                      <img
                        src={poster.imageUrl}
                        alt={poster.title}
                        className="rounded-lg border border-blue-500 border-opacity-50 h-[300px]"
                      />
                    </div>
                    <div>
                      <p>Quantity: {counts[poster.id]}</p>
                      <p>$$ per item: ${poster.price}</p>
                      <div className="w-full">
                        <button
                          className="bg-green-500 p-2 rounded-md w-10 hover:bg-green-700 text-xl mt-2 mr-2"
                          onClick={() => incrementCount(poster.id)}
                        >
                          +
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded-md w-10 hover:bg-red-700 text-xl"
                          onClick={() => decrementCount(poster.id)}
                        >
                          -
                        </button>
                      </div>
                      <p>
                        Total for this item:{" "}
                        <span className="text-green-500 text-2xl">
                          ${(counts[poster.id] * poster.price).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <div className="text-white text-2xl m-2">
              Cart Total:{" "}
              <span className="text-indigo-700 text-3xl">${cartTotal}</span>
            </div>
            <div>
              <Link to="/payment">
                <button className="bg-green-500 p-2 rounded-md w-full text-2xl hover:bg-green-700 mt-2">
                  Proceed to Payment
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-white text-3xl mb-2">Your cart is empty...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
